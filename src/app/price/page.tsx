"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Plans{
    name:string,
    price:string,
    period:string,
    features:string[],
    buttonText:string,
    buttonVariant:"default" | "secondary",
    highlight?:boolean,
}

export default function PricingPage() {
  const plans :Plans[] = [
    {
      name: "Basic",
      price: "$0",
      period: "/month",
      features: [
        "Upload CSV/PDF/Image for finance tracking",
        "Basic financial summaries",
        "Limited VedAI queries"
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
        "Export financial reports"
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
        "Advanced team collaboration"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "secondary",
    },
  ];

  return (
    <div className="pt-[110px] md:pt-[155px] bg-background text-foreground flex flex-col items-center py-16">
      <h1 className="text-4xl font-bold mb-12">Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`flex flex-col justify-between ${
              plan.highlight ? "border-primary shadow-lg" : ""
            }`}
          >
            <CardHeader>
              <CardTitle className="text-center">{plan.name}</CardTitle>
              <p className="text-center text-3xl font-bold">
                {plan.price}
                <span className="text-lg font-normal">{plan.period}</span>
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-green-500">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="justify-center">
              <Button
                variant={plan.buttonVariant}
                className={plan.highlight ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
