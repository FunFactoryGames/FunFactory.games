import { type ElementType, type ReactNode } from "react";
import { useInView } from "../hooks/useInView";
import { cn } from "../utils/cn";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  className?: string;
}

export function Reveal({ children, as: Tag = "div", delay = 0, direction = "up", className }: RevealProps) {
  const { ref, inView } = useInView();

  const directionClass =
    direction === "left" ? "reveal-left" : direction === "right" ? "reveal-right" : direction === "scale" ? "reveal-scale" : "";

  return (
    <Tag
      ref={ref}
      className={cn("reveal", directionClass, inView && "reveal-visible", className)}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}
