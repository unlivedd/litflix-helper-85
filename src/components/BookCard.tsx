
import React from 'react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Info, Heart } from 'lucide-react';
import BookRating from './BookRating';
import { toggleFavorite, isInFavorites, FavoriteItem } from '@/lib/favoritesService';
import { toast } from 'sonner';

interface BookCardProps {
  title: string;
  author: string;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
  id?: number;
  rating?: number;
}

const BookCard: React.FC<BookCardProps> = ({
  title,
  author,
  onClick,
  selected = false,
  className,
  id,
  rating
}) => {
  const navigate = useNavigate();
  
  const isFavorite = id ? isInFavorites(id, 'book') : false;
  
  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (id) {
      navigate(`/book/${id}`);
    }
  };
  
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!id) return;
    
    const favoriteItem: FavoriteItem = {
      id,
      type: 'book',
      title,
      subtitle: author
    };
    
    const isNowFavorite = toggleFavorite(favoriteItem);
    
    toast.success(isNowFavorite 
      ? `"${title}" добавлено в избранное` 
      : `"${title}" удалено из избранного`
    );
  };

  return (
    <div 
      className={cn(
        "book-card hover-lift cursor-pointer flex flex-col shadow-md",
        "h-52 rounded-2xl overflow-hidden transition-all duration-300",
        selected && "ring-2 ring-litflix-darkGreen transform scale-[1.02]",
        className
      )}
      onClick={onClick}
    >
      <div className="book-cover flex-grow flex items-center justify-center p-5 bg-litflix-paleYellow rounded-t-2xl relative">
        {/* Heart icon for favorites */}
        <button
          className={cn(
            "absolute top-2 left-2 p-1.5 rounded-full transition-all duration-300",
            isFavorite 
              ? "text-white bg-litflix-darkGreen" 
              : "text-litflix-darkGreen/70 bg-white/50 hover:bg-white/80"
          )}
          onClick={handleFavoriteToggle}
        >
          <Heart size={16} fill={isFavorite ? "white" : "none"} />
        </button>

        {id && (
          <button 
            onClick={handleInfoClick}
            className="absolute top-2 right-2 text-litflix-darkGreen/70 hover:text-litflix-darkGreen p-1 rounded-full bg-white/50 hover:bg-white/80 transition-colors"
          >
            <Info size={16} />
          </button>
        )}
        <div className="text-center">
          <h3 className="font-serif font-semibold text-xl text-litflix-darkGreen line-clamp-2">{title}</h3>
          <p className="text-sm text-litflix-darkGreen/70 mt-2 italic">{author}</p>
        </div>
      </div>
      
      <div className="relative">
        <div className="book-spine h-10 bg-litflix-paleYellow/80 rounded-b-2xl overflow-hidden">
          {rating !== undefined && (
            <div className="w-full h-full flex items-center justify-center">
              <BookRating rating={rating} useImages={false} size="sm" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
