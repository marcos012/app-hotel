import { CalloutDefaultProps } from "@/components/shared/callout/callout-props";
import { ErrorMessage } from "@/components/shared/callout/ErrorMessage";
import { SuccessMessage } from "@/components/shared/callout/SuccessMessage";
import { WariningMessage } from "@/components/shared/callout/WarningMessage";

interface CalloutProps extends CalloutDefaultProps {
  type: "success" | "error" | "warning" | "info";
}

export const CallOut = ({
  message,
  className,
  type,
  description,
}: CalloutProps) => {
  const Message = {
    success: (
      <SuccessMessage
        message={message}
        description={description}
        className={className}
      />
    ),
    error: <ErrorMessage message={message} className={className} />,
    warning: <WariningMessage message={message} className={className} />,
  };

  return Message[type as keyof typeof Message] || null;
};
