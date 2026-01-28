export type UserType = "ADMIN" | "HOTEL";

export interface User {
  userId: string;
  fullName: string;
  email: string;
  userType: UserType;
  hotelCode?: string; // for HOTEL users
}

export interface Hotel {
  id: string;
  name: string;
  code: string; // unique identifier
  responsibleName: string;
  phone: string;
  email: string;
  cep: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    district: string;
  };
  location: {
    lat: number;
    lng: number;
  };
  active: boolean;
}

export interface HotelResponse {
  id: number;
  name: string;
  code: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  cnpj: string;
  latitude: number;
  longitude: number;
  description?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface HotelConfig {
  dailyRate: number; // daily room rate
  extraGuestFee: number; // fee per extra guest
  hasParking: boolean;
  parkingFee: number;
}

export type RequestStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "AUTO_REJECTED";

export interface ReservationRequest {
  id: string;
  hotelCode: string;
  guestName: string;
  type: "CHECK_IN" | "CHECK_OUT";
  scheduledAt: string; // ISO date
  status: RequestStatus;
  rejectionReason?: string;
  createdAt: string;
}

export interface DailyCount {
  date: string;
  count: number;
}

export interface FinancialSummary {
  byDay: { date: string; totalBRL: number }[];
  byGuest: { guestName: string; totalBRL: number }[];
  monthTotalBRL: number;
}

export enum BookingStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

export enum ServiceType {
  CHECK_IN = "CHECK_IN",
  CHECK_OUT = "CHECK_OUT",
  ROOM_SERVICE = "ROOM_SERVICE",
  PARKING = "PARKING",
  BREAKFAST = "BREAKFAST",
}

export interface GuestResponse {
  id: number;
  name: string;
  document: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
}

export interface RoomResponse {
  id: number;
  number: string;
  type: string; // SINGLE, DOUBLE, SUITE, etc
  floor: number;
  capacity: number;
  pricePerNight: number;
  amenities: string[];
}

export interface BookingResponse {
  id: number;
  userId: number;
  room?: RoomResponse;
  hotelId: number;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  status: BookingStatus;
  guests: GuestResponse[];
  createdAt: string;
  parkingRequested: boolean;
  parkingTotalPrice: number;
  breakfastIncluded: boolean;
  breakfastTotalPrice: number;
  numberOfNights: number;
  roomRate: number;
  operationType: ServiceType;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Page<T> {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
