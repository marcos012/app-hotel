import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Metrics } from "./Metrics";
import { BookingResponse, BookingStatus } from "@/types";

describe("Metrics", () => {
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

  const baseMetrics = [
    {
      type: "check-ins-dia" as const,
      title: "Check-ins do dia",
      icon: "users" as const,
    },
    {
      type: "reservas-pendentes" as const,
      title: "Reservas pendentes",
      icon: "clock" as const,
    },
    {
      type: "check-outs-concluidos" as const,
      title: "Check-outs concluídos",
      icon: "check-mark-circle" as const,
    },
    {
      type: "reservas-mes" as const,
      title: "Reservas neste mês",
      icon: "calendar" as const,
    },
  ];

  it("renderiza todas as metricas fornecidas", () => {
    render(<Metrics bookings={[]} metrics={baseMetrics} />);

    expect(screen.getByText("Check-ins do dia")).toBeInTheDocument();
    expect(screen.getByText("Reservas pendentes")).toBeInTheDocument();
    expect(screen.getByText("Check-outs concluídos")).toBeInTheDocument();
    expect(screen.getByText("Reservas neste mês")).toBeInTheDocument();
  });

  it("calcula check-ins do dia corretamente", () => {
    const todayIso = new Date().toLocaleDateString("en-CA", {
      timeZone: "America/Sao_Paulo",
    });

    const bookings = [
      createMockBooking({ checkInDate: `${todayIso}T14:00:00` }),
      createMockBooking({ checkInDate: `${todayIso}T15:00:00` }),
      createMockBooking({ checkInDate: "2026-01-15T14:00:00" }),
    ];

    render(<Metrics bookings={bookings} metrics={[baseMetrics[0]]} />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("calcula reservas pendentes corretamente", () => {
    const bookings = [
      createMockBooking({ status: BookingStatus.PENDING }),
      createMockBooking({ status: BookingStatus.PENDING }),
      createMockBooking({ status: BookingStatus.ACCEPTED }),
    ];

    render(<Metrics bookings={bookings} metrics={[baseMetrics[1]]} />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("calcula check-outs concluidos corretamente", () => {
    const bookings = [
      createMockBooking({ status: BookingStatus.COMPLETED }),
      createMockBooking({ status: BookingStatus.COMPLETED }),
      createMockBooking({ status: BookingStatus.COMPLETED }),
      createMockBooking({ status: BookingStatus.PENDING }),
    ];

    render(<Metrics bookings={bookings} metrics={[baseMetrics[2]]} />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("calcula reservas do mes corretamente", () => {
    const monthIso = new Date()
      .toLocaleDateString("en-CA", {
        timeZone: "America/Sao_Paulo",
      })
      .slice(0, 7);

    const bookings = [
      createMockBooking({ checkInDate: `${monthIso}-15T14:00:00` }),
      createMockBooking({ checkInDate: `${monthIso}-20T14:00:00` }),
      createMockBooking({ checkInDate: "2025-12-15T14:00:00" }),
    ];

    render(<Metrics bookings={bookings} metrics={[baseMetrics[3]]} />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("retorna zero quando nao ha bookings correspondentes", () => {
    render(<Metrics bookings={[]} metrics={baseMetrics} />);

    const zeros = screen.getAllByText("0");
    expect(zeros.length).toBeGreaterThan(0);
  });

  it("renderiza grid com gap e responsivo", () => {
    const { container } = render(
      <Metrics bookings={[]} metrics={baseMetrics} />,
    );

    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("gap-4");
    expect(grid).toHaveClass("md:grid-cols-2");
  });

  it("renderiza MetricCard para cada metrica", () => {
    render(<Metrics bookings={[]} metrics={baseMetrics} />);

    expect(screen.getByText("Check-ins do dia")).toBeInTheDocument();
    expect(screen.getByText("Reservas pendentes")).toBeInTheDocument();
    expect(screen.getByText("Check-outs concluídos")).toBeInTheDocument();
    expect(screen.getByText("Reservas neste mês")).toBeInTheDocument();
  });

  it("lida com array vazio de metricas", () => {
    const { container } = render(<Metrics bookings={[]} metrics={[]} />);

    const grid = container.querySelector(".grid");
    expect(grid?.children.length).toBe(0);
  });

  it("lida com tipo de metrica desconhecido retornando zero", () => {
    const invalidMetric = [
      { type: "invalid-type" as any, title: "Invalid", icon: "users" as const },
    ];

    render(<Metrics bookings={[]} metrics={invalidMetric} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renderiza chave unica para cada metrica", () => {
    const { container } = render(
      <Metrics bookings={[]} metrics={baseMetrics} />,
    );

    const grid = container.querySelector(".grid");
    expect(grid?.children.length).toBe(4);
  });

  it("filtra corretamente por data de check-in", () => {
    const todayIso = new Date().toLocaleDateString("en-CA", {
      timeZone: "America/Sao_Paulo",
    });

    const bookings = [
      createMockBooking({ checkInDate: `${todayIso}T10:00:00` }),
      createMockBooking({ checkInDate: `${todayIso}T23:59:00` }),
      createMockBooking({ checkInDate: "2026-12-25T14:00:00" }),
    ];

    render(<Metrics bookings={bookings} metrics={[baseMetrics[0]]} />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("filtra corretamente por status PENDING", () => {
    const bookings = [
      createMockBooking({ status: BookingStatus.PENDING }),
      createMockBooking({ status: BookingStatus.REJECTED }),
      createMockBooking({ status: BookingStatus.CANCELLED }),
    ];

    render(<Metrics bookings={bookings} metrics={[baseMetrics[1]]} />);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("filtra corretamente por status COMPLETED", () => {
    const bookings = [
      createMockBooking({ status: BookingStatus.COMPLETED }),
      createMockBooking({ status: BookingStatus.ACCEPTED }),
      createMockBooking({ status: BookingStatus.PENDING }),
    ];

    render(<Metrics bookings={bookings} metrics={[baseMetrics[2]]} />);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("filtra corretamente por mes do check-in", () => {
    const monthIso = new Date()
      .toLocaleDateString("en-CA", {
        timeZone: "America/Sao_Paulo",
      })
      .slice(0, 7);

    const bookings = [
      createMockBooking({ checkInDate: `${monthIso}-01T14:00:00` }),
      createMockBooking({ checkInDate: `${monthIso}-15T14:00:00` }),
      createMockBooking({ checkInDate: `${monthIso}-31T14:00:00` }),
      createMockBooking({ checkInDate: "2025-01-15T14:00:00" }),
    ];

    render(<Metrics bookings={bookings} metrics={[baseMetrics[3]]} />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
