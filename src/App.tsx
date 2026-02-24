import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import StudentLayout from "@/layouts/StudentLayout";
import StudentHome from "@/pages/student/StudentHome";
import PersonalChat from "@/pages/student/PersonalChat";
import GroupChat from "@/pages/student/GroupChat";
import AnonymousComplaint from "@/pages/student/AnonymousComplaint";
import RiskScore from "@/pages/student/RiskScore";
import AdminLayout from "@/layouts/AdminLayout";
import AdminOverview from "@/pages/admin/AdminOverview";
import FlaggedMessages from "@/pages/admin/FlaggedMessages";
import RiskAnalytics from "@/pages/admin/RiskAnalytics";
import AnonymousReports from "@/pages/admin/AnonymousReports";
import Announcements from "@/pages/admin/Announcements";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/student" element={<ProtectedRoute allowedRole="student"><StudentLayout /></ProtectedRoute>}>
              <Route index element={<StudentHome />} />
              <Route path="chats" element={<PersonalChat />} />
              <Route path="groups" element={<GroupChat />} />
              <Route path="complaint" element={<AnonymousComplaint />} />
              <Route path="risk" element={<RiskScore />} />
            </Route>

            <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminOverview />} />
              <Route path="flagged" element={<FlaggedMessages />} />
              <Route path="analytics" element={<RiskAnalytics />} />
              <Route path="reports" element={<AnonymousReports />} />
              <Route path="announcements" element={<Announcements />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
