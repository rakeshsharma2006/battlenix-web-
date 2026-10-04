import { Reveal } from "@/components/motion/Reveal";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  className?: string;
};

export function PageHeader({ eyebrow, title, description, className = "" }: PageHeaderProps) {
  return (
    <Reveal as="header" className={`max-w-3xl ${className}`}>
      {eyebrow ? (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-[#e5484d]">{eyebrow}</p>
      ) : null}
      <h1 className="text-balance font-display text-4xl font-bold leading-tight text-white sm:text-5xl">{title}</h1>
      <p className="mt-4 text-base leading-7 text-[#a1a1aa] sm:text-lg">{description}</p>
    </Reveal>
  );
}
