
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
    // Check if user is logged in
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    
    // Get user favorites
    const favorites = currentUser.favorites || [];
    
    // Check if item exists in favorites
    return favorites.some((item: FavoriteItem) => item.id === id && item.type === type);
  } catch (error) {
    console.error('Error checking favorites:', error);
    return false;
  }
};

export const toggleFavorite = (item: FavoriteItem): boolean => {
  try {
    // Check if user is logged in
    const currentUser = getCurrentUser();
    if (!currentUser) {
      toast.error('Необходимо войти для добавления в избранное');
      return false;
    }
    
    // Initialize favorites array if it doesn't exist
    if (!currentUser.favorites) {
      currentUser.favorites = [];
    }
    
    // Check if item already exists in favorites
    const existingIndex = currentUser.favorites.findIndex(
      (fav: FavoriteItem) => fav.id === item.id && fav.type === item.type
    );
    
    let isNowFavorite = false;
    
    // If item exists in favorites - remove it
    if (existingIndex !== -1) {
      currentUser.favorites.splice(existingIndex, 1);
    } else {
      // If item doesn't exist - add it
      currentUser.favorites.push(item);
      isNowFavorite = true;
    }
    
    // Update user in database and localStorage
    updateUser({ favorites: currentUser.favorites });
    
    // Dispatch a custom event to notify other components about favorites change
    window.dispatchEvent(new CustomEvent('favorites-changed', { 
      detail: { item, isNowFavorite } 
    }));
    
    return isNowFavorite;
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return false;
  }
};

export const getFavorites = (): FavoriteItem[] => {
  try {
    // Check if user is logged in
    const currentUser = getCurrentUser();
    if (!currentUser) return [];
    
    return currentUser.favorites || [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};
