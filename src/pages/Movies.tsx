
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import { isInFavorites, toggleFavorite, FavoriteItem } from '@/lib/favoritesService';
import { Film, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';

// Dummy movie data (Replace with actual data in a real implementation)
const dummyMovies = [
  { id: 1, title: "Зеленая миля", director: "Фрэнк Дарабонт", year: 1999 },
  { id: 2, title: "Побег из Шоушенка", director: "Фрэнк Дарабонт", year: 1994 },
  { id: 3, title: "Форрест Гамп", director: "Роберт Земекис", year: 1994 },
  { id: 4, title: "Леон", director: "Люк Бессон", year: 1994 },
  { id: 5, title: "Бойцовский клуб", director: "Дэвид Финчер", year: 1999 },
  { id: 6, title: "Матрица", director: "Сёстры Вачовски", year: 1999 },
  { id: 7, title: "Начало", director: "Кристофер Нолан", year: 2010 },
  { id: 8, title: "Интерстеллар", director: "Кристофер Нолан", year: 2014 },
  { id: 9, title: "Гладиатор", director: "Ридли Скотт", year: 2000 },
];

const Movies = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  // Initialize favorites
  useEffect(() => {
    const initFavorites: Record<number, boolean> = {};
    dummyMovies.forEach(movie => {
      initFavorites[movie.id] = isInFavorites(movie.id, 'movie');
    });
    setFavorites(initFavorites);
  }, []);

  const handleMovieSelect = (id: number) => {
    const movie = dummyMovies.find(m => m.id === id);
    if (!movie) return;
    
    const favoriteItem: FavoriteItem = {
      id: movie.id,
      type: 'movie',
      title: movie.title,
      subtitle: `${movie.director}, ${movie.year}`
    };
    
    const isFavorite = toggleFavorite(favoriteItem);
    setFavorites(prev => ({...prev, [id]: isFavorite}));
    
    toast.success(isFavorite 
      ? `"${movie.title}" добавлен в избранное` 
      : `"${movie.title}" удален из избранного`
    );
  };

  const handleGoToRecommendations = () => {
    // Вместо перехода на опрос, сразу перейти к рекомендациям
    sessionStorage.setItem('recommendationType', 'books');
    navigate('/recommendations');
    toast.info('Переход к подобранным книгам на основе выбранных фильмов');
  };

  return (
    <div className="min-h-screen bg-litflix-cream">
      <div className="page-background">
        <img 
          src="/lovable-uploads/c1af6f80-b0f1-4042-994f-f01bab5c20fd.png" 
          alt="Movie background" 
          className="page-background-image opacity-70"
        />
        <div className="page-background-overlay" />
      </div>
      
      <Header onSearchClick={() => console.log('Search movies')} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <BackButton onClick={() => navigate('/')} />
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-litflix-darkGreen mb-4 sm:mb-0">
            Выберите фильмы
          </h1>
          
          <Button
            onClick={handleGoToRecommendations}
            className="bg-litflix-mediumGreen hover:bg-litflix-darkGreen text-white px-6 py-3 rounded-full"
          >
            Подобрать книги
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyMovies.map((movie) => (
            <Card 
              key={movie.id}
              className="hover-lift bg-white/80 backdrop-blur-sm overflow-hidden border border-litflix-lightGreen/20"
            >
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-litflix-lightGreen/30 text-litflix-darkGreen">
                      <Film size={20} />
                    </div>
                    <h3 className="text-lg font-medium text-litflix-darkGreen">{movie.title}</h3>
                  </div>
                  
                  <button 
                    onClick={() => handleMovieSelect(movie.id)}
                    className={`p-2 rounded-full ${
                      favorites[movie.id] 
                        ? 'bg-litflix-paleYellow text-litflix-darkGreen' 
                        : 'bg-litflix-lightGreen/20 text-litflix-darkGreen/70'
                    }`}
                    aria-label={favorites[movie.id] ? "Удалить из избранного" : "Добавить в избранное"}
                  >
                    <Heart size={18} fill={favorites[movie.id] ? "currentColor" : "none"} />
                  </button>
                </div>
                
                <div className="text-litflix-darkGreen/70 text-sm">
                  <p>Режиссер: {movie.director}</p>
                  <p>Год: {movie.year}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Movies;
