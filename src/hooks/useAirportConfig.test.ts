import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useHotelConfig } from "./useAirportConfig";
import { configService, HotelConfig } from "@/services/config.service";
import { useNotificationStore } from "@/stores/notification";

vi.mock("@/services/config.service");
vi.mock("@/stores/notification");

describe("useHotelConfig", () => {
  const mockConfig: HotelConfig = {
    hotelName: "Hotel Test",
    description: "A beautiful hotel",
    available: true,
    autoAcceptBookings: false,
  };

  const mockAddNotification = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNotificationStore).mockReturnValue({
      addNotification: mockAddNotification,
      notifications: [],
      removeNotification: vi.fn(),
    });
  });

  it("inicia com estado de loading true", () => {
    vi.mocked(configService.getConfig).mockImplementation(
      () => new Promise(() => {}),
    );

    const { result } = renderHook(() => useHotelConfig());

    expect(result.current.loading).toBe(true);
    expect(result.current.saving).toBe(false);
  });

  it("carrega configuracao com sucesso", async () => {
    vi.mocked(configService.getConfig).mockResolvedValue(mockConfig);

    const { result } = renderHook(() => useHotelConfig());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(configService.getConfig).toHaveBeenCalledTimes(1);
  });

  it("reseta formulario com dados carregados", async () => {
    vi.mocked(configService.getConfig).mockResolvedValue(mockConfig);

    const { result } = renderHook(() => useHotelConfig());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.form.getValues()).toEqual(mockConfig);
  });

  it("exibe notificacao de erro quando falha ao carregar", async () => {
    vi.mocked(configService.getConfig).mockRejectedValue(
      new Error("Network error"),
    );

    renderHook(() => useHotelConfig());

    await waitFor(() => {
      expect(mockAddNotification).toHaveBeenCalledWith(
        "error",
        "Erro ao carregar configurações",
      );
    });
  });

  it("salva configuracoes com sucesso", async () => {
    vi.mocked(configService.getConfig).mockResolvedValue(mockConfig);
    vi.mocked(configService.saveConfig).mockResolvedValue(undefined);

    const { result } = renderHook(() => useHotelConfig());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.handleSave(mockConfig);
    });

    expect(configService.saveConfig).toHaveBeenCalledWith(mockConfig);
    expect(mockAddNotification).toHaveBeenCalledWith(
      "success",
      "Configurações salvas com sucesso!",
    );
  });

  it("define saving true durante salvamento", async () => {
    vi.mocked(configService.getConfig).mockResolvedValue(mockConfig);

    let resolveSave: () => void;
    vi.mocked(configService.saveConfig).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveSave = resolve as () => void;
        }),
    );

    const { result } = renderHook(() => useHotelConfig());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.handleSave(mockConfig);
    });

    await waitFor(() => {
      expect(result.current.saving).toBe(true);
    });

    await act(async () => {
      resolveSave!();
    });

    await waitFor(() => {
      expect(result.current.saving).toBe(false);
    });
  });

  it("exibe notificacao de erro quando falha ao salvar", async () => {
    vi.mocked(configService.getConfig).mockResolvedValue(mockConfig);
    vi.mocked(configService.saveConfig).mockRejectedValue(
      new Error("Save error"),
    );

    const { result } = renderHook(() => useHotelConfig());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.handleSave(mockConfig);
    });

    expect(mockAddNotification).toHaveBeenCalledWith(
      "error",
      "Erro ao salvar configurações",
    );
  });

  it("define saving false apos erro ao salvar", async () => {
    vi.mocked(configService.getConfig).mockResolvedValue(mockConfig);
    vi.mocked(configService.saveConfig).mockRejectedValue(
      new Error("Save error"),
    );

    const { result } = renderHook(() => useHotelConfig());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.handleSave(mockConfig);
    });

    expect(result.current.saving).toBe(false);
  });

  it("cancela edicao resetando o formulario", async () => {
    vi.mocked(configService.getConfig).mockResolvedValue(mockConfig);

    const { result } = renderHook(() => useHotelConfig());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.form.setValue("hotelName", "Modified Name");
    });

    expect(result.current.form.getValues("hotelName")).toBe("Modified Name");

    act(() => {
      result.current.handleCancel();
    });

    expect(result.current.form.getValues("hotelName")).toBe("Hotel Test");
  });

  it("retorna form com valores default iniciais", () => {
    vi.mocked(configService.getConfig).mockImplementation(
      () => new Promise(() => {}),
    );

    const { result } = renderHook(() => useHotelConfig());

    const defaultValues = result.current.form.getValues();
    expect(defaultValues.hotelName).toBe("");
    expect(defaultValues.description).toBe("");
    expect(defaultValues.available).toBe(true);
    expect(defaultValues.autoAcceptBookings).toBe(false);
  });

  it("chama getConfig uma vez no mount", async () => {
    vi.mocked(configService.getConfig).mockResolvedValue(mockConfig);

    renderHook(() => useHotelConfig());

    await waitFor(() => {
      expect(configService.getConfig).toHaveBeenCalledTimes(1);
    });
  });

  it("mantem loading false apos carregamento", async () => {
    vi.mocked(configService.getConfig).mockResolvedValue(mockConfig);

    const { result } = renderHook(() => useHotelConfig());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.loading).toBe(false);
  });

  it("mantem saving false inicialmente", () => {
    vi.mocked(configService.getConfig).mockImplementation(
      () => new Promise(() => {}),
    );

    const { result } = renderHook(() => useHotelConfig());

    expect(result.current.saving).toBe(false);
  });

  it("expoe todas as funcoes necessarias", async () => {
    vi.mocked(configService.getConfig).mockResolvedValue(mockConfig);

    const { result } = renderHook(() => useHotelConfig());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current).toHaveProperty("form");
    expect(result.current).toHaveProperty("loading");
    expect(result.current).toHaveProperty("saving");
    expect(result.current).toHaveProperty("handleSave");
    expect(result.current).toHaveProperty("handleCancel");
  });

  it("handleSave eh uma funcao", async () => {
    vi.mocked(configService.getConfig).mockResolvedValue(mockConfig);

    const { result } = renderHook(() => useHotelConfig());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(typeof result.current.handleSave).toBe("function");
  });

  it("handleCancel eh uma funcao", async () => {
    vi.mocked(configService.getConfig).mockResolvedValue(mockConfig);

    const { result } = renderHook(() => useHotelConfig());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(typeof result.current.handleCancel).toBe("function");
  });
});
