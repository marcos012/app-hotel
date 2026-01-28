import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ActivityList } from "./ActivityList";
import { BookingResponse, BookingStatus } from "@/types";

describe("ActivityList", () => {
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

  it("renderiza lista vazia quando nao ha bookings", () => {
    const { container } = render(<ActivityList bookings={[]} />);

    const items = container.querySelectorAll(".py-4");
    expect(items).toHaveLength(0);
  });

  it("renderiza todos os bookings fornecidos", () => {
    render(<ActivityList bookings={mockBookings} />);

    expect(screen.getByText("Quarto 101 - Standard")).toBeInTheDocument();
    expect(screen.getByText("Quarto 102 - Deluxe")).toBeInTheDocument();
  });

  it("exibe informacoes do quarto corretamente", () => {
    render(<ActivityList bookings={mockBookings} />);

    expect(screen.getByText("Quarto 101 - Standard")).toBeInTheDocument();
    expect(screen.getByText("Quarto 102 - Deluxe")).toBeInTheDocument();
  });

  it("exibe nome do hospede principal", () => {
    render(<ActivityList bookings={mockBookings} />);

    expect(screen.getByText("João Silva")).toBeInTheDocument();
    expect(screen.getByText("Maria Santos")).toBeInTheDocument();
  });

  it("exibe datas formatadas de check-in e check-out", () => {
    render(<ActivityList bookings={mockBookings} />);

    expect(screen.getByText(/28\/01\/2026 - 14:00/)).toBeInTheDocument();
    expect(screen.getByText(/30\/01\/2026 - 12:00/)).toBeInTheDocument();
  });

  it("exibe numero de hospedes", () => {
    render(<ActivityList bookings={mockBookings} />);

    const guestCounts = screen.getAllByText(/Hóspedes:/);
    expect(guestCounts).toHaveLength(2);
  });

  it("exibe valor total formatado", () => {
    render(<ActivityList bookings={mockBookings} />);

    expect(screen.getByText(/R\$ 500\.00/)).toBeInTheDocument();
    expect(screen.getByText(/R\$ 750\.00/)).toBeInTheDocument();
  });

  it("renderiza StatusBadge para cada booking", () => {
    render(<ActivityList bookings={mockBookings} />);

    expect(screen.getByText("Pendente")).toBeInTheDocument();
    expect(screen.getByText("Aceito")).toBeInTheDocument();
  });

  it("exibe botao Ver Detalhes apenas para bookings PENDING", () => {
    render(<ActivityList bookings={mockBookings} />);

    const buttons = screen.getAllByRole("button", { name: /Ver Detalhes/i });
    expect(buttons).toHaveLength(1);
  });

  it("nao exibe botao Ver Detalhes para bookings ACCEPTED", () => {
    const acceptedBookings = mockBookings.filter(
      (b) => b.status === BookingStatus.ACCEPTED,
    );
    render(<ActivityList bookings={acceptedBookings} />);

    expect(
      screen.queryByRole("button", { name: /Ver Detalhes/i }),
    ).not.toBeInTheDocument();
  });

  it("abre modal ao clicar em Ver Detalhes", async () => {
    const user = userEvent.setup();
    render(<ActivityList bookings={mockBookings} />);

    const button = screen.getByRole("button", { name: /Ver Detalhes/i });
    await user.click(button);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("exibe mensagem quando hospede nao informado", () => {
    const bookingWithoutGuest: BookingResponse = {
      ...mockBookings[0],
      guests: [],
    };

    render(<ActivityList bookings={[bookingWithoutGuest]} />);

    expect(screen.getByText("Não informado")).toBeInTheDocument();
  });

  it("formata preco com duas casas decimais", () => {
    render(<ActivityList bookings={mockBookings} />);

    expect(screen.getByText(/500\.00/)).toBeInTheDocument();
    expect(screen.getByText(/750\.00/)).toBeInTheDocument();
  });

  it("renderiza items com separador visual", () => {
    const { container } = render(<ActivityList bookings={mockBookings} />);

    const wrapper = container.querySelector(".divide-y");
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass("divide-gray-200");
  });

  it("aplica layout flex para cada item", () => {
    const { container } = render(<ActivityList bookings={mockBookings} />);

    const items = container.querySelectorAll(".py-4");
    items.forEach((item) => {
      expect(item).toHaveClass("flex");
      expect(item).toHaveClass("items-center");
      expect(item).toHaveClass("justify-between");
    });
  });

  it("fecha modal ao mudar estado de open", async () => {
    const user = userEvent.setup();
    render(<ActivityList bookings={mockBookings} />);

    const button = screen.getByRole("button", { name: /Ver Detalhes/i });
    await user.click(button);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renderiza multiplos bookings com diferentes status", () => {
    const mixedBookings = [
      { ...mockBookings[0], status: BookingStatus.PENDING },
      { ...mockBookings[1], status: BookingStatus.ACCEPTED },
    ];

    render(<ActivityList bookings={mixedBookings} />);

    expect(screen.getByText("Pendente")).toBeInTheDocument();
    expect(screen.getByText("Aceito")).toBeInTheDocument();
  });
});
