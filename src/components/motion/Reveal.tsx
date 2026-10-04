"use client";

import { createElement, useEffect, useId, type CSSProperties, type ElementType, type ReactNode } from "react";
import { observeReveal } from "@/components/motion/reveal-observer";

export type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function Reveal({ as = "div", children, className = "", delay = 0, y = 20 }: RevealProps) {
  const elementId = useId();

  useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element) return undefined;
    element.dataset.revealState = "waiting";
    return observeReveal(element);
  }, [elementId]);

  const style = {
    "--reveal-delay": `${Math.max(0, Math.min(delay, 400))}ms`,
    "--reveal-y": `${Math.max(0, Math.min(y, 24))}px`,
  } as CSSProperties;
  return createElement(as, {
    id: elementId,
    className: `reveal ${className}`.trim(),
    style,
    "data-reveal": "true",
  }, children);
}
