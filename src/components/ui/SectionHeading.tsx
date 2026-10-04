type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#e5484d]">
        {eyebrow}
      </p>
      <h2 className="text-balance text-3xl font-black tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base text-zinc-300 sm:text-lg">{description}</p>
    </div>
  );
}
