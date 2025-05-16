
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import { Film, Star, Heart } from 'lucide-react';
import { isInFavorites, toggleFavorite, FavoriteItem } from '@/lib/favoritesService';
import { Slider } from '@/components/ui/slider';

// Это просто для демонстрации, в реальном приложении данные будут из API
const bookRecommendations = [
  { id: 101, title: "Мастер и Маргарита", author: "Михаил Булгаков", rating: 9.2, genre: "Фантастика, Классика" },
  { id: 102, title: "1984", author: "Джордж Оруэлл", rating: 9.0, genre: "Антиутопия" },
  { id: 103, title: "Гарри Поттер и философский камень", author: "Дж. К. Роулинг", rating: 8.5, genre: "Фэнтези" },
  { id: 104, title: "Война и мир", author: "Лев Толстой", rating: 8.9, genre: "Исторический роман" },
  { id: 105, title: "Преступление и наказание", author: "Фёдор Достоевский", rating: 9.1, genre: "Психологический роман" },
  { id: 106, title: "Три товарища", author: "Эрих Мария Ремарк", rating: 8.8, genre: "Драма" },
];

const movieRecommendations = [
  { id: 201, title: "Властелин колец", director: "Питер Джексон", year: 2001, rating: 8.9, genre: "Фэнтези, Приключения" },
  { id: 202, title: "Зелёная книга", director: "Питер Фаррелли", year: 2018, rating: 8.4, genre: "Драма, Комедия" },
  { id: 203, title: "Шоу Трумана", director: "Питер Уир", year: 1998, rating: 8.3, genre: "Драма, Фантастика" },
  { id: 204, title: "Жизнь Пи", director: "Энг Ли", year: 2012, rating: 7.8, genre: "Приключения, Драма" },
  { id: 205, title: "Престиж", director: "Кристофер Нолан", year: 2006, rating: 8.5, genre: "Триллер, Драма" },
];

