import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookingResponse } from "@/types";
import { formatDateTime } from "@/utils/date";
import { StatusBadge } from "./StatusBadge";

interface BookingDetailModalProps {
  booking: BookingResponse;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: (bookingId: number) => void;
  onReject: (bookingId: number) => void;
}

const mockDetailedBookingData = (booking: BookingResponse) => {
  return {
    ...booking,
    detailedInfo: {
      confirmationCode: `BK-${booking.id.toString().padStart(6, "0")}`,
      specialRequests:
        booking.id % 2 === 0
          ? "Andar alto, cama de casal"
          : "Quarto silencioso, travesseiros extras",
      paymentMethod: booking.id % 3 === 0 ? "Cartão de Crédito" : "Pix",
      paymentStatus: "Pagamento pendente",
      estimatedArrival: "14:00",
      notes: "Hóspede VIP - oferecer upgrade se disponível",
      roomPreferences: {
        smokingAllowed: false,
        petFriendly: false,
        accessible: booking.id % 5 === 0,
      },
      contactInfo: {
        emergencyContact: "+55 11 98765-4321",
        emergencyName: "Maria Silva",
      },
    },
  };
};

export function BookingDetailModal({
  booking,
  open,
  onOpenChange,
  onAccept,
  onReject,
}: BookingDetailModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const detailedBooking = mockDetailedBookingData(booking);

  const handleAccept = async () => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));
    onAccept(booking.id);
    setIsLoading(false);
    onOpenChange(false);
  };

  const handleReject = async () => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));
    onReject(booking.id);
    setIsLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            Detalhes da Reserva
            <StatusBadge status={booking.status} />
          </DialogTitle>
          <DialogDescription>
            Código de confirmação:{" "}
            {detailedBooking.detailedInfo.confirmationCode}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Informações do Quarto */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-[#111827] mb-3">
              Informações do Quarto
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-[#6B7280]">Número:</span>
                <p className="font-medium text-[#111827]">
                  {booking.room?.number}
                </p>
              </div>
              <div>
                <span className="text-[#6B7280]">Tipo:</span>
                <p className="font-medium text-[#111827]">
                  {booking.room?.type}
                </p>
              </div>
              <div>
                <span className="text-[#6B7280]">Andar:</span>
                <p className="font-medium text-[#111827]">
                  {booking.room?.floor}º
                </p>
              </div>
              <div>
                <span className="text-[#6B7280]">Capacidade:</span>
                <p className="font-medium text-[#111827]">
                  {booking.room?.capacity} pessoas
                </p>
              </div>
            </div>
            {booking.room?.amenities && booking.room.amenities.length > 0 && (
              <div className="mt-3">
                <span className="text-sm text-[#6B7280]">Comodidades:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {booking.room.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Informações dos Hóspedes */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-[#111827] mb-3">
              Hóspedes ({booking.guests.length})
            </h3>
            <div className="space-y-3">
              {booking.guests.map((guest, index) => (
                <div key={guest.id} className="border-l-2 border-blue-500 pl-3">
                  <p className="font-medium text-[#111827]">
                    {index === 0 && "👤 Principal: "}
                    {guest.name}
                  </p>
                  <div className="text-sm text-[#6B7280] space-y-1 mt-1">
                    <p>Documento: {guest.document}</p>
                    {guest.email && <p>Email: {guest.email}</p>}
                    {guest.phone && <p>Telefone: {guest.phone}</p>}
                    {guest.dateOfBirth && (
                      <p>
                        Data de nascimento: {formatDateTime(guest.dateOfBirth)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Datas e Estadia */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-[#111827] mb-3">
              Período da Estadia
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-[#6B7280]">Check-in:</span>
                <p className="font-medium text-[#111827]">
                  {formatDateTime(booking.checkInDate)}
                </p>
                <p className="text-xs text-[#6B7280] mt-1">
                  Horário previsto:{" "}
                  {detailedBooking.detailedInfo.estimatedArrival}
                </p>
              </div>
              <div>
                <span className="text-[#6B7280]">Check-out:</span>
                <p className="font-medium text-[#111827]">
                  {formatDateTime(booking.checkOutDate)}
                </p>
              </div>
              <div className="col-span-2">
                <span className="text-[#6B7280]">Noites:</span>
                <p className="font-medium text-[#111827]">
                  {booking.numberOfNights}{" "}
                  {booking.numberOfNights === 1 ? "noite" : "noites"}
                </p>
              </div>
            </div>
          </div>

          {/* Valores e Serviços */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-[#111827] mb-3">
              Valores e Serviços
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#6B7280]">
                  Diária ({booking.numberOfNights}x):
                </span>
                <span className="font-medium text-[#111827]">
                  R$ {(booking.roomRate * booking.numberOfNights).toFixed(2)}
                </span>
              </div>
              {booking.parkingRequested && (
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">🅿️ Estacionamento:</span>
                  <span className="font-medium text-[#111827]">
                    R$ {booking.parkingTotalPrice.toFixed(2)}
                  </span>
                </div>
              )}
              {booking.breakfastIncluded && (
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">🍳 Café da manhã:</span>
                  <span className="font-medium text-[#111827]">
                    R$ {booking.breakfastTotalPrice.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between font-semibold">
                <span className="text-[#111827]">Total:</span>
                <span className="text-[#111827] text-lg">
                  R$ {booking.totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#6B7280]">Forma de pagamento:</span>
                <span className="text-[#6B7280]">
                  {detailedBooking.detailedInfo.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#6B7280]">Status do pagamento:</span>
                <span className="text-yellow-700 font-medium">
                  {detailedBooking.detailedInfo.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Preferências e Solicitações */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-[#111827] mb-3">
              Preferências e Solicitações
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-[#6B7280]">Solicitações especiais:</span>
                <p className="font-medium text-[#111827] mt-1">
                  {detailedBooking.detailedInfo.specialRequests}
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 text-[#6B7280]">
                  <input
                    type="checkbox"
                    checked={
                      detailedBooking.detailedInfo.roomPreferences
                        .smokingAllowed
                    }
                    disabled
                    className="rounded"
                  />
                  Fumante
                </label>
                <label className="flex items-center gap-2 text-[#6B7280]">
                  <input
                    type="checkbox"
                    checked={
                      detailedBooking.detailedInfo.roomPreferences.petFriendly
                    }
                    disabled
                    className="rounded"
                  />
                  Pet-friendly
                </label>
                <label className="flex items-center gap-2 text-[#6B7280]">
                  <input
                    type="checkbox"
                    checked={
                      detailedBooking.detailedInfo.roomPreferences.accessible
                    }
                    disabled
                    className="rounded"
                  />
                  Acessível
                </label>
              </div>
            </div>
          </div>

          {/* Contato de Emergência */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-[#111827] mb-3">
              Contato de Emergência
            </h3>
            <div className="text-sm space-y-1">
              <p className="text-[#6B7280]">
                Nome:{" "}
                <span className="font-medium text-[#111827]">
                  {detailedBooking.detailedInfo.contactInfo.emergencyName}
                </span>
              </p>
              <p className="text-[#6B7280]">
                Telefone:{" "}
                <span className="font-medium text-[#111827]">
                  {detailedBooking.detailedInfo.contactInfo.emergencyContact}
                </span>
              </p>
            </div>
          </div>

          {/* Notas Internas */}
          {detailedBooking.detailedInfo.notes && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-[#111827] mb-2">
                📝 Notas Internas
              </h3>
              <p className="text-sm text-[#6B7280]">
                {detailedBooking.detailedInfo.notes}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleReject}
            disabled={isLoading}
            className="bg-red-50 hover:bg-red-100 text-red-700 border-red-300"
          >
            {isLoading ? "Processando..." : "Recusar"}
          </Button>
          <Button
            onClick={handleAccept}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isLoading ? "Processando..." : "Aceitar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
