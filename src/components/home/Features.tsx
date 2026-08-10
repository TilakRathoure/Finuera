"use client";

import React from "react";
import { FeatureCard } from "@/types/home";
import { Brain, MessageSquare, BarChart3, Target } from "lucide-react";
import { InkItem, InkStagger, Reveal } from "../ui/motion";

const featureCards: FeatureCard[] = [
  {
    id: "ai-analysis",
    icon: Brain,
    title: "Document intelligence",
    description:
      "Drop in CSV, PDF, or a photo of a statement. Finuera extracts the numbers and surfaces what matters.",
    actionText: "Multi-format intake",
    iconBg: "bg-brand/10 border-brand/20",
    iconColor: "text-brand",
  },
  {
    id: "vedai-chat",
    icon: MessageSquare,
    title: "VedAI on call",
    description:
      "Ask plain-language questions about spending, savings, or a confusing line item and get grounded answers.",
    actionText: "Gemini-powered guidance",
    iconBg: "bg-brand/10 border-brand/20",
    iconColor: "text-brand",
  },
  {
    id: "interactive-charts",
    icon: BarChart3,
    title: "Living charts",
    description:
      "See categories, months, and trends without digging through spreadsheets.",
    actionText: "Built for scanning",
    iconBg: "bg-brand/10 border-brand/20",
    iconColor: "text-brand",
  },
  {
    id: "personalized-insights",
    icon: Target,
    title: "Focused insights",
    description:
      "Recommendations tied to your habits, not a generic finance quiz.",
    actionText: "Personal, not generic",
    iconBg: "bg-brand/10 border-brand/20",
    iconColor: "text-brand",
  },
];

const Features = () => {
  return (
    <section id="features" className="section-pad">
      <div className="section-container">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-brand">
            Capabilities
          </p>
          <h2 className="font-display mb-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            What Finu<span className="text-brand">era</span> does with your data
          </h2>
          <p className="text-muted-foreground md:text-lg">
            Four focused tools. One calm workflow from upload to insight.
          </p>
        </Reveal>

        <InkStagger className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {featureCards.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <InkItem key={feature.id}>
                <article className="group flex h-full flex-col border-t border-border pt-7 transition-colors hover:border-brand/50">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="font-display text-sm text-muted-foreground">
                      0{index + 1}
                    </span>
                    <Icon className={`size-5 ${feature.iconColor}`} />
                  </div>
                  <h3 className="font-display mb-2 text-xl font-semibold tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                  <p className="text-xs tracking-wide text-brand/80">
                    {feature.actionText}
                  </p>
                </article>
              </InkItem>
            );
          })}
        </InkStagger>
      </div>
    </section>
  );
};

export default Features;
