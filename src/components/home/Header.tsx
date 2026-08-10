"use client";

import React, { useContext, useEffect, useState } from "react";
import { Menu, Moon, Sun, User, X } from "lucide-react";
import { DarkModeContext } from "@/providers/dark-mode";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Side {
  title: string;
  link: string;
}

const sidebar: Side[] = [
  { title: "Features", link: "/#features" },
  { title: "Technology", link: "/#technology" },
  { title: "Pricing", link: "/price" },
  { title: "Log In", link: "/login" },
];

const Header = () => {
  const [side, setSide] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { dark, setdark } = useContext(DarkModeContext);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setSide(false);
  }, [pathname]);

  useEffect(() => {
    if (side) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [side]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background,border-color] duration-300",
        scrolled
          ? "border-b border-border/50 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-background/30 backdrop-blur-md"
      )}
    >
      <div className="section-container flex h-16 items-center justify-between md:h-[4.25rem]">
        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-tight transition-opacity hover:opacity-80"
        >
          Finu<span className="text-brand">era</span>
        </Link>

        <nav className="flex items-center gap-0.5 sm:gap-1">
          <ul className="hidden items-center gap-0.5 sm:flex">
            {sidebar.map((item) => {
              const active =
                pathname === item.link ||
                (item.link.startsWith("/#") && pathname === "/");
              return (
                <li key={item.link}>
                  <Link
                    href={item.link}
                    className={cn(
                      "px-3 py-2 text-sm tracking-wide transition-colors",
                      active
                        ? "text-brand"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/login"
            className="hidden p-2 text-muted-foreground transition-colors hover:text-brand sm:inline-flex"
            aria-label="Account"
          >
            <User className="size-5" />
          </Link>

          <button
            type="button"
            className="p-2 text-muted-foreground transition-colors hover:text-brand"
            onClick={() => setdark((prev) => !prev)}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>

          <button
            type="button"
            className="p-2 text-muted-foreground transition-colors hover:text-brand sm:hidden"
            onClick={() => setSide(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {side && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm sm:hidden"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSide(false)}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-50 flex w-[min(80vw,20rem)] flex-col border-l border-border bg-background p-6 sm:hidden"
              initial={reduce ? false : { clipPath: "inset(0 0 0 100%)" }}
              animate={{ clipPath: "inset(0 0 0 0%)" }}
              exit={{ clipPath: "inset(0 0 0 100%)" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="font-display text-lg font-semibold">
                  Finu<span className="text-brand">era</span>
                </span>
                <button
                  type="button"
                  className="p-2 text-muted-foreground hover:text-foreground"
                  onClick={() => setSide(false)}
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </button>
              </div>
              <ul className="flex flex-col gap-1">
                {sidebar.map((item) => (
                  <li key={item.link}>
                    <Link
                      href={item.link}
                      onClick={() => setSide(false)}
                      className="block border-b border-border/60 py-3.5 text-base tracking-wide text-foreground transition-colors hover:text-brand"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
