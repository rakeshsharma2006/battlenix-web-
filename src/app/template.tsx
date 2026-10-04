export default function PageTemplate({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="page-enter">{children}</div>;
}
