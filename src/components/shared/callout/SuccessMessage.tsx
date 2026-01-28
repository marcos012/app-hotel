import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CalloutDefaultProps } from "@/components/shared/callout/callout-props";

export function SuccessMessage({
  message,
  description,
  className,
}: CalloutDefaultProps) {
  return (
    <div
      className={cn(
        "rounded-md bg-green-50 p-4 text-sm text-green-800 border border-green-200",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold mb-1">{message}</p>
          {description && <p>{description}</p>}
        </div>
      </div>
    </div>
  );
}
