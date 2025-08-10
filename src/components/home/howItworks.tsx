import { Step } from "@/lib/types";
import { FileText, Brain, TrendingUp } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../ui/card";
const steps: Step[] = [
  {
    number: 1,
    icon: FileText,
    title: "Upload Your Data",
    description:
      "Upload CSV files, PDFs, or take photos of your financial documents. Our AI handles all formats automatically.",
    bgGradient: "bg-gradient-to-br from-primary/5 to-primary/10",
    iconBg: "bg-primary/10 border-primary/20",
    iconColor: "text-primary",
  },
  {
    number: 2,
    icon: Brain,
    title: "AI Analysis",
    description:
      "VedAI processes your data using advanced machine learning to identify patterns and generate insights.",
    bgGradient: "bg-gradient-to-br from-purple-500/5 to-purple-500/10",
    iconBg: "bg-purple-500/10 border-purple-500/20",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    number: 3,
    icon: TrendingUp,
    title: "Get Insights",
    description:
      "View interactive charts and get personalized financial advice through our intelligent dashboard.",
    bgGradient: "bg-gradient-to-br from-emerald-500/5 to-emerald-500/10",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
];

interface StepCardComponentProps {
  step: Step;
}

const StepCardComponent = ({ step }: StepCardComponentProps) => {
  const Icon = step.icon;

  return (
    <Card
      className={`text-center group hover:shadow-lg transition-all duration-300 hover:scale-105 ${step.bgGradient}`}
    >
      <CardContent className="pt-6">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border ${step.iconBg}`}
        >
          <Icon className={`w-8 h-8 ${step.iconColor}`} />
        </div>
        <h3 className="text-2xl font-bold mb-4">
          {step.number}. {step.title}
        </h3>
        <p className="text-muted-foreground">{step.description}</p>
      </CardContent>
    </Card>
  );
};

const Howitworks = () => {
  return (
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Get financial insights in three simple steps with the power of AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <StepCardComponent key={step.number} step={step} />
            ))}
          </div>
        </div>
      </section>
  );
};

export default Howitworks;
