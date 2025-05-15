import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import { Heart, Star, ChevronDown, ChevronUp, Share2, BookOpen, Film } from 'lucide-react';
import { toast } from 'sonner';
import { isInFavorites, toggleFavorite, FavoriteItem } from '@/lib/favoritesService';

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
    description: 'Экранизация романа Фёдора Достоевского. История князя Мышкина, возвращающегося в Ро��сию после лечения в Швейцарии, и его взаимоотношений с обществом.',
    matchScore: 79,
    rating: 4.5,
    genre: 'Драма',
    runtime: '10 серий',
    cast: 'Евгений Миронов, Владимир Машков, Лидия Вележева, Ольга Будина',
    awards: 'ТЭФИ за лучший телевизионный художественный сериал'
  }
];

const mockRecommendedBooks = [
  { 
    id: 101, 
    title: 'Солярис',
    author: 'Станислав Лем',
    year: 1961,
    description: 'Философский научно-фантастический роман о контакте с внеземным разумом. Исследует глубины человеческого сознания через историю психолога Криса Кельвина на космической станции.',
    matchScore: 93,
    rating: 4.7,
    genre: 'Научная фантастика/Философия',
    pages: 224,
    translations: 'Переведен более чем на 40 языков',
    awards: 'Премия им. Януша А. Зайделя'
  },
  { 
    id: 102, 
    title: 'Дюна',
    author: 'Фрэнк Герберт',
    year: 1965,
    description: 'Эпическая научно-фантастическая сага о далеком будущем человечества. История Пола Атрейдеса, чья семья принимает управление опасной планетой Арракис — единственным источником самого ценного вещества во вселенной.',
    matchScore: 89,
    rating: 4.9,
    genre: 'Научная фантастика/Эпопея',
    pages: 412,
    translations: 'Мировой бестселлер, переведенный на десятки языков',
    awards: 'Премии «Хьюго» и «Небьюла»'
  },
  { 
    id: 103, 
    title: '451° по Фаренгейту',
    author: 'Рэй Брэдбери',
    year: 1953,
    description: 'Антиутопия о обществе будущего, где книги находятся под запретом. Главный герой – пожарный Гай Монтэг, который по долгу службы сжигает книги, но в какой-то момент начинает сомневаться в правильности своих действий.',
    matchScore: 86,
    rating: 4.8,
    genre: 'Антиутопия/Научная фантастика',
    pages: 256,
    translations: 'Переведен на более чем 30 языков',
    awards: 'Ретроспективная премия «Хьюго»'
  },
  { 
    id: 104, 
    title: 'Пикник на обочине',
    author: 'Аркадий и Борис Стругацкие',
    year: 1972,
    description: 'Роман о сталкерах – людях, которые нелегально проникают в Зону, место посещения инопланетян, чтобы добыть там артефакты. Исследует влияние непознанного на человеческую психику и общество.',
    matchScore: 84,
    rating: 4.9,
    genre: 'Научная фантастика/Философия',
    pages: 168,
    translations: 'Переведен на многие языки мира',
    awards: 'Культовый статус в мировой литературе'
  },
  { 
    id: 105, 
    title: 'Нейромант',
    author: 'Уильям Гибсон',
    year: 1984,
    description: 'Роман, определивший жанр киберпанк. История хакера Кейса, которого нанимают для проведения операции против мощного искусственного интеллекта.',
    matchScore: 81,
    rating: 4.7,
    genre: 'Киберпанк/Научная фантастика',
    pages: 271,
    translations: 'Переведен на множество языков',
    awards: 'Премии «Хьюго», «Небьюла» и «Филип К. Дик»'
  }
];

