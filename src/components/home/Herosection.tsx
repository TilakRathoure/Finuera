"use client";

import { ArrowRight, Github } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  AtmosphereParallax,
  BlurIn,
  MaskSlide,
} from "../ui/motion";

const Herosection = () => {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden grain">
      <AtmosphereParallax className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 atmosphere-hero" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </AtmosphereParallax>

      <div className="section-container relative z-10 py-28 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <BlurIn>
            <span className="mb-6 inline-flex items-center rounded-full border border-border/70 bg-muted/80 px-3.5 py-1.5 text-xs tracking-wide text-muted-foreground backdrop-blur-sm md:text-sm">
              Built with Gemini • Powered by VedAI
            </span>
          </BlurIn>

          <BlurIn delay={0.12}>
            <h1 className="font-display mb-5 text-3xl font-semibold leading-[1.15] tracking-tight text-foreground md:text-5xl lg:text-[3.25rem]">
              Master Finance with AI-Powered Insights
            </h1>
          </BlurIn>

          <MaskSlide delay={0.26} className="mx-auto mb-10 max-w-2xl">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              Upload your financial data and get personalized insights powered
              by advanced AI. VedAI chatbot answers all your finance queries in
              real-time with intelligent analysis.
            </p>
          </MaskSlide>

          <MaskSlide delay={0.38}>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button asChild size="lg" className="group min-w-[10.5rem]">
                <Link href="/upload">
                  Try It Now
                  <ArrowRight className="ml-1 size-5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group min-w-[10.5rem]"
              >
                <a
                  href="https://github.com/TilakRathoure/Finuera"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-1 size-5 transition-transform group-hover:-translate-y-0.5" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </MaskSlide>
        </div>
      </div>
    </section>
  );
};

export default Herosection;
