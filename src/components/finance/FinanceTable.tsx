import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FinanceData } from "@/services/finance.service";

interface FinanceTableProps {
  data: FinanceData[];
  onViewDetails: (id: number) => void;
}

export function FinanceTable({ data, onViewDetails }: FinanceTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-[#E5E7EB]">
            <TableHead className="text-[#111827] font-semibold text-sm py-3.5 px-0">
              Hóspede
            </TableHead>
            <TableHead className="text-[#111827] font-semibold text-sm py-3.5 px-0">
              Reservas
            </TableHead>
            <TableHead className="text-[#111827] font-semibold text-sm py-3.5 px-0">
              Total a receber
            </TableHead>
            <TableHead className="text-right text-[#111827] font-semibold text-sm py-3.5 px-0"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} className="border-b border-[#E5E7EB]">
              <TableCell className="text-[#111827] font-normal text-sm py-4 px-0">
                {item.guestName}
              </TableCell>
              <TableCell className="text-[#6B7280] text-sm py-4 px-0">
                {item.bookings}
              </TableCell>
              <TableCell className="text-[#6B7280] text-sm py-4 px-0">
                {item.totalReceivable}
              </TableCell>
              <TableCell className="text-right py-4 px-0">
                <button
                  className="text-[#FF385C] text-sm font-medium hover:underline"
                  onClick={() => onViewDetails(item.id)}
                >
                  Detalhes
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
