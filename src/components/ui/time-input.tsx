import * as React from "react";
import { cn } from "@/lib/utils";

export interface TimeInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  error?: boolean;
}

const TimeInput = React.forwardRef<HTMLInputElement, TimeInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        type="time"
        ref={ref}
        className={cn(
          "flex h-9 w-full rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF]",
          "focus:outline-none focus:ring-2 focus:border-transparent",
          error
            ? "border-[#D92D20] focus:ring-[#D92D20]"
            : "focus:ring-[#FF385C]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "[&::-webkit-calendar-picker-indicator]:cursor-pointer",
          className,
        )}
        {...props}
      />
    );
  },
);

TimeInput.displayName = "TimeInput";

export { TimeInput };
