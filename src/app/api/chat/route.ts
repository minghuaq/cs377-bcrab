import { auth } from "@/auth";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { ChatRequestOptions, CoreMessage, streamText } from "ai";
import { NextRequest } from "next/server";
import OpenAI from "openai";

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

export const config = {
    runtime: "edge",
};
export async function POST(request: NextRequest) {
    const {
        messages,
        options,
    }: { messages: CoreMessage[]; options: ChatRequestOptions } =
        await request.json();
    const dialogID = options;
    console.log(dialogID);
    const newMessage = messages[messages.length - 1];
    const session = await auth();

    // let send = await fetch(
    //     `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/${dialogID}`,
    //     {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             userID: session?.user?.id,
    //             message: newMessage.content,
    //             isAI: false,
    //             dialogID: dialogID ?? "",
    //         }),
    //     }
    // );
    // let messageSent = await send.json();
    // let newDialogID = messageSent.createMessage.dialogId;
    const completion = streamText({
        model: openrouter(
            `${process.env.MODEL || "meta-llama/llama-3.1-405b-instruct:free"}`
        ),
        system: "You are a helpful assistant.",
        messages,
        // async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
        //     // implement your own storage logic:
        //     let retrieve = await fetch(
        //         `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/${newDialogID}`,
        //         {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //             body: JSON.stringify({
        //                 userID: session?.user?.id,
        //                 message: text,
        //                 isAI: true,
        //                 dialogID: newDialogID ?? "",
        //             }),
        //         }
        //     );
        //     if (!dialogID) {
        //         window.history.pushState({}, "", `/chat/${newDialogID}`);
        //     }
        // },
    });
    return completion.toDataStreamResponse();
}
