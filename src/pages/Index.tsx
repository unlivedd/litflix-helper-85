
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import FindBookButton from '@/components/FindBookButton';
import SearchBar from '@/components/SearchBar';
import BookCard from '@/components/BookCard';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  
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

  const handleSearch = (query: string) => {
    toast.success(`Поиск по запросу: ${query}`);
    // In a real app, this would search the database
    navigate('/books');
  };

  const handleBookClick = (id: number) => {
    toast.info(`Выбрана книга ${id}`);
    // In a real app, this would show details or select the book
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-litflix-cream">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img 
          src="/lovable-uploads/dd4f5308-4d1e-4ec1-a29d-c90913eeebe1.png" 
          alt="Cozy reading space" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-litflix-paleYellow/30 to-litflix-paleYellow/70" />
      </div>

      {/* Simple header with just the logo */}
      <div className="pt-6 pb-4 text-center">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-litflix-darkGreen tracking-wider">
          <span className="text-litflix-darkGreen">B</span>
          <span className="text-litflix-darkGreen relative">
            <span className="absolute text-xs top-2 right-0">R.</span>
            O
          </span>
          <span className="text-litflix-darkGreen relative">
            <span className="absolute text-xs bottom-2 right-0">d.</span>
            O
          </span>
          <span className="text-litflix-darkGreen">K</span>
          <span className="text-litflix-darkGreen">S</span>
        </h1>
      </div>
      
      <main className="container mx-auto px-4 pt-4 pb-20">
        {/* Find Book Button centered */}
        <div className="flex justify-center mb-16 pt-10">
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
