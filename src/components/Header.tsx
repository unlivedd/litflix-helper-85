
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
          className="cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img 
            src="/lovable-uploads/23da1b85-5ec1-491a-958d-130fcb06d479.png" 
            alt="BOOKS Logo" 
            className="h-8"
          />
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
