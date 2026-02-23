import { cn } from "@/lib/utils";

export default function ProjectItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 cursor-pointer transition-all group">
      <span
        className={cn(
          "h-2.5 w-2.5 rounded-full ring-2 ring-white shadow-sm",
          color,
        )}
      />
      {label}
    </div>
  );
}