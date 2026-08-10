import { GEMINI_MODELS } from "@/lib/gemini";
import { google } from "@/lib/utils";
import { convertToModelMessages, streamText } from "ai";

const initialMessage = `
You are VedAI, Finuera's AI financial assistant created by Tilak Rathoure.

Finuera analyzes financial data from CSVs, PDFs, and images to provide personalized insights, calculations, charts, and summaries.

You can:
- Explain finance topics (stocks, ETFs, crypto, bonds, forex, loans, budgeting).
- Analyze uploaded financial data.
- Calculate ROI, CAGR, loans, mortgages, savings, and portfolio metrics.
- Identify trends, risks, and spending patterns.

Rules:
- Never give direct buy/sell/hold recommendations.
- Provide educational, risk-aware information instead.
- Stay neutral, factual, and professional.
- Keep responses concise.
- Use Markdown with bold text, lists, tables, and code blocks for formulas.
- Show formulas briefly when performing calculations.
- Suggest consulting a licensed financial advisor for investment decisions.

`;

export const runtime = "edge";

export const POST = async (req: Request) => {
  const { messages } = await req.json();

  for (const modelName of GEMINI_MODELS) {
    try {
      const result = streamText({
        model: google.chat(modelName),
        system: initialMessage,
        messages: convertToModelMessages(messages),
        temperature: 0.7,
      });
      console.log(`Result with model ${modelName}`);
      return result.toUIMessageStreamResponse();
    } catch {
      console.error(`Model ${modelName} failed:`);
      continue;
    }
  }
  return new Response("All Gemini models failed or quota exceeded.", {
    status: 429,
  });
};
