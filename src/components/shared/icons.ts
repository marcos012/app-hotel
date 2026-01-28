import {
  LayoutDashboard,
  FileText,
  Copy,
  DollarSign,
  Users,
  Clock,
  CheckCircle2,
  Calendar,
  Plane,
  Filter,
  LucideIcon,
} from "lucide-react";

export const iconMap = {
  dashboard: LayoutDashboard,
  page: FileText,
  copy: Copy,
  dollar: DollarSign,
  users: Users,
  clock: Clock,
  "check-mark-circle": CheckCircle2,
  calendar: Calendar,
  plane: Plane,
  filter: Filter,
} as const;

export type IconName = keyof typeof iconMap;

export const getIcon = (name: IconName): LucideIcon => {
  return iconMap[name];
};
