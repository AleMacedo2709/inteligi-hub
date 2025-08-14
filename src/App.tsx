import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CiclosEstrategicos from "./pages/CiclosEstrategicos";
import PAAs from "./pages/PAAs";
import Indicadores from "./pages/Indicadores";
import Tarefas from "./pages/Tarefas";
import Relatorios from "./pages/Relatorios";
import SEI from "./pages/SEI";
import IAAssistant from "./pages/IAAssistant";
import Configuracoes from "./pages/Configuracoes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ciclos" element={<CiclosEstrategicos />} />
          <Route path="/paas" element={<PAAs />} />
          <Route path="/indicadores" element={<Indicadores />} />
          <Route path="/tarefas" element={<Tarefas />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/sei" element={<SEI />} />
          <Route path="/ia" element={<IAAssistant />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
