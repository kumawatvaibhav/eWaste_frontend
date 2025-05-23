
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/Dashboard";
import Transitions from "./pages/transaction";
import Listings from "./pages/Listings";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Impact from "./pages/Impact";
import Contact from "./pages/Contact";

// Initialize QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-right" closeButton richColors />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/settings" element={<Dashboard />} />
            <Route path="/dashboard/reviews" element={<Dashboard />} />
            <Route path="/transitions" element={<Transitions />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/about" element={<About />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
