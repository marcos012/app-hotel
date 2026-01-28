import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

export const Breadcrumb = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav className="flex items-center gap-4">
      <Link
        to="/"
        className="flex h-5 w-5 items-center justify-center text-[#9CA3AF] hover:text-[#6B7280]"
      >
        <Home className="h-4 w-4" />
      </Link>
      <ChevronRight className="h-4 w-4 text-[#9CA3AF]" />
      {children}
    </nav>
  );
};
