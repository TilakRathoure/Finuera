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
        <div className="absolute inset-0 atmosphere" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </AtmosphereParallax>

      <div className="section-container relative z-10 py-28 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <BlurIn>
            <p className="font-display mb-5 text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
              Finu<span className="text-brand">era</span>
            </p>
          </BlurIn>

          <BlurIn delay={0.14}>
            <h1 className="font-display mb-5 text-3xl font-medium leading-[1.15] tracking-tight text-foreground md:text-5xl lg:text-[3.25rem]">
              Clarity for every rupee you track
            </h1>
          </BlurIn>

          <MaskSlide delay={0.28} className="mx-auto mb-10 max-w-lg">
            <p className="text-base text-muted-foreground md:text-lg">
              Upload statements. Read the patterns. Ask VedAI when you need a
              second opinion.
            </p>
          </MaskSlide>

          <MaskSlide delay={0.4}>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button asChild size="lg" className="group min-w-[10.5rem]">
                <Link href="/upload">
                  Try it now
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
