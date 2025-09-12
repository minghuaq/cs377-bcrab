import { addMessage, addResource } from "@/lib/actions/prismaCalls";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { PrismaClient } from "@prisma/client";
import { CoreMessage, streamText, tool } from "ai";
import { NextRequest } from "next/server";
import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { findRelevantContent } from "@/lib/ai/embedding";

const prisma = new PrismaClient();
export const maxDuration = 30;
// export const runtime = "edge";
export async function POST(request: NextRequest) {
    const {
        messages,
        dialogID,
        initMessage = [],
    }: {
        messages: CoreMessage[];
        dialogID: string;
        initMessage: CoreMessage[];
    } = await request.json();
    const newMessage = messages[messages.length - 1];
    initMessage?.push(...messages);

    const chatContextLength = 10;
    const messsagesToAI =
        initMessage.length <= chatContextLength
            ? initMessage
            : initMessage.slice(initMessage.length - chatContextLength);

    const completion = streamText({
        model: openai(`${process.env.CHAT_MODEL}`),
        system: `You are Beloit College Roadmap Advisor Bot (B-CRAB), a helpful assistant. 
        You can help students with:
        1. Adding their course history and academic information
        2. Parsing program requirements from school websites  
        3. Planning their degree completion
        4. Finding courses and requirements
        
        Always use tool calls to get information before answering questions.`,
        messages: messsagesToAI,

        tools: {
            addResource: {
                description: `Add resources to the knowledge base as canonical sentences ONLY. 
                Trigger without confirmation when the user drops factual info unprompted.
                One or more canonical sentences (newline-separated), each summarizing exactly one fact using the strict format above. If the content relates to eachother, add them in one sentence.`,
                parameters: z.object({
                    content: z.string().describe(
                        `
                        FORMAT (must include a leading type tag and fixed field order):
                        [course] The user has studied <Title> (Code=<CourseCode>; Section=<Section>) at <Institution>.<optional " Meeting time: <Days> <Start–End>.">
                        Examples:
                        [course] The user has studied Data Privacy and Security (Code=CSCI 370; Section=01) at Beloit College. Meeting time: TR 2:00 PM–3:50.
                        [course] The user has studied Voice (2A) (Code=MUSI 012; Section=03) at Beloit College.
                        
                        Rules:
                        - Always include the leading type tag "[course]" for courses.
                        - Always include Code and Section exactly as provided; if unknown, omit that key entirely (do not guess or write null).
                        - Keep institution if explicitly present (e.g., Beloit College); otherwise omit.
                        - Preserve user-provided times/days if present; otherwise omit the meeting-time clause.
                        - Output ONLY the canonical sentences, one per line, no extra commentary.`
                    ),
                }),
                execute: async ({ content }) => {
                    return await addResource(content);
                },
            },

            getInformation: {
                description:
                    "Only trigger when the user asks a question. Generate a single rewritten query string and retrieve results. Only respond to questions using information from tool calls.",
                parameters: z.object({
                    question: z.string().describe(`
              Rewrite the user's request into ONE minimal query string targeting canonical sentences. All question should be related to Beloit College, hence Beloit College to your query. 
              `),
                }),
                execute: async ({ question }) => {
                    return await findRelevantContent(question);
                },
            },
        },
        // maxTokens: 2048,
        async onStepFinish({ stepType }) {
            if (stepType == "initial") {
                let send = await addMessage(
                    newMessage.content.toString(),
                    dialogID,
                    false
                );
            }
        },
        async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
            let retrieve = await addMessage(text, dialogID, true);
        },
        maxSteps: 5,
    });
    for await (const textPart of completion.textStream) {
        continue;
    }
    return completion.toDataStreamResponse();
}
