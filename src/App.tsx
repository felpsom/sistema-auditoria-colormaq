
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AuditProvider } from "@/contexts/AuditContext";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import AuditPage from "./pages/AuditPage";
import AuditListPage from "./pages/AuditListPage";
import UserSettingsPage from "./pages/UserSettingsPage";
import SystemSettingsPage from "./pages/SystemSettingsPage";
import NotFound from "./pages/NotFound";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";

const queryClient = new QueryClient();

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <AuditProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex pt-16">
          <Sidebar />
          <main className="flex-1 min-h-[calc(100vh-4rem)] overflow-x-auto">
            <div className="p-4 md:p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuditProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/audit/new" element={<AuditPage />} />
              <Route path="/audits" element={<AuditListPage />} />
              <Route path="/reports" element={<div>Relatórios em desenvolvimento</div>} />
              <Route path="/users" element={<div>Usuários em desenvolvimento</div>} />
              <Route path="/settings" element={<UserSettingsPage />} />
              <Route path="/settings/system" element={<SystemSettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
