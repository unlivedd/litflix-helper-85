
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
        "bg-litflix-mediumGreen text-white font-medium py-3 px-8 rounded-full",
        "shadow-md transition-all duration-300 ease-out",
        "hover:shadow-lg hover:bg-litflix-darkGreen active:scale-[0.98]",
        "animate-fade-in",
        className
      )}
      onClick={onClick}
    >
      НАЙТИ КНИГУ
    </button>
  );
};

export default FindBookButton;
