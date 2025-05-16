
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FindBookButton from '@/components/FindBookButton';
import FindMovieButton from '@/components/FindMovieButton';
import BookCard from '@/components/BookCard';
import { toast } from 'sonner';
import { getAllBooks } from '@/lib/bookService';
import { Book, Film, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TopRatedBooks from '@/components/TopRatedBooks';
import Header from '@/components/Header';

const Index = () => {
  const navigate = useNavigate();
  
  // Get books from our service
  const books = getAllBooks().slice(0, 9); // Just show first 9 books on homepage

  // Округляем рейтинги до целого числа для корректного отображения
  const booksWithRoundedRatings = books.map(book => ({
    ...book,
    rating: book.rating ? Math.round(book.rating) : undefined
  }));

  const handleFindBook = () => {
    navigate('/books');
  };
  
  const handleFindMovie = () => {
    // Navigate to the movies page
    navigate('/movies');
  };

  const handleBookClick = (id: number) => {
    navigate(`/book/${id}`);
  };

  const handleGetRecommendations = () => {
    // Navigate directly to recommendations
    navigate('/recommendations');
    toast.info('Переход к рекомендациям');
  };
  
  // Проверяем, авторизован ли пользователь
  const isLoggedIn = !!localStorage.getItem('currentUser');

  useEffect(() => {
    // Если пользователь вошел в систему, показываем приветственное сообщение
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      toast.success(`Добро пожаловать, ${userData.name}!`);
    }
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-litflix-cream">
      {/* Decorative elements */}
      <div className="circle-decoration circle-1"></div>
      <div className="circle-decoration circle-2"></div>
      <div className="book-decoration book-left"></div>
      <div className="book-decoration book-right"></div>

      {/* Background image with overlay */}
      <div className="page-background">
        <img 
          src="/lovable-uploads/629995e0-88ac-4574-8b9f-d9877747d25f.png" 
          alt="Cozy living room with books" 
          className="page-background-image opacity-80"
        />
        <div className="page-background-overlay" />
      </div>

      <Header />

      <main className="container mx-auto px-4 pt-6 pb-20">
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
        
        {/* Action buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-16 pt-4">
          <FindBookButton onClick={handleFindBook} />
          <FindMovieButton onClick={handleFindMovie} />
          
          {isLoggedIn ? (
            <Button
              onClick={handleGetRecommendations}
              className="bg-litflix-mediumGreen hover:bg-litflix-darkGreen text-white px-6 py-3 rounded-full flex items-center gap-3"
            >
              <div className="flex items-center gap-2">
                <Book size={18} />
                <Film size={18} />
              </div>
              <span>Получить рекомендации</span>
            </Button>
          ) : (
            <Button
              onClick={() => navigate('/login')}
              className="bg-litflix-mediumGreen hover:bg-litflix-darkGreen text-white px-6 py-3 rounded-full flex items-center gap-3"
            >
              <LogIn size={18} />
              <span>Войти в систему</span>
            </Button>
          )}
        </div>

        {/* Book cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {booksWithRoundedRatings.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              rating={book.rating}
              onClick={() => handleBookClick(book.id)}
            />
          ))}
        </div>
        
        {/* Top Rated Books */}
        <TopRatedBooks />
      </main>
    </div>
  );
};

export default Index;
