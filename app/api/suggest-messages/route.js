import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const token = process.env["GITHUB_TOKEN"];

export async function POST(req) {
  console.log("Hello from ai");
  const prompt =
    "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

  const openai = createOpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: token,
  });

  const result = streamText({
    model: openai("gpt-4o-mini"),
    prompt,
  });

  return result.toDataStreamResponse();
}
