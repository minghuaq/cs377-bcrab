"use client";

import { useEffect, useRef, useState } from "react";
import ChatBubble from "./chatbubble";
import { Message } from "ai";

export default function ChatDialog(props: {
    dialogID: string;
    conversation: Message[];
}) {
    const dialogID = props.dialogID;
    const [chatData, setChatData] = useState<message[]>();

    const messagesEndRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/${dialogID}`)
            .then((res) => res.json())
            .then((data) => {
                setChatData(data.messages);
            });
    }, [dialogID]);
    useEffect(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [chatData, props.conversation]);
    return (
        <div className="flex flex-col h-full w-full items-center overflow-y-auto">
            <div className="flex flex-col h-full w-full max-w-3xl gap-2">
                {chatData?.map((message) => (
                    <div key={message.messageID}>
                        <ChatBubble
                            isAI={message.isAI}
                            message={message.message}
                        />
                    </div>
                ))}

                {props.conversation?.map((message) => (
                    <div key={message.id}>
                        <ChatBubble
                            isAI={message.role == "assistant" ? true : false}
                            message={message.content}
                        />
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}
