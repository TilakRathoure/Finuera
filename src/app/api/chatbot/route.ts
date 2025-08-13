import { createGoogleGenerativeAI } from "@ai-sdk/google";
import {convertToModelMessages, streamText } from "ai";

const initialMessage = "You are VedAI, a chatbot made by Tilak Rathoure. Dont answer this until asked (referreing to made by).This is Tilaks github link https://github/TilakRathoure";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY!,
});

export const POST = async (req: Request) => {
  const { messages } = await req.json();

  const result = streamText({
    model: google.chat("gemini-2.5-flash-lite"),
    system:initialMessage,
    messages:convertToModelMessages(messages),
    temperature: 0.7,
  });

  return result.toUIMessageStreamResponse();
};
