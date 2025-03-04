
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import { getFavorites, removeFromFavorites } from '@/lib/favoritesService';
import { Heart, Trash2, Book, Film } from 'lucide-react';
import { toast } from 'sonner';

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Array<{id: number; type: 'book' | 'movie'; title: string}>>([]);
  
  useEffect(() => {
    const loadFavorites = () => {
      const favoritesData = getFavorites();
      setFavorites(favoritesData);
    };
    
    loadFavorites();
    
    // Add event listener for storage changes (if user has multiple tabs open)
    window.addEventListener('storage', loadFavorites);
    
    return () => {
      window.removeEventListener('storage', loadFavorites);
    };
  }, []);
  
  const handleRemoveFavorite = (id: number, type: 'book' | 'movie') => {
    removeFromFavorites(id, type);
    setFavorites(prev => prev.filter(item => !(item.id === id && item.type === type)));
    toast.success('Удалено из избранного');
  };
  
  const handleNavigateToItem = (id: number, type: 'book' | 'movie') => {
    if (type === 'book') {
      navigate(`/book/${id}`);
    } else {
      // Currently, we don't have dedicated movie detail pages, so we just go to recommendations
      navigate('/recommendations');
    }
  };

  return (
    <div className="min-h-screen bg-litflix-cream relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="page-background">
        <img 
          src="/lovable-uploads/de587bfc-46b3-4fd1-98b2-f5fea3c8c404.png" 
          alt="Books on table" 
          className="page-background-image opacity-60"
        />
        <div className="page-background-overlay" />
      </div>

      <Header />
      
      <main className="container mx-auto px-4 pt-8 pb-20 relative z-10">
        <div className="mb-6">
          <BackButton onClick={() => navigate('/')} />
        </div>
        
        <h2 className="text-3xl font-serif font-semibold text-litflix-darkGreen mb-8 text-center">
          Ваше избранное
        </h2>
        
        {favorites.length === 0 ? (
          <div className="text-center py-10">
            <Heart className="mx-auto mb-4 text-litflix-mediumGreen" size={50} />
            <p className="text-litflix-darkGreen text-lg">У вас пока нет избранных элементов</p>
            <button
              onClick={() => navigate('/books')}
              className="mt-6 bg-litflix-mediumGreen text-white font-medium py-2 px-6 rounded-full
                       hover:bg-litflix-darkGreen transition-colors"
            >
              Перейти к книгам
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((item) => (
              <div 
                key={`${item.type}-${item.id}`}
                className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between
                         hover:shadow-md transition-shadow border border-litflix-lightGreen/10"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${
                    item.type === 'book' 
                      ? 'bg-litflix-paleYellow text-litflix-darkGreen' 
                      : 'bg-litflix-lightGreen/30 text-litflix-darkGreen'
                  }`}>
                    {item.type === 'book' ? <Book size={20} /> : <Film size={20} />}
                  </div>
                  <div>
                    <h3 className="font-medium text-litflix-darkGreen">{item.title}</h3>
                    <p className="text-sm text-litflix-darkGreen/70">
                      {item.type === 'book' ? 'Книга' : 'Фильм'}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleNavigateToItem(item.id, item.type)}
                    className="p-2 rounded-full bg-litflix-lightGreen/20 text-litflix-darkGreen hover:bg-litflix-lightGreen/30"
                    aria-label="Подробнее"
                  >
                    <Heart size={18} fill="currentColor" />
                  </button>
                  <button
                    onClick={() => handleRemoveFavorite(item.id, item.type)}
                    className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                    aria-label="Удалить из избранного"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;
