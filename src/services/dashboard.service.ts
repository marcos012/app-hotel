import { api } from "./api";

export interface ChartDataPoint {
  month: string;
  value: number;
}

const mockChartData: ChartDataPoint[] = [
  { month: "Jan", value: 42 },
  { month: "Fev", value: 38 },
  { month: "Mar", value: 51 },
  { month: "Abr", value: 45 },
  { month: "Mai", value: 62 },
  { month: "Jun", value: 58 },
  { month: "Jul", value: 75 },
  { month: "Ago", value: 68 },
  { month: "Set", value: 52 },
  { month: "Out", value: 60 },
  { month: "Nov", value: 48 },
  { month: "Dez", value: 80 },
];

export const dashboardService = {
  /**
   * Busca dados do gráfico de reservas por mês
   */
  async getMonthlyBookingsChart(): Promise<ChartDataPoint[]> {
    return api.mockApiCall(mockChartData);
  },
};
