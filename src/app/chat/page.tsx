"use client";
import { auth } from "@/auth"
import Chatbox from "@/components/forms/chatbox";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export default function Home() {
    // if (!session) return <div>Not authenticated</div>

    const words = [
        { text: "What" },
        { text: "can" },
        { text: "I" },
        { text: "help" },
        { text: "with?" },
    ];
    return (
        <div className="flex flex-col w-full max-w-3xl content-center justify-center items-center justify-items-center h-full gap-4 font-[family-name:var(--font-geist-sans)]">
            <TypewriterEffectSmooth
                words={words}
                cursorClassName={"bg-white"}
            />
            <Chatbox />
        </div>
    );
}
