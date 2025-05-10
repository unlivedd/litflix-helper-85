
export interface FavoriteItem {
  id: number;
  type: 'book' | 'movie';
  title: string;
  subtitle?: string; // author for books, director for movies
}

// Check if an item is in favorites
export const isInFavorites = (id: number, type: 'book' | 'movie'): boolean => {
  try {
    const favoritesStr = localStorage.getItem('favorites');
    if (!favoritesStr) return false;
    
    const favorites: FavoriteItem[] = JSON.parse(favoritesStr);
    return favorites.some(item => item.id === id && item.type === type);
  } catch (error) {
    console.error('Error checking favorites:', error);
    return false;
  }
};

// Toggle an item in favorites
export const toggleFavorite = (item: FavoriteItem): boolean => {
  try {
    const favoritesStr = localStorage.getItem('favorites');
    let favorites: FavoriteItem[] = favoritesStr ? JSON.parse(favoritesStr) : [];
    
    const existingIndex = favorites.findIndex(
      favItem => favItem.id === item.id && favItem.type === item.type
    );
    
    if (existingIndex >= 0) {
      // Remove from favorites
      favorites.splice(existingIndex, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      return false;
    } else {
      // Add to favorites
      favorites.push(item);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      return true;
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return false;
  }
};

// Get all favorites
export const getAllFavorites = (): FavoriteItem[] => {
  try {
    const favoritesStr = localStorage.getItem('favorites');
    return favoritesStr ? JSON.parse(favoritesStr) : [];
  } catch (error) {
    console.error('Error getting all favorites:', error);
    return [];
  }
};

// Get favorites by type
export const getFavoritesByType = (type: 'book' | 'movie'): FavoriteItem[] => {
  try {
    const all = getAllFavorites();
    return all.filter(item => item.type === type);
  } catch (error) {
    console.error(`Error getting ${type} favorites:`, error);
    return [];
  }
};

// Clear all favorites
export const clearFavorites = (): void => {
  localStorage.removeItem('favorites');
};
