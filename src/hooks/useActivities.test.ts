import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useActivities } from "./useActivities";
import { bookingService } from "@/services/booking.service";
import { BookingResponse, BookingStatus } from "@/types";

vi.mock("@/services/booking.service");

describe("useActivities", () => {
  const mockBookings: BookingResponse[] = [
    {
      id: 1,
      userId: 1,
      hotelId: 1,
      checkInDate: "2026-01-28T14:00:00",
      checkOutDate: "2026-01-30T12:00:00",
      totalPrice: 500,
      status: BookingStatus.PENDING,
      createdAt: "2026-01-27T10:00:00",
      parkingRequested: false,
      parkingTotalPrice: 0,
      breakfastIncluded: true,
      breakfastTotalPrice: 100,
      numberOfNights: 2,
      roomRate: 250,
      operationType: "CHECK_IN" as any,
      guests: [
        {
          id: 1,
          name: "João Silva",
          email: "joao@example.com",
          phone: "11999999999",
          document: "12345678900",
        },
      ],
      room: {
        id: 1,
        number: "101",
        type: "Standard",
        floor: 1,
        capacity: 2,
        pricePerNight: 250,
        amenities: ["wifi", "tv"],
      },
    },
    {
      id: 2,
      userId: 2,
      hotelId: 1,
      checkInDate: "2026-01-29T14:00:00",
      checkOutDate: "2026-01-31T12:00:00",
      totalPrice: 750,
      status: BookingStatus.ACCEPTED,
      createdAt: "2026-01-27T11:00:00",
      parkingRequested: true,
      parkingTotalPrice: 50,
      breakfastIncluded: true,
      breakfastTotalPrice: 150,
      numberOfNights: 2,
      roomRate: 375,
      operationType: "CHECK_IN" as any,
      guests: [
        {
          id: 2,
          name: "Maria Santos",
          email: "maria@example.com",
          phone: "11988888888",
          document: "98765432100",
        },
      ],
      room: {
        id: 2,
        number: "102",
        type: "Deluxe",
        floor: 1,
        capacity: 3,
        pricePerNight: 375,
        amenities: ["wifi", "tv", "minibar"],
      },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("inicia com estado de loading true", () => {
    vi.mocked(bookingService.getBookings).mockImplementation(
      () => new Promise(() => {}),
    );

    const { result } = renderHook(() => useActivities());

    expect(result.current.loading).toBe(true);
    expect(result.current.bookings).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  it("carrega bookings com sucesso", async () => {
    vi.mocked(bookingService.getBookings).mockResolvedValue(mockBookings);

    const { result } = renderHook(() => useActivities());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.bookings).toEqual(mockBookings);
    expect(result.current.error).toBe(null);
  });

  it("retorna lista vazia quando nao ha bookings", async () => {
    vi.mocked(bookingService.getBookings).mockResolvedValue([]);

    const { result } = renderHook(() => useActivities());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.bookings).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  it("define erro quando a requisicao falha", async () => {
    const errorMessage = "Network error";
    vi.mocked(bookingService.getBookings).mockRejectedValue(
      new Error(errorMessage),
    );

    const { result } = renderHook(() => useActivities());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.bookings).toEqual([]);
    expect(result.current.error).toBe("Erro ao carregar atividades");
  });

  it("mantem loading false apos erro", async () => {
    vi.mocked(bookingService.getBookings).mockRejectedValue(new Error("Error"));

    const { result } = renderHook(() => useActivities());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.loading).toBe(false);
  });

  it("chama bookingService.getBookings uma vez", async () => {
    vi.mocked(bookingService.getBookings).mockResolvedValue(mockBookings);

    renderHook(() => useActivities());

    await waitFor(() => {
      expect(bookingService.getBookings).toHaveBeenCalledTimes(1);
    });
  });

  it("limpa erro quando requisicao seguinte tem sucesso", async () => {
    vi.mocked(bookingService.getBookings).mockResolvedValue(mockBookings);

    const { result } = renderHook(() => useActivities());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(null);
  });

  it("retorna bookings com todas as propriedades esperadas", async () => {
    vi.mocked(bookingService.getBookings).mockResolvedValue(mockBookings);

    const { result } = renderHook(() => useActivities());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.bookings[0]).toHaveProperty("id");
    expect(result.current.bookings[0]).toHaveProperty("userId");
    expect(result.current.bookings[0]).toHaveProperty("hotelId");
    expect(result.current.bookings[0]).toHaveProperty("checkInDate");
    expect(result.current.bookings[0]).toHaveProperty("checkOutDate");
    expect(result.current.bookings[0]).toHaveProperty("totalPrice");
    expect(result.current.bookings[0]).toHaveProperty("status");
    expect(result.current.bookings[0]).toHaveProperty("guests");
    expect(result.current.bookings[0]).toHaveProperty("room");
  });
});
