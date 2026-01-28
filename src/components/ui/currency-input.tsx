import * as React from "react";
import { cn } from "@/lib/utils";

export interface CurrencyInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  onChange?: (value: number) => void;
  value?: number;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, onChange, value, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState("");

    React.useEffect(() => {
      if (value !== undefined && value !== null) {
        setDisplayValue(formatCurrency(value));
      } else {
        setDisplayValue("");
      }
    }, [value]);

    const formatCurrency = (num: number): string => {
      return num.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    };

    const parseCurrency = (str: string): number => {
      const cleaned = str.replace(/\D/g, "");
      if (!cleaned) return 0;
      return parseFloat(cleaned) / 100;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      // Remove tudo exceto números
      const numbersOnly = inputValue.replace(/\D/g, "");

      if (!numbersOnly) {
        setDisplayValue("");
        onChange?.(undefined as any);
        return;
      }

      // Converte para número (divide por 100 para considerar os centavos)
      const numericValue = parseFloat(numbersOnly) / 100;

      // Limita o valor máximo a 9.999.999,99
      if (numericValue > 9999999.99) {
        return;
      }

      // Formata para exibição
      const formatted = formatCurrency(numericValue);
      setDisplayValue(formatted);

      // Chama o onChange com o valor numérico
      onChange?.(numericValue);
    };

    return (
      <input
        type="text"
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        value={displayValue}
        onChange={handleChange}
        placeholder="0,00"
        inputMode="numeric"
        {...props}
      />
    );
  },
);

CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };
