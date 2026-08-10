import { FooterLink } from "@/types/home";
import Link from "next/link";
import React from "react";

const footerLinks: FooterLink[] = [
  { label: "Features", href: "/#features" },
  { label: "GitHub", href: "https://github.com/TilakRathoure/Finuera" },
  { label: "Privacy", href: "#" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-14 md:py-16">
      <div className="section-container">
        <div className="flex flex-col items-center gap-7 text-center">
          <Link
            href="/"
            className="font-display text-2xl font-semibold tracking-tight"
          >
            Finu<span className="text-brand">era</span>
          </Link>
          <nav className="flex flex-wrap justify-center gap-x-10 gap-y-2">
            {footerLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-xs tracking-wide text-muted-foreground">
            © {new Date().getFullYear()} Finuera · Crafted with VedAI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
