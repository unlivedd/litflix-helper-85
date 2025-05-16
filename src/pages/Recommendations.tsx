
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';

// Это просто для демонстрации, в реальном приложении данные будут из API
const bookRecommendations = [
  { id: 101, title: "Мастер и Маргарита", author: "Михаил Булгаков" },
  { id: 102, title: "1984", author: "Джордж Оруэлл" },
  { id: 103, title: "Гарри Поттер и философский камень", author: "Дж. К. Роулинг" },
  { id: 104, title: "Война и мир", author: "Лев Толстой" },
  { id: 105, title: "Преступление и наказание", author: "Фёдор Достоевский" },
  { id: 106, title: "Три товарища", author: "Эрих Мария Ремарк" },
];

const movieRecommendations = [
  { id: 201, title: "Властелин колец", director: "Питер Джексон", year: 2001 },
  { id: 202, title: "Зелёная книга", director: "Питер Фаррелли", year: 2018 },
  { id: 203, title: "Шоу Трумана", director: "Питер Уир", year: 1998 },
  { id: 204, title: "Жизнь Пи", director: "Энг Ли", year: 2012 },
  { id: 205, title: "Престиж", director: "Кристофер Нолан", year: 2006 },
];

const Recommendations = () => {
  const navigate = useNavigate();
  const [recommendationType, setRecommendationType] = useState<'books' | 'movies'>('books');
  const [recommendations, setRecommendations] = useState<any[]>([]);

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
    setRecommendations(
      recommendationType === 'books' ? bookRecommendations : movieRecommendations
    );
  }, [recommendationType]);

  const handleBackClick = () => {
    // Возвращаемся на страницу выбора книг или фильмов в зависимости от типа рекомендаций
    if (recommendationType === 'books') {
      navigate('/movies'); // Если рекомендуем книги, значит были на странице фильмов
    } else {
      navigate('/books'); // Если рекомендуем фильмы, значит были на странице книг
    }
  };

  const handleToggleFavorite = (id: number) => {
    // Реализация в реальном приложении
    toast.success(`Добавлено в избранное: ${id}`);
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
                      onClick={() => handleToggleFavorite(item.id)}
                      className="p-1.5 rounded-full bg-litflix-lightGreen/20 text-litflix-darkGreen/70"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-litflix-darkGreen/70 text-sm italic">{item.author}</p>
                </div>
              ) : (
                // Movie card
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-medium text-litflix-darkGreen">{item.title}</h3>
                    <button 
                      onClick={() => handleToggleFavorite(item.id)}
                      className="p-1.5 rounded-full bg-litflix-lightGreen/20 text-litflix-darkGreen/70"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-litflix-darkGreen/70 text-sm">
                    {item.director}, {item.year}
                  </p>
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
