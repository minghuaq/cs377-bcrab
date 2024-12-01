import { auth, NextAuthRequest } from "@/auth"
import { NextResponse } from "next/server";

export const GET = auth(async function GET(request: NextAuthRequest) {
    if (request.auth) {
        const res = await fetch("https://openrouter.ai/api/v1/auth/key", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.API_KEY}`,
            },
        });
        const limit = await res.json();
        return Response.json({ limit });
        // return NextResponse.json(request.auth)
    }

    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
})

export const POST = auth(async function POST(request: NextAuthRequest) {
    if (!request.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const data = await request.json();
    const userMessage = data.message;

    // Disable for now
    // const searchParams = request.nextUrl.searchParams

    // const userMessage = searchParams.get('user')
    // TODO: Message Sanitization.

    const res = await fetch(
        `${
            process.env.API_PATH ||
            "https://openrouter.ai/api/v1/chat/completions"
        }`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.API_KEY}`,
                //   "HTTP-Referer": `${YOUR_SITE_URL}`, // Optional, for including your app on openrouter.ai rankings.
                //   "X-Title": `${YOUR_SITE_NAME}`, // Optional. Shows in rankings on openrouter.ai.
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: `${
                    process.env.MODEL ||
                    "meta-llama/llama-3.1-405b-instruct:free"
                }`,
                messages: [
                    {
                        role: "system",
                        content: "",
                    },
                    {
                        role: "user",
                        content: userMessage,
                        // name: "",
                    },
                ],
                // stream: true,
            }),
        }
    );
    const product = await res.json();
    return Response.json({ product });
})
