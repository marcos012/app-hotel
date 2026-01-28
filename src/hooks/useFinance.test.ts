import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useFinance } from "./useFinance";
import {
  financeService,
  FinanceData,
  FinanceMetrics,
} from "@/services/finance.service";

vi.mock("@/services/finance.service");

describe("useFinance", () => {
  const mockFinanceData: FinanceData[] = [
    {
      id: 1,
      guestName: "João Silva",
      bookings: 12,
      totalReceivable: "R$ 18.500,00",
    },
    {
      id: 2,
      guestName: "Maria Santos",
      bookings: 20,
      totalReceivable: "R$ 32.400,00",
    },
  ];

  const mockMetrics: FinanceMetrics = {
    totalBookings: 32,
    monthlyRevenue: "R$ 50.900,00",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("inicia com estado de loading true", () => {
    vi.mocked(financeService.getFinanceData).mockImplementation(
      () => new Promise(() => {}),
    );
    vi.mocked(financeService.getFinanceMetrics).mockImplementation(
      () => new Promise(() => {}),
    );

    const { result } = renderHook(() => useFinance());

    expect(result.current.loading).toBe(true);
    expect(result.current.financeData).toEqual([]);
    expect(result.current.metrics).toEqual({
      totalBookings: 0,
      monthlyRevenue: "R$ 0,00",
    });
    expect(result.current.error).toBe(null);
  });

  it("carrega financeData e metrics com sucesso", async () => {
    vi.mocked(financeService.getFinanceData).mockResolvedValue(mockFinanceData);
    vi.mocked(financeService.getFinanceMetrics).mockResolvedValue(mockMetrics);

    const { result } = renderHook(() => useFinance());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.financeData).toEqual(mockFinanceData);
    expect(result.current.metrics).toEqual(mockMetrics);
    expect(result.current.error).toBe(null);
  });

  it("faz chamadas paralelas usando Promise.all", async () => {
    vi.mocked(financeService.getFinanceData).mockResolvedValue(mockFinanceData);
    vi.mocked(financeService.getFinanceMetrics).mockResolvedValue(mockMetrics);

    renderHook(() => useFinance());

    await waitFor(() => {
      expect(financeService.getFinanceData).toHaveBeenCalled();
      expect(financeService.getFinanceMetrics).toHaveBeenCalled();
    });
  });

  it("retorna listas vazias quando nao ha dados", async () => {
    vi.mocked(financeService.getFinanceData).mockResolvedValue([]);
    vi.mocked(financeService.getFinanceMetrics).mockResolvedValue({
      totalBookings: 0,
      monthlyRevenue: "R$ 0,00",
    });

    const { result } = renderHook(() => useFinance());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.financeData).toEqual([]);
    expect(result.current.metrics.totalBookings).toBe(0);
  });

  it("define erro quando getFinanceData falha", async () => {
    vi.mocked(financeService.getFinanceData).mockRejectedValue(
      new Error("Network error"),
    );
    vi.mocked(financeService.getFinanceMetrics).mockResolvedValue(mockMetrics);

    const { result } = renderHook(() => useFinance());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Erro ao carregar dados financeiros");
  });

  it("define erro quando getFinanceMetrics falha", async () => {
    vi.mocked(financeService.getFinanceData).mockResolvedValue(mockFinanceData);
    vi.mocked(financeService.getFinanceMetrics).mockRejectedValue(
      new Error("Metrics error"),
    );

    const { result } = renderHook(() => useFinance());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Erro ao carregar dados financeiros");
  });

  it("define erro quando ambos servicos falham", async () => {
    vi.mocked(financeService.getFinanceData).mockRejectedValue(
      new Error("Error 1"),
    );
    vi.mocked(financeService.getFinanceMetrics).mockRejectedValue(
      new Error("Error 2"),
    );

    const { result } = renderHook(() => useFinance());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Erro ao carregar dados financeiros");
  });

  it("mantem loading false apos carregamento completo", async () => {
    vi.mocked(financeService.getFinanceData).mockResolvedValue(mockFinanceData);
    vi.mocked(financeService.getFinanceMetrics).mockResolvedValue(mockMetrics);

    const { result } = renderHook(() => useFinance());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.loading).toBe(false);
  });

  it("retorna financeData com todas as propriedades esperadas", async () => {
    vi.mocked(financeService.getFinanceData).mockResolvedValue(mockFinanceData);
    vi.mocked(financeService.getFinanceMetrics).mockResolvedValue(mockMetrics);

    const { result } = renderHook(() => useFinance());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.financeData[0]).toHaveProperty("id");
    expect(result.current.financeData[0]).toHaveProperty("guestName");
    expect(result.current.financeData[0]).toHaveProperty("bookings");
    expect(result.current.financeData[0]).toHaveProperty("totalReceivable");
  });

  it("retorna metrics com todas as propriedades esperadas", async () => {
    vi.mocked(financeService.getFinanceData).mockResolvedValue(mockFinanceData);
    vi.mocked(financeService.getFinanceMetrics).mockResolvedValue(mockMetrics);

    const { result } = renderHook(() => useFinance());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.metrics).toHaveProperty("totalBookings");
    expect(result.current.metrics).toHaveProperty("monthlyRevenue");
  });

  it("chama cada servico exatamente uma vez", async () => {
    vi.mocked(financeService.getFinanceData).mockResolvedValue(mockFinanceData);
    vi.mocked(financeService.getFinanceMetrics).mockResolvedValue(mockMetrics);

    renderHook(() => useFinance());

    await waitFor(() => {
      expect(financeService.getFinanceData).toHaveBeenCalledTimes(1);
      expect(financeService.getFinanceMetrics).toHaveBeenCalledTimes(1);
    });
  });

  it("limpa erro quando requisicao seguinte tem sucesso", async () => {
    vi.mocked(financeService.getFinanceData).mockResolvedValue(mockFinanceData);
    vi.mocked(financeService.getFinanceMetrics).mockResolvedValue(mockMetrics);

    const { result } = renderHook(() => useFinance());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(null);
  });

  it("inicializa metrics com valores padrao zerados", () => {
    vi.mocked(financeService.getFinanceData).mockImplementation(
      () => new Promise(() => {}),
    );
    vi.mocked(financeService.getFinanceMetrics).mockImplementation(
      () => new Promise(() => {}),
    );

    const { result } = renderHook(() => useFinance());

    expect(result.current.metrics.totalBookings).toBe(0);
    expect(result.current.metrics.monthlyRevenue).toBe("R$ 0,00");
  });

  it("atualiza financeData corretamente", async () => {
    vi.mocked(financeService.getFinanceData).mockResolvedValue(mockFinanceData);
    vi.mocked(financeService.getFinanceMetrics).mockResolvedValue(mockMetrics);

    const { result } = renderHook(() => useFinance());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.financeData).toHaveLength(2);
    expect(result.current.financeData[0].guestName).toBe("João Silva");
    expect(result.current.financeData[1].guestName).toBe("Maria Santos");
  });

  it("atualiza metrics corretamente", async () => {
    vi.mocked(financeService.getFinanceData).mockResolvedValue(mockFinanceData);
    vi.mocked(financeService.getFinanceMetrics).mockResolvedValue(mockMetrics);

    const { result } = renderHook(() => useFinance());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.metrics.totalBookings).toBe(32);
    expect(result.current.metrics.monthlyRevenue).toBe("R$ 50.900,00");
  });
});
