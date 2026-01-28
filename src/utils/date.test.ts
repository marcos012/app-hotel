import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  todayIso,
  monthIso,
  formattedDate,
  formattedTime,
  formatDateTime,
} from "./date";

describe("date utils", () => {
  describe("todayIso", () => {
    it("retorna data atual no formato ISO YYYY-MM-DD", () => {
      expect(todayIso).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it("retorna uma string de 10 caracteres", () => {
      expect(todayIso).toHaveLength(10);
    });
  });

  describe("monthIso", () => {
    it("retorna mes atual no formato ISO YYYY-MM", () => {
      expect(monthIso).toMatch(/^\d{4}-\d{2}$/);
    });

    it("retorna uma string de 7 caracteres", () => {
      expect(monthIso).toHaveLength(7);
    });

    it("extrai os primeiros 7 caracteres de todayIso", () => {
      expect(monthIso).toBe(todayIso.slice(0, 7));
    });
  });

  describe("formattedDate", () => {
    it("formata data no padrao brasileiro DD de mes por extenso de YYYY", () => {
      const date = new Date("2026-01-15T10:30:00");
      const result = formattedDate(date);
      expect(result).toMatch(/^\d{2} de \w+ de \d{4}$/);
    });

    it("formata corretamente Janeiro", () => {
      const date = new Date("2026-01-15T10:30:00");
      const result = formattedDate(date);
      expect(result).toContain("janeiro");
    });

    it("formata corretamente Dezembro", () => {
      const date = new Date("2026-12-25T10:30:00");
      const result = formattedDate(date);
      expect(result).toContain("dezembro");
    });

    it("preserva o dia com zero a esquerda", () => {
      const date = new Date("2026-01-05T10:30:00");
      const result = formattedDate(date);
      expect(result).toMatch(/^05 de/);
    });

    it("formata corretamente dias sem zero a esquerda", () => {
      const date = new Date("2026-01-15T10:30:00");
      const result = formattedDate(date);
      expect(result).toMatch(/^15 de/);
    });
  });

  describe("formattedTime", () => {
    it("formata hora no padrao brasileiro HH:MM", () => {
      const date = new Date("2026-01-15T10:30:00");
      const result = formattedTime(date);
      expect(result).toMatch(/^\d{2}:\d{2}/);
    });

    it("inclui informacao de timezone", () => {
      const date = new Date("2026-01-15T10:30:00");
      const result = formattedTime(date);
      expect(result).toMatch(/GMT|BRT|UTC/);
    });

    it("formata horas com zero a esquerda", () => {
      const date = new Date("2026-01-15T09:05:00");
      const result = formattedTime(date);
      expect(result).toMatch(/^09:05/);
    });

    it("formata horas sem zero a esquerda corretamente", () => {
      const date = new Date("2026-01-15T14:30:00");
      const result = formattedTime(date);
      expect(result).toMatch(/^14:30/);
    });

    it("mantem formato de 24 horas", () => {
      const date = new Date("2026-01-15T23:59:00");
      const result = formattedTime(date);
      expect(result).toMatch(/^23:59/);
    });
  });

  describe("formatDateTime", () => {
    it("formata datetime completo no formato DD/MM/YYYY - HH:MM", () => {
      const iso = "2026-01-15T10:30:00";
      const result = formatDateTime(iso);
      expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4} - \d{2}:\d{2}$/);
    });

    it("formata corretamente data especifica", () => {
      const iso = "2026-01-15T10:30:00";
      const result = formatDateTime(iso);
      expect(result).toBe("15/01/2026 - 10:30");
    });

    it("adiciona zeros a esquerda no dia", () => {
      const iso = "2026-01-05T08:15:00";
      const result = formatDateTime(iso);
      expect(result).toBe("05/01/2026 - 08:15");
    });

    it("adiciona zeros a esquerda no mes", () => {
      const iso = "2026-03-15T10:30:00";
      const result = formatDateTime(iso);
      expect(result).toBe("15/03/2026 - 10:30");
    });

    it("adiciona zeros a esquerda nas horas", () => {
      const iso = "2026-01-15T09:05:00";
      const result = formatDateTime(iso);
      expect(result).toBe("15/01/2026 - 09:05");
    });

    it("formata meia-noite corretamente", () => {
      const iso = "2026-01-15T00:00:00";
      const result = formatDateTime(iso);
      expect(result).toBe("15/01/2026 - 00:00");
    });

    it("formata final do dia corretamente", () => {
      const iso = "2026-01-15T23:59:00";
      const result = formatDateTime(iso);
      expect(result).toBe("15/01/2026 - 23:59");
    });

    it("lida com strings ISO com timezone", () => {
      const iso = "2026-01-15T10:30:00Z";
      const result = formatDateTime(iso);
      expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4} - \d{2}:\d{2}$/);
    });

    it("formata corretamente ultimo dia do ano", () => {
      const iso = "2026-12-31T23:59:00";
      const result = formatDateTime(iso);
      expect(result).toBe("31/12/2026 - 23:59");
    });

    it("formata corretamente primeiro dia do ano", () => {
      const iso = "2026-01-01T00:01:00";
      const result = formatDateTime(iso);
      expect(result).toBe("01/01/2026 - 00:01");
    });
  });
});
