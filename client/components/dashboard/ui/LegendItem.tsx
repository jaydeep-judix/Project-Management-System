import { cn } from "@/lib/utils";
import { Skeleton } from "../../ui/skeleton";

export default function LegendItem({
  color,
  value,
  label,
  total,
  loading,
}: {
  color: string;
  value: number;
  label: string;
  total: number;
  loading?: boolean;
}) {
  const percent = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div className="group flex items-center justify-between py-1">
      <div className="flex items-center gap-5">
        <span
          className={cn(
            "h-8 w-1.5 rounded-full transition-transform group-hover:scale-y-125",
            loading ? "bg-zinc-200 animate-pulse" : color,
          )}
        />
        <div className="flex flex-col gap-1.5">
          {loading ? (
            <>
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-28" />
            </>
          ) : (
            <>
              <span className="text-sm font-bold text-zinc-900">{label}</span>
              <span className="text-xs text-zinc-400 font-medium whitespace-nowrap">
                {value} tasks ({percent}%)
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
