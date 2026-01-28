import {
  BookingResponse,
  BookingStatus,
  GuestResponse,
  RoomResponse,
} from "@/types";

export const createMockGuest = (
  overrides: Partial<GuestResponse> = {},
): GuestResponse => ({
  id: 1,
  name: "João Silva",
  document: "12345678900",
  email: "joao@example.com",
  phone: "11999999999",
  ...overrides,
});

export const createMockRoom = (
  overrides: Partial<RoomResponse> = {},
): RoomResponse => ({
  id: 1,
  number: "101",
  type: "Standard",
  floor: 1,
  capacity: 2,
  pricePerNight: 250,
  amenities: ["wifi", "tv"],
  ...overrides,
});

export const createMockBooking = (
  overrides: Partial<BookingResponse> = {},
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
  guests: [createMockGuest()],
  room: createMockRoom(),
  ...overrides,
});

export const waitForLoadingToFinish = async () => {
  await new Promise((resolve) => setTimeout(resolve, 0));
};
