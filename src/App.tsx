
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Books from "./pages/Books";
import Movies from "./pages/Movies";
import BookDetail from "./pages/BookDetail";
import Recommendations from "./pages/Recommendations";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect } from "react";
import { initializeDatabase } from "./lib/mongoService";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize MongoDB when the app loads
    initializeDatabase();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" closeButton theme="light" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/books" element={<Books />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
