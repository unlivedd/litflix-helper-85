import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import { isInFavorites, toggleFavorite, FavoriteItem } from '@/lib/favoritesService';
import { Film, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';

// Enhanced dummy movie data with ratings
const dummyMovies = [
  { id: 1, title: "Зеленая миля", director: "Фрэнк Дарабонт", year: 1999, rating: 9.1, genre: "Драма, Криминал" },
  { id: 2, title: "Побег из Шоушенка", director: "Фрэнк Дарабонт", year: 1994, rating: 9.3, genre: "Драма" },
  { id: 3, title: "Форрест Гамп", director: "Роберт Земекис", year: 1994, rating: 8.8, genre: "Драма, Комедия" },
  { id: 4, title: "Леон", director: "Люк Бессон", year: 1994, rating: 8.7, genre: "Боевик, Криминал, Драма" },
  { id: 5, title: "Бойцовский клуб", director: "Дэвид Финчер", year: 1999, rating: 8.8, genre: "Драма, Триллер" },
  { id: 6, title: "Матрица", director: "Сёстры Вачовски", year: 1999, rating: 8.7, genre: "Фантастика, Боевик" },
  { id: 7, title: "Начало", director: "Кристофер Нолан", year: 2010, rating: 8.7, genre: "Фантастика, Боевик" },
  { id: 8, title: "Интерстеллар", director: "Кристофер Нолан", year: 2014, rating: 8.6, genre: "Фантастика, Драма" },
  { id: 9, title: "Гладиатор", director: "Ридли Скотт", year: 2000, rating: 8.6, genre: "Боевик, Драма" },
];

const Movies = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const [selectedMovies, setSelectedMovies] = useState<number[]>([]);
  const [fromHome, setFromHome] = useState(false);

  // Check if the user came from the home page
  useEffect(() => {
    const state = location.state as { fromHome?: boolean } | undefined;
    setFromHome(!!state?.fromHome);
  }, [location]);

  // Загружаем ранее выбранные фильмы из sessionStorage при загрузке страницы
  useEffect(() => {
    const savedSelectedMovies = sessionStorage.getItem('selectedMovies');
    if (savedSelectedMovies) {
      try {
        const parsedMovies = JSON.parse(savedSelectedMovies);
        if (Array.isArray(parsedMovies)) {
          setSelectedMovies(parsedMovies);
        }
      } catch (error) {
        console.error('Ошибка при загрузке выбранных фильмов:', error);
      }
    }
  }, []);

  // Initialize favorites
  useEffect(() => {
    const initFavorites: Record<number, boolean> = {};
    dummyMovies.forEach(movie => {
      initFavorites[movie.id] = isInFavorites(movie.id, 'movie');
    });
    setFavorites(initFavorites);
  }, []);

  const handleMovieSelect = (id: number) => {
    setSelectedMovies(prev => {
      const newSelection = prev.includes(id) 
        ? prev.filter(movieId => movieId !== id) 
        : [...prev, id];
      
      // Сохраняем выбор в sessionStorage
      sessionStorage.setItem('selectedMovies', JSON.stringify(newSelection));
      return newSelection;
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent, movie: any) => {
    e.stopPropagation();
    
    const favoriteItem: FavoriteItem = {
      id: movie.id,
      type: 'movie',
      title: movie.title,
      subtitle: `${movie.director}, ${movie.year}`,
      rating: movie.rating
    };
    
    const isFavorite = toggleFavorite(favoriteItem);
    setFavorites(prev => ({...prev, [movie.id]: isFavorite}));
    
    if (isFavorite) {
      toast.success(`"${movie.title}" добавлен в избранное`);
    } else {
      toast.info(`"${movie.title}" удален из избранного`);
    }
  };

  const handleGoToRecommendations = () => {
    if (selectedMovies.length === 0) {
      toast.error('Пожалуйста, выберите хотя бы один фильм');
      return;
    }
    
    // Сохраняем тип рекомендаций и переходим к рекомендациям
    sessionStorage.setItem('recommendationType', 'books');
    navigate('/recommendations');
    toast.info('Переход к подобранным книгам на основе выбранных фильмов');
  };

  const handleBackClick = () => {
    if (fromHome) {
      navigate('/'); // Navigate back to the home page if we came from there
    } else {
      navigate(-1); // Otherwise just go back
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
          <BackButton onClick={handleBackClick} />
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-litflix-darkGreen mb-4 sm:mb-0">
            Выберите фильмы
          </h1>
          
          <Button
            onClick={handleGoToRecommendations}
            className="bg-litflix-mediumGreen hover:bg-litflix-darkGreen text-white px-6 py-3 rounded-full"
            disabled={selectedMovies.length === 0}
          >
            Подобрать книги
          </Button>
        </div>

        {selectedMovies.length > 0 && (
          <div className="mb-6 p-4 bg-litflix-paleYellow/50 rounded-lg">
            <p className="text-litflix-darkGreen text-center">
              Выбрано фильмов: <span className="font-bold">{selectedMovies.length}</span>
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyMovies.map((movie) => (
            <Card 
              key={movie.id}
              className={`hover-lift backdrop-blur-sm overflow-hidden border transition-all duration-300 ${
                selectedMovies.includes(movie.id) 
                  ? 'border-litflix-mediumGreen bg-litflix-paleYellow/60' 
                  : 'border-litflix-lightGreen/20 bg-white/80'
              }`}
              onClick={() => handleMovieSelect(movie.id)}
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
                    onClick={(e) => handleToggleFavorite(e, movie)}
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
                
                {renderRatingStars(movie.rating)}
                
                <div className="text-litflix-darkGreen/70 text-sm mt-3">
                  <p>Режиссер: {movie.director}</p>
                  <p>Год: {movie.year}</p>
                  <p>Жанр: {movie.genre}</p>
                </div>
                
                <div className="mt-3">
                  <Slider 
                    defaultValue={[movie.rating]} 
                    max={10} 
                    step={0.1} 
                    disabled={true} 
                    className="cursor-default"
                  />
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
