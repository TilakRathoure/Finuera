import { NextRequest, NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const SUPPORTED_TYPES = [
  "text/csv",
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!SUPPORTED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Unsupported file type. Only CSV, PDF, and images are allowed.",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let extractedText = "";

    try {
      if (file.type === "text/csv") {
        const csvText = buffer.toString("utf-8");

        const result = await generateText({
          model: google("gemini-1.5-flash"),
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `Extract and format the following CSV data. Return only the clean text content without any additional commentary:\n\n${csvText}`,
                },
              ],
            },
          ],
        });

        extractedText = result.text;
      } else if (file.type === "application/pdf") {
        // For PDF files, use Gemini's native PDF processing
        const result = await generateText({
          model: google("gemini-1.5-flash"),
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Extract all text content from this PDF file. Return only the extracted text without any additional commentary or formatting.",
                },
                {
                  type: "file",
                  data: buffer,
                  mimeType: file.type,
                },
              ],
            },
          ],
        });

        extractedText = result.text;
      } else if (file.type.startsWith("image/")) {
        // For image files, use Gemini's vision capabilities
        const result = await generateText({
          model: google("gemini-1.5-flash"),
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Extract all text content from this image. This could be a receipt, bank statement, or financial document. Return only the extracted text without any additional commentary.",
                },
                {
                  type: "image",
                  image: buffer,
                  mimeType: file.type,
                },
              ],
            },
          ],
        });

        extractedText = result.text;
      }

      // Return the extracted text
      return NextResponse.json({
        success: true,
        data: {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          extractedText: extractedText.trim(),
        },
      });
    } catch (aiError) {
      console.error("AI processing error:", aiError);
      return NextResponse.json(
        {
          error: "Failed to process file with AI",
          details:
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
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Optional: Add GET method for health check
export async function GET() {
  return NextResponse.json({
    message: "Upload API is running",
    supportedTypes: SUPPORTED_TYPES,
    maxFileSize: `${MAX_FILE_SIZE / 1024 / 1024}MB`,
  });
}
