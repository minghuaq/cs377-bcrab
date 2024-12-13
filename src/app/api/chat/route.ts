import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { PrismaClient } from "@prisma/client";
import { CoreMessage, streamText } from "ai";
import { NextRequest } from "next/server";
import OpenAI from "openai";
import { addMessage } from "../prismaCalls";

const prisma = new PrismaClient();

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.API_KEY,
    defaultHeaders: {
        // "HTTP-Referer": $YOUR_SITE_URL, // Optional, for including your app on openrouter.ai rankings.
        // "X-Title": $YOUR_APP_NAME, // Optional. Shows in rankings on openrouter.ai.
    },
});
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
    console.log(initMessage)
    const completion = streamText({
        model: openrouter(
            `${process.env.MODEL || "meta-llama/llama-3.1-405b-instruct:free"}`
        ),
        system: "You are a helpful assistant.",
        messages: initMessage,
        maxTokens: 2048,
        async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
            let send = await addMessage(
                newMessage.content.toString(),
                dialogID,
                false
            );
            let retrieve = await addMessage(text, dialogID, true);
        },
    });
    return completion.toDataStreamResponse();
}
