import { SidebarItem } from "@/components/layout";
import { IconName } from "@/components/shared/icons";

export const airportMenuItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: "dashboard" as IconName,
  },
  {
    title: "Atividade",
    href: "/activities",
    icon: "page" as IconName,
  },
  {
    title: "Dados do hotel",
    href: "/configs",
    icon: "copy" as IconName,
  },
  {
    title: "Financeiro",
    href: "/finance",
    icon: "dollar" as IconName,
  },
];
