import { sendRequest } from "@/app/chat/actions";
import { useRef } from "react";
import { TextBox } from "../ui/textbox";
import SubmitButton from "../ui/submitbutton";

export default function Chatbox() {
    const chatref = useRef<HTMLParagraphElement>(null);

    async function handleSubmit() {
        if (!chatref.current) {
            return;
        }
        const message = chatref.current.textContent?.toString();
        if (!message) {
            return;
        }
        chatref.current.innerHTML = "";
        const response = await sendRequest(message);
        console.log(response);
    }
    return (
        <form
            className="flex flex-row gap-2 items-end px-10 w-full overflow-y-auto"
            action={handleSubmit}
        >
            <TextBox
                className="flex flex-col w-full rounded-2xl border-4 min-h-14 h-fit justify-center outline-none outline-0"
                id="chat"
                onKeyDown={async (e) => {
                    if (e.key === "Enter" && e.shiftKey === false) {
                        e.preventDefault();
                        document.getElementById("submitButton")?.click();
                    }
                }}
            >
                <p
                    contentEditable={"plaintext-only"}
                    suppressContentEditableWarning
                    id="default-chat"
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
                    }}
                ></p>
            </TextBox>
            <SubmitButton id="submitButton" />
        </form>
    );
}
