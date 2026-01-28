import { useState, useEffect } from "react";
import { BookingResponse } from "@/types";
import { bookingService } from "@/services/booking.service";

export function useActivities() {
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        setLoading(true);
        const data = await bookingService.getBookings();
        setBookings(data);
        setError(null);
      } catch (err) {
        setError("Erro ao carregar atividades");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  return { bookings, loading, error };
}
