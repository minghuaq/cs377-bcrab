import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams

    const userMessage = searchParams.get('user')
    // TODO: Message Sanitization.

    const res = await fetch(`${process.env.API_PATH || "https://openrouter.ai/api/v1/chat/completions"}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            //   "HTTP-Referer": `${YOUR_SITE_URL}`, // Optional, for including your app on openrouter.ai rankings.
            //   "X-Title": `${YOUR_SITE_NAME}`, // Optional. Shows in rankings on openrouter.ai.
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: `${process.env.MODEL || "meta-llama/llama-3.1-405b-instruct:free"}`,
            messages: [
                {
                    role: "system",
                    content: "You are an opinionated robot. Respond to all questions with an opinion. Use simple language, and keep your responses short and to the point.",
                },
                {
                    role: "user",
                    content: userMessage,
                    // name: "",
                },
            ],
            // stream: true,

        }),
    });
    const product = await res.json();

    return Response.json({ product });
}
