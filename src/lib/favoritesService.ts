
import { toast } from 'sonner';
import { getCurrentUser, updateUser } from './authService';

export type FavoriteItem = {
  id: number;
  type: 'book' | 'movie';
  title: string;
  subtitle?: string; // Adding an optional subtitle field
};

export const isInFavorites = (id: number, type: 'book' | 'movie'): boolean => {
  try {
    // Проверяем, авторизован ли пользователь
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    
    // Получаем избранное пользователя
    const favorites = currentUser.favorites || [];
    
    // Проверяем наличие элемента в избранном
    return favorites.some((item: FavoriteItem) => item.id === id && item.type === type);
  } catch (error) {
    console.error('Error checking favorites:', error);
    return false;
  }
};

export const toggleFavorite = (item: FavoriteItem): boolean => {
  try {
    // Проверяем, авторизован ли пользователь
    const currentUser = getCurrentUser();
    if (!currentUser) {
      toast.error('Необходимо войти для добавления в избранное');
      return false;
    }
    
    // Инициализируем массив избранного, если его нет
    if (!currentUser.favorites) {
      currentUser.favorites = [];
    }
    
    // Проверяем, есть ли уже такой элемент в избранном
    const existingIndex = currentUser.favorites.findIndex(
      (fav: FavoriteItem) => fav.id === item.id && fav.type === item.type
    );
    
    // Если элемент уже в избранном - удаляем его
    if (existingIndex !== -1) {
      currentUser.favorites.splice(existingIndex, 1);
      
      // Update user in database and localStorage
      updateUser({ favorites: currentUser.favorites });
      return false;
    }
    
    // Если элемента нет - добавляем его
    currentUser.favorites.push(item);
    
    // Update user in database and localStorage
    updateUser({ favorites: currentUser.favorites });
    return true;
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return false;
  }
};

export const getFavorites = (): FavoriteItem[] => {
  try {
    // Проверяем, авторизован ли пользователь
    const currentUser = getCurrentUser();
    if (!currentUser) return [];
    
    return currentUser.favorites || [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};
