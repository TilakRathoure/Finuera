import { ArrowRight, Github } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const Herosection = () => {
  return (
    <section className="h-screen flex justify-center items-center  overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 dark:to-transparent pt-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="text-center">
          <Badge
            variant="secondary"
            className="mt-7 md:mt-2 mb-8 bg-primary/10 text-primary border-primary/20"
          >
            Built with Gemini • Powered by VedAI
          </Badge>

          <h1 className=" text-[42px] leading-tight md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
            Master Finance with <br />
            <span>AI-Powered</span> Insights
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Upload your financial data and get personalized insights powered by
            advanced AI. VedAI chatbot answers all your finance queries in
            real-time with intelligent analysis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/upload">
              <Button size="lg" className="group">
                Try It Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1" />
              </Button>
            </Link>
            <a href="https://github.com/TilakRathoure/Finuera" target="_blank">
              <Button variant="outline" size="lg" className="group">
                <Github className="w-5 h-5 mr-2 group-hover:-translate-y-1" />
                View on GitHub
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Herosection;
