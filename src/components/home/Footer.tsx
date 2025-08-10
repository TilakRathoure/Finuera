import { FooterLink } from "@/lib/types";
import React from "react";

const footerLinks: FooterLink[] = [
  { label: "Features", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Privacy", href: "#" },
];

const Footer = () => {
  return (
    <footer className="border-t py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">
            Finuera<span className="text-primary">AI</span>
          </div>
          <div className="flex justify-center space-x-6 mb-6">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-muted-foreground">
            © 2025 FinueraAI. Powered by VedAI & Advanced Machine Learning.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
