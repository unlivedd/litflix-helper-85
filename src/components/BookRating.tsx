
import React from 'react';
import { Star } from 'lucide-react';

interface BookRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  onRate?: (rating: number) => void;
  disabled?: boolean;
}

const BookRating: React.FC<BookRatingProps> = ({
  rating = 0,
  size = 'md',
  showValue = false,
  onRate,
  disabled = false,
}) => {
  const maxStars = 10;
  const interactive = !!onRate && !disabled;
  
  // Определение размеров звезд в зависимости от пропса size
  const starSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };
  
  const starSize = starSizes[size];
  
  // Определение цветов для индикатора рейтинга
  const getStarColor = (index: number, rating: number) => {
    // Если звезда полностью заполнена
    if (index < Math.floor(rating)) {
      return "#f59e0b"; // Золотой цвет
    }
    // Если звезда не заполнена
    return "#d1d5db"; // Серый цвет
  };

  const handleRating = (newRating: number) => {
    if (interactive) {
      onRate(newRating);
    }
  };

  return (
    <div className="flex items-center">
      <div className="flex items-center gap-0.5">
        {[...Array(maxStars)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleRating(index + 1)}
            disabled={!interactive}
            className={`focus:outline-none transition-colors ${
              interactive ? 'hover:scale-110 cursor-pointer' : 'cursor-default'
            }`}
            aria-label={`Rate ${index + 1} out of ${maxStars}`}
          >
            <Star
              fill={getStarColor(index, rating)}
              color={getStarColor(index, rating)}
              size={starSize}
              className="transition-all duration-200"
            />
          </button>
        ))}
      </div>
      
      {showValue && (
        <span className="ml-2 text-litflix-darkGreen font-medium">
          {rating.toFixed(1)}/10
        </span>
      )}
    </div>
  );
};

export default BookRating;
