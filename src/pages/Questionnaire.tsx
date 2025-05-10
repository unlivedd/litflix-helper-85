
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const TOTAL_STEPS = 10;

const Questionnaire = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [recommendationType, setRecommendationType] = useState<'books' | 'movies'>('movies');
  
  // Check recommendation type on load
  useEffect(() => {
    const storedType = sessionStorage.getItem('recommendationType') as 'books' | 'movies';
    if (storedType) {
      setRecommendationType(storedType);
    }
  }, []);
  
  // Animation decorations
  const circlePositions = [
    { size: '500px', left: '-100px', top: '200px', delay: '0s' },
    { size: '600px', right: '-150px', bottom: '-150px', delay: '0.3s' },
  ];

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
      // Scroll to top on mobile
      window.scrollTo(0, 0);
    } else {
      // Questionnaire complete
      toast.success('Анализ завершен!');
      navigate('/recommendations');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      // Scroll to top on mobile
      window.scrollTo(0, 0);
    } else {
      navigate('/recommendation-selector');
    }
  };

  // Questions for each step - now dependent on recommendation type
  const bookQuestions = [
    "Какой жанр литературы вам больше всего нравится?",
    "Предпочитаете ли вы классику или современную литературу?",
    "Какие эмоции вы хотите испытывать при чтении?",
    "Какой темп повествования вам ближе?",
    "Интересуют ли вас сложные сюжетные линии?",
    "Насколько важны для вас глубокие персонажи?",
    "Предпочитаете ли вы реализм или фантастические элементы?",
    "Важно ли для вас культурное или историческое значение произведения?",
    "Обращаете ли вы внимание на стиль письма?",
    "Какие авторы вам нравятся больше всего?"
  ];

  const movieQuestions = [
    "Какие жанры кино вам нравятся больше всего?",
    "Предпочитаете ли вы классику кино или современные фильмы?",
    "Какие эмоции вы хотите испытывать при просмотре?",
    "Какой темп повествования в фильмах вам ближе?",
    "Интересуют ли вас сложные сюжетные линии в кино?",
    "Насколько важна для вас игра актеров?",
    "Предпочитаете ли вы реалистичные фильмы или с фантастическими элементами?",
    "Важно ли для вас культурное или историческое значение фильма?",
    "Обращаете ли вы внимание на визуальный стиль и режиссуру?",
    "Какие режиссеры вам нравятся больше всего?"
  ];

  const questions = recommendationType === 'books' ? bookQuestions : movieQuestions;
  const questionText = questions[currentStep - 1];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="page-background">
        <img 
          src="/lovable-uploads/2d79c713-e142-4111-834f-1b7d4de0ba52.png" 
          alt="Books with modern interior" 
          className="page-background-image opacity-70"
        />
        <div className="page-background-overlay" />
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
      
      <main className="container max-w-5xl mx-auto px-4 pt-8 pb-20">
        <div className="flex justify-between items-center mb-10">
          <BackButton onClick={handleBack} />
          <ProgressIndicator 
            currentStep={currentStep} 
            totalSteps={TOTAL_STEPS} 
          />
          <div className="w-20"></div> {/* Spacer for balance */}
        </div>
        
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm mb-8 animate-fade-in">
          <div className="mb-6">
            <span className="inline-block bg-litflix-lightGreen/30 text-litflix-darkGreen px-3 py-1 rounded-full text-sm mb-4">
              {recommendationType === 'books' ? 'Рекомендации книг' : 'Рекомендации фильмов'}
            </span>
            <h2 className="text-2xl font-serif font-semibold text-litflix-darkGreen">
              {questionText}
            </h2>
          </div>
          
          {/* Here is where your questionnaire content would go */}
          {/* For demonstration, I'll create a simple multiple choice */}
          <div className="space-y-4">
            <div className="flex flex-col space-y-3">
              {['Вариант A', 'Вариант B', 'Вариант C', 'Вариант D'].map((option, idx) => (
                <button
                  key={idx}
                  className="text-left w-full p-4 rounded-lg border border-litflix-lightGreen/50 
                           hover:bg-litflix-paleYellow/50 hover:border-litflix-mediumGreen
                           transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleNext}
            className="bg-litflix-mediumGreen hover:bg-litflix-darkGreen text-white px-8 py-6 rounded-full"
          >
            {currentStep === TOTAL_STEPS ? 'Завершить' : 'Далее'}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Questionnaire;
