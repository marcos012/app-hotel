import { CalloutDefaultProps } from "@/components/shared/callout/callout-props";
import { cn } from "@/lib/utils";
import { CircleX } from "lucide-react";

export function ErrorMessage({ message, className }: CalloutDefaultProps) {
  return (
    <div
      className={cn(
        "rounded-md bg-red-50 p-4 text-sm text-red-800 border border-red-200",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <CircleX className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold mb-1">Erro</p>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}
