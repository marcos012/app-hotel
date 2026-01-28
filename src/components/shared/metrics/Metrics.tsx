import { MetricCard } from "@/components/shared/metrics/MetricCard";
import { IconName, getIcon } from "@/components/shared/icons";
import { BookingResponse } from "@/types";
import { monthIso, todayIso } from "@/utils/date";

type MetricType =
  | "check-ins-dia"
  | "reservas-pendentes"
  | "check-outs-concluidos"
  | "reservas-mes";

interface MetricConfig {
  type: MetricType;
  title: string;
  icon: IconName;
}

interface MetricsProps {
  bookings: BookingResponse[];
  metrics: MetricConfig[];
}

export const Metrics = ({ bookings, metrics }: MetricsProps) => {
  const calculateMetric = (type: MetricType): number => {
    switch (type) {
      case "check-ins-dia":
        return bookings.filter((b) => b.checkInDate.startsWith(todayIso))
          .length;

      case "reservas-pendentes":
        return bookings.filter((b) => b.status === "PENDING").length;

      case "check-outs-concluidos":
        return bookings.filter((b) => b.status === "COMPLETED").length;

      case "reservas-mes":
        return bookings.filter((b) => b.checkInDate.startsWith(monthIso))
          .length;

      default:
        return 0;
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {metrics.map((metric, index) => (
        <MetricCard
          key={`${metric.type}-${index}`}
          title={metric.title}
          value={calculateMetric(metric.type)}
          icon={getIcon(metric.icon)}
        />
      ))}
    </div>
  );
};
