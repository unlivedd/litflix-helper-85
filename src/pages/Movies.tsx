
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import { toast } from 'sonner';
import { Film } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  const handleMovieSelect = (id: number) => {
    // Save selected movie
    toast.info(`Выбран фильм ${id}`);
    
    // Here you would add the movie to a selected list or favorites
    // For now, we'll simulate moving to recommendations after selection
    sessionStorage.setItem('recommendationType', 'books');
    navigate('/questionnaire');
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
            onClick={() => {
              sessionStorage.setItem('recommendationType', 'books');
              navigate('/questionnaire');
              toast.info('Переход к подбору книг на основе выбранных фильмов');
            }}
            className="bg-litflix-mediumGreen hover:bg-litflix-darkGreen text-white px-6 py-2 rounded-full"
          >
            Подобрать книги
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyMovies.map((movie) => (
            <div 
              key={movie.id}
              onClick={() => handleMovieSelect(movie.id)}
              className="bg-white/80 backdrop-blur-sm rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-2">
                <Film className="text-litflix-darkGreen" size={20} />
                <h3 className="text-lg font-medium text-litflix-darkGreen">{movie.title}</h3>
              </div>
              <div className="text-litflix-darkGreen/70 text-sm">
                <p>Режиссер: {movie.director}</p>
                <p>Год: {movie.year}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Movies;
