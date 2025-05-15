
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import SearchBar from '@/components/SearchBar';
import BookCard from '@/components/BookCard';
import { toast } from 'sonner';
import { Book, searchBooks, getAllBooks } from '@/lib/bookService';

const Books = () => {
  const navigate = useNavigate();
  const [booksData, setBooks] = useState<Book[]>(getAllBooks());
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Округляем рейтинги для корректного отображения
  const books = booksData.map(book => ({
    ...book,
    rating: book.rating ? Math.round(book.rating) : undefined
  }));
  
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
    // Сохраняем тип рекомендаций и переходим прямо к рекомендациям
    sessionStorage.setItem('recommendationType', 'movies');
    navigate('/recommendations');
    toast.info('Переход к подобранным фильмам на основе выбранных книг');
  };

  const toggleSearchVisibility = () => {
    setShowSearch(prev => !prev);
    // Scroll to search bar when it becomes visible
    if (!showSearch && searchRef.current) {
      setTimeout(() => {
        searchRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-litflix-cream">
      {/* Background image with overlay */}
      <div className="page-background">
        <img 
          src="/lovable-uploads/1e4b35df-8f96-4d6c-8aae-98d8a370407f.png" 
          alt="Books with plants" 
          className="page-background-image opacity-60"
        />
        <div className="page-background-overlay" />
      </div>

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

      <Header onSearchClick={toggleSearchVisibility} />
      
      <main className="container max-w-5xl mx-auto px-4 pt-8 pb-20">
        <div className="flex justify-between items-center mb-6">
          <BackButton onClick={() => navigate('/')} />
        </div>
        
        <div ref={searchRef} className={`transition-all duration-300 ease-in-out overflow-hidden ${showSearch ? 'max-h-20 opacity-100 mb-10' : 'max-h-0 opacity-0'}`}>
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <h2 className="text-2xl font-serif font-semibold text-litflix-darkGreen mb-6">
          Выберите книги, которые вам нравятся
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {books.map(book => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              rating={book.rating}
              selected={selectedBooks.includes(book.id)}
              onClick={() => toggleBookSelection(book.id)}
            />
          ))}
        </div>
        
        {selectedBooks.length > 0 && (
          <div className="mb-6 p-4 bg-litflix-paleYellow/50 rounded-lg">
            <p className="text-litflix-darkGreen text-center">
              Выбрано книг: <span className="font-bold">{selectedBooks.length}</span>
            </p>
          </div>
        )}
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleFindRecommendations}
            className="bg-litflix-mediumGreen text-white font-medium py-3 px-8 rounded-full
                     shadow-md transition-all duration-300 ease-out
                     hover:shadow-lg hover:bg-litflix-darkGreen active:scale-[0.98]"
          >
            Подобрать фильмы
          </button>
          
          <button
            onClick={() => navigate('/favorites')}
            className="bg-white text-litflix-mediumGreen font-medium py-3 px-8 rounded-full
                     border border-litflix-mediumGreen shadow-md transition-all duration-300 ease-out
                     hover:bg-litflix-mediumGreen/10 active:scale-[0.98]"
          >
            Избранное
          </button>
        </div>
      </main>
    </div>
  );
};

export default Books;
