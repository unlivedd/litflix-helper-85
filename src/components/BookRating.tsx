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
        return "ec4de521-5544-472d-973b-d6ec4e85abc0"; // Изображение для рейтинга 1
      case 2:
        return "39f72b27-0c19-4da6-bdd9-fb226f35d76d"; // Изображение для рейтинга 2
      case 3:
        return "dd4f5308-4d1e-4ec1-a29d-c90913eeebe1"; // Изображение для рейтинга 3
      case 4:
        return "ff1e5352-5f90-4725-bd76-f900ee33d4ed"; // Изображение для рейтинга 4
      case 5:
        return "2d79c713-e142-4111-834f-1b7d4de0ba52"; // Изображение для рейтинга 5
      case 6:
        return "47ead0a4-2a24-4a17-be64-5e105ca7ea6e"; // Изображение для рейтинга 6
      case 7:
        return "27e701fb-2678-4df8-8791-c6265581d4de"; // Изображение для рейтинга 7
      case 8:
        return "801dd961-ac22-45e4-9579-76888f612e3b"; // Изображение для рейтинга 8
      case 9:
        return "a507fcc3-de12-4447-9478-f8ced88ce315"; // Изображение для рейтинга 9
      case 10:
        return "48b4e597-20e2-4aa9-afd1-0d54cbf7f49a"; // Изображение для рейтинга 10
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
            {Math.round(rating)}/10
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
          {Math.round(rating)}/10
        </span>
      )}
    </div>
  );
};

export default BookRating;
