import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import { DashboardChart } from "@/components/dashboard/DashboardChart";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { useDashboard } from "@/hooks/useDashboard";

export default function AirportDashboard() {
  const { bookings, chartData, loading, error } = useDashboard();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <DashboardMetrics bookings={bookings} />
      </div>
      <DashboardChart data={chartData} />
    </>
  );
}
