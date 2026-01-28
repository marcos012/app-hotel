import { useState } from "react";
import { DateInput } from "@/components/ui/date-input";
import { TimeInput } from "@/components/ui/time-input";

/**
 * Componente de exemplo para testar DateInput e TimeInput
 *
 * Para testar, importe este componente em alguma página:
 * import { DateTimeExample } from "@/components/ui/DateTimeExample";
 */
export function DateTimeExample() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dateError, setDateError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      setDateError(true);
      return;
    }

    console.log("Data selecionada:", date); // formato: dd/MM/yyyy
    console.log("Hora selecionada:", time); // formato: HH:mm
    alert(`Data: ${date}\nHora: ${time}`);
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Teste de Campos de Data e Hora</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Data (formato brasileiro)
          </label>
          <DateInput
            value={date}
            onChange={(value) => {
              setDate(value);
              setDateError(false);
            }}
            error={dateError}
          />
          {dateError && (
            <p className="text-xs text-red-500">Data é obrigatória</p>
          )}
          <p className="text-xs text-gray-500">
            Valor atual: {date || "Vazio"}
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Horário
          </label>
          <TimeInput value={time} onChange={(e) => setTime(e.target.value)} />
          <p className="text-xs text-gray-500">
            Valor atual: {time || "Vazio"}
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Data desabilitada
          </label>
          <DateInput value="25/01/2026" onChange={() => {}} disabled />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Data com erro
          </label>
          <DateInput value="" onChange={() => {}} error />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Enviar
        </button>
      </form>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Instruções:</h3>
        <ul className="text-sm space-y-1 text-gray-700">
          <li>• O campo de data aceita digitação com máscara automática</li>
          <li>• Clique no ícone de calendário para abrir o datepicker</li>
          <li>• O calendário está totalmente em português</li>
          <li>• O formato é sempre dd/MM/aaaa</li>
          <li>• Use as setas para navegar entre os meses</li>
          <li>• A data de hoje aparece com borda azul</li>
          <li>• A data selecionada aparece com fundo azul</li>
        </ul>
      </div>
    </div>
  );
}
