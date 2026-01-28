import { cn } from "@/lib/utils";

interface ErrorIconProps {
  className?: string;
}

export function ErrorIcon({ className }: ErrorIconProps) {
  return (
    <svg
      className={cn("h-12 w-12 text-red-600", className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
