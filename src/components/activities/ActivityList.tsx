import { useState } from "react";
import { StatusBadge } from "@/components/activities/StatusBadge";
import { BookingDetailModal } from "@/components/activities/BookingDetailModal";
import { Button } from "@/components/ui/button";
import { BookingResponse, BookingStatus } from "@/types";
import { formatDateTime } from "@/utils/date";
import { Eye } from "lucide-react";

interface ActivityListProps {
  bookings: BookingResponse[];
}

export function ActivityList({ bookings }: ActivityListProps) {
  const [selectedBooking, setSelectedBooking] =
    useState<BookingResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (booking: BookingResponse) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleAccept = (bookingId: number) => {
    console.log("Reserva aceita:", bookingId);
  };

  const handleReject = (bookingId: number) => {
    console.log("Reserva recusada:", bookingId);
  };

  return (
    <>
      <div className="divide-y divide-gray-200">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="flex items-center justify-between py-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-sm font-semibold text-[#111827]">
                  Quarto {booking.room?.number} - {booking.room?.type}
                </h3>
                <StatusBadge status={booking.status} />
              </div>
              <div className="text-sm text-[#6B7280]">
                <p>
                  <span className="font-medium">Hóspede principal:</span>{" "}
                  {booking.guests[0]?.name || "Não informado"}
                </p>
                <p>
                  <span className="font-medium">Check-in:</span>{" "}
                  {formatDateTime(booking.checkInDate)}
                </p>
                <p>
                  <span className="font-medium">Check-out:</span>{" "}
                  {formatDateTime(booking.checkOutDate)}
                </p>
                <p>
                  <span className="font-medium">Hóspedes:</span>{" "}
                  {booking.guests.length}
                </p>
                <p>
                  <span className="font-medium">Valor:</span> R${" "}
                  {booking.totalPrice.toFixed(2)}
                </p>
              </div>
            </div>

            {booking.status === BookingStatus.PENDING && (
              <div className="ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewDetails(booking)}
                  className="flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Ver Detalhes
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}
    </>
  );
}
