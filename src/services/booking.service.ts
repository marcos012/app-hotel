import { BookingResponse, BookingStatus } from "@/types";
import { api } from "./api";

const mockBookings: BookingResponse[] = [
  {
    id: 1,
    userId: 101,
    room: {
      id: 1,
      number: "205",
      type: "Suite Executiva",
      floor: 2,
      capacity: 2,
      pricePerNight: 450.0,
      amenities: ["Wi-Fi", "TV a cabo", "Ar condicionado", "Frigobar"],
    },
    hotelId: 1,
    checkInDate: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    checkOutDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    totalPrice: 1350.0,
    status: BookingStatus.PENDING,
    guests: [
      {
        id: 1,
        name: "João Silva",
        document: "123.456.789-00",
        email: "joao@example.com",
        phone: "(11) 98765-4321",
      },
    ],
    createdAt: new Date().toISOString(),
    parkingRequested: false,
    parkingTotalPrice: 0,
    breakfastIncluded: true,
    breakfastTotalPrice: 90.0,
    numberOfNights: 3,
    roomRate: 450.0,
    operationType: "CHECK_IN" as any,
  },
  {
    id: 2,
    userId: 102,
    room: {
      id: 2,
      number: "310",
      type: "Quarto Duplo Standard",
      floor: 3,
      capacity: 2,
      pricePerNight: 320.0,
      amenities: ["Wi-Fi", "TV a cabo", "Ar condicionado"],
    },
    hotelId: 1,
    checkInDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    checkOutDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    totalPrice: 1600.0,
    status: BookingStatus.ACCEPTED,
    guests: [
      {
        id: 2,
        name: "Ana Costa",
        document: "987.654.321-00",
        email: "ana@example.com",
        phone: "(11) 91234-5678",
      },
      {
        id: 3,
        name: "Pedro Oliveira",
        document: "456.789.123-00",
        email: "pedro@example.com",
        phone: "(11) 99876-5432",
      },
    ],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    parkingRequested: true,
    parkingTotalPrice: 125.0,
    breakfastIncluded: true,
    breakfastTotalPrice: 150.0,
    numberOfNights: 5,
    roomRate: 320.0,
    operationType: "CHECK_IN" as any,
  },
  {
    id: 3,
    userId: 103,
    room: {
      id: 3,
      number: "108",
      type: "Quarto Single",
      floor: 1,
      capacity: 1,
      pricePerNight: 250.0,
      amenities: ["Wi-Fi", "TV a cabo"],
    },
    hotelId: 1,
    checkInDate: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    checkOutDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    totalPrice: 500.0,
    status: BookingStatus.COMPLETED,
    guests: [
      {
        id: 4,
        name: "Roberto Lima",
        document: "321.654.987-00",
        email: "roberto@example.com",
        phone: "(11) 97654-3210",
      },
    ],
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    parkingRequested: false,
    parkingTotalPrice: 0,
    breakfastIncluded: false,
    breakfastTotalPrice: 0,
    numberOfNights: 2,
    roomRate: 250.0,
    operationType: "CHECK_OUT" as any,
  },
];

export const bookingService = {
  /**
   * Busca todos os bookings
   */
  async getBookings(): Promise<BookingResponse[]> {
    return api.mockApiCall(mockBookings);
  },

  /**
   * Busca um booking específico por ID
   */
  async getBookingById(id: number): Promise<BookingResponse | undefined> {
    const booking = mockBookings.find((b) => b.id === id);
    return api.mockApiCall(booking);
  },

  /**
   * Busca bookings por status
   */
  async getBookingsByStatus(status: BookingStatus): Promise<BookingResponse[]> {
    const filtered = mockBookings.filter((b) => b.status === status);
    return api.mockApiCall(filtered);
  },
};
