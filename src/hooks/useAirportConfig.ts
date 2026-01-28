import { useState, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { configService, HotelConfig } from "@/services/config.service";
import { useNotificationStore } from "@/stores/notification";

export function useHotelConfig() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { addNotification } = useNotificationStore();

  const form: UseFormReturn<HotelConfig> = useForm<HotelConfig>({
    defaultValues: {
      hotelName: "",
      description: "",
      available: true,
      autoAcceptBookings: false,
    },
  });

  useEffect(() => {
    async function fetchConfig() {
      try {
        setLoading(true);
        const config = await configService.getConfig();
        form.reset(config);
      } catch (err) {
        console.error("Erro ao carregar configurações:", err);
        addNotification("error", "Erro ao carregar configurações");
      } finally {
        setLoading(false);
      }
    }

    fetchConfig();
  }, [form, addNotification]);

  const handleSave = async (data: HotelConfig) => {
    try {
      setSaving(true);
      await configService.saveConfig(data);
      addNotification("success", "Configurações salvas com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar configurações:", err);
      addNotification("error", "Erro ao salvar configurações");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    form.reset();
  };

  return {
    form,
    loading,
    saving,
    handleSave,
    handleCancel,
  };
}
