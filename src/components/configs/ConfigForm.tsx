import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { HotelConfig } from "@/services/config.service";

interface ConfigFormProps {
  form: UseFormReturn<HotelConfig>;
  onSubmit: (data: HotelConfig) => void;
  onCancel: () => void;
  saving: boolean;
}

export function ConfigForm({
  form,
  onSubmit,
  onCancel,
  saving,
}: ConfigFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#344054] mb-2">
            Nome do Hotel
          </label>
          <input
            {...register("hotelName", { required: true })}
            type="text"
            className="w-full px-4 py-2 border border-[#D0D5DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
            placeholder="Digite o nome do hotel"
            disabled={saving}
          />
          {errors.hotelName && (
            <span className="text-red-500 text-sm">Campo obrigatório</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#344054] mb-2">
            Descrição
          </label>
          <textarea
            {...register("description")}
            rows={4}
            className="w-full px-4 py-2 border border-[#D0D5DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
            placeholder="Descreva os serviços e comodidades do hotel"
            disabled={saving}
          />
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              {...register("available")}
              type="checkbox"
              className="w-4 h-4 text-[#FF385C] border-gray-300 rounded focus:ring-[#FF385C] accent-[#FF385C]"
              disabled={saving}
            />
            <span className="text-sm text-[#344054]">
              Hotel disponível para reservas
            </span>
          </label>

          <label className="flex items-center gap-2">
            <input
              {...register("autoAcceptBookings")}
              type="checkbox"
              className="w-4 h-4 text-[#FF385C] border-gray-300 rounded focus:ring-[#FF385C]"
              disabled={saving}
            />
            <span className="text-sm text-[#344054]">
              Aceitar reservas automaticamente
            </span>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={saving}
          className="px-6 py-2 rounded-lg text-[#FF385C] border-2 border-[#FF385C] hover:text-[#E31C5F] transition"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={saving}
          className="h-10 px-6 rounded-lg bg-[#FF385C] text-sm font-medium text-white hover:bg-[#E31C5F]"
        >
          {saving ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  );
}
