import { Section } from "@/components/shared";
import { ActivityList } from "@/components/activities/ActivityList";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { useActivities } from "@/hooks/useActivities";

export default function ActivitiesPage() {
  const { bookings, loading, error } = useActivities();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="space-y-6">
      <Section title="Atividade">
        <ActivityList bookings={bookings} />
        {bookings.length === 0 && (
          <div className="py-12 text-center text-sm text-[#6B7280]">
            Nenhuma atividade encontrada
          </div>
        )}
      </Section>
    </div>
  );
}
