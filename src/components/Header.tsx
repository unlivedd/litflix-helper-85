
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import UserMenu from '@/components/UserMenu';

interface HeaderProps {
  onSearchClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchClick }) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-20 transition-all duration-300 ${
        scrolled 
        ? 'bg-litflix-cream/80 backdrop-blur-md py-2 shadow-sm' 
        : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div 
          className="font-serif text-xl font-bold text-litflix-darkGreen cursor-pointer"
          onClick={() => navigate('/')}
        >
          <span className="relative">
            B
          </span>
          <span className="relative">
            <span className="absolute text-xs top-0 right-0 font-sans">R.</span>
            O
          </span>
          <span className="relative">
            <span className="absolute text-xs bottom-0 right-0 font-sans">d.</span>
            O
          </span>
          <span>K</span>
          <span>S</span>
        </div>
        
        <div className="flex items-center space-x-4">
          {onSearchClick && (
            <button
              onClick={onSearchClick}
              className="p-2 rounded-full hover:bg-litflix-paleYellow/60 text-litflix-darkGreen/80 transition-colors"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
          )}
          
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
