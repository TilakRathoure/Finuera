"use client";

import CardComponent from "@/components/ui/CardComponent";
import { Plans } from "@/types/plans";
import { InkItem, InkStagger, Reveal } from "@/components/ui/motion";

export default function PricingPage() {
  const plans: Plans[] = [
    {
      name: "Basic",
      price: "$0",
      period: "/month",
      features: [
        "Upload CSV/PDF/Image for finance tracking",
        "Only up to 250 financial data entries per file",
        "Limited VedAI queries",
      ],
      buttonText: "Get started",
      buttonVariant: "default",
    },
    {
      name: "Pro",
      price: "$9",
      period: "/month",
      features: [
        "Advanced finance insights",
        "Unlimited VedAI queries",
        "Custom chart analytics",
        "Export financial reports",
      ],
      buttonText: "Upgrade to Pro",
      buttonVariant: "default",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: [
        "Dedicated account manager",
        "Priority support 24/7",
        "Custom AI model integration",
        "Advanced team collaboration",
      ],
      buttonText: "Contact sales",
      buttonVariant: "secondary",
    },
  ];

  return (
    <div className="page-shell atmosphere-muted flex min-h-[100svh] flex-col pt-20 md:pt-[4.75rem]">
      <div className="section-container flex min-h-0 flex-1 flex-col items-center justify-center py-8">
        <Reveal className="mb-8 max-w-xl shrink-0 text-center md:mb-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-brand">
            Plans
          </p>
          <h1 className="font-display mb-3 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Simple pricing
          </h1>
          <p className="text-muted-foreground md:text-lg">
            Pick the tier that matches how deeply you want to read your money.
          </p>
        </Reveal>

        <InkStagger className="grid w-full max-w-6xl grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {plans.map((plan, index) => (
            <InkItem key={index}>
              <CardComponent
                highlight={plan.highlight}
                name={plan.name}
                period={plan.period}
                price={plan.price}
                features={plan.features}
                buttonText={plan.buttonText}
                buttonVariant={plan.buttonVariant}
              />
            </InkItem>
          ))}
        </InkStagger>
      </div>
    </div>
  );
}
