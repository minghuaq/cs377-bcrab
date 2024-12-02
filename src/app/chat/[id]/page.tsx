"use client";
import Chatbox from "@/components/forms/chatbox";
import ChatDialog from "./chatdialog";
import { useState } from "react";

export default function ChatConversation({
    params,
}: {
    params: { id: string };
}) {
    const [conversation, setConversation] = useState<message[]>([]);
    console.log(conversation)
    return (
        <div className="flex flex-col gap-10 w-full h-full justify-between py-10 items-center">
            <ChatDialog dialogID={params.id} conversation={conversation} />
            <Chatbox
                setConversation={setConversation}
            />
        </div>
    );
}
