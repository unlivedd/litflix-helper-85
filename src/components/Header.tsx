
import React from 'react';
import { Search, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onSearchClick?: () => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  onSearchClick,
  className 
}) => {
  return (
    <header className={cn("w-full py-4 px-6 flex justify-between items-center", className)}>
      <h1 className="text-3xl font-serif font-bold text-litflix-darkGreen tracking-tighter">
        <span className="text-litflix-mediumGreen">B</span>
        <span className="relative">
          <span className="absolute text-xs top-1 left-1">R.</span>
          O
        </span>
        <span className="relative">
          <span className="absolute text-xs bottom-1 left-1">d.</span>
          O
        </span>
        <span className="text-litflix-mediumGreen">K</span>
        <span className="text-litflix-darkGreen">S</span>
      </h1>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={onSearchClick}
          className="rounded-full bg-litflix-mediumGreen/20 p-2 text-litflix-darkGreen hover:bg-litflix-mediumGreen/30 transition-colors"
          aria-label="Search"
        >
          <Search size={20} />
        </button>
        <button 
          className="rounded-full bg-litflix-mediumGreen/20 p-2 text-litflix-darkGreen hover:bg-litflix-mediumGreen/30 transition-colors"
          aria-label="Video recommendations"
        >
          <Camera size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
