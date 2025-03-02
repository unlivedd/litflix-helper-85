
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import SearchBar from '@/components/SearchBar';
import BookCard from '@/components/BookCard';
import { toast } from 'sonner';

// Mock data for books
const mockBooks = [
  { id: 1, title: 'Война и мир', author: 'Лев Толстой' },
  { id: 2, title: 'Преступление и наказание', author: 'Фёдор Достоевский' },
  { id: 3, title: 'Мастер и Маргарита', author: 'Михаил Булгаков' },
  { id: 4, title: 'Анна Каренина', author: 'Лев Толстой' },
  { id: 5, title: 'Идиот', author: 'Фёдор Достоевский' },
  { id: 6, title: 'Евгений Онегин', author: 'Александр Пушкин' },
  { id: 7, title: 'Тихий Дон', author: 'Михаил Шолохов' },
  { id: 8, title: 'Герой нашего времени', author: 'Михаил Лермонтов' },
  { id: 9, title: 'Мёртвые души', author: 'Николай Гоголь' },
];

const Books = () => {
  const navigate = useNavigate();
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
  
  // Animation decorations
  const circlePositions = [
    { size: '500px', left: '-100px', top: '200px', delay: '0s' },
    { size: '600px', right: '-150px', bottom: '-150px', delay: '0.3s' },
  ];

  const handleSearch = (query: string) => {
    toast.success(`Поиск по запросу: ${query}`);
    // In a real app, this would filter the books
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
    <div className="min-h-screen relative overflow-hidden">
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
          {mockBooks.map(book => (
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
