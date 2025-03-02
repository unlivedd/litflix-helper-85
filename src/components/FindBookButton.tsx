
import React from 'react';
import { cn } from '@/lib/utils';

interface FindBookButtonProps {
  onClick: () => void;
  className?: string;
}

const FindBookButton: React.FC<FindBookButtonProps> = ({ 
  onClick,
  className 
}) => {
  return (
    <button
      className={cn(
        "bg-litflix-mediumGreen text-white font-medium py-4 px-14 rounded-full",
        "shadow-md transition-all duration-300 ease-out text-2xl tracking-wide",
        "hover:shadow-lg hover:bg-litflix-darkGreen active:scale-[0.98]",
        "uppercase font-serif",
        className
      )}
      onClick={onClick}
    >
      Найти книгу
    </button>
  );
};

export default FindBookButton;
