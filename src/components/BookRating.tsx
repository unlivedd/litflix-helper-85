
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

  // Новый функционал для получения пути к изображению рейтинга на основе значения
  const getRatingImagePath = (rating: number) => {
    // Округляем рейтинг до ближайшего целого
    const roundedRating = Math.round(rating);
    
    // Проверяем, что рейтинг в допустимом диапазоне
    if (roundedRating < 1) return "/lovable-uploads/85f240cc-6e5f-4b0c-9a44-b7fa4056abc9.png"; // Рейтинг 1
    if (roundedRating > 10) return "/lovable-uploads/d6693b4a-26d8-4a3b-a5a7-05dbcdae0981.png"; // Рейтинг 10
    
    // Возвращаем соответствующее изображение из загруженных
    return getRatingImageById(roundedRating);
  };

  // Новые ID изображений для разных значений рейтинга
  const getRatingImageById = (rating: number) => {
    switch (rating) {
      case 1:
        return "/lovable-uploads/85f240cc-6e5f-4b0c-9a44-b7fa4056abc9.png"; // Изображение для рейтинга 1
      case 2:
        return "/lovable-uploads/67391ce7-87ef-454c-867b-a233aacabed9.png"; // Изображение для рейтинга 2
      case 3:
        return "/lovable-uploads/94735000-e974-41b6-a143-38cb688dae53.png"; // Изображение для рейтинга 3
      case 4:
        return "/lovable-uploads/c541816e-4f53-436b-9613-5419b0b286a5.png"; // Изображение для рейтинга 4
      case 5:
        return "/lovable-uploads/593436ae-4b0b-4791-9a36-78d5063f128c.png"; // Изображение для рейтинга 5
      case 6:
        return "/lovable-uploads/7ee95817-99e9-441f-af43-52efb84046b0.png"; // Изображение для рейтинга 6
      case 7:
        return "/lovable-uploads/67b7fd9a-eb3d-4c7d-ab87-a7373d9cc9ce.png"; // Изображение для рейтинга 7
      case 8:
        return "/lovable-uploads/ba33f1f3-0aca-4193-9411-078078f8dbf9.png"; // Изображение для рейтинга 8
      case 9:
        return "/lovable-uploads/9c672a2f-83eb-4ac2-b098-27f307d85780.png"; // Изображение для рейтинга 9
      case 10:
        return "/lovable-uploads/d6693b4a-26d8-4a3b-a5a7-05dbcdae0981.png"; // Изображение для рейтинга 10
      default:
        return "/lovable-uploads/85f240cc-6e5f-4b0c-9a44-b7fa4056abc9.png"; // Значение по умолчанию
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

  // Проверяем, является ли тип входного рейтинга числом
  const numericRating = typeof rating === 'number' ? rating : 0;

  // Обеспечиваем, что рейтинг всегда находится в диапазоне от 1 до 10
  const safeRating = Math.max(1, Math.min(10, numericRating));

  if (useImages) {
    return (
      <div className="flex flex-col items-center gap-2">
        <img 
          src={getRatingImagePath(safeRating)} 
          alt={`Рейтинг ${Math.round(safeRating)} из 10`} 
          className="h-8 w-full object-contain"
          onError={(e) => {
            console.error("Error loading image:", e);
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.alt = `Рейтинг ${Math.round(safeRating)} из 10`;
          }}
        />
        
        {interactive && (
          <Slider
            value={[safeRating]}
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
            {Math.round(safeRating)}/10
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
              fill={getStarColor(index, safeRating)}
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
    </div>
  );
};

export default BookRating;
