import { BookingStatus } from "@/types";

export const StatusBadge = ({ status }: { status: BookingStatus }) => {
  const statusConfig = {
    [BookingStatus.PENDING]: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      label: "Pendente",
    },
    [BookingStatus.ACCEPTED]: {
      bg: "bg-green-100",
      text: "text-green-800",
      label: "Aceito",
    },
    [BookingStatus.COMPLETED]: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      label: "Concluído",
    },
    [BookingStatus.REJECTED]: {
      bg: "bg-red-100",
      text: "text-red-800",
      label: "Recusado",
    },
    [BookingStatus.CANCELLED]: {
      bg: "bg-gray-100",
      text: "text-gray-800",
      label: "Cancelado",
    },
  };
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
};
