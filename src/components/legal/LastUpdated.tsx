import { formatDisplayDate } from "@/lib/site-config";

type LastUpdatedProps = {
  date: string;
};

export function LastUpdated({ date }: LastUpdatedProps) {
  return (
    <p className="mt-3 text-sm font-medium text-zinc-300">
      Last updated: <time dateTime={date}>{formatDisplayDate(date)}</time>
    </p>
  );
}
