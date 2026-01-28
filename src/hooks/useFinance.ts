import { useState, useEffect } from "react";
import {
  financeService,
  FinanceData,
  FinanceMetrics,
} from "@/services/finance.service";

export function useFinance() {
  const [financeData, setFinanceData] = useState<FinanceData[]>([]);
  const [metrics, setMetrics] = useState<FinanceMetrics>({
    totalBookings: 0,
    monthlyRevenue: "R$ 0,00",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [financeDataResult, metricsResult] = await Promise.all([
          financeService.getFinanceData(),
          financeService.getFinanceMetrics(),
        ]);
        setFinanceData(financeDataResult);
        setMetrics(metricsResult);
        setError(null);
      } catch (err) {
        setError("Erro ao carregar dados financeiros");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { financeData, metrics, loading, error };
}
