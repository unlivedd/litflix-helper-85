
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookRating from './BookRating';
import { getAllBooks } from '@/lib/bookService';
import { isInFavorites, toggleFavorite, FavoriteItem } from '@/lib/favoritesService';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

const TopRatedBooks = () => {
  const navigate = useNavigate();
  const [favoriteStates, setFavoriteStates] = useState<Record<number, boolean>>({});
  
  // Получаем книги и сортируем по рейтингу
  const books = getAllBooks()
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5); // Берем только топ-5
    
  // Update favorite states when component mounts or when favorites change
  useEffect(() => {
    const updateFavoriteStates = () => {
      const newStates: Record<number, boolean> = {};
      books.forEach(book => {
        newStates[book.id] = isInFavorites(book.id, 'book');
      });
      setFavoriteStates(newStates);
    };
    
    // Initial state
    updateFavoriteStates();
    
    // Listen for changes in favorites
    const handleFavoritesChanged = () => {
      updateFavoriteStates();
    };
    
    window.addEventListener('favorites-changed', handleFavoritesChanged);
    window.addEventListener('storage', handleFavoritesChanged);
    
    return () => {
      window.removeEventListener('favorites-changed', handleFavoritesChanged);
      window.removeEventListener('storage', handleFavoritesChanged);
    };
  }, [books]);

  const handleFavoriteToggle = (e: React.MouseEvent, book: any) => {
    e.stopPropagation();
    
    const favoriteItem: FavoriteItem = {
      id: book.id,
      type: 'book',
      title: book.title,
      subtitle: book.author
    };
    
    const isNowFavorite = toggleFavorite(favoriteItem);
    
    // Update local state immediately for a responsive UI
    setFavoriteStates(prev => ({
      ...prev,
      [book.id]: isNowFavorite
    }));
    
    toast.success(isNowFavorite 
      ? `"${book.title}" добавлено в избранное` 
      : `"${book.title}" удалено из избранного`
    );
  };

  return (
    <div className="mt-12 pb-16">
      <div className="max-w-4xl mx-auto">
        {books.map((book, index) => {
          const isFavorite = favoriteStates[book.id] || false;
          
          return (
            <div 
              key={book.id}
              onClick={() => navigate(`/book/${book.id}`)}
              className="flex items-center bg-white/80 backdrop-blur-sm rounded-xl p-3 mb-3 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 flex items-center justify-center font-bold text-lg text-litflix-darkGreen rounded-full bg-litflix-paleYellow mr-4 shrink-0">
                {index + 1}
              </div>
              
              <div className="flex-grow">
                <h3 className="font-serif font-medium text-lg text-litflix-darkGreen">{book.title}</h3>
                <p className="text-sm text-litflix-darkGreen/70 italic">{book.author}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="shrink-0">
                  <BookRating rating={book.rating || 0} size="sm" useImages={false} />
                </div>
                
                <button
                  onClick={(e) => handleFavoriteToggle(e, book)}
                  className={`p-1.5 rounded-full transition-all duration-300 shrink-0 ${
                    isFavorite
                      ? "text-white bg-litflix-darkGreen" 
                      : "text-litflix-darkGreen/70 bg-white/50 hover:bg-white/80"
                  }`}
                >
                  <Heart size={16} fill={isFavorite ? "white" : "none"} />
                </button>
              </div>
            </div>
          );
        })}
        
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/books')}
            className="bg-litflix-mediumGreen text-white px-6 py-2 rounded-full transition-colors hover:bg-litflix-darkGreen"
          >
            Смотреть все книги
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopRatedBooks;
