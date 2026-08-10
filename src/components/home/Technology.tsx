"use client";

import React from "react";
import { TechSection } from "@/types/home";
import { Camera, FileText, Shield, TrendingUp, Zap } from "lucide-react";
import { InkItem, InkStagger, Reveal } from "../ui/motion";

const techSections: TechSection[] = [
  {
    title: "VedAI layer",
    description:
      "Natural language over your numbers — context-aware, concise, finance-first.",
    features: [
      { icon: Zap, text: "Multi-format understanding" },
      { icon: Zap, text: "Context-aware replies" },
      { icon: Zap, text: "Live insight drafting" },
      { icon: Zap, text: "Personal recommendations" },
    ],
  },
  {
    title: "Modern stack",
    description:
      "Next.js and a careful UI layer so analysis stays fast and readable.",
    features: [
      { icon: Zap, text: "Responsive performance" },
      { icon: Shield, text: "AuthJS-secured sessions" },
      { icon: FileText, text: "CSV, PDF, and image intake" },
    ],
  },
  {
    title: "Data craft",
    description:
      "Extraction and pattern finding happen automatically after you upload.",
    features: [
      { icon: Camera, text: "Photo OCR for statements" },
      { icon: FileText, text: "Structured file parsing" },
      { icon: TrendingUp, text: "Spending pattern detection" },
    ],
  },
];

const Technology = () => {
  return (
    <section
      id="technology"
      className="section-pad atmosphere-muted bg-muted/30"
    >
      <div className="section-container">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-brand">
            Under the hood
          </p>
          <h2 className="font-display mb-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Quiet technology, clear results
          </h2>
          <p className="text-muted-foreground md:text-lg">
            Serious models and a lean web stack — without the noise.
          </p>
        </Reveal>

        <InkStagger className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          {techSections.map((section) => (
            <InkItem key={section.title}>
              <div className="h-full border-l border-border pl-5 md:pl-6">
                <h3 className="font-display mb-2 text-xl font-semibold tracking-tight">
                  {section.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  {section.description}
                </p>
                <ul className="space-y-3">
                  {section.features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <li
                        key={index}
                        className="flex items-center gap-3 text-sm text-foreground/90"
                      >
                        <Icon className="size-4 shrink-0 text-brand" />
                        {feature.text}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </InkItem>
          ))}
        </InkStagger>
      </div>
    </section>
  );
};

export default Technology;
