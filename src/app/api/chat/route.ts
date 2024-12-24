import { addMessage, addResource } from "@/lib/actions/prismaCalls";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { PrismaClient } from "@prisma/client";
import { CoreMessage, streamText, tool } from "ai";
import { NextRequest } from "next/server";
import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { findRelevantContent } from "@/lib/ai/embedding";
import { groq } from "@ai-sdk/groq";

const prisma = new PrismaClient();
const openrouter = createOpenRouter({
    apiKey: process.env.API_KEY,
});
export const maxDuration = 30;
// export const runtime = "edge";
export async function POST(request: NextRequest) {
    const {
        messages,
        dialogID,
        initMessage = [],
    }: {
        messages: CoreMessage[];
        dialogID: string;
        initMessage: CoreMessage[];
    } = await request.json();
    const newMessage = messages[messages.length - 1];
    initMessage?.push(...messages);

    const chatContextLength = 2;
    const messsagesToAI =
        initMessage.length <= chatContextLength
            ? initMessage
            : initMessage.slice(initMessage.length - chatContextLength);
    const completion = streamText({
        model: groq(
            `${process.env.MODEL || "meta-llama/llama-3.1-405b-instruct:free"}`
        ),
        system: `You are Beloit College Roadmap Advisor Bot (B-CRAB), a helpful assistant. Check your knowledge base before answering any questions Only respond to questions using information from tool calls. If no relevant information is found in the tool calls, respond, "Sorry, I don't know, I only answer question related to Beloit College."`,
        messages: messsagesToAI,

        tools: {
            addResource: {
                description: `add a resource to your knowledge base. If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
                parameters: z.object({
                    content: z
                        .string()
                        .describe(
                            "the content or resource to add to the knowledge base"
                        ),
                }),
                execute: async ({ content }) => {
                    await addResource(content);
                    return "Resource Added";
                },
            },

            getInformation: {
                description: `get information from your knowledge base to answer questions. If the user asks for a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
                parameters: z.object({
                    question: z
                        .string()
                        .describe(
                            "the users question to search for in the knowledge base"
                        ),
                }),
                execute: async ({ question }) => {
                    return await findRelevantContent(question);
                },
            },
        },
        // maxTokens: 2048,
        async onStepFinish({ stepType }) {
            if (stepType == "initial") {
                let send = await addMessage(
                    newMessage.content.toString(),
                    dialogID,
                    false
                );
            }
        },
        async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
            let retrieve = await addMessage(text, dialogID, true);
        },
    });
    for await (const textPart of completion.textStream) {
        continue;
    }
    return completion.toDataStreamResponse();
}
