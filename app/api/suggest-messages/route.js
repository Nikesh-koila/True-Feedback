import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const token = process.env["GITHUB_TOKEN"];

export async function POST(req) {
  const { prompt } = await req.json();

  const prompts = `Generate a list of three open-ended and engaging questions, each on a different topic. Format the questions as a single string, with '||' separating each question. These questions should be suitable for a diverse audience on an anonymous social messaging platform, like Qooh.me. Focus on general and inclusive themes that promote friendly, positive, and welcoming interactions. Ensure that each question is unique in its topic and phrasing to avoid repetition with previous responses. Avoid sensitive or personal subjects, and instead encourage curiosity, fun, and thought-provoking discussions.new quetions and topics also should be unique from this ${prompt}`;
  const openai = createOpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: token,
  });

  const result = streamText({
    model: openai("gpt-4o-mini"),
    prompt: prompts,
  });

  return result.toDataStreamResponse();
}
