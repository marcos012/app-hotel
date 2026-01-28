import { MetricCard } from "@/components/shared/metrics/MetricCard";
import { LucideDollarSign, LucideHome } from "lucide-react";

interface FinanceMetricsProps {
  totalBookings: number;
  monthlyRevenue: string;
}

export function FinanceMetrics({
  totalBookings,
  monthlyRevenue,
}: FinanceMetricsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <MetricCard
        title="Total de reservas"
        value={totalBookings}
        icon={LucideHome}
      />
      <MetricCard
        title="Faturamento mensal"
        value={monthlyRevenue}
        icon={LucideDollarSign}
      />
    </div>
  );
}