const Recommendations = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [recommendationType, setRecommendationType] = useState<'books' | 'movies'>('movies');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [expandedItemId, setExpandedItemId] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  
  const circlePositions = [
    { size: '500px', left: '-100px', top: '200px', delay: '0s' },
    { size: '600px', right: '-150px', bottom: '-150px', delay: '0.3s' },
  ];

  useEffect(() => {
    // Get recommendation type from session storage
    const storedType = sessionStorage.getItem('recommendationType') as 'books' | 'movies';
    if (storedType) {
      setRecommendationType(storedType);
    }

    // Initialize favorites
    const initialFavorites: Record<number, boolean> = {};
    const items = storedType === 'books' ? mockRecommendedBooks : mockMovies;
    
    items.forEach(item => {
      initialFavorites[item.id] = isInFavorites(item.id, storedType === 'books' ? 'book' : 'movie');
    });
    
    setFavorites(initialFavorites);

    // Simulate loading recommendations
    const timer = setTimeout(() => {
      setRecommendations(storedType === 'books' ? mockRecommendedBooks : mockMovies);
      setLoading(false);
      toast.success(storedType === 'books' 
        ? 'Рекомендации книг готовы!' 
        : 'Рекомендации фильмов готовы!');
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  const handleToggleFavorite = (item: any) => {
    const itemType = recommendationType === 'books' ? 'book' : 'movie';
    
    const favoriteItem: FavoriteItem = {
      id: item.id,
      type: itemType,
      title: item.title,
      subtitle: recommendationType === 'books' ? item.author : item.director
    };
    
    const newStatus = toggleFavorite(favoriteItem);
    
    setFavorites(prev => ({
      ...prev,
      [item.id]: newStatus
    }));
    
    toast.success(newStatus ? 'Добавлено в избранное' : 'Удалено из избранного');
  };

  // Reset recommendation flow
  const handleChangeRecommendationType = () => {
    navigate('/recommendation-selector');
  };

  // Render book or movie card based on recommendation type
  const renderItem = (item: any) => {
    if (recommendationType === 'books') {
      return (
        <div 
          key={item.id}
          className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-sm
                 border border-litflix-lightGreen/20 hover:shadow-md
                 transition-all duration-300 animate-slide-up"
          style={{ animationDelay: `${item.id * 0.1}s` }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif font-medium text-litflix-darkGreen">
              {item.title} ({item.year})
            </h3>
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <span className="text-sm text-litflix-darkGreen/70 mr-2">Совпадение:</span>
                <span className="bg-litflix-mediumGreen text-white text-sm font-medium px-2.5 py-0.5 rounded-full">
                  {item.matchScore}%
                </span>
              </div>
              
              <button 
                onClick={() => handleToggleFavorite(item)}
                className={`p-2 rounded-full ${
                  favorites[item.id] 
                    ? "text-white bg-litflix-darkGreen" 
                    : "text-litflix-darkGreen bg-litflix-lightGreen/20 hover:bg-litflix-lightGreen/30"
                }`}
              >
                <Heart size={18} fill={favorites[item.id] ? "white" : "none"} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center mt-2 mb-2">
            <div className="flex mr-4">
              {Array(5).fill(0).map((_, i) => (
                <Star 
                  key={i} 
                  className={i < Math.floor(item.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                  size={16} 
                />
              ))}
            </div>
            <span className="text-sm text-litflix-darkGreen/70">{item.rating}/5</span>
            
            <div className="mx-3 h-4 border-r border-litflix-darkGreen/20"></div>
            
            <span className="text-sm text-litflix-darkGreen/70">
              Автор: <span className="font-medium">{item.author}</span>
            </span>
          </div>

          <div className="mt-2 mb-3">
            <span className="inline-block bg-litflix-lightGreen/30 text-litflix-darkGreen px-2.5 py-0.5 rounded-full text-xs mr-2">
              {item.genre}
            </span>
            <span className="inline-block bg-litflix-paleYellow/50 text-litflix-darkGreen px-2.5 py-0.5 rounded-full text-xs">
              {item.pages} страниц
            </span>
          </div>
          
          <p className="mt-3 text-litflix-darkGreen">
            {item.description}
          </p>
          
          {expandedItemId === item.id && (
            <div className="mt-4 pt-4 border-t border-litflix-lightGreen/20 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-litflix-darkGreen mb-1">Переводы:</h4>
                  <p className="text-sm text-litflix-darkGreen/80">{item.translations}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-litflix-darkGreen mb-1">Награды:</h4>
                  <p className="text-sm text-litflix-darkGreen/80">{item.awards}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-litflix-darkGreen mb-1">Почему вам это понравится:</h4>
                <ul className="list-disc list-inside text-sm text-litflix-darkGreen/80">
                  <li>Соответствует вашим кинематографическим вкусам</li>
                  <li>Глубокие темы и проработанный художественный мир</li>
                  <li>Высокий рейтинг среди читателей</li>
                  <li>Культурное и историческое значение</li>
                </ul>
              </div>
            </div>
          )}
          
          <div className="mt-4 flex space-x-3">
            <button 
              onClick={() => toggleExpand(item.id)}
              className="text-litflix-mediumGreen hover:text-litflix-darkGreen text-sm font-medium flex items-center"
            >
              {expandedItemId === item.id ? (
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
              onClick={() => handleToggleFavorite(item)}
              className="text-litflix-mediumGreen hover:text-litflix-darkGreen text-sm font-medium flex items-center"
            >
              <Heart size={16} className="mr-1" fill={favorites[item.id] ? "currentColor" : "none"} />
              {favorites[item.id] ? 'В избранном' : 'Добавить в избранное'}
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
      );
    } else {
      // Movie card (existing functionality)
      return (
        <div 
          key={item.id}
          className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-sm
                 border border-litflix-lightGreen/20 hover:shadow-md
                 transition-all duration-300 animate-slide-up"
          style={{ animationDelay: `${item.id * 0.1}s` }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif font-medium text-litflix-darkGreen">
              {item.title} ({item.year})
            </h3>
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <span className="text-sm text-litflix-darkGreen/70 mr-2">Совпадение:</span>
                <span className="bg-litflix-mediumGreen text-white text-sm font-medium px-2.5 py-0.5 rounded-full">
                  {item.matchScore}%
                </span>
              </div>
              
              <button 
                onClick={() => handleToggleFavorite(item)}
                className={`p-2 rounded-full ${
                  favorites[item.id] 
                    ? "text-white bg-litflix-darkGreen" 
                    : "text-litflix-darkGreen bg-litflix-lightGreen/20 hover:bg-litflix-lightGreen/30"
                }`}
              >
                <Heart size={18} fill={favorites[item.id] ? "white" : "none"} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center mt-2 mb-2">
            <div className="flex mr-4">
              {Array(5).fill(0).map((_, i) => (
                <Star 
                  key={i} 
                  className={i < Math.floor(item.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                  size={16} 
                />
              ))}
            </div>
            <span className="text-sm text-litflix-darkGreen/70">{item.rating}/5</span>
            
            <div className="mx-3 h-4 border-r border-litflix-darkGreen/20"></div>
            
            <span className="text-sm text-litflix-darkGreen/70">
              Режиссер: <span className="font-medium">{item.director}</span>
            </span>
          </div>

          <div className="mt-2 mb-3">
            <span className="inline-block bg-litflix-lightGreen/30 text-litflix-darkGreen px-2.5 py-0.5 rounded-full text-xs mr-2">
              {item.genre}
            </span>
            <span className="inline-block bg-litflix-paleYellow/50 text-litflix-darkGreen px-2.5 py-0.5 rounded-full text-xs">
              {item.runtime}
            </span>
          </div>
          
          <p className="mt-3 text-litflix-darkGreen">
            {item.description}
          </p>
          
          {expandedItemId === item.id && (
            <div className="mt-4 pt-4 border-t border-litflix-lightGreen/20 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-litflix-darkGreen mb-1">В ролях:</h4>
                  <p className="text-sm text-litflix-darkGreen/80">{item.cast}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-litflix-darkGreen mb-1">Награды:</h4>
                  <p className="text-sm text-litflix-darkGreen/80">{item.awards}</p>
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
              onClick={() => toggleExpand(item.id)}
              className="text-litflix-mediumGreen hover:text-litflix-darkGreen text-sm font-medium flex items-center"
            >
              {expandedItemId === item.id ? (
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
              onClick={() => handleToggleFavorite(item)}
              className="text-litflix-mediumGreen hover:text-litflix-darkGreen text-sm font-medium flex items-center"
            >
              <Heart size={16} className="mr-1" fill={favorites[item.id] ? "currentColor" : "none"} />
              {favorites[item.id] ? 'В избранном' : 'Добавить в избранное'}
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
      );
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="page-background">
        <img 
          src="/lovable-uploads/27039ed7-4413-4b5d-be3a-4bef97e77d6a.png" 
          alt="Cozy book corner" 
          className="page-background-image opacity-70"
        />
        <div className="page-background-overlay" />
      </div>

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
          <BackButton onClick={() => navigate('/questionnaire')} />
          
          <button
            onClick={() => navigate('/favorites')}
            className="flex items-center space-x-2 text-litflix-mediumGreen hover:text-litflix-darkGreen"
          >
            <Heart size={20} />
            <span>Избранное</span>
          </button>
        </div>
        
        <h2 className="text-3xl font-serif font-semibold text-litflix-darkGreen mb-2 text-center">
          {recommendationType === 'books' 
            ? 'Рекомендации книг для вас' 
            : 'Рекомендации фильмов для вас'}
        </h2>
        
        <div className="flex justify-center mb-6">
          <button 
            onClick={handleChangeRecommendationType}
            className="flex items-center space-x-2 text-litflix-mediumGreen hover:text-litflix-darkGreen border border-litflix-lightGreen/30 px-4 py-1.5 rounded-full hover:bg-litflix-lightGreen/10"
          >
            {recommendationType === 'books' ? (
              <>
                <Film size={16} className="mr-1" />
                <span>Хочу рекомендации фильмов</span>
              </>
            ) : (
              <>
                <BookOpen size={16} className="mr-1" />
                <span>Хочу рекомендации книг</span>
              </>
            )}
          </button>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-6 py-20">
            <div className="w-16 h-16 border-4 border-litflix-mediumGreen border-t-transparent rounded-full animate-spin"></div>
            <p className="text-litflix-darkGreen/80">
              {recommendationType === 'books' 
                ? 'Подбираем книги на основе ваших предпочтений...'
                : 'Подбираем фильмы на основе ваших предпочтений...'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {recommendations.map(item => renderItem(item))}
          </div>
        )}
        
        <div className="flex justify-center mt-10 space-x-4">
          <button
            onClick={() => navigate('/')}
            className="bg-litflix-mediumGreen text-white font-medium py-3 px-8 rounded-full
                     shadow-md transition-all duration-300 ease-out
                     hover:shadow-lg hover:bg-litflix-darkGreen active:scale-[0.98]"
          >
            Вернуться на главную
          </button>
          
          <button
            onClick={() => navigate('/favorites')}
            className="bg-white text-litflix-mediumGreen font-medium py-3 px-8 rounded-full
                     border border-litflix-mediumGreen shadow-md transition-all duration-300 ease-out
                     hover:bg-litflix-mediumGreen/10 active:scale-[0.98]"
          >
            Перейти в избранное
          </button>
        </div>
      </main>
    </div>
  );
};

export default Recommendations;
