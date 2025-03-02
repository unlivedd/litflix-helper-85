
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import { toast } from 'sonner';

// Mock data for movie recommendations
const mockMovies = [
  { 
    id: 1, 
    title: 'Война и мир',
    director: 'Сергей Бондарчук',
    year: 1967,
    description: 'Эпическая экранизация романа Льва Толстого',
    matchScore: 95
  },
  { 
    id: 2, 
    title: 'Солярис',
    director: 'Андрей Тарковский',
    year: 1972,
    description: 'Философская драма по мотивам романа Станислава Лема',
    matchScore: 89
  },
  { 
    id: 3, 
    title: 'Мастер и Маргарита',
    director: 'Владимир Бортко',
    year: 2005,
    description: 'Мистическая драма по одноименному роману Михаила Булгакова',
    matchScore: 87
  },
  { 
    id: 4, 
    title: 'Сталкер',
    director: 'Андрей Тарковский',
    year: 1979,
    description: 'Философская притча по мотивам повести братьев Стругацких',
    matchScore: 82
  },
  { 
    id: 5, 
    title: 'Идиот',
    director: 'Владимир Бортко',
    year: 2003,
    description: 'Экранизация романа Фёдора Достоевского',
    matchScore: 79
  }
];

const Recommendations = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<typeof mockMovies>([]);
  
  // Animation decorations
  const circlePositions = [
    { size: '500px', left: '-100px', top: '200px', delay: '0s' },
    { size: '600px', right: '-150px', bottom: '-150px', delay: '0.3s' },
  ];

  // Simulate loading recommendations
  useEffect(() => {
    const timer = setTimeout(() => {
      setRecommendations(mockMovies);
      setLoading(false);
      toast.success('Рекомендации готовы!');
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
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

      <Header />
      
      <main className="container max-w-5xl mx-auto px-4 pt-8 pb-20">
        <div className="flex justify-between items-center mb-10">
          <BackButton onClick={() => navigate('/books')} />
        </div>
        
        <h2 className="text-3xl font-serif font-semibold text-litflix-darkGreen mb-8 text-center">
          Рекомендации фильмов для вас
        </h2>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-6 py-20">
            <div className="w-16 h-16 border-4 border-litflix-mediumGreen border-t-transparent rounded-full animate-spin"></div>
            <p className="text-litflix-darkGreen/80">Подбираем фильмы на основе ваших предпочтений...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {recommendations.map(movie => (
              <div 
                key={movie.id}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm
                         border border-litflix-lightGreen/20 hover:shadow-md
                         transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${movie.id * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-serif font-medium text-litflix-darkGreen">
                    {movie.title} ({movie.year})
                  </h3>
                  <div className="flex items-center">
                    <span className="text-sm text-litflix-darkGreen/70 mr-2">Совпадение:</span>
                    <span className="bg-litflix-mediumGreen text-white text-sm font-medium px-2.5 py-0.5 rounded-full">
                      {movie.matchScore}%
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-litflix-darkGreen/70 mt-1">
                  Режиссер: {movie.director}
                </p>
                
                <p className="mt-3 text-litflix-darkGreen">
                  {movie.description}
                </p>
                
                <div className="mt-4 flex space-x-3">
                  <button className="text-litflix-mediumGreen hover:text-litflix-darkGreen text-sm font-medium">
                    Подробнее
                  </button>
                  <button className="text-litflix-mediumGreen hover:text-litflix-darkGreen text-sm font-medium">
                    Добавить в избранное
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate('/')}
            className="bg-litflix-mediumGreen text-white font-medium py-3 px-8 rounded-full
                     shadow-md transition-all duration-300 ease-out
                     hover:shadow-lg hover:bg-litflix-darkGreen active:scale-[0.98]"
          >
            Вернуться на главную
          </button>
        </div>
      </main>
    </div>
  );
};

export default Recommendations;
