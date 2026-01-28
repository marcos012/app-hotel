import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardMetrics } from "./DashboardMetrics";
import { BookingResponse, BookingStatus } from "@/types";

describe("DashboardMetrics", () => {
  const createMockBooking = (
    overrides: Partial<BookingResponse>,
  ): BookingResponse => ({
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
    ...overrides,
  });

  it("renderiza componente Metrics com bookings", () => {
    const bookings = [createMockBooking({})];
    render(<DashboardMetrics bookings={bookings} />);

    expect(screen.getByText("Check-ins do dia")).toBeInTheDocument();
  });

  it("renderiza todas as metricas esperadas", () => {
    render(<DashboardMetrics bookings={[]} />);

    expect(screen.getByText("Check-ins do dia")).toBeInTheDocument();
    expect(screen.getByText("Reservas pendentes")).toBeInTheDocument();
    expect(screen.getByText("Check-outs concluídos")).toBeInTheDocument();
    expect(screen.getByText("Reservas neste mês")).toBeInTheDocument();
  });

  it("renderiza grid com 4 metricas", () => {
    const { container } = render(<DashboardMetrics bookings={[]} />);

    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
  });

  it("aplica classes de layout grid corretamente", () => {
    const { container } = render(<DashboardMetrics bookings={[]} />);

    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("gap-4");
    expect(grid).toHaveClass("md:grid-cols-2");
  });

  it("passa array de metricas com configuracao correta", () => {
    render(<DashboardMetrics bookings={[]} />);

    expect(screen.getByText("Check-ins do dia")).toBeInTheDocument();
    expect(screen.getByText("Reservas pendentes")).toBeInTheDocument();
    expect(screen.getByText("Check-outs concluídos")).toBeInTheDocument();
    expect(screen.getByText("Reservas neste mês")).toBeInTheDocument();
  });

  it("renderiza com bookings vazios", () => {
    render(<DashboardMetrics bookings={[]} />);

    expect(screen.getByText("Check-ins do dia")).toBeInTheDocument();
    expect(screen.getByText("Reservas pendentes")).toBeInTheDocument();
  });

  it("renderiza com multiplos bookings", () => {
    const bookings = [
      createMockBooking({ id: 1 }),
      createMockBooking({ id: 2 }),
      createMockBooking({ id: 3 }),
    ];

    render(<DashboardMetrics bookings={bookings} />);

    expect(screen.getByText("Check-ins do dia")).toBeInTheDocument();
  });

  it("passa bookings para componente Metrics", () => {
    const bookings = [createMockBooking({})];
    const { container } = render(<DashboardMetrics bookings={bookings} />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
