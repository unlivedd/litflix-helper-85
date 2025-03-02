
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FindBookButton from '@/components/FindBookButton';
import BookCard from '@/components/BookCard';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  
  // Mock book data
  const books = [
    { id: 1, title: 'Книга 1', author: 'Автор 1' },
    { id: 2, title: 'Книга 2', author: 'Автор 2' },
    { id: 3, title: 'Книга 3', author: 'Автор 3' },
    { id: 4, title: 'Книга 4', author: 'Автор 4' },
    { id: 5, title: 'Книга 5', author: 'Автор 5' },
    { id: 6, title: 'Книга 6', author: 'Автор 6' },
    { id: 7, title: 'Книга 7', author: 'Автор 7' },
    { id: 8, title: 'Книга 8', author: 'Автор 8' },
    { id: 9, title: 'Книга 9', author: 'Автор 9' },
  ];

  const handleFindBook = () => {
    navigate('/questionnaire');
  };

  const handleBookClick = (id: number) => {
    toast.info(`Выбрана книга ${id}`);
    // In a real app, this would show details or select the book
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-litflix-cream">
      {/* Decorative elements */}
      <div className="circle-decoration circle-1"></div>
      <div className="circle-decoration circle-2"></div>
      <div className="book-decoration book-left"></div>
      <div className="book-decoration book-right"></div>

      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img 
          src="/lovable-uploads/c1af6f80-b0f1-4042-994f-f01bab5c20fd.png" 
          alt="Cozy reading space" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-litflix-cream/80 via-litflix-cream/70 to-litflix-cream/90" />
      </div>

      {/* BOOKS logo */}
      <div className="pt-8 pb-4 text-center">
        <h1 className="text-7xl font-serif font-bold tracking-wider inline-block text-litflix-darkGreen">
          <span className="relative">
            B
          </span>
          <span className="relative">
            <span className="absolute text-xs top-3 right-0 font-sans">R.</span>
            O
          </span>
          <span className="relative">
            <span className="absolute text-xs bottom-3 right-0 font-sans">d.</span>
            O
          </span>
          <span>K</span>
          <span>S</span>
        </h1>
      </div>
      
      <main className="container mx-auto px-4 pt-6 pb-20">
        {/* Find Book Button centered */}
        <div className="flex justify-center mb-16 pt-4">
          <FindBookButton onClick={handleFindBook} />
        </div>

        {/* Book cards grid */}
        <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
          {books.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              onClick={() => handleBookClick(book.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
