import { cn } from "@/lib/utils";

export default function LegendItem({
  color,
  value,
  label,
  total,
}: {
  color: string;
  value: number;
  label: string;
  total: number;
}) {
  const percent = Math.round((value / total) * 100);
  return (
    <div className="group flex items-center justify-between py-1">
      <div className="flex items-center gap-5">
        <span
          className={cn(
            "h-8 w-1.5 rounded-full transition-transform group-hover:scale-y-125",
            color,
          )}
        />
        <div className="flex flex-col">
          <span className="text-sm font-bold text-zinc-900">{label}</span>
          <span className="text-xs text-zinc-400 font-medium whitespace-nowrap">
            {value} tasks ({percent}%)
          </span>
        </div>
      </div>
    </div>
  );
}
