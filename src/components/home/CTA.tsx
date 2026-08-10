"use client";

import React, { useContext } from "react";
import { Button } from "../ui/button";
import { ArrowRight, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { DarkModeContext } from "@/providers/dark-mode";
import { MaskSlide, Reveal } from "../ui/motion";

const CTA = () => {
  const router = useRouter();
  const { setChat } = useContext(DarkModeContext);

  return (
    <section className="section-pad atmosphere relative overflow-hidden">
      <div className="section-container relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display mb-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Ready for a clearer{" "}
            <span className="italic text-brand">money picture</span>?
          </h2>
          <p className="mb-8 text-muted-foreground md:text-lg">
            Start free. Upload a file. Let Finuera and VedAI do the reading.
          </p>
        </Reveal>

        <MaskSlide delay={0.12}>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button
              size="lg"
              className="group min-w-[12rem]"
              onClick={() => router.push("/login")}
            >
              Start free
              <ArrowRight className="ml-1 size-5 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="min-w-[12rem]"
              onClick={() => setChat(true)}
            >
              <MessageSquare className="mr-1 size-5" />
              Talk to VedAI
            </Button>
          </div>
        </MaskSlide>
      </div>
    </section>
  );
};

export default CTA;
