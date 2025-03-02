
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import FindBookButton from '@/components/FindBookButton';
import SearchBar from '@/components/SearchBar';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  
  // Animation decorations
  const circlePositions = [
    { size: '500px', left: '-100px', top: '200px', delay: '0s' },
    { size: '600px', right: '-150px', bottom: '-150px', delay: '0.3s' },
    { size: '400px', right: '30%', top: '-100px', delay: '0.6s' },
  ];

  const handleFindBook = () => {
    navigate('/questionnaire');
  };

  const handleSearch = (query: string) => {
    toast.success(`Поиск по запросу: ${query}`);
    // In a real app, this would search the database
    navigate('/books');
  };

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

      <Header onSearchClick={() => setShowSearch(!showSearch)} />
      
      <main className="container max-w-5xl mx-auto px-4 pt-12 pb-20">
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          {/* Hero image - cozy reading spot */}
          <div className="w-full max-w-2xl h-[300px] rounded-2xl overflow-hidden mb-10 relative">
            <img 
              src="/lovable-uploads/39f72b27-0c19-4da6-bdd9-fb226f35d76d.png" 
              alt="Cozy reading spot with books and plants" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-litflix-darkGreen/20 to-transparent" />
          </div>
          
          {showSearch ? (
            <SearchBar onSearch={handleSearch} />
          ) : (
            <div className="text-center animate-slide-up">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-litflix-darkGreen mb-6">
                От книг к фильмам
              </h2>
              <p className="text-lg text-litflix-darkGreen/80 max-w-xl mx-auto mb-10">
                Найдите фильмы, которые понравятся вам, основываясь на ваших литературных предпочтениях
              </p>
              <FindBookButton onClick={handleFindBook} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
