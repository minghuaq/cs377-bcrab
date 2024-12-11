import { auth } from "@/auth";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { ChatRequestOptions, CoreMessage, streamText } from "ai";
import { NextRequest } from "next/server";
import OpenAI from "openai";
import { addMessage } from "./[id]/route";

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

const saveMessage = (message: string) => {};
export async function POST(request: NextRequest) {
    const {
        messages,
        dialogID,
    }: { messages: CoreMessage[]; dialogID: string } = await request.json();
    const newMessage = messages[messages.length - 1];
    const session = await auth();
    let send = await addMessage(
        newMessage.content.toString(),
        dialogID ?? "",
        false
    );
    let messageSent = send;
    let newDialogID = messageSent?.dialogId;
    console.log(newDialogID);
    const completion = streamText({
        model: openrouter(
            `${process.env.MODEL || "meta-llama/llama-3.1-405b-instruct:free"}`
        ),
        system: "You are a helpful assistant.",
        messages,
        async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
            // implement your own storage logic:
            let retrieve = await addMessage(
                text,
                dialogID ?? "",
                true
            )
            // TODO: Fix redirecting
            // if (!dialogID) {
            //     window.history.pushState({}, "", `/chat/${newDialogID}`);
            // }
        },
    });
    return completion.toDataStreamResponse();
}
