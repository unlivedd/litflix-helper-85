
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
  const maxStars = 10;
  const interactive = !!onRate && !disabled;
  
  // Определение размеров звезд в зависимости от пропса size
  const starSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };
  
  const starSize = starSizes[size];

  // Путь к изображению рейтинга на основе значения
  const getRatingImagePath = (rating: number) => {
    // Округляем рейтинг до ближайшего целого
    const roundedRating = Math.round(rating);
    
    // Возвращаем соответствующее изображение
    return `/lovable-uploads/${getRatingImageId(roundedRating)}.png`;
  };

  // ID изображений для разных значений рейтинга
  const getRatingImageId = (rating: number) => {
    switch (rating) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        // Для 1-5 используем предыдущие изображения (если они были)
        return "ec4de521-5544-472d-973b-d6ec4e85abc0"; // Заменить на нужный ID для 1-5
      case 6:
        return "ec4de521-5544-472d-973b-d6ec4e85abc0";
      case 7:
        return "992a74b1-a1f6-401a-9bd1-201ea844e191";
      case 8:
        return "8c3b4cb9-63de-46d9-923f-7f103708ac9d";
      case 9:
        return "b11028ef-50be-44c1-a5a3-37fa70703d4f";
      case 10:
        return "f917757b-9e17-4b91-b2b8-5a5cdb48688c";
      default:
        return "ec4de521-5544-472d-973b-d6ec4e85abc0"; // Значение по умолчанию
    }
  };
  
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

  const handleSliderChange = (value: number[]) => {
    if (interactive) {
      onRate(value[0]);
    }
  };

  if (useImages) {
    return (
      <div className="flex flex-col items-center gap-2">
        <img 
          src={getRatingImagePath(rating)} 
          alt={`Рейтинг ${rating} из 10`} 
          className="h-8 w-full object-contain"
        />
        
        {interactive && (
          <Slider
            value={[rating]}
            min={1}
            max={10}
            step={1}
            onValueChange={handleSliderChange}
            disabled={disabled}
            className="w-full max-w-xs"
          />
        )}
        
        {showValue && (
          <span className="text-litflix-darkGreen font-medium text-center">
            {rating.toFixed(1)}/10
          </span>
        )}
      </div>
    );
  }

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
