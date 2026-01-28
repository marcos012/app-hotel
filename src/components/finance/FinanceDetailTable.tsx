import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookingDetail } from "@/services/finance.service";

interface FinanceDetailTableProps {
  bookings: BookingDetail[];
  guestName: string;
}

export function FinanceDetailTable({
  bookings,
  guestName,
}: FinanceDetailTableProps) {
  return (
    <div className="rounded-2xl border border-[#E4E7EC] bg-white">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold text-[#1D2939]">{guestName}</h1>
          <p className="text-xs font-medium text-[#71717B]">
            Detalhes de reservas
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 py-3 text-sm font-medium text-[#FF385C] shadow-sm hover:bg-gray-50"
        >
          <span>Gerar Comprovante</span>
        </button>
      </div>

      <div className="px-6 pb-3">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#E5E7EB]">
                <TableHead className="text-[#111827] font-semibold text-sm py-3.5 px-0">
                  Data/Hora
                </TableHead>
                <TableHead className="text-[#111827] font-semibold text-sm py-3.5 px-0">
                  Responsável
                </TableHead>
                <TableHead className="text-[#111827] font-semibold text-sm py-3.5 px-0">
                  Tarifa a receber
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking, index) => (
                <TableRow key={index} className="border-b border-[#E5E7EB]">
                  <TableCell className="text-[#111827] font-normal text-sm py-4 px-0">
                    {booking.datetime}
                  </TableCell>
                  <TableCell className="text-[#6B7280] text-sm py-4 px-0">
                    {booking.pilot}
                  </TableCell>
                  <TableCell className="text-[#6B7280] text-sm py-4 px-0">
                    {booking.tariff}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
