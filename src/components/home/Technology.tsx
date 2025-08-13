import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { TechSection } from "@/lib/types";
import { Camera, FileText, Shield, TrendingUp, Zap } from "lucide-react";

const techSections: TechSection[] = [
  {
    title: "VedAI Integration",
    description:
      "Advanced natural language processing for personalized financial",
    features: [
      { icon: Zap, text: "Multi-format data processing" },
      { icon: Zap, text: "Context-aware responses" },
      { icon: Zap, text: "Real-time financial insights" },
      { icon: Zap, text: "Personalized recommendations" },
    ],
  },

  {
    title: "Modern Tech Stack",
    description:
      "Built with Next.js, Tailwind CSS, and Shadcn for optimal performance and user experience",
    features: [
      { icon: Zap, text: "Lightning-fast performance" },
      { icon: Shield, text: "Secure authentication with AuthJS" },
      { icon: FileText, text: "Multi-format file processing" },
    ],
  },
  {
    title: "Smart Data Processing",
    description:
      "Advanced AI algorithms extract insights from your financial data automatically",
    features: [
      { icon: Camera, text: "Photo recognition & OCR" },
      { icon: FileText, text: "CSV & PDF parsing" },
      { icon: TrendingUp, text: "Pattern recognition" },
    ],
  },
];

interface TechSectionComponentProps {
  section: TechSection;
}

const TechSectionComponent = ({ section }: TechSectionComponentProps) => (
  <Card className="bg-gradient-to-br from-background to-muted/20 w-full">
    <CardHeader>
      <CardTitle>{section.title}</CardTitle>
      <p className="text-muted-foreground">{section.description}</p>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {section.features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="flex items-center ">
              <Icon className="w-5 h-5 mr-3" />
              {feature.text}
            </div>
          );
        })}
      </div>
    </CardContent>
  </Card>
);

const Technology = () => {
  return (
    <div id="technology">
      {" "}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-6 bg-primary/10 text-primary border-primary/20"
            >
              Powered By
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Cutting-Edge <span className="text-primary">Technology</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              We combine the latest AI models with modern web technologies to
              deliver an unmatched financial analysis experience.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {techSections.map((section, index) => (
              <TechSectionComponent key={index} section={section} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Technology;
