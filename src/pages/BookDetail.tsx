
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import { getBookById } from '@/lib/bookService';
import { Star } from 'lucide-react';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = getBookById(Number(id));

  if (!book) {
    return (
      <div className="min-h-screen bg-litflix-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-litflix-darkGreen mb-4">Книга не найдена</h2>
          <button 
            onClick={() => navigate('/books')}
            className="bg-litflix-mediumGreen text-white px-6 py-2 rounded-full"
          >
            Вернуться к списку книг
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-litflix-cream">
      <Header />
      
      <main className="container mx-auto px-4 pt-8 pb-20">
        <div className="mb-6">
          <BackButton onClick={() => navigate('/books')} />
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 bg-litflix-paleYellow p-8 flex items-center justify-center md:w-1/3">
              <div className="book-cover-large">
                <div className="text-center">
                  <h1 className="font-serif font-bold text-2xl text-litflix-darkGreen">{book.title}</h1>
                  <p className="text-lg text-litflix-darkGreen/70 mt-2 italic">{book.author}</p>
                </div>
              </div>
            </div>
            
            <div className="p-8 md:w-2/3">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {Array(5).fill(0).map((_, i) => (
                    <Star 
                      key={i} 
                      className={i < Math.floor(book.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                      size={20} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-litflix-darkGreen/80">{book.rating}/5</span>
              </div>
              
              <div className="mb-4">
                <span className="inline-block bg-litflix-lightGreen/30 text-litflix-darkGreen px-3 py-1 rounded-full text-sm">
                  {book.genre}
                </span>
                <span className="inline-block ml-2 text-litflix-darkGreen/70 text-sm">
                  {book.year}
                </span>
              </div>
              
              <h2 className="text-xl font-serif font-semibold text-litflix-darkGreen mb-2">Описание</h2>
              <p className="text-litflix-darkGreen/80 mb-6">
                {book.description}
              </p>
              
              <div className="flex space-x-4">
                <button 
                  className="bg-litflix-mediumGreen text-white px-6 py-2 rounded-full hover:bg-litflix-darkGreen transition-colors"
                >
                  Добавить в избранное
                </button>
                <button 
                  className="border border-litflix-mediumGreen text-litflix-mediumGreen px-6 py-2 rounded-full hover:bg-litflix-mediumGreen/10 transition-colors"
                >
                  Поделиться
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetail;
