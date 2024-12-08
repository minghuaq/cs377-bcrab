"use client";
import { SignOut } from "@/components/auth/signout-button";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { IconBrandHipchat } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
type sidebarListProps = {
    label: string;
    href: string;
    icon: React.JSX.Element | React.ReactNode;
};
export default function SidebarDemo({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const status = useFormStatus()
    const [links, setLinks] = useState<sidebarListProps[]>();
    const pathname = usePathname();
    useEffect(() => {
        async function fetchChat() {
            const chatListFetch = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/history/list`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const chatList = await chatListFetch.json();
            const newLinks = chatList.chatHistory.map(
                (chat: { id: string; userId: string; messages: Array<message> }) => ({
                    label: chat.messages[0].message,
                    href: `/chat/${chat.id}`,
                    icon: (
                        <IconBrandHipchat className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                    ),
                })
            );
            setLinks(newLinks);
        }
        fetchChat();
    }, [pathname]);
    const [open, setOpen] = useState(false);

    // Get user image
    const { data: session } = useSession()

    return (
        <div
            className={cn(
                "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-9xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
                "h-screen"
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    {open ? (
                        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                            <Logo />
                            <div className="mt-8 flex flex-col gap-2">
                                {links?.map((link, idx) => (
                                    <SidebarLink key={idx} link={link} />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col flex-1 overflow-y-hidden overflow-x-hidden">
                            <LogoIcon />
                            <div className="mt-8 flex flex-col gap-2">
                                {links?.map((link, idx) => (
                                    <SidebarLink key={idx} link={link} />
                                ))}
                            </div>
                        </div>
                    )}
                    {open ? (
                        <div>
                            <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
                                <img
                                    src={ (session?.user?.image) ?? ("/images/crabdude.png")}
                                    alt=""
                                    className="h-6 w-6 rounded-lg flex-shrink-0"
                                />
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="px-2 font-medium text-black dark:text-white whitespace-pre"
                                >
                                    <SignOut />
                                </motion.span>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
                                <img
                                    src={ (session?.user?.image) ?? ("/images/crabdude.png")}
                                    alt=""
                                    className="h-6 w-6 rounded-lg flex-shrink-0"
                                />
                            </div>
                        </div>
                    )}
                </SidebarBody>
            </Sidebar>
            <Dashboard>{children}</Dashboard>
        </div>
    );
}
export const Logo = () => {
    return (
        <Link
            href="/chat"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <img
                src="/images/crabdude.png"
                alt=""
                className="h-5 w-6 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0"
            />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre"
            >
                B-Crab
            </motion.span>
        </Link>
    );
};
export const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            {/* <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" /> */}
            <img
                src="/images/crabdude.png"
                alt=""
                className="h-5 w-6 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0"
            />
        </Link>
    );
};

// Dummy dashboard component with content
const Dashboard = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="flex flex-1">
            <div className="rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col flex-wrap content-center gap-2 flex-1 w-full h-full">
                {children}
            </div>
        </div>
    );
};
