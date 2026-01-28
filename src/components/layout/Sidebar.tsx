import logo from "@/assets/logo.svg";
import { IconName, getIcon } from "@/components/shared/icons";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

export interface SidebarItem {
  title: string;
  href: string;
  icon: IconName;
}

interface SidebarProps {
  items: SidebarItem[];
  title?: string;
  subtitle?: string;
}

export function Sidebar({ items, title, subtitle }: SidebarProps) {
  return (
    <aside className="w-64 border-r bg-card min-h-screen flex flex-col">
      <nav className="flex-1 pl-4 pr-4 space-y-1 pt-16">
        {items.map((item) => {
          const IconComponent = getIcon(item.icon);
          return (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href.split("/").length === 2}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  "hover:bg-accent",
                  isActive ? "bg-accent text-[#FF385C]" : "text-[#314158]",
                )
              }
            >
              <IconComponent className="h-5 w-5" />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
