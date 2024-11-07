"use server";

import { log } from "console";

export async function sendRequest(
    prevState: {
        message: string;
    },
    formData: FormData
) {
    "use server";

    let message = formData.get("chat")?.toString();
    try {
        let data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        if (!data.ok) {
            throw new Error(`Error: ${data.status} ${data.statusText}`);
        }

        let response = await data.json();
        if (response.product.error?.code == 429) {
            return { message: "You’ve reached our limit of messages per minute. Please try again later"}
        }

        return { message: response.product.choices[0].message.content };
    } catch (err) {
        if (err instanceof Error) {
            return { message: err.message };
        } else {
            return { message: "An unexpected error occurred" };
        }
    }
}
