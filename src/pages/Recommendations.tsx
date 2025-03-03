
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import { Heart, Star, ChevronDown, ChevronUp, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { isInFavorites, toggleFavorite } from '@/lib/favoritesService';

// Enhanced movie data with more details
const mockMovies = [
  { 
    id: 1, 
    title: 'Война и мир',
    director: 'Сергей Бондарчук',
    year: 1967,
    description: 'Эпическая экранизация романа Льва Толстого о судьбах русского дворянства в эпоху наполеоновских войн. Фильм получил премию "Оскар" как лучший фильм на иностранном языке.',
    matchScore: 95,
    rating: 4.8,
    genre: 'Драма/История',
    runtime: '7ч 11м (4 серии)',
    cast: 'Людмила Савельева, Вячеслав Тихонов, Сергей Бондарчук, Олег Табаков',
    awards: 'Оскар за лучший фильм на иностранном языке, Золотой глобус'
  },
  { 
    id: 2, 
    title: 'Солярис',
    director: 'Андрей Тарковский',
    year: 1972,
    description: 'Философская драма по мотивам романа Станислава Лема. Психолог Крис Кельвин отправляется на космическую станцию, изучающую загадочную планету Солярис, и сталкивается с необъяснимыми явлениями.',
    matchScore: 89,
    rating: 4.7,
    genre: 'Научная фантастика/Драма',
    runtime: '2ч 47м',
    cast: 'Донатас Банионис, Наталья Бондарчук, Юри Ярвет',
    awards: 'Гран-при Каннского кинофестиваля'
  },
  { 
    id: 3, 
    title: 'Мастер и Маргарита',
    director: 'Владимир Бортко',
    year: 2005,
    description: 'Экранизация одноименного романа Михаила Булгакова. Дьявол под именем Воланд посещает Москву 1930-х годов вместе со своей свитой, вызывая хаос и раскрывая истинную природу её жителей.',
    matchScore: 87,
    rating: 4.6,
    genre: 'Мистика/Драма',
    runtime: '10 серий',
    cast: 'Олег Басилашвили, Александр Галибин, Анна Ковальчук, Александр Абдулов',
    awards: 'ТЭФИ за лучший телевизионный художественный сериал'
  },
  { 
    id: 4, 
    title: 'Сталкер',
    director: 'Андрей Тарковский',
    year: 1979,
    description: 'Философская притча по мотивам повести братьев Стругацких "Пикник на обочине". Сталкер ведёт Писателя и Профессора в загадочную Зону, где исполняются самые сокровенные желания.',
    matchScore: 82,
    rating: 4.9,
    genre: 'Драма/Научная фантастика',
    runtime: '2ч 42м',
    cast: 'Александр Кайдановский, Анатолий Солоницын, Николай Гринько',
    awards: 'Приз экуменического жюри Каннского кинофестиваля'
  },
  { 
    id: 5, 
    title: 'Идиот',
    director: 'Владимир Бортко',
    year: 2003,
    description: 'Экранизация романа Фёдора Достоевского. История князя Мышкина, возвращающегося в Россию после лечения в Швейцарии, и его взаимоотношений с обществом.',
    matchScore: 79,
    rating: 4.5,
    genre: 'Драма',
    runtime: '10 серий',
    cast: 'Евгений Миронов, Владимир Машков, Лидия Вележева, Ольга Будина',
    awards: 'ТЭФИ за лучший телевизионный художественный сериал'
  }
];

const Recommendations = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<typeof mockMovies>([]);
  const [expandedMovieId, setExpandedMovieId] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  
  // Animation decorations
  const circlePositions = [
    { size: '500px', left: '-100px', top: '200px', delay: '0s' },
    { size: '600px', right: '-150px', bottom: '-150px', delay: '0.3s' },
  ];

  // Load initial favorites status
  useEffect(() => {
    const initialFavorites: Record<number, boolean> = {};
    mockMovies.forEach(movie => {
      initialFavorites[movie.id] = isInFavorites(movie.id, 'movie');
    });
    setFavorites(initialFavorites);
  }, []);

  // Simulate loading recommendations
  useEffect(() => {
    const timer = setTimeout(() => {
      setRecommendations(mockMovies);
      setLoading(false);
      toast.success('Рекомендации готовы!');
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedMovieId(expandedMovieId === id ? null : id);
  };

  const handleToggleFavorite = (movie: typeof mockMovies[0]) => {
    const newStatus = toggleFavorite({
      id: movie.id,
      type: 'movie',
      title: movie.title
    });
    
    setFavorites(prev => ({
      ...prev,
      [movie.id]: newStatus
    }));
    
    toast.success(newStatus ? 'Добавлено в избранное' : 'Удалено из избранного');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url("/lovable-uploads/c1af6f80-b0f1-4042-994f-f01bab5c20fd.png")' }}
        />
        <div className="absolute inset-0 bg-litflix-cream bg-opacity-70" />
      </div>

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
      
      <main className="container max-w-5xl mx-auto px-4 pt-8 pb-20 relative z-10">
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
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-sm
                         border border-litflix-lightGreen/20 hover:shadow-md
                         transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${movie.id * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-serif font-medium text-litflix-darkGreen">
                    {movie.title} ({movie.year})
                  </h3>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <span className="text-sm text-litflix-darkGreen/70 mr-2">Совпадение:</span>
                      <span className="bg-litflix-mediumGreen text-white text-sm font-medium px-2.5 py-0.5 rounded-full">
                        {movie.matchScore}%
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => handleToggleFavorite(movie)}
                      className={`p-2 rounded-full ${
                        favorites[movie.id] 
                          ? "text-white bg-litflix-darkGreen" 
                          : "text-litflix-darkGreen bg-litflix-lightGreen/20 hover:bg-litflix-lightGreen/30"
                      }`}
                    >
                      <Heart size={18} fill={favorites[movie.id] ? "white" : "none"} />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center mt-2 mb-2">
                  <div className="flex mr-4">
                    {Array(5).fill(0).map((_, i) => (
                      <Star 
                        key={i} 
                        className={i < Math.floor(movie.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                        size={16} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-litflix-darkGreen/70">{movie.rating}/5</span>
                  
                  <div className="mx-3 h-4 border-r border-litflix-darkGreen/20"></div>
                  
                  <span className="text-sm text-litflix-darkGreen/70">
                    Режиссер: <span className="font-medium">{movie.director}</span>
                  </span>
                </div>

                <div className="mt-2 mb-3">
                  <span className="inline-block bg-litflix-lightGreen/30 text-litflix-darkGreen px-2.5 py-0.5 rounded-full text-xs mr-2">
                    {movie.genre}
                  </span>
                  <span className="inline-block bg-litflix-paleYellow/50 text-litflix-darkGreen px-2.5 py-0.5 rounded-full text-xs">
                    {movie.runtime}
                  </span>
                </div>
                
                <p className="mt-3 text-litflix-darkGreen">
                  {movie.description}
                </p>
                
                {expandedMovieId === movie.id && (
                  <div className="mt-4 pt-4 border-t border-litflix-lightGreen/20 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-litflix-darkGreen mb-1">В ролях:</h4>
                        <p className="text-sm text-litflix-darkGreen/80">{movie.cast}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-litflix-darkGreen mb-1">Награды:</h4>
                        <p className="text-sm text-litflix-darkGreen/80">{movie.awards}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-litflix-darkGreen mb-1">Почему вам это понравится:</h4>
                      <ul className="list-disc list-inside text-sm text-litflix-darkGreen/80">
                        <li>Классическая экранизация литературного произведения</li>
                        <li>Высокое качество режиссуры и актерской игры</li>
                        <li>Культурная ценность и историческое значение</li>
                        <li>Соответствие вашим литературным вкусам</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                <div className="mt-4 flex space-x-3">
                  <button 
                    onClick={() => toggleExpand(movie.id)}
                    className="text-litflix-mediumGreen hover:text-litflix-darkGreen text-sm font-medium flex items-center"
                  >
                    {expandedMovieId === movie.id ? (
                      <>
                        <ChevronUp size={16} className="mr-1" />
                        Скрыть детали
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} className="mr-1" />
                        Подробнее
                      </>
                    )}
                  </button>
                  <button 
                    onClick={() => handleToggleFavorite(movie)}
                    className="text-litflix-mediumGreen hover:text-litflix-darkGreen text-sm font-medium flex items-center"
                  >
                    <Heart size={16} className="mr-1" fill={favorites[movie.id] ? "currentColor" : "none"} />
                    {favorites[movie.id] ? 'В избранном' : 'Добавить в избранное'}
                  </button>
                  <button 
                    onClick={() => toast.info('Функция обмена пока недоступна')}
                    className="text-litflix-mediumGreen hover:text-litflix-darkGreen text-sm font-medium flex items-center"
                  >
                    <Share2 size={16} className="mr-1" />
                    Поделиться
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
