import { Section } from "@/components/shared";
import { TooltipBarChart } from "@/components/ui/tooltip-chart";

interface ChartDataPoint {
  month: string;
  value: number;
}

interface DashboardChartProps {
  data: ChartDataPoint[];
}

export function DashboardChart({ data }: DashboardChartProps) {
  return (
    <Section title="Reservas por Mês">
      <TooltipBarChart data={data} />
    </Section>
  );
}
