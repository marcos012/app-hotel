import AirportLayout from "@/pages/AirportLayout";
import ConfigsPage from "@/pages/ConfigsPage";
import AirportDashboard from "@/pages/Dashboard";
import FinanceDetailPage from "@/pages/FinanceDetailPage";
import FinancePage from "@/pages/FinancePage";
import ActivitiesPage from "@/pages/ActivitiesPage";
import { Route, Routes } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AirportLayout />}>
        <Route index element={<AirportDashboard />} />
        <Route path="configs" element={<ConfigsPage />} />
        <Route path="activities" element={<ActivitiesPage />} />
        <Route path="finance" element={<FinancePage />} />
        <Route path="finance/:id" element={<FinanceDetailPage />} />
      </Route>
    </Routes>
  );
}
