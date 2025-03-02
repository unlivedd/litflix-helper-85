
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
        "bg-litflix-mediumGreen text-white font-medium py-4 px-12 rounded-full",
        "shadow-md transition-all duration-300 ease-out text-2xl tracking-wider",
        "hover:shadow-lg hover:bg-litflix-darkGreen active:scale-[0.98]",
        "uppercase font-serif border-2 border-white/30",
        "backdrop-blur-sm relative overflow-hidden",
        className
      )}
      onClick={onClick}
    >
      <span className="relative z-10">Найти книгу</span>
      <div className="absolute inset-0 bg-gradient-to-r from-litflix-mediumGreen/80 to-litflix-darkGreen/90 -z-0"></div>
    </button>
  );
};

export default FindBookButton;
