import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Promos from "./pages/Promos";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    document.title = "Ваша Мебель";
    const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    if (favicon) {
      favicon.href = "https://cdn.poehali.dev/files/200d59c0-004c-41bc-940c-aa7be2c4b4ad.png";
    }
    
    // Обновляем мета-теги для SEO
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute("content", "Ваша Мебель — качественная мебель для вашего дома. Широкий ассортимент мебели: кухни, спальни, гостиные, столы, стулья и другие изделия.");
    }
    
    const metaKeywords = document.querySelector("meta[name='keywords']") || document.createElement("meta");
    metaKeywords.setAttribute("name", "keywords");
    metaKeywords.setAttribute("content", "мебель, купить мебель, качественная мебель, мебель для дома, кухни, спальни, гостиные");
    if (!metaKeywords.parentElement) {
      document.head.appendChild(metaKeywords);
    }
    
    // Обновляем Open Graph теги
    const ogTitle = document.querySelector("meta[property='og:title']");
    if (ogTitle) ogTitle.setAttribute("content", "Ваша Мебель");
    
    const ogDescription = document.querySelector("meta[property='og:description']");
    if (ogDescription) ogDescription.setAttribute("content", "Качественная мебель для вашего дома");
    
    const ogImage = document.querySelector("meta[property='og:image']");
    if (ogImage) ogImage.setAttribute("content", "https://cdn.poehali.dev/files/200d59c0-004c-41bc-940c-aa7be2c4b4ad.png");
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/promos" element={<Promos />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contacts" element={<Contacts />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;