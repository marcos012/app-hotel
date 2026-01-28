import { useState, useEffect } from "react";
import { BookingResponse } from "@/types";
import { bookingService } from "@/services/booking.service";
import { dashboardService, ChartDataPoint } from "@/services/dashboard.service";

export function useDashboard() {
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [bookingsData, chartDataResult] = await Promise.all([
          bookingService.getBookings(),
          dashboardService.getMonthlyBookingsChart(),
        ]);
        setBookings(bookingsData);
        setChartData(chartDataResult);
        setError(null);
      } catch (err) {
        setError("Erro ao carregar dados do dashboard");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { bookings, chartData, loading, error };
}
