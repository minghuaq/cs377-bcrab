"use client";

import { useEffect, useState } from "react";
import ChatBubble from "./chatbubble";
export default function ChatDialog(props: {
    dialogID: string;
    conversation: message[];
}) {
    const dialogID = props.dialogID;
    const [chatData, setChatData] = useState<message[]>();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/${dialogID}`)
            .then((res) => res.json())
            .then((data) => {
                setChatData(data.messages);
            });
    }, []);
    return (
        <div className="flex flex-col h-full w-full items-center overflow-y-auto">
            <div className="flex flex-col h-full w-full max-w-3xl gap-2">
                {chatData?.map((message) => (
                    <div key={message.messageID}>
                        <ChatBubble
                            isAI={message.isAI}
                            message={message.message}
                        ></ChatBubble>
                    </div>
                ))}

                {props.conversation?.map((message) => (
                    <div key={message.messageID}>
                        <ChatBubble
                            isAI={message.isAI}
                            message={message.message}
                        ></ChatBubble>
                    </div>
                ))}
            </div>
        </div>
    );
}
