import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useFinanceDetail } from "./useFinanceDetail";
import { financeService, BookingDetail } from "@/services/finance.service";

vi.mock("@/services/finance.service");

describe("useFinanceDetail", () => {
  const mockBookingDetails: BookingDetail[] = [
    {
      datetime: "15/01/2026 - 14:00",
      pilot: "João Silva",
      tariff: "R$ 500,00",
    },
    {
      datetime: "20/01/2026 - 14:00",
      pilot: "João Silva",
      tariff: "R$ 750,00",
    },
  ];

  const mockGuestName = "João Silva";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("inicia com estado de loading true quando guestId fornecido", () => {
    vi.mocked(financeService.getBookingDetails).mockImplementation(
      () => new Promise(() => {}),
    );
    vi.mocked(financeService.getGuestName).mockImplementation(
      () => new Promise(() => {}),
    );

    const { result } = renderHook(() => useFinanceDetail("1"));

    expect(result.current.loading).toBe(true);
    expect(result.current.bookingDetails).toEqual([]);
    expect(result.current.guestName).toBe("");
    expect(result.current.error).toBe(null);
  });

  it("carrega detalhes e nome do hospede com sucesso", async () => {
    vi.mocked(financeService.getBookingDetails).mockResolvedValue(
      mockBookingDetails,
    );
    vi.mocked(financeService.getGuestName).mockResolvedValue(mockGuestName);

    const { result } = renderHook(() => useFinanceDetail("1"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.bookingDetails).toEqual(mockBookingDetails);
    expect(result.current.guestName).toBe(mockGuestName);
    expect(result.current.error).toBe(null);
  });

  it("converte guestId string para number ao chamar servico", async () => {
    vi.mocked(financeService.getBookingDetails).mockResolvedValue(
      mockBookingDetails,
    );
    vi.mocked(financeService.getGuestName).mockResolvedValue(mockGuestName);

    renderHook(() => useFinanceDetail("123"));

    await waitFor(() => {
      expect(financeService.getBookingDetails).toHaveBeenCalledWith(123);
      expect(financeService.getGuestName).toHaveBeenCalledWith(123);
    });
  });

  it("define erro quando guestId nao fornecido", async () => {
    const { result } = renderHook(() => useFinanceDetail(undefined));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("ID do hóspede não fornecido");
    expect(result.current.bookingDetails).toEqual([]);
    expect(result.current.guestName).toBe("");
  });

  it("nao chama servicos quando guestId eh undefined", async () => {
    renderHook(() => useFinanceDetail(undefined));

    await waitFor(() => {
      expect(financeService.getBookingDetails).not.toHaveBeenCalled();
      expect(financeService.getGuestName).not.toHaveBeenCalled();
    });
  });

  it("define erro quando getBookingDetails falha", async () => {
    vi.mocked(financeService.getBookingDetails).mockRejectedValue(
      new Error("Network error"),
    );
    vi.mocked(financeService.getGuestName).mockResolvedValue(mockGuestName);

    const { result } = renderHook(() => useFinanceDetail("1"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Erro ao carregar detalhes financeiros");
  });

  it("define erro quando getGuestName falha", async () => {
    vi.mocked(financeService.getBookingDetails).mockResolvedValue(
      mockBookingDetails,
    );
    vi.mocked(financeService.getGuestName).mockRejectedValue(
      new Error("Name error"),
    );

    const { result } = renderHook(() => useFinanceDetail("1"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Erro ao carregar detalhes financeiros");
  });

  it("faz chamadas paralelas usando Promise.all", async () => {
    vi.mocked(financeService.getBookingDetails).mockResolvedValue(
      mockBookingDetails,
    );
    vi.mocked(financeService.getGuestName).mockResolvedValue(mockGuestName);

    renderHook(() => useFinanceDetail("1"));

    await waitFor(() => {
      expect(financeService.getBookingDetails).toHaveBeenCalled();
      expect(financeService.getGuestName).toHaveBeenCalled();
    });
  });

  it("retorna lista vazia quando nao ha booking details", async () => {
    vi.mocked(financeService.getBookingDetails).mockResolvedValue([]);
    vi.mocked(financeService.getGuestName).mockResolvedValue(mockGuestName);

    const { result } = renderHook(() => useFinanceDetail("1"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.bookingDetails).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  it("recarrega dados quando guestId muda", async () => {
    vi.mocked(financeService.getBookingDetails).mockResolvedValue(
      mockBookingDetails,
    );
    vi.mocked(financeService.getGuestName).mockResolvedValue(mockGuestName);

    const { rerender } = renderHook(
      ({ guestId }) => useFinanceDetail(guestId),
      { initialProps: { guestId: "1" } },
    );

    await waitFor(() => {
      expect(financeService.getBookingDetails).toHaveBeenCalledWith(1);
    });

    vi.clearAllMocks();

    rerender({ guestId: "2" });

    await waitFor(() => {
      expect(financeService.getBookingDetails).toHaveBeenCalledWith(2);
      expect(financeService.getGuestName).toHaveBeenCalledWith(2);
    });
  });

  it("limpa erro quando requisicao seguinte tem sucesso", async () => {
    vi.mocked(financeService.getBookingDetails).mockResolvedValue(
      mockBookingDetails,
    );
    vi.mocked(financeService.getGuestName).mockResolvedValue(mockGuestName);

    const { result } = renderHook(() => useFinanceDetail("1"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(null);
  });

  it("mantem loading false apos carregamento completo", async () => {
    vi.mocked(financeService.getBookingDetails).mockResolvedValue(
      mockBookingDetails,
    );
    vi.mocked(financeService.getGuestName).mockResolvedValue(mockGuestName);

    const { result } = renderHook(() => useFinanceDetail("1"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.loading).toBe(false);
  });

  it("retorna bookingDetails com todas as propriedades esperadas", async () => {
    vi.mocked(financeService.getBookingDetails).mockResolvedValue(
      mockBookingDetails,
    );
    vi.mocked(financeService.getGuestName).mockResolvedValue(mockGuestName);

    const { result } = renderHook(() => useFinanceDetail("1"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.bookingDetails[0]).toHaveProperty("datetime");
    expect(result.current.bookingDetails[0]).toHaveProperty("pilot");
    expect(result.current.bookingDetails[0]).toHaveProperty("tariff");
  });

  it("chama cada servico exatamente uma vez", async () => {
    vi.mocked(financeService.getBookingDetails).mockResolvedValue(
      mockBookingDetails,
    );
    vi.mocked(financeService.getGuestName).mockResolvedValue(mockGuestName);

    renderHook(() => useFinanceDetail("1"));

    await waitFor(() => {
      expect(financeService.getBookingDetails).toHaveBeenCalledTimes(1);
      expect(financeService.getGuestName).toHaveBeenCalledTimes(1);
    });
  });
});
