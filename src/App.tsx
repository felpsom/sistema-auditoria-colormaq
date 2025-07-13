
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
import UsersPage from "./pages/UsersPage";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import { Loader2 } from "lucide-react";

const queryClient = new QueryClient();

const LoadingScreen: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
      <p className="text-gray-600">Carregando...</p>
    </div>
  </div>
);

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

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
              <Route path="/users" element={<UsersPage />} />
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
