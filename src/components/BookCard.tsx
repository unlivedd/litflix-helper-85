
import React from 'react';
import { cn } from '@/lib/utils';

interface BookCardProps {
  title: string;
  author: string;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
}

const BookCard: React.FC<BookCardProps> = ({
  title,
  author,
  onClick,
  selected = false,
  className,
}) => {
  return (
    <div 
      className={cn(
        "book-card hover-lift cursor-pointer h-52 flex flex-col shadow-lg",
        selected && "ring-2 ring-litflix-darkGreen transform scale-[1.02]",
        className
      )}
      onClick={onClick}
    >
      <div className="book-cover flex-grow flex items-center justify-center p-5 bg-litflix-paleYellow rounded-t-lg">
        <div className="text-center">
          <h3 className="font-serif font-semibold text-xl text-litflix-darkGreen line-clamp-2">{title}</h3>
          <p className="text-sm text-litflix-darkGreen/70 mt-2">{author}</p>
        </div>
      </div>
      <div className="book-spine h-10 bg-litflix-darkGreen rounded-b-lg flex items-center justify-center relative">
        <div className="absolute -top-1.5 w-4/5 h-1 bg-white rounded-full mx-auto"></div>
        <div className="w-4/5 h-4 bg-white rounded-full border-2 border-litflix-darkGreen"></div>
      </div>
    </div>
  );
};

export default BookCard;
