
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import SearchBar from '@/components/SearchBar';
import BookCard from '@/components/BookCard';
import { toast } from 'sonner';
import { Book, searchBooks, getAllBooks } from '@/lib/bookService';

const Books = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>(getAllBooks());
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
  
  // Animation decorations
  const circlePositions = [
    { size: '500px', left: '-100px', top: '200px', delay: '0s' },
    { size: '600px', right: '-150px', bottom: '-150px', delay: '0.3s' },
  ];

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      setBooks(getAllBooks());
      return;
    }
    
    const results = searchBooks(query);
    setBooks(results);
    toast.success(`Найдено ${results.length} книг по запросу: ${query}`);
  };

  const toggleBookSelection = (id: number) => {
    setSelectedBooks(prev => 
      prev.includes(id) 
        ? prev.filter(bookId => bookId !== id) 
        : [...prev, id]
    );
  };

  const handleFindRecommendations = () => {
    if (selectedBooks.length === 0) {
      toast.error('Пожалуйста, выберите хотя бы одну книгу');
      return;
    }
    
    toast.success(`Выбрано книг: ${selectedBooks.length}`);
    navigate('/recommendations');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-litflix-cream">
      {/* Animated background circles */}
      {circlePositions.map((circle, index) => (
        <div
          key={index}
          className="circle-bg animate-pulse-gentle"
          style={{
            width: circle.size,
            height: circle.size,
            left: circle.left,
            right: circle.right,
            top: circle.top,
            bottom: circle.bottom,
            animationDelay: circle.delay,
          }}
        />
      ))}

      <Header />
      
      <main className="container max-w-5xl mx-auto px-4 pt-8 pb-20">
        <div className="flex justify-between items-center mb-6">
          <BackButton onClick={() => navigate('/')} />
        </div>
        
        <SearchBar onSearch={handleSearch} className="mb-10" />
        
        <h2 className="text-2xl font-serif font-semibold text-litflix-darkGreen mb-6">
          Выберите книги, которые вам нравятся
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {books.map(book => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              selected={selectedBooks.includes(book.id)}
              onClick={() => toggleBookSelection(book.id)}
            />
          ))}
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={handleFindRecommendations}
            className="bg-litflix-mediumGreen text-white font-medium py-3 px-8 rounded-full
                     shadow-md transition-all duration-300 ease-out
                     hover:shadow-lg hover:bg-litflix-darkGreen active:scale-[0.98]"
          >
            Найти рекомендации
          </button>
        </div>
      </main>
    </div>
  );
};

export default Books;
