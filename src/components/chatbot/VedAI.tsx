"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, UIMessage } from "ai";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LoaderCircle, Send, X } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { RiChat1Fill } from "react-icons/ri";
import { DarkModeContext } from "@/providers/dark-mode";
import { cn } from "@/lib/utils";

const VedAI = () => {
  const { chat, setChat } = useContext(DarkModeContext);
  const reduce = useReducedMotion();
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, status, stop, error, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chatbot",
    }),
  });

  const [input, handleInputChange] = useState<string>("");

  const firstmessage: UIMessage[] = [
    {
      id: "453363",
      role: "assistant",
      parts: [{ text: "Hey, I'm VedAI. How can I help you?", type: "text" }],
    },
    ...messages,
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      handleInputChange("");
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [firstmessage.length, status]);

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
      <AnimatePresence>
        {chat && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="origin-bottom-right"
          >
            <Card className="w-[min(92vw,26rem)] gap-0 overflow-hidden rounded-xl border border-border bg-card py-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-border px-4 py-3">
                <div>
                  <CardTitle className="text-base font-semibold tracking-tight">
                    Ved<span className="text-brand">AI</span>
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Finance questions, answered
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 shrink-0"
                  onClick={() => setChat(false)}
                  aria-label="Close chat"
                >
                  <X className="size-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[min(50vh,22rem)]">
                  <div ref={scrollRef} className="flex flex-col gap-3 p-3">
                    {firstmessage.map((e) => (
                      <div
                        key={e.id}
                        className={cn(
                          "max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed",
                          e.role !== "user"
                            ? "self-start border border-border bg-muted text-foreground"
                            : "self-end bg-brand text-white"
                        )}
                      >
                        {e.parts.map((part, i) =>
                          part.type === "text" ? (
                            <div
                              key={i}
                              className="[&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-4 [&_a]:underline [&_code]:rounded [&_code]:bg-black/10 [&_code]:px-1 dark:[&_code]:bg-white/10"
                            >
                              <ReactMarkdown>{part.text}</ReactMarkdown>
                            </div>
                          ) : null
                        )}
                      </div>
                    ))}
                    <div ref={bottomRef} />
                  </div>
                  {error && (
                    <div className="px-3 pb-3 text-sm text-destructive">
                      <pre className="whitespace-pre-wrap">{error.message}</pre>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
              <CardFooter className="border-t border-border p-3">
                <form onSubmit={handleSubmit} className="flex w-full gap-2">
                  <Input
                    value={input}
                    onChange={(e) => {
                      handleInputChange(e.target.value);
                    }}
                    className="flex-1 border-border text-sm"
                    placeholder="Ask about your finances..."
                  />
                  <Button
                    type="submit"
                    className="size-9 shrink-0"
                    onClick={() => {
                      if (status === "submitted" || status === "streaming")
                        stop();
                    }}
                    size="icon"
                    aria-label="Send message"
                  >
                    {status === "error" || status === "ready" ? (
                      <Send className="size-4" />
                    ) : (
                      <LoaderCircle className="size-4 animate-spin" />
                    )}
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        whileHover={reduce ? undefined : { scale: 1.04 }}
        whileTap={reduce ? undefined : { scale: 0.96 }}
        className={cn(
          "flex size-12 cursor-pointer items-center justify-center rounded-xl border border-brand/40 bg-brand text-white transition-colors hover:bg-brand/90",
          chat && "ring-2 ring-brand/40 ring-offset-2 ring-offset-background"
        )}
        onClick={() => {
          setChat((prev) => !prev);
        }}
        aria-label={chat ? "Close VedAI" : "Open VedAI"}
      >
        {chat ? (
          <X className="size-5" />
        ) : (
          <RiChat1Fill className="size-5" />
        )}
      </motion.button>
    </div>
  );
};

export default VedAI;
