
import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  className,
  placeholder = 'Поиск книг...'
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  // When component mounts, focus the input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "relative w-full max-w-3xl mx-auto animate-slide-down",
        className
      )}
    >
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full py-3 pl-12 pr-4 rounded-full bg-litflix-cream/80 
                   backdrop-blur-sm border border-litflix-lightGreen/30
                   text-litflix-darkGreen placeholder:text-litflix-darkGreen/50
                   focus:outline-none focus:ring-2 focus:ring-litflix-mediumGreen/50
                   shadow-sm"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-litflix-darkGreen/60">
          <Search size={20} />
        </div>
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2
                   bg-litflix-mediumGreen text-white px-4 py-1 rounded-full
                   text-sm hover:bg-litflix-darkGreen transition-colors"
        >
          Найти
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
