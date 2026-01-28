import { CalloutDefaultProps } from "@/components/shared/callout/callout-props";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export function WariningMessage({ message, className }: CalloutDefaultProps) {
  return (
    <div
      className={cn(
        "rounded-md bg-yellow-50 p-4 text-sm text-yellow-800 border border-yellow-200",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold mb-1">Aviso</p>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}
