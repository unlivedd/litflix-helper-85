
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import { getBookById } from '@/lib/bookService';
import { Heart, Share2 } from 'lucide-react';
import { isInFavorites, toggleFavorite } from '@/lib/favoritesService';
import { toast } from 'sonner';
import BookRating from '@/components/BookRating';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = getBookById(Number(id));
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRating, setUserRating] = useState(0);
  
  // Проверяем, авторизован ли пользователь
  const isLoggedIn = !!localStorage.getItem('currentUser');

  useEffect(() => {
    if (book) {
      setIsFavorite(isInFavorites(book.id, 'book'));
      
      // Загружаем рейтинг пользователя если он авторизован
      if (isLoggedIn) {
        const userRatings = JSON.parse(localStorage.getItem('userRatings') || '{}');
        setUserRating(userRatings[book.id] || 0);
      }
    }
  }, [book, isLoggedIn]);

  const handleToggleFavorite = () => {
    if (!isLoggedIn) {
      toast.error('Необходимо войти в систему для добавления в избранное');
      navigate('/login');
      return;
    }
    
    if (book) {
      const newStatus = toggleFavorite({
        id: book.id,
        type: 'book',
        title: book.title
      });
      setIsFavorite(newStatus);
      toast.success(newStatus ? 'Добавлено в избранное' : 'Удалено из избранного');
    }
  };
  
  const handleRateBook = (rating: number) => {
    if (!isLoggedIn) {
      toast.error('Необходимо войти в систему, чтобы оценивать книги');
      navigate('/login');
      return;
    }
    
    setUserRating(rating);
    
    // Сохраняем рейтинг в localStorage
    const userRatings = JSON.parse(localStorage.getItem('userRatings') || '{}');
    userRatings[book.id] = rating;
    localStorage.setItem('userRatings', JSON.stringify(userRatings));
    
    toast.success(`Вы оценили книгу на ${Math.round(rating)} из 10`);
  };

  const handleShare = () => {
    toast.info('Функция обмена пока недоступна');
  };

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
    <div className="min-h-screen bg-litflix-cream relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="page-background">
        <img 
          src="/lovable-uploads/6bd4d17c-d1eb-4359-95ec-30b5ffc3d9f8.png" 
          alt="Cozy reading corner with books" 
          className="page-background-image opacity-65"
        />
        <div className="page-background-overlay" />
      </div>

      <Header />
      
      <main className="container mx-auto px-4 pt-8 pb-20 relative z-10">
        <div className="mb-6">
          <BackButton onClick={() => navigate('/books')} />
        </div>
        
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden">
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
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <BookRating rating={book.rating || 0} size="md" showValue />
                </div>
                
                <div className="text-litflix-darkGreen/70 text-sm">
                  Год издания: <span className="font-medium">{book.year}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <span className="inline-block bg-litflix-lightGreen/30 text-litflix-darkGreen px-3 py-1 rounded-full text-sm">
                  {book.genre}
                </span>
              </div>
              
              <h2 className="text-xl font-serif font-semibold text-litflix-darkGreen mb-2">Описание</h2>
              <p className="text-litflix-darkGreen/80 mb-6">
                {book.description}
              </p>
              
              <div className="mt-8 border-t pt-4 border-litflix-lightGreen/20">
                <h3 className="text-lg font-serif font-semibold text-litflix-darkGreen mb-3">Почему стоит прочитать:</h3>
                <ul className="list-disc list-inside text-litflix-darkGreen/80 space-y-2">
                  <li>Культовое произведение русской литературы</li>
                  <li>Глубокий психологический анализ персонажей</li>
                  <li>Исторический контекст эпохи</li>
                  <li>Влияние на мировую культуру и искусство</li>
                </ul>
              </div>
              
              <div className="flex flex-col gap-4 mt-8">
                <div className="bg-litflix-paleYellow/40 p-4 rounded-xl">
                  <h4 className="text-litflix-darkGreen font-medium mb-2">Оцените эту книгу:</h4>
                  <BookRating 
                    rating={userRating}
                    size="lg"
                    showValue={true}
                    onRate={handleRateBook}
                    disabled={!isLoggedIn}
                  />
                  {!isLoggedIn && (
                    <p className="text-sm text-litflix-darkGreen/70 mt-2">
                      <button 
                        onClick={() => navigate('/login')}
                        className="text-litflix-darkGreen underline"
                      >
                        Войдите
                      </button>, чтобы оценить книгу
                    </p>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <button 
                    className={`flex items-center gap-2 px-6 py-2 rounded-full transition-colors ${
                      isFavorite 
                        ? "bg-litflix-darkGreen text-white" 
                        : "border border-litflix-mediumGreen text-litflix-mediumGreen hover:bg-litflix-mediumGreen/10"
                    }`}
                    onClick={handleToggleFavorite}
                  >
                    <Heart size={18} fill={isFavorite ? "white" : "none"} />
                    {isFavorite ? 'В избранном' : 'Добавить в избранное'}
                  </button>
                  
                  <button 
                    className="border border-litflix-mediumGreen text-litflix-mediumGreen px-6 py-2 rounded-full hover:bg-litflix-mediumGreen/10 transition-colors flex items-center gap-2"
                    onClick={handleShare}
                  >
                    <Share2 size={18} />
                    Поделиться
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetail;
