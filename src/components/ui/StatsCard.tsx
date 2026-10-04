type StatsCardProps = {
  label: string;
};

export function StatsCard({ label }: StatsCardProps) {
  return (
    <div className="min-w-0 border-t border-[#26262c] px-4 py-4 text-center text-sm font-medium text-[#a1a1aa] first:border-t-0 sm:border-t-0 sm:border-l sm:first:border-l-0">
      {label}
    </div>
  );
}
