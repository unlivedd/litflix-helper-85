
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import { BookOpen, Film } from 'lucide-react';
import { toast } from 'sonner';

const RecommendationSelector = () => {
  const navigate = useNavigate();
  
  const circlePositions = [
    { size: '500px', left: '-100px', top: '200px', delay: '0s' },
    { size: '600px', right: '-150px', bottom: '-150px', delay: '0.3s' },
  ];

  const handleSelection = (type: 'books' | 'movies') => {
    // Store the recommendation type in sessionStorage
    sessionStorage.setItem('recommendationType', type);
    
    // Navigate to questionnaire with the type
    navigate('/questionnaire');
    
    toast.info(type === 'books' 
      ? 'Вы выбрали получение рекомендаций книг на основе фильмов' 
      : 'Вы выбрали получение рекомендаций фильмов на основе книг');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="page-background">
        <img 
          src="/lovable-uploads/2d79c713-e142-4111-834f-1b7d4de0ba52.png" 
          alt="Books background" 
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
        <div className="mb-10">
          <BackButton onClick={() => navigate('/')} />
        </div>
        
        <h2 className="text-3xl font-serif font-semibold text-litflix-darkGreen mb-8 text-center">
          Что бы вы хотели получить в рекомендациях?
        </h2>
        
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-3xl mx-auto mt-16">
          <button
            onClick={() => handleSelection('books')}
            className="recommendation-card w-full md:w-1/2 bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-md
                     border border-litflix-lightGreen/20 hover:shadow-lg hover:border-litflix-mediumGreen
                     transition-all duration-300 flex flex-col items-center justify-center gap-6"
          >
            <div className="w-32 h-32 rounded-full bg-litflix-paleYellow/50 flex items-center justify-center">
              <BookOpen size={64} className="text-litflix-darkGreen" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-serif font-medium text-litflix-darkGreen mb-2">
                Рекомендации книг
              </h3>
              <p className="text-litflix-darkGreen/80">
                Мы подберем вам книги на основе ваших предпочтений в фильмах
              </p>
            </div>
          </button>
          
          <button
            onClick={() => handleSelection('movies')}
            className="recommendation-card w-full md:w-1/2 bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-md
                     border border-litflix-lightGreen/20 hover:shadow-lg hover:border-litflix-mediumGreen
                     transition-all duration-300 flex flex-col items-center justify-center gap-6"
          >
            <div className="w-32 h-32 rounded-full bg-litflix-paleYellow/50 flex items-center justify-center">
              <Film size={64} className="text-litflix-darkGreen" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-serif font-medium text-litflix-darkGreen mb-2">
                Рекомендации фильмов
              </h3>
              <p className="text-litflix-darkGreen/80">
                Мы подберем вам фильмы на основе ваших предпочтений в книгах
              </p>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
};

export default RecommendationSelector;
