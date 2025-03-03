
import React from 'react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Info, Heart } from 'lucide-react';

interface BookCardProps {
  title: string;
  author: string;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
  id?: number;
}

const BookCard: React.FC<BookCardProps> = ({
  title,
  author,
  onClick,
  selected = false,
  className,
  id
}) => {
  const navigate = useNavigate();
  
  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (id) {
      navigate(`/book/${id}`);
    }
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
        {/* Heart icon for selection state */}
        <button
          className={cn(
            "absolute top-2 left-2 p-1.5 rounded-full transition-all duration-300",
            selected 
              ? "text-white bg-litflix-darkGreen" 
              : "text-litflix-darkGreen/70 bg-white/50 hover:bg-white/80"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          <Heart size={16} fill={selected ? "white" : "none"} />
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
        <div className="book-spine h-12 bg-litflix-darkGreen rounded-b-2xl flex items-center justify-center">
          <div className="w-4/5 h-4 bg-white rounded-full mx-auto opacity-80"></div>
        </div>
        <div className="absolute -top-1.5 left-0 right-0 w-4/5 h-1 bg-white/90 rounded-full mx-auto"></div>
      </div>
    </div>
  );
};

export default BookCard;
