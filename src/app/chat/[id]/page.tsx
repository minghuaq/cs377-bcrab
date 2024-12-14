"use client";
import Chatbox from "@/components/forms/chatbox";
import { Message } from "ai";
import { useEffect, useState } from "react";
import ChatDialog from "./chatdialog";

export default function ChatConversation({
    params,
}: {
    params: { id: string };
}) {
    const [conversation, setConversation] = useState<Message[]>([]);
    const [chatData, setChatData] = useState<message[]>();
    const dialogID = params.id;

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/${dialogID}`)
            .then((res) => res.json())
            .then((data) => {
                setChatData(data.messages);
            });
    }, [dialogID]);

    return (
        <div className="flex flex-col gap-10 w-full h-full justify-between py-10 items-center">
            <ChatDialog chatData={chatData} conversation={conversation} />
            <Chatbox chatData={chatData} setConversation={setConversation} />
        </div>
    );
}
