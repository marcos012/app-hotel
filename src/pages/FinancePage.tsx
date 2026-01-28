import { Section } from "@/components/shared/Section";
import { Filter } from "lucide-react";
import { FinanceMetrics } from "@/components/finance/FinanceMetrics";
import { FinanceTable } from "@/components/finance/FinanceTable";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { useFinance } from "@/hooks/useFinance";
import { useNavigate } from "react-router-dom";

export default function FinancePage() {
  const { financeData, metrics, loading, error } = useFinance();
  const navigate = useNavigate();

  const handleViewDetails = (id: number) => {
    navigate(`/finance/${id}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="space-y-6">
      <FinanceMetrics
        totalBookings={metrics.totalBookings}
        monthlyRevenue={metrics.monthlyRevenue}
      />

      <Section
        title="Extrato financeiro"
        headerAction={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 py-3 text-sm font-medium text-[#344054] shadow-sm hover:bg-gray-50"
          >
            <Filter className="h-5 w-5" />
            <span>Filtros</span>
          </button>
        }
      >
        <FinanceTable data={financeData} onViewDetails={handleViewDetails} />
      </Section>
    </div>
  );
}
