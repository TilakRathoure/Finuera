import React from "react";
import { Badge } from "../ui/badge";
import { FeatureCard } from "@/lib/types";
import { Brain, MessageSquare, BarChart3, Target, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const featureCards: FeatureCard[] = [
  {
    id: 'ai-analysis',
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Upload CSV, PDF, or photos of your financial data. Our AI extracts and analyzes patterns to provide actionable insights.',
    actionText: 'Advanced machine learning algorithms',
    iconBg: 'bg-primary/10 border-primary/20',
    iconColor: 'text-primary',
  },
  {
    id: 'vedai-chat',
    icon: MessageSquare,
    title: 'VedAI Chat Assistant',
    description: 'Ask any finance question and get intelligent responses. VedAI understands context and provides personalized financial advice.',
    actionText: 'Powered by Gemini 2.5 Flash',
    iconBg: 'bg-emerald-500/10 border-emerald-500/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'interactive-charts',
    icon: BarChart3,
    title: 'Interactive Charts',
    description: 'Visualize your spending patterns with beautiful, interactive charts built with Shadcn components and modern design principles.',
    actionText: 'Real-time data visualization',
    iconBg: 'bg-purple-500/10 border-purple-500/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    id: 'personalized-insights',
    icon: Target,
    title: 'Personalized Insights',
    description: 'Get tailored financial advice based on your spending habits, income patterns, and financial goals powered by advanced AI.',
    actionText: 'Custom financial recommendations',
    iconBg: 'bg-orange-500/10 border-orange-500/20',
    iconColor: 'text-orange-600 dark:text-orange-400',
  }
];

interface FeatureCardComponentProps {
  feature: FeatureCard;
}

const FeatureCardComponent = ({ feature }:FeatureCardComponentProps) => {
  const Icon = feature.icon;
  
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 group bg-gradient-to-br from-background to-muted/20">
      <CardHeader>
        <div className="flex items-center mb-4">
          <div className={`p-3 rounded-xl border ${feature.iconBg}`}>
            <Icon className={`w-8 h-8 ${feature.iconColor}`} />
          </div>
          <CardTitle className="ml-4">{feature.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          {feature.description}
        </p>
        <div className={` group-hover:opacity-80 transition-opacity flex items-center`}>
          {feature.actionText} <ArrowRight className="ml-2 w-4 h-4" />
        </div>
      </CardContent>
    </Card>
  );
};

const Features = () => {
  return (
    <div>
      {" "}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-6 bg-primary/10 border-primary/20"
            >
              Core Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How Finu<span className="text-blue-500">era</span> Transforms
              Your Financial Journey
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Our AI-powered platform adapts to your financial habits and goals,
              delivering personalized insights that stick.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {featureCards.map((feature) => (
              <FeatureCardComponent key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
