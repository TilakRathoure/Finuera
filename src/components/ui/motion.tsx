"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type HTMLMotionProps,
} from "framer-motion";
import { type ReactNode, useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type MotionDivProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/** Clip-path wipe for section titles */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  ...props
}: MotionDivProps & { direction?: "up" | "left" }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const hiddenClip =
    direction === "left"
      ? "inset(0 100% 0 0)"
      : "inset(100% 0 0 0)";

  return (
    <motion.div
      className={className}
      initial={{ clipPath: hiddenClip, opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.75, ease, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Soft blur → sharp for brand / hero lines */
export function BlurIn({
  children,
  className,
  delay = 0,
  ...props
}: MotionDivProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: "blur(12px)", y: 8 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 0.85, ease, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Horizontal mask for supporting copy / CTAs */
export function MaskSlide({
  children,
  className,
  delay = 0,
  ...props
}: MotionDivProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease, delay }}
      {...props}
    >
      <motion.div
        initial={{ x: -16 }}
        whileInView={{ x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

const inkItem = {
  hidden: {
    opacity: 0,
    y: 18,
    clipPath: "inset(12% 0 0 0)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.55, ease },
  },
};

const inkContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

/** Stagger children with clip + slight y */
export function InkStagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={inkContainer}
    >
      {children}
    </motion.div>
  );
}

export function InkItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={inkItem}>
      {children}
    </motion.div>
  );
}

/** Slow parallax on atmosphere washes (hero) */
export function AtmosphereParallax({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div className="absolute inset-0 will-change-transform" style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

/* Back-compat aliases used across the app during migration */
export function FadeUp({
  children,
  className,
  delay = 0,
  ...props
}: MotionDivProps) {
  return (
    <Reveal className={className} delay={delay} {...props}>
      {children}
    </Reveal>
  );
}

export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <InkStagger className={className}>{children}</InkStagger>;
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <InkItem className={className}>{children}</InkItem>;
}

export function HeroMotion({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <BlurIn className={className} delay={delay}>
      {children}
    </BlurIn>
  );
}
