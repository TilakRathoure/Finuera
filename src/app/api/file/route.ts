import { NextRequest, NextResponse } from "next/server";
import { GEMINI_MODELS } from "@/lib/gemini";
import { google } from "@/lib/utils";
import { generateText } from "ai";
import { AIResponse } from "@/types/api";

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
Extract financial data from the provided receipt, statement, CSV, report, image, or PDF.
Return only valid JSON matching this shape:
{
  "error": false,
  "currencysymbol": "string",
  "totalAmount": number,
  "monthlySpending": [{"month": "January", "spent": number}],
  "categories": [{"category": "groceries", "amount": number}],
  "tip": {"part1": "string", "part2": "string"},
  "chartconfig": {"groceries": {"label": "Groceries", "color": "#RRGGBB"}},
  "confidence": {"text": "string", "number": number}
}

Requirements:
- Sum all transactions and group totals by month.
- Use only these categories: housing, transportation, groceries, utilities, entertainment, food, shopping, healthcare, education, personal, travel, insurance, gifts, bills, other-expense.
- tip.part1: 3–5 concise, actionable, data-driven insights covering relevant anomalies, month comparisons, or budget overruns.
- tip.part2: an approximately 100-word spending tip.
- chartconfig: one entry per returned category, keyed by category, with a readable label and random hex color.
- confidence.number: 0–100. Cap at 85 if anything is obscured or unclear; use above 95 only when perfectly clear. Briefly explain uncertainty in confidence.text.
- Treat monetary spending, revenue, tax, debt, or expenditure data as financial. If there is no financial content, return exactly {"error":true}.
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
              temperature: 0,
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
          } catch {
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
              temperature: 0,
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
          } catch {
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