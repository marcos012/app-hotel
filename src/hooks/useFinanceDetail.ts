import { useState, useEffect } from "react";
import { financeService, BookingDetail } from "@/services/finance.service";

export function useFinanceDetail(guestId: string | undefined) {
  const [bookingDetails, setBookingDetails] = useState<BookingDetail[]>([]);
  const [guestName, setGuestName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!guestId) {
        setError("ID do hóspede não fornecido");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const id = parseInt(guestId, 10);
        const [detailsData, nameData] = await Promise.all([
          financeService.getBookingDetails(id),
          financeService.getGuestName(id),
        ]);
        setBookingDetails(detailsData);
        setGuestName(nameData);
        setError(null);
      } catch (err) {
        setError("Erro ao carregar detalhes financeiros");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [guestId]);

  return { bookingDetails, guestName, loading, error };
}
