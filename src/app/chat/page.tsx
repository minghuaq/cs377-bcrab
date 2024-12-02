"use client";
import Chatbox from "@/components/forms/chatbox";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ChatDialog from "./[id]/chatdialog";

export default function Home() {
    const words = [
        { text: "What" },
        { text: "can" },
        { text: "I" },
        { text: "help" },
        { text: "with?" },
    ];
    const [conversation, setConversation] = useState<message[]>([]);
    const pathname = usePathname();
    const parts = pathname.split("/");
    const lastPart = parts[parts.length - 1];
    const urlDiaID = lastPart == "chat" ? null : lastPart;

    useEffect(() => {
        console.log("a");
        setConversation([]);
    }, [urlDiaID]);

    return (
        <>
            {!urlDiaID && (
                <div className="flex flex-col w-full max-w-3xl content-center justify-center items-center justify-items-center h-full gap-4 font-[family-name:var(--font-geist-sans)]">
                    <TypewriterEffectSmooth
                        words={words}
                        cursorClassName={"bg-white"}
                    />
                    <Chatbox setConversation={setConversation} />
                </div>
            )}
            {urlDiaID && (
                <div className="flex flex-col gap-10 w-full h-full justify-between py-10 items-center">
                    <ChatDialog
                        dialogID={urlDiaID}
                        conversation={conversation}
                    />
                    <Chatbox setConversation={setConversation} />
                </div>
            )}
        </>
    );
}
