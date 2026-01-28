import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
}

export const MetricCard = ({ title, value, icon: Icon }: MetricCardProps) => {
  return (
    <div className="flex flex-col justify-between gap-5 rounded-2xl border border-[#E4E7EC] bg-white p-6">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#F2F4F7]">
        <Icon className="h-6 w-6 text-[#1D2939]" />
      </div>
      <div className="space-y-2">
        <p className="text-sm text-[#667085]">{title}</p>
        <p className="text-3xl font-bold text-[#1D2939]">{value}</p>
      </div>
    </div>
  );
};
