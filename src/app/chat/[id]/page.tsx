"use client";
import Chatbox from "@/components/forms/chatbox";
import ChatDialog from "./chatdialog";
import { useState } from "react";

type chatConversationProps = {
    conversation?: message[];
    setConversation?: React.Dispatch<React.SetStateAction<message[]>>;
};
export default function ChatConversation({
    params,
    props,
}: {
    params: { id: string };
    props: chatConversationProps;
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
