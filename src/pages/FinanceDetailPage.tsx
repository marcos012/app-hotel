import { FinanceDetailTable } from "@/components/finance/FinanceDetailTable";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { useFinanceDetail } from "@/hooks/useFinanceDetail";
import { useParams } from "react-router-dom";

export default function FinanceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { bookingDetails, guestName, loading, error } = useFinanceDetail(id);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="space-y-6">
      <FinanceDetailTable bookings={bookingDetails} guestName={guestName} />
    </div>
  );
}
