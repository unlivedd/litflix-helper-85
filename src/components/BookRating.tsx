
import React from 'react';
import { Star } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface BookRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  onRate?: (rating: number) => void;
  disabled?: boolean;
  useImages?: boolean;
}

const BookRating: React.FC<BookRatingProps> = ({
  rating = 0,
  size = 'md',
  showValue = false,
  onRate,
  disabled = false,
  useImages = false,
}) => {
  // Теперь используем 10-звездочную систему
  const maxStars = 10;
  const interactive = !!onRate && !disabled;
  
  // Определение размеров звезд в зависимости от пропса size
  const starSizes = {
    sm: 12,
    md: 16,
    lg: 20
  };
  
  const starSize = starSizes[size];
  
  // Определение цветов для индикатора рейтинга
  const getStarColor = (index: number, rating: number) => {
    // Fully filled stars
    if (index < Math.floor(rating)) {
      return "#f59e0b"; // Gold color
    }
    // Partially filled star
    if (index === Math.floor(rating) && rating % 1 > 0) {
      return "#f59e0b"; // Gold color with partial fill
    }
    // Empty stars
    return "#d1d5db"; // Gray color
  };

  const handleRating = (newRating: number) => {
    if (interactive) {
      onRate(newRating);
    }
  };

  const handleSliderChange = (value: number[]) => {
    if (interactive) {
      onRate(value[0]);
    }
  };

  // Проверяем, является ли тип входного рейтинга числом
  const numericRating = typeof rating === 'number' ? rating : 0;

  // Обеспечиваем, что рейтинг всегда находится в диапазоне от 0 до 10
  const safeRating = Math.max(0, Math.min(10, numericRating));

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
              fill={index < safeRating ? getStarColor(index, safeRating) : "none"}
              color={getStarColor(index, safeRating)}
              size={starSize}
              className="transition-all duration-200"
            />
          </button>
        ))}
      </div>
      
      {showValue && (
        <span className="ml-2 text-litflix-darkGreen font-medium">
          {Math.round(safeRating)}/10
        </span>
      )}

      {interactive && (
        <Slider
          value={[safeRating]}
          min={0}
          max={10}
          step={1}
          onValueChange={handleSliderChange}
          disabled={disabled}
          className="w-full mt-2"
        />
      )}
    </div>
  );
};

export default BookRating;
