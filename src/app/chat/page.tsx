"use client";
import Chatbox from "@/components/forms/chatbox";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { useSession } from "next-auth/react";

export default function Home() {
    const { data: session } = useSession();

    console.log("RYAN!!!!!!!!")
    const words = [
        { text: "How" },
        { text: "can" },
        { text: "I" },
        { text: "help" },
        { text: "you," },
        {text: (session?.user?.name ?? "Human")+"?"}
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
