import { NextRequest, NextResponse } from "next/server";
import { google } from "@/lib/utils";
import { generateText } from "ai";
import { AIResponse } from "@/lib/types";

const GEMINI_MODELS = [
  "gemini-2.5-flash-lite-preview-09-2025",
  "gemini-2.5-flash",
  "gemini-2.5-flash-preview-09-2025",
  "gemini-2.5-flash-image",
  "gemini-2.5-flash-lite",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const SUPPORTED_TYPES = [
  "text/csv",
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
const instructions = `
Analyze this financial file (receipt, bank statement, CSV, etc.) and extract the following information in JSON format:

1. Calculate the total amount spent across all transactions
2. Group spending by month and calculate monthly totals
3. Categorize each transaction into one of these categories: housing, transportation, groceries, utilities, entertainment, food, shopping, healthcare, education, personal, travel, insurance, gifts, bills, other-expense
4.1  Analyze the spending data and generate 3–5 concise, actionable insights. Each insight should be specific, data-driven, and no longer than 2 sentences. Highlight anomalies, comparisons with past months, or budget overruns. Provide clear suggestions where applicable (e.g., reduce X, adjust Y, or allocate more to Z). This part should be in one sentence;
4.2  Give a tip based on the spending in about 100 words.
5. And chart config for categarires and their spending with a random colour;
6. Confidence: give 0–100% and justify; if anything is obscured/blurred/unclear, cap confidence at ≤85%, only give >95% if perfectly clear and briefly explain what reduced the confidence;

Return:
{
"error":false,
"currencysymbol":"string",
  "totalAmount": number,
  "monthlySpending": [
    {"month": "January", "spent": number},
    {"month": "February", "spent": number}
  ],
  "categories": [
    {"category": "groceries", "amount": number},
    {"category": "transportation", "amount": number}
  ],
  "tip": {
  part1:"string",
  part2:"string"
  }

  "chartconfig:{

  groceries: {
    label: "Groceries",
    color: "#1e3a8a",
  },

  transportation: {
    label: "Transportation",
    color: "#3b82f6", 
  }
  }
  "confidence":{
  text:String (what reduced the confidence)
  number: number (0-100 how confident)
  }
  }

You are analyzing financial files such as receipts, bank statements, expense CSVs, or government finance reports.
If the document has numbers related to money, spending, revenue, taxes, debt, or expenditures, treat it as financial data.
Only if it truly has no financial content (like poems, random text, or images with no numbers), return {"error":true}.

Do not include any explanation, only return the JSON.
`;

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided", message: "No file provided" },
        { status: 400 }
      );
    }

    if (!SUPPORTED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Unsupported file type. Only CSV, PDF, and images are allowed.",
          message: "Unsupported file",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "File size too large. Maximum size is 10MB.",
          message: "File size too large. Maximum size is 10MB.",
        },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    let response = "";

    try {
      if (file.type === "text/csv") {
        const csvText = new TextDecoder().decode(arrayBuffer);
        const lines = csvText.split(/\r?\n/);
        const limitedCsv = lines.slice(0, 201).join("\n");

        let result = null;
        for (const model of GEMINI_MODELS) {
          try {
            const res = await generateText({
              model: google(model),
              messages: [
                {
                  role: "user",
                  content: `Here is a CSV file content. Please follow these instructions: ${instructions}\n\nCSV Content:\n${limitedCsv}`,
                },
              ],
            });
            result = res;
            console.log(`CSV processed with model ${model}`);
            break;
          } catch (error) {
            console.log(`${model} failed for CSV`);
            continue;
          }
        }

        if (!result) {
          return NextResponse.json(
            {
              error: "All models failed",
              message: "Unable to process CSV with available Gemini models",
            },
            { status: 500 }
          );
        }

        response = result.text;
      } else {
        const uint8Array = new Uint8Array(arrayBuffer);
        let result = null;

        for (const model of GEMINI_MODELS) {
          try {
            const res = await generateText({
              model: google(model),
              messages: [
                {
                  role: "user",
                  content: [
                    {
                      type: "text",
                      text: `Please analyze this ${
                        file.type.startsWith("image/") ? "image" : "PDF"
                      } file and follow these instructions: ${instructions}`,
                    },
                    file.type.startsWith("image/")
                      ? {
                          type: "image",
                          image: uint8Array,
                          mediaType: file.type,
                        }
                      : {
                          type: "file",
                          data: uint8Array,
                          mediaType: file.type,
                        },
                  ],
                },
              ],
            });
            result = res;
            console.log(`Processed with model ${model}`);
            break;
          } catch (error) {
            console.log(`${model} failed`);
            continue;
          }
        }

        if (!result) {
          return NextResponse.json(
            {
              error: "All models failed",
              message: "Unable to process file with available Gemini models",
            },
            { status: 500 }
          );
        }

        response = result.text;
      }

      const newres = JSON.parse(
        response.replace(/```(?:json)?\n?/g, "").trim()
      ) as AIResponse;

      if (newres.error) {
        return NextResponse.json(
          {
            error: "Failed to upload file",
            message: "No Financial data found",
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        data: newres,
      });
    } catch (aiError) {
      console.error("AI processing error:", aiError);
      return NextResponse.json(
        {
          error: "Failed to process file with AI",
          message:
            aiError instanceof Error ? aiError.message : "Unknown AI error",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: "Failed to process upload",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};