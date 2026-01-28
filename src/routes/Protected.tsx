import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";
import type { UserType } from "@/types";

export function Protected({ roles }: { roles?: UserType[] }) {
  const user = useAuthStore((s) => s.user);
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.userType)) {
    return (
      <Navigate
        to={user.userType === "ADMIN" ? "/admin" : "/airport"}
        replace
      />
    );
  }
  return <Outlet />;
}
