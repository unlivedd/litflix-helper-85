
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
        "book-card hover-lift cursor-pointer",
        selected && "ring-2 ring-litflix-darkGreen transform scale-[1.02]",
        className
      )}
      onClick={onClick}
    >
      <div className="book-cover flex items-center justify-center p-4">
        <div className="text-center">
          <h3 className="font-serif font-semibold text-litflix-darkGreen line-clamp-2">{title}</h3>
          <p className="text-sm text-litflix-darkGreen/70 mt-1">{author}</p>
        </div>
      </div>
      <div className="book-spine">
        <div className="book-title" />
      </div>
    </div>
  );
};

export default BookCard;
