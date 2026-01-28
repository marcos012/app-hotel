import { Section } from "@/components/shared";
import { ConfigForm } from "@/components/configs/ConfigForm";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useHotelConfig } from "@/hooks/useAirportConfig";

export default function ConfigsPage() {
  const { form, loading, saving, handleSave, handleCancel } = useHotelConfig();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <Section title="Configurações do Hotel">
        <ConfigForm
          form={form}
          onSubmit={handleSave}
          onCancel={handleCancel}
          saving={saving}
        />
      </Section>
    </div>
  );
}
