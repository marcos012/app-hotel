import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusBadge } from "./StatusBadge";
import { BookingStatus } from "@/types";

describe("StatusBadge", () => {
  it("renderiza badge PENDING com estilo correto", () => {
    render(<StatusBadge status={BookingStatus.PENDING} />);

    const badge = screen.getByText("Pendente");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-yellow-100");
    expect(badge).toHaveClass("text-yellow-800");
  });

  it("renderiza badge ACCEPTED com estilo correto", () => {
    render(<StatusBadge status={BookingStatus.ACCEPTED} />);

    const badge = screen.getByText("Aceito");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-green-100");
    expect(badge).toHaveClass("text-green-800");
  });

  it("renderiza badge COMPLETED com estilo correto", () => {
    render(<StatusBadge status={BookingStatus.COMPLETED} />);

    const badge = screen.getByText("Concluído");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-blue-100");
    expect(badge).toHaveClass("text-blue-800");
  });

  it("renderiza badge REJECTED com estilo correto", () => {
    render(<StatusBadge status={BookingStatus.REJECTED} />);

    const badge = screen.getByText("Recusado");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-red-100");
    expect(badge).toHaveClass("text-red-800");
  });

  it("renderiza badge CANCELLED com estilo correto", () => {
    render(<StatusBadge status={BookingStatus.CANCELLED} />);

    const badge = screen.getByText("Cancelado");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-gray-100");
    expect(badge).toHaveClass("text-gray-800");
  });

  it("aplica classes de formatacao base em todos os badges", () => {
    const { rerender } = render(<StatusBadge status={BookingStatus.PENDING} />);

    let badge = screen.getByText("Pendente");
    expect(badge).toHaveClass("inline-flex");
    expect(badge).toHaveClass("rounded-full");
    expect(badge).toHaveClass("px-3");
    expect(badge).toHaveClass("py-1");
    expect(badge).toHaveClass("text-xs");
    expect(badge).toHaveClass("font-semibold");

    rerender(<StatusBadge status={BookingStatus.ACCEPTED} />);
    badge = screen.getByText("Aceito");
    expect(badge).toHaveClass("inline-flex");
    expect(badge).toHaveClass("rounded-full");
  });

  it("renderiza como span element", () => {
    render(<StatusBadge status={BookingStatus.PENDING} />);

    const badge = screen.getByText("Pendente");
    expect(badge.tagName).toBe("SPAN");
  });

  it("mapeia todos os status corretamente", () => {
    const statuses = [
      { status: BookingStatus.PENDING, label: "Pendente" },
      { status: BookingStatus.ACCEPTED, label: "Aceito" },
      { status: BookingStatus.COMPLETED, label: "Concluído" },
      { status: BookingStatus.REJECTED, label: "Recusado" },
      { status: BookingStatus.CANCELLED, label: "Cancelado" },
    ];

    statuses.forEach(({ status, label }) => {
      const { unmount } = render(<StatusBadge status={status} />);
      expect(screen.getByText(label)).toBeInTheDocument();
      unmount();
    });
  });

  it("texto do badge eh semanticamente correto em portugues", () => {
    render(<StatusBadge status={BookingStatus.PENDING} />);
    expect(screen.getByText("Pendente")).toBeInTheDocument();

    render(<StatusBadge status={BookingStatus.ACCEPTED} />);
    expect(screen.getByText("Aceito")).toBeInTheDocument();
  });
});
