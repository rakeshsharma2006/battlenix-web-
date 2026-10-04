type AtmosphereProps = {
  variant?: "hero" | "section" | "cta" | "legal";
};

export function Atmosphere({ variant = "section" }: AtmosphereProps) {
  return <div aria-hidden="true" className={`atmosphere atmosphere--${variant}`} />;
}
