
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookRating from './BookRating';
import { getAllBooks } from '@/lib/bookService';

const TopRatedBooks = () => {
  const navigate = useNavigate();
  // Получаем книги и сортируем по рейтингу
  const books = getAllBooks()
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5); // Берем только топ-5

  return (
    <div className="mt-12 pb-16">
      <div className="max-w-4xl mx-auto">
        {books.map((book, index) => (
          <div 
            key={book.id}
            onClick={() => navigate(`/book/${book.id}`)}
            className="flex items-center bg-white/80 backdrop-blur-sm rounded-xl p-3 mb-3 cursor-pointer hover:shadow-md transition-shadow relative"
          >
            <div className="w-10 h-10 flex items-center justify-center font-bold text-lg text-litflix-darkGreen rounded-full bg-litflix-paleYellow mr-4 shrink-0">
              {index + 1}
            </div>
            
            <div className="flex-grow">
              <h3 className="font-serif font-medium text-lg text-litflix-darkGreen">{book.title}</h3>
              <p className="text-sm text-litflix-darkGreen/70 italic">{book.author}</p>
            </div>
            
            <div className="w-1/3 h-10 shrink-0 flex items-center">
              <BookRating rating={book.rating || 0} size="sm" useImages={true} />
            </div>
          </div>
        ))}
        
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
