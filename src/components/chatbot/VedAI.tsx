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
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, Send } from "lucide-react";
import React, { useContext, useState } from "react";
import ReactMarkdown from "react-markdown";
import { RiChat1Fill } from "react-icons/ri";
import { DarkModeContext } from "@/lib/darkmode";

const Home = () => {
  const {chat, setChat} = useContext(DarkModeContext);

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
      parts: [{ text: "Hey, I'm VedAI. How can i help you?", type: "text" }],
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

  return (
    <div className="fixed flex  bottom-10 z-20 text-4xl right-10">
      <div className="cursor-pointer bg-black dark:bg-white border-primary rounded-full p-3"
        onClick={() => {
          setChat((prev) => !prev);
        }}
      >
        <RiChat1Fill className="text-white dark:text-black" />
      </div>
      <div className={`fixed z-20 bottom-25 right-5`}>
        <AnimatePresence>
          {chat && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className=""
            >
              <Card className="w-[60vw] max-w-[500px]">
                <CardHeader className="flex justify-between">
                  <CardTitle className="text-lg font-bold">VEDAI.</CardTitle>
                  <Button
                    onClick={() => setChat(false)}
                    className="h-auto px-3 py-1 text-sm"
                  >
                    X
                  </Button>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-2">
                    <div className="flex flex-col gap-5">
                      {firstmessage.map((e) => (
                        <div
                          key={e.id}
                          className={`px-4 p-2 rounded-2xl text-base text-white ${
                            e.role !== "user"
                              ? "self-start bg-gray-500 "
                              : "self-end bg-black"
                          }`}
                        >
                          {e.parts.map((part, i) =>
                            part.type === "text" ? (
                              <ReactMarkdown key={i}>{part.text}</ReactMarkdown>
                            ) : null
                          )}
                        </div>
                      ))}
                    </div>
                    {error && (
                      <div className="text-red-500">
                        <pre>{error.message}</pre>
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <form onSubmit={handleSubmit} className="flex w-full gap-2">
                    <Input
                      value={input}
                      onChange={(e) => {
                        handleInputChange(e.target.value);
                      }}
                      className="flex-1 text-sm"
                      placeholder="Type your message here..."
                    />
                    <Button
                      type="submit"
                      className="size-9"
                      onClick={() => {
                        if (status === "submitted" || status === "streaming")
                          stop();
                      }}
                      size="icon"
                    >
                      {status === "error" || status === "ready" ? (
                        <Send />
                      ) : (
                        <LoaderCircle className="animate-spin" />
                      )}
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
