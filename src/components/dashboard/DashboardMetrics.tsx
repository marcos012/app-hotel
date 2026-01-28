import { Metrics } from "@/components/shared/metrics/Metrics";
import { BookingResponse } from "@/types";

interface DashboardMetricsProps {
  bookings: BookingResponse[];
}

export function DashboardMetrics({ bookings }: DashboardMetricsProps) {
  return (
    <Metrics
      bookings={bookings}
      metrics={[
        {
          type: "check-ins-dia",
          title: "Check-ins do dia",
          icon: "users",
        },
        {
          type: "reservas-pendentes",
          title: "Reservas pendentes",
          icon: "clock",
        },
        {
          type: "check-outs-concluidos",
          title: "Check-outs concluídos",
          icon: "check-mark-circle",
        },
        {
          type: "reservas-mes",
          title: "Reservas neste mês",
          icon: "calendar",
        },
      ]}
    />
  );
}
