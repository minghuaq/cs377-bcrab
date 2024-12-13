// import { sendRequest } from "@/app/chat/actions";
import { CoreMessage } from "ai";
import { Message, useChat } from "ai/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import SubmitButton from "../ui/submitbutton";
import { TextBox } from "../ui/textbox";

type chatboxProps = {
    chatData?: message[];
    setConversation?: React.Dispatch<React.SetStateAction<Message[]>>;
};

export default function Chatbox(props: chatboxProps) {
    const chatref = useRef<HTMLParagraphElement>(null);
    const pathname = usePathname();
    const parts = pathname.split("/");
    const lastPart = parts[parts.length - 1];
    const [initMessage, setInitMessage] = useState<CoreMessage[]>();
    useEffect(() => {
        if (props.chatData) {
            const messageToAI: CoreMessage[] = props.chatData.map((message) => {
                return {
                    role: message.isAI ? "assistant" : "user",
                    content: message.message,
                };
            });
            setInitMessage(messageToAI);
        }
    }, [props.chatData]);
    let dialogID = lastPart == "chat" ? null : lastPart;
    const { messages, input, isLoading, setInput, append } = useChat({
        experimental_throttle: 500, // To avoid maximum update depth exceeded
    });
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem("initMessage")) {
            // TODO: Maybe we don't need this, try to reuse handleSubmit.
            append(
                {
                    content: localStorage.getItem("initMessage") as string,
                    role: "user",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: {
                        dialogID: dialogID,
                    },
                }
            );
            setInput("");
            localStorage.removeItem("initMessage");
        }
    }, [pathname]);

    function handleSubmit() {
        if (!chatref.current || chatref.current.innerHTML == "") return;
        chatref.current.innerHTML = "";
        if (!dialogID) {
            localStorage.setItem("initMessage", input);
            const newDialogID = v4();
            dialogID = newDialogID;
            router.push(`chat/${dialogID}`);
            return;
        }
        append(
            { content: input, role: "user" },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    dialogID: dialogID,
                    initMessage: initMessage,
                },
            }
        );
        setInput("");
    }
    useEffect(() => {
        props.setConversation?.(messages);
    }, [messages]);
    return (
        <form
            className="flex flex-row gap-2 items-end px-10 py-2 items-center w-full h-fit max-w-3xl"
            action={handleSubmit}
        >
            <TextBox
                className="flex flex-col w-full rounded-2xl border-4 min-h-14 h-fit justify-center outline-none outline-0"
                id="chat"
                onKeyDown={async (e) => {
                    if (e.key === "Enter" && e.shiftKey === false) {
                        e.preventDefault();
                        document.getElementById("chatSubmitButton")?.click();
                    }
                }}
            >
                <p
                    contentEditable={"plaintext-only"}
                    suppressContentEditableWarning
                    id="default-chat"
                    data-testid="chat-input"
                    ref={chatref}
                    className="w-full h-fit max-h-52 overflow-y-auto align-middle outline-none cursor-text"
                    data-placeholder="Message B-CRAB"
                    onInput={() => {
                        const element = chatref.current;
                        if (
                            element?.innerHTML === "<br>" ||
                            element?.textContent?.trim() === ""
                        ) {
                            element.innerHTML = "";
                        }
                        setInput(element?.textContent ?? "");
                    }}
                ></p>
            </TextBox>
            <SubmitButton isLoading={isLoading} id="chatSubmitButton" />
        </form>
    );
}
