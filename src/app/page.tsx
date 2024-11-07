"use client";
import Image from "next/image";
import { sendRequest } from "./actions";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
    message: "",
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button type="submit" aria-disabled={pending}>
            Send
        </button>
    );
}

export default function Home() {
    const [state, formAction] = useFormState(sendRequest, initialState);

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <form action={formAction}>
                <input
                    className="text-black"
                    type="text"
                    id="chat"
                    name="chat"
                    required
                />
                <SubmitButton />
            </form>
            <p className="">{state?.message}</p>
        </div>
    );
}
