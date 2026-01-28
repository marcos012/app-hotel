import * as React from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

export interface DateInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange"
> {
  value?: string; // formato: dd/MM/yyyy
  onChange?: (value: string) => void;
  error?: boolean;
}

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ className, value = "", onChange, error, disabled, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState("");
    const [showCalendar, setShowCalendar] = React.useState(false);
    const [currentMonth, setCurrentMonth] = React.useState(new Date());
    const containerRef = React.useRef<HTMLDivElement>(null);

    const monthNames = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    // Sincroniza displayValue com value prop
    React.useEffect(() => {
      setDisplayValue(value);
    }, [value]);

    // Fecha o calendário ao clicar fora
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setShowCalendar(false);
        }
      };

      if (showCalendar) {
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
          document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [showCalendar]);

    // Aplica máscara brasileira dd/MM/yyyy
    const applyMask = (val: string): string => {
      const numbers = val.replace(/\D/g, "");
      if (numbers.length <= 2) return numbers;
      if (numbers.length <= 4)
        return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
    };

    // Valida se a data é válida
    const isValidDate = (dateStr: string): boolean => {
      if (dateStr.length !== 10) return false;
      const [day, month, year] = dateStr.split("/").map(Number);
      if (!day || !month || !year) return false;
      if (month < 1 || month > 12) return false;
      if (day < 1 || day > 31) return false;
      const date = new Date(year, month - 1, day);
      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const masked = applyMask(e.target.value);
      setDisplayValue(masked);

      if (masked.length === 0) {
        onChange?.("");
      } else {
        onChange?.(masked);
      }
    };

    const handleDateSelect = (day: number) => {
      const month = String(currentMonth.getMonth() + 1).padStart(2, "0");
      const year = currentMonth.getFullYear();
      const dayStr = String(day).padStart(2, "0");
      const dateStr = `${dayStr}/${month}/${year}`;

      setDisplayValue(dateStr);
      onChange?.(dateStr);
      setShowCalendar(false);
    };

    const getDaysInMonth = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const days: (number | null)[] = [];
      for (let i = 0; i < firstDay; i++) {
        days.push(null);
      }
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
      }
      return days;
    };

    const changeMonth = (delta: number) => {
      setCurrentMonth(
        new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() + delta,
          1,
        ),
      );
    };

    const isSelectedDay = (day: number | null): boolean => {
      if (!day || !displayValue || displayValue.length !== 10) return false;
      const [selectedDay, selectedMonth, selectedYear] = displayValue
        .split("/")
        .map(Number);
      return (
        day === selectedDay &&
        currentMonth.getMonth() + 1 === selectedMonth &&
        currentMonth.getFullYear() === selectedYear
      );
    };

    const isToday = (day: number | null): boolean => {
      if (!day) return false;
      const today = new Date();
      return (
        day === today.getDate() &&
        currentMonth.getMonth() === today.getMonth() &&
        currentMonth.getFullYear() === today.getFullYear()
      );
    };

    return (
      <div ref={containerRef} className="relative">
        <div className="relative">
          <input
            ref={ref}
            type="text"
            value={displayValue}
            onChange={handleInputChange}
            placeholder="dd/MM/aaaa"
            maxLength={10}
            disabled={disabled}
            className={cn(
              "flex h-9 w-full rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 pr-9 text-sm text-[#111827] placeholder:text-[#9CA3AF]",
              "focus:outline-none focus:ring-2 focus:border-transparent",
              error
                ? "border-[#D92D20] focus:ring-[#D92D20]"
                : "focus:ring-[#FF385C]",
              "disabled:cursor-not-allowed disabled:opacity-50",
              className,
            )}
            {...props}
          />
          <button
            type="button"
            onClick={() => !disabled && setShowCalendar(!showCalendar)}
            disabled={disabled}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#111827] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Calendar className="h-4 w-4" />
          </button>
        </div>

        {showCalendar && !disabled && (
          <div className="absolute z-50 mt-1 w-[280px] rounded-lg border border-[#E5E7EB] bg-white p-3 shadow-lg">
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() => changeMonth(-1)}
                className="rounded p-1 hover:bg-[#F9FAFB]"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <span className="text-sm font-medium text-[#111827]">
                {monthNames[currentMonth.getMonth()]}{" "}
                {currentMonth.getFullYear()}
              </span>
              <button
                type="button"
                onClick={() => changeMonth(1)}
                className="rounded p-1 hover:bg-[#F9FAFB]"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-[#6B7280] py-1"
                >
                  {day}
                </div>
              ))}
              {getDaysInMonth(currentMonth).map((day, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => day && handleDateSelect(day)}
                  disabled={!day}
                  className={cn(
                    "h-8 rounded text-sm",
                    !day && "invisible",
                    day &&
                      !isSelectedDay(day) &&
                      !isToday(day) &&
                      "hover:bg-[#F9FAFB] text-[#111827]",
                    isSelectedDay(day) &&
                      "bg-[#FF385C] text-white hover:bg-[#E31C5F]",
                    isToday(day) &&
                      !isSelectedDay(day) &&
                      "border border-[#FF385C] text-[#FF385C]",
                  )}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);

DateInput.displayName = "DateInput";

export { DateInput };
