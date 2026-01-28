import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipContentProps,
  Cell,
} from "recharts";

export interface ChartDataItem {
  month: string;
  value: number;
  current?: boolean;
}

// #region Sample data - Dados de solicitações por mês (fallback)
const defaultData: ChartDataItem[] = [
  { month: "Jan", value: 0 },
  { month: "Fev", value: 0 },
  { month: "Mar", value: 0 },
  { month: "Abr", value: 0 },
  { month: "Mai", value: 0 },
  { month: "Jun", value: 0 },
  { month: "Jul", value: 0 },
  { month: "Ago", value: 0 },
  { month: "Set", value: 0 },
  { month: "Out", value: 0 },
  { month: "Nov", value: 0 },
  { month: "Dez", value: 0 },
];
// #endregion

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<string | number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-[#E4E7EC] bg-white p-3 shadow-lg">
        <p className="text-sm font-medium text-[#1D2939]">{label}</p>
        <p className="text-sm text-[#667085]">
          Reservas:{" "}
          <span className="font-semibold text-[#1D2939]">
            {payload[0].value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const TooltipBarChart = ({
  isAnimationActive = true,
  data = defaultData,
}: {
  isAnimationActive?: boolean;
  data?: ChartDataItem[];
}) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#E4E7EC"
          vertical={false}
        />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#667085", fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#667085", fontSize: 12 }}
        />
        <Tooltip
          content={CustomTooltip}
          cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
        />
        <Bar
          dataKey="value"
          radius={[6, 6, 0, 0]}
          barSize={20}
          isAnimationActive={isAnimationActive}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.current ? "#FF385C" : "#F2F4F7"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export { TooltipBarChart };
