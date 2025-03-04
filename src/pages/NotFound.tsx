
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="page-background">
        <img 
          src="/lovable-uploads/6bd4d17c-d1eb-4359-95ec-30b5ffc3d9f8.png" 
          alt="Background with books" 
          className="page-background-image opacity-30"
        />
        <div className="absolute inset-0 bg-litflix-cream/80" />
      </div>
      
      <div className="text-center max-w-md relative z-10">
        <h1 className="text-6xl font-serif font-bold text-litflix-darkGreen mb-4">404</h1>
        <p className="text-xl text-litflix-darkGreen/80 mb-8">
          Упс! Страница не найдена
        </p>
        <div className="h-40 w-40 mx-auto mb-8 relative">
          <div className="absolute inset-0 book-card transform rotate-12">
            <div className="book-cover"></div>
            <div className="book-spine"></div>
          </div>
          <div className="absolute inset-0 book-card transform -rotate-6">
            <div className="book-cover"></div>
            <div className="book-spine"></div>
          </div>
        </div>
        <Button 
          onClick={() => navigate("/")}
          className="bg-litflix-mediumGreen hover:bg-litflix-darkGreen text-white font-medium px-6"
        >
          Вернуться на главную
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
