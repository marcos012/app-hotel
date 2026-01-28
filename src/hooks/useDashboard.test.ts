import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useDashboard } from "./useDashboard";
import { bookingService } from "@/services/booking.service";
import { dashboardService, ChartDataPoint } from "@/services/dashboard.service";
import { BookingResponse, BookingStatus } from "@/types";

vi.mock("@/services/booking.service");
vi.mock("@/services/dashboard.service");

describe("useDashboard", () => {
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
      guests: [],
      room: {
        id: 1,
        number: "101",
        type: "Standard",
        floor: 1,
        capacity: 2,
        pricePerNight: 250,
        amenities: [],
      },
    },
  ];

  const mockChartData: ChartDataPoint[] = [
    { month: "Jan", value: 10 },
    { month: "Feb", value: 15 },
    { month: "Mar", value: 20 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("inicia com estado de loading true", () => {
    vi.mocked(bookingService.getBookings).mockImplementation(
      () => new Promise(() => {}),
    );
    vi.mocked(dashboardService.getMonthlyBookingsChart).mockImplementation(
      () => new Promise(() => {}),
    );

    const { result } = renderHook(() => useDashboard());

    expect(result.current.loading).toBe(true);
    expect(result.current.bookings).toEqual([]);
    expect(result.current.chartData).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  it("carrega bookings e chartData com sucesso", async () => {
    vi.mocked(bookingService.getBookings).mockResolvedValue(mockBookings);
    vi.mocked(dashboardService.getMonthlyBookingsChart).mockResolvedValue(
      mockChartData,
    );

    const { result } = renderHook(() => useDashboard());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.bookings).toEqual(mockBookings);
    expect(result.current.chartData).toEqual(mockChartData);
    expect(result.current.error).toBe(null);
  });

  it("faz chamadas paralelas usando Promise.all", async () => {
    vi.mocked(bookingService.getBookings).mockResolvedValue(mockBookings);
    vi.mocked(dashboardService.getMonthlyBookingsChart).mockResolvedValue(
      mockChartData,
    );

    renderHook(() => useDashboard());

    await waitFor(() => {
      expect(bookingService.getBookings).toHaveBeenCalled();
      expect(dashboardService.getMonthlyBookingsChart).toHaveBeenCalled();
    });
  });

  it("retorna listas vazias quando nao ha dados", async () => {
    vi.mocked(bookingService.getBookings).mockResolvedValue([]);
    vi.mocked(dashboardService.getMonthlyBookingsChart).mockResolvedValue([]);

    const { result } = renderHook(() => useDashboard());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.bookings).toEqual([]);
    expect(result.current.chartData).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  it("define erro quando bookingService falha", async () => {
    vi.mocked(bookingService.getBookings).mockRejectedValue(
      new Error("Network error"),
    );
    vi.mocked(dashboardService.getMonthlyBookingsChart).mockResolvedValue(
      mockChartData,
    );

    const { result } = renderHook(() => useDashboard());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Erro ao carregar dados do dashboard");
    expect(result.current.bookings).toEqual([]);
  });

  it("define erro quando dashboardService falha", async () => {
    vi.mocked(bookingService.getBookings).mockResolvedValue(mockBookings);
    vi.mocked(dashboardService.getMonthlyBookingsChart).mockRejectedValue(
      new Error("Chart error"),
    );

    const { result } = renderHook(() => useDashboard());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Erro ao carregar dados do dashboard");
  });

  it("define erro quando ambos servicos falham", async () => {
    vi.mocked(bookingService.getBookings).mockRejectedValue(
      new Error("Error 1"),
    );
    vi.mocked(dashboardService.getMonthlyBookingsChart).mockRejectedValue(
      new Error("Error 2"),
    );

    const { result } = renderHook(() => useDashboard());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Erro ao carregar dados do dashboard");
  });

  it("mantem loading false apos carregamento completo", async () => {
    vi.mocked(bookingService.getBookings).mockResolvedValue(mockBookings);
    vi.mocked(dashboardService.getMonthlyBookingsChart).mockResolvedValue(
      mockChartData,
    );

    const { result } = renderHook(() => useDashboard());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.loading).toBe(false);
  });

  it("retorna chartData com estrutura correta", async () => {
    vi.mocked(bookingService.getBookings).mockResolvedValue(mockBookings);
    vi.mocked(dashboardService.getMonthlyBookingsChart).mockResolvedValue(
      mockChartData,
    );

    const { result } = renderHook(() => useDashboard());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.chartData[0]).toHaveProperty("month");
    expect(result.current.chartData[0]).toHaveProperty("value");
  });

  it("chama cada servico exatamente uma vez", async () => {
    vi.mocked(bookingService.getBookings).mockResolvedValue(mockBookings);
    vi.mocked(dashboardService.getMonthlyBookingsChart).mockResolvedValue(
      mockChartData,
    );

    renderHook(() => useDashboard());

    await waitFor(() => {
      expect(bookingService.getBookings).toHaveBeenCalledTimes(1);
      expect(dashboardService.getMonthlyBookingsChart).toHaveBeenCalledTimes(1);
    });
  });
});
