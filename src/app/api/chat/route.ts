import { NextRequest } from "next/server";
type TextContent = {
    type: "text";
    text: string;
};

type ImageContentPart = {
    type: "image_url";
    image_url: {
        url: string; // URL or base64 encoded image data
        detail?: string; // Optional, defaults to 'auto'
    };
};
type ContentPart = TextContent | ImageContentPart;
type Message =
    | {
          role: "user" | "assistant" | "system";
          // ContentParts are only for the 'user' role:
          content: string | ContentPart[];
          // If "name" is included, it will be prepended like this
          // for non-OpenAI models: `{name}: {content}`
          name?: string;
      }
    | {
          role: "tool";
          content: string;
          tool_call_id: string;
          name?: string;
      };
export async function POST(request: NextRequest) {
    const data = await request.json();
    const userMessage = data.messagelist;
    // Disable for now
    // const searchParams = request.nextUrl.searchParams

    // const userMessage = searchParams.get('user')
    // TODO: Message Sanitization.
    let messages: Message[] = [
        {
            role: "system",
            content: "",
        },
    ];
    const newMessages = userMessage.map(
        (msg: { isAI: boolean; message: string }) => ({
            role: msg.isAI ? "assistent" : "user",
            content: msg.message,
            // name: "",
        })
    );
    messages = [...messages, ...newMessages];
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
                messages: messages
                // stream: true,
            }),
        }
    );
    const product = await res.json();
    return Response.json({ product });
}
