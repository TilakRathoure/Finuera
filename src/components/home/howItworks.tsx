"use client";

import { Step } from "@/types/home";
import { FileText, Brain, TrendingUp } from "lucide-react";
import React from "react";
import { InkItem, InkStagger, Reveal } from "../ui/motion";

const steps: Step[] = [
  {
    number: 1,
    icon: FileText,
    title: "Upload",
    description:
      "CSV, PDF, or a photo of a statement. One drop is enough to begin.",
    bgGradient: "",
    iconBg: "bg-brand/10 border-brand/20",
    iconColor: "text-brand",
  },
  {
    number: 2,
    icon: Brain,
    title: "Analyze",
    description:
      "VedAI reads categories, timing, and outliers so you skip the spreadsheet grind.",
    bgGradient: "",
    iconBg: "bg-brand/10 border-brand/20",
    iconColor: "text-brand",
  },
  {
    number: 3,
    icon: TrendingUp,
    title: "Decide",
    description:
      "Open the dashboard, scan the charts, and ask follow-ups when something looks off.",
    bgGradient: "",
    iconBg: "bg-brand/10 border-brand/20",
    iconColor: "text-brand",
  },
];

const Howitworks = () => {
  return (
    <section id="how-it-works" className="section-pad">
      <div className="section-container">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
          <h2 className="font-display mb-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Three steps. Then clarity.
          </h2>
          <p className="text-muted-foreground md:text-lg">
            From raw file to a readable picture of your money.
          </p>
        </Reveal>

        <InkStagger className="relative grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-10">
          <div className="pointer-events-none absolute top-6 right-[16%] left-[16%] hidden h-px bg-border md:block" />
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <InkItem key={step.number} className="relative text-center">
                <p className="font-display mb-4 text-4xl font-semibold text-brand/30">
                  0{step.number}
                </p>
                <Icon className={`mx-auto mb-4 size-6 ${step.iconColor}`} />
                <h3 className="font-display mb-3 text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </InkItem>
            );
          })}
        </InkStagger>
      </div>
    </section>
  );
};

export default Howitworks;
