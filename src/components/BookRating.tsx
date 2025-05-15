
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
        return "e307bbbb-8379-4ce7-bae6-70fb1b7cc32d"; // Изображение для рейтинга 1
      case 2:
        return "b42ac607-5b2e-40f6-989a-d2f6ba6fae77"; // Изображение для рейтинга 2
      case 3:
        return "17a4e21b-43b4-4445-9f9f-1be6b1ce5720"; // Изображение для рейтинга 3
      case 4:
        return "12f14d62-8f94-4aff-bcd6-7814c4ba45b3"; // Изображение для рейтинга 4
      case 5:
        return "4852c0fd-2c6c-4d5d-8a05-9e68e8b60e9f"; // Изображение для рейтинга 5
      case 6:
        return "cf0ff9be-1066-4399-ab05-a56a41ea83f0"; // Изображение для рейтинга 6
      case 7:
        return "7348a675-1b95-453b-b305-211602e68223"; // Изображение для рейтинга 7
      case 8:
        return "64d0d4f4-cb59-4b61-acdc-78595ecdfd98"; // Изображение для рейтинга 8
      case 9:
        return "58ccd607-72c7-49a3-875f-2e92d5b3d4c0"; // Изображение для рейтинга 9
      case 10:
        return "0f17b9e4-2b3f-4525-8426-71371a436264"; // Изображение для рейтинга 10
      default:
        return "e307bbbb-8379-4ce7-bae6-70fb1b7cc32d"; // Значение по умолчанию
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
