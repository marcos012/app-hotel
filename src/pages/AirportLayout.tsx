import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, Sidebar } from "@/components/layout";
import { airportMenuItems } from "@/config/airport-menu";
import { ChevronRight } from "lucide-react";

export default function AirportLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const breadcrumbItems = new Map<string, string>([
    ["", "Dashboard"],
    ["/dashboard", "Dashboard"],
    ["/configs", "Dados do hotel"],
    ["/activities", "Atividade"],
    ["/finance", "Financeiro"],
    ["/schedule", "Agenda"],
  ]);

  const isFinanceDetailPage = pathname.startsWith("/finance/");
  const currentBreadcrumb = breadcrumbItems.get(pathname);

  const getParentBreadcrumb = () => {
    if (isFinanceDetailPage) {
      return "Financeiro";
    }
    return currentBreadcrumb;
  };

  const handleBreadcrumbClick = () => {
    if (isFinanceDetailPage) {
      navigate("/finance");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex">
        <Sidebar
          items={airportMenuItems}
          title="Aeroporto"
          subtitle="Gestão de operações"
        />
        <div className="flex flex-col flex-1 min-h-screen">
          <main className="flex-1 p-6 space-y-6">
            <Breadcrumb>
              <>
                {isFinanceDetailPage ? (
                  <button
                    onClick={handleBreadcrumbClick}
                    className="text-sm font-medium text-[#6B7280] hover:text-[#878b93] transition-colors"
                  >
                    {getParentBreadcrumb()}
                  </button>
                ) : (
                  <span className="text-sm font-medium text-[#6B7280]">
                    {getParentBreadcrumb()}
                  </span>
                )}

                {isFinanceDetailPage && (
                  <>
                    <ChevronRight className="h-4 w-4 text-[#9CA3AF]" />
                    <span className="text-sm font-medium text-[#6B7280]">
                      Detalhes
                    </span>
                  </>
                )}
              </>
            </Breadcrumb>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
