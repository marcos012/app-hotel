import { api } from "./api";

export interface FinanceData {
  id: number;
  guestName: string;
  bookings: number;
  totalReceivable: string;
}

export interface BookingDetail {
  datetime: string;
  pilot: string;
  tariff: string;
}

export interface FinanceMetrics {
  totalBookings: number;
  monthlyRevenue: string;
}

const mockFinanceData: FinanceData[] = [
  {
    id: 1,
    guestName: "João Silva - Corporativo",
    bookings: 12,
    totalReceivable: "R$ 18.500,00",
  },
  {
    id: 2,
    guestName: "Maria Santos - Empresarial",
    bookings: 20,
    totalReceivable: "R$ 32.400,00",
  },
  {
    id: 3,
    guestName: "Pedro Costa - Lazer",
    bookings: 4,
    totalReceivable: "R$ 5.600,00",
  },
  {
    id: 4,
    guestName: "Ana Oliveira - Eventos",
    bookings: 2,
    totalReceivable: "R$ 3.200,00",
  },
  {
    id: 5,
    guestName: "Carlos Mendes - Turismo",
    bookings: 1,
    totalReceivable: "R$ 1.450,00",
  },
  {
    id: 6,
    guestName: "Roberto Lima - Negócios",
    bookings: 40,
    totalReceivable: "R$ 68.000,00",
  },
  {
    id: 7,
    guestName: "Fernanda Souza - Corporativo",
    bookings: 12,
    totalReceivable: "R$ 19.200,00",
  },
  {
    id: 8,
    guestName: "Lucas Almeida - Eventos",
    bookings: 13,
    totalReceivable: "R$ 22.100,00",
  },
  {
    id: 9,
    guestName: "Juliana Rocha - Lazer",
    bookings: 5,
    totalReceivable: "R$ 7.250,00",
  },
  {
    id: 10,
    guestName: "Marcos Pereira - Negócios",
    bookings: 7,
    totalReceivable: "R$ 11.550,00",
  },
  {
    id: 11,
    guestName: "Patricia Dias - Corporativo",
    bookings: 12,
    totalReceivable: "R$ 18.500,00",
  },
  {
    id: 12,
    guestName: "Ricardo Santos - Turismo",
    bookings: 1,
    totalReceivable: "R$ 1.320,00",
  },
  {
    id: 13,
    guestName: "Camila Ferreira - Lazer",
    bookings: 2,
    totalReceivable: "R$ 2.800,00",
  },
  {
    id: 14,
    guestName: "Bruno Martins - Eventos",
    bookings: 2,
    totalReceivable: "R$ 3.400,00",
  },
];

const mockBookingDetails: BookingDetail[] = [
  {
    datetime: "20/02/2024 - 14:00",
    pilot: "Maria Fernandes",
    tariff: "R$ 1.450,00",
  },
  {
    datetime: "22/02/2024 - 15:00",
    pilot: "João Carlos",
    tariff: "R$ 1.280,00",
  },
  {
    datetime: "25/02/2024 - 10:00",
    pilot: "Ana Paula",
    tariff: "R$ 1.920,00",
  },
  {
    datetime: "28/02/2024 - 16:00",
    pilot: "Pedro Santos",
    tariff: "R$ 1.600,00",
  },
  {
    datetime: "02/03/2024 - 12:00",
    pilot: "Carlos Eduardo",
    tariff: "R$ 1.350,00",
  },
  {
    datetime: "05/03/2024 - 14:00",
    pilot: "Juliana Lima",
    tariff: "R$ 1.800,00",
  },
  {
    datetime: "08/03/2024 - 11:00",
    pilot: "Roberto Alves",
    tariff: "R$ 1.520,00",
  },
  {
    datetime: "12/03/2024 - 15:30",
    pilot: "Fernanda Costa",
    tariff: "R$ 1.680,00",
  },
  {
    datetime: "15/03/2024 - 13:00",
    pilot: "Lucas Oliveira",
    tariff: "R$ 1.450,00",
  },
  {
    datetime: "18/03/2024 - 10:30",
    pilot: "Patricia Souza",
    tariff: "R$ 1.920,00",
  },
  {
    datetime: "22/03/2024 - 16:00",
    pilot: "Marcos Silva",
    tariff: "R$ 1.280,00",
  },
];

export const financeService = {
  /**
   * Busca dados financeiros de todos os hóspedes
   */
  async getFinanceData(): Promise<FinanceData[]> {
    return api.mockApiCall(mockFinanceData);
  },

  /**
   * Busca métricas financeiras gerais
   */
  async getFinanceMetrics(): Promise<FinanceMetrics> {
    return api.mockApiCall({
      totalBookings: 137,
      monthlyRevenue: "R$ 215.370,00",
    });
  },

  /**
   * Busca detalhes de reservas de um hóspede específico
   */
  async getBookingDetails(guestId: number): Promise<BookingDetail[]> {
    return api.mockApiCall(mockBookingDetails);
  },

  /**
   * Busca nome do hóspede por ID
   */
  async getGuestName(guestId: number): Promise<string> {
    const guest = mockFinanceData.find((f) => f.id === guestId);
    return api.mockApiCall(guest?.guestName || "João Silva - Corporativo");
  },
};
