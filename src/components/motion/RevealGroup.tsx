"use client";

import { Children, type CSSProperties, type ElementType, type ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delayStep?: number;
};

export function RevealGroup({ children, className = "", as = "div", delayStep = 70 }: RevealGroupProps) {
  const items = Children.toArray(children);

  return (
    <Reveal as={as} className={`reveal-group ${className}`}>
      {items.map((child, index) => {
        const style = { "--reveal-delay": `${Math.min(index * delayStep, 400)}ms` } as CSSProperties;
        return <div key={index} className="reveal-item" style={style}>{child}</div>;
      })}
    </Reveal>
  );
}
