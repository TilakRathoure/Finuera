"use client";

import CardComponent from "@/components/ui/CardComponent";
import { Plans } from "@/lib/types";

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
      buttonText: "Get Started",
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
      buttonText: "Contact Sales",
      buttonVariant: "secondary",
    },
  ];

  return (
    <div className="pt-[110px] md:pt-[155px] bg-background text-foreground flex flex-col items-center py-16">
      <h1 className="text-4xl font-bold mb-12">Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {plans.map(
          (
            {
              highlight,
              name,
              period,
              price,
              features,
              buttonText,
              buttonVariant,
            }: Plans,
            index
          ) => (
            <CardComponent
              key={index}
              highlight={highlight}
              name={name}
              period={period}
              price={price}
              features={features}
              buttonText={buttonText}
              buttonVariant={buttonVariant}
            />
          )
        )}
      </div>
    </div>
  );
}
