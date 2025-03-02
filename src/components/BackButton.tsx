
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ 
  onClick,
  className 
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center text-litflix-darkGreen/70 hover:text-litflix-darkGreen",
        "transition-colors duration-200",
        className
      )}
      aria-label="Go back"
    >
      <ArrowLeft size={20} className="mr-1" />
      <span className="text-sm font-medium">Назад</span>
    </button>
  );
};

export default BackButton;