const Recommendations = () => {
  const navigate = useNavigate();
  const [recommendationType, setRecommendationType] = useState<'books' | 'movies'>('books');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  // Получение типа рекомендаций из sessionStorage
  useEffect(() => {
    const type = sessionStorage.getItem('recommendationType') as 'books' | 'movies';
    if (type) {
      setRecommendationType(type);
    }
  }, []);

  // Установка рекомендаций на основе типа
  useEffect(() => {
    // В реальном приложении здесь будет запрос к API
    const items = recommendationType === 'books' ? bookRecommendations : movieRecommendations;
    setRecommendations(items);
    
    // Initialize favorites
    const initFavorites: Record<number, boolean> = {};
    items.forEach(item => {
      initFavorites[item.id] = isInFavorites(item.id, recommendationType === 'books' ? 'book' : 'movie');
    });
    setFavorites(initFavorites);
  }, [recommendationType]);

  const handleBackClick = () => {
    // Возвращаемся на страницу выбора книг или фильмов в зависимости от типа рекомендаций
    if (recommendationType === 'books') {
      navigate('/movies'); // Если рекомендуем книги, значит были на странице фильмов
    } else {
      navigate('/books'); // Если рекомендуем фильмы, значит были на странице книг
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    
    const favoriteItem: FavoriteItem = {
      id: item.id,
      type: recommendationType === 'books' ? 'book' : 'movie',
      title: item.title,
      subtitle: recommendationType === 'books' 
        ? item.author 
        : `${item.director}, ${item.year}`,
      rating: item.rating
    };
    
    const isFavorite = toggleFavorite(favoriteItem);
    setFavorites(prev => ({...prev, [item.id]: isFavorite}));
    
    if (isFavorite) {
      toast.success(`"${item.title}" добавлен в избранное`);
    } else {
      toast.info(`"${item.title}" удален из избранного`);
    }
  };
  
  // Helper function to render stars based on rating
  const renderRatingStars = (rating: number) => {
    const roundedRating = Math.round(rating);
    const starsArray = [];
    
    for (let i = 0; i < 10; i++) {
      if (i < roundedRating) {
        starsArray.push(<Star key={i} size={16} fill="currentColor" className="text-amber-500" />);
      } else {
        starsArray.push(<Star key={i} size={16} className="text-gray-300" />);
      }
    }
    
    return (
      <div className="flex items-center gap-1 mt-2">
        <div className="flex">{starsArray}</div>
        <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Анимированные элементы дизайна
  const circlePositions = [
    { size: '400px', left: '-100px', top: '300px', delay: '0s' },
    { size: '500px', right: '-100px', bottom: '-100px', delay: '0.2s' },
  ];

  return (
    <div className="min-h-screen bg-litflix-cream">
      {/* Background */}
      <div className="page-background">
        <img 
          src="/lovable-uploads/2d79c713-e142-4111-834f-1b7d4de0ba52.png" 
          alt="Books with bookshelf" 
          className="page-background-image opacity-60"
        />
        <div className="page-background-overlay" />
      </div>

      {/* Animated circles */}
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
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-8">
          <BackButton onClick={handleBackClick} />
        </div>
        
        <div className="mb-10 text-center">
          <span className="inline-block bg-litflix-lightGreen/30 text-litflix-darkGreen px-4 py-1.5 rounded-full text-sm font-medium mb-3">
            {recommendationType === 'books' ? 'На основе ваших фильмов' : 'На основе ваших книг'}
          </span>
          <h1 className="text-3xl font-serif font-bold text-litflix-darkGreen">
            {recommendationType === 'books' ? 'Рекомендуемые книги' : 'Рекомендуемые фильмы'}
          </h1>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {recommendations.map((item) => (
            <div
              key={item.id}
              className="bg-white/90 backdrop-blur-sm rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              {recommendationType === 'books' ? (
                // Book card
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-medium text-litflix-darkGreen">{item.title}</h3>
                    <button 
                      onClick={(e) => handleToggleFavorite(e, item)}
                      className={`p-2 rounded-full ${
                        favorites[item.id] 
                          ? 'bg-litflix-paleYellow text-litflix-darkGreen' 
                          : 'bg-litflix-lightGreen/20 text-litflix-darkGreen/70'
                      }`}
                    >
                      <Heart size={18} fill={favorites[item.id] ? "currentColor" : "none"} />
                    </button>
                  </div>
                  
                  {renderRatingStars(item.rating)}
                  
                  <div className="text-litflix-darkGreen/70 text-sm mt-3">
                    <p className="italic">{item.author}</p>
                    <p>{item.genre}</p>
                  </div>
                  
                  <div className="mt-3">
                    <Slider 
                      defaultValue={[item.rating]} 
                      max={10} 
                      step={0.1} 
                      disabled={true}
                      className="cursor-default" 
                    />
                  </div>
                </div>
              ) : (
                // Movie card
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-litflix-lightGreen/30 text-litflix-darkGreen">
                        <Film size={20} />
                      </div>
                      <h3 className="text-lg font-medium text-litflix-darkGreen">{item.title}</h3>
                    </div>
                    <button 
                      onClick={(e) => handleToggleFavorite(e, item)}
                      className={`p-2 rounded-full ${
                        favorites[item.id] 
                          ? 'bg-litflix-paleYellow text-litflix-darkGreen' 
                          : 'bg-litflix-lightGreen/20 text-litflix-darkGreen/70'
                      }`}
                    >
                      <Heart size={18} fill={favorites[item.id] ? "currentColor" : "none"} />
                    </button>
                  </div>
                  
                  {renderRatingStars(item.rating)}
                  
                  <div className="text-litflix-darkGreen/70 text-sm mt-3">
                    <p>Режиссер: {item.director}</p>
                    <p>Год: {item.year}</p>
                    <p>Жанр: {item.genre}</p>
                  </div>
                  
                  <div className="mt-3">
                    <Slider 
                      defaultValue={[item.rating]} 
                      max={10} 
                      step={0.1} 
                      disabled={true} 
                      className="cursor-default"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/favorites')} 
            className="bg-white text-litflix-mediumGreen border border-litflix-mediumGreen hover:bg-litflix-paleYellow/50 
                     transition-colors py-2.5 px-6 rounded-full font-medium"
          >
            Перейти в избранное
          </button>
        </div>
      </main>
    </div>
  );
};

export default Recommendations;
