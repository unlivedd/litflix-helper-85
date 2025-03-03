
// Simple local storage-based favorites service
// This can be replaced with a proper backend implementation later

// Types
export interface FavoriteItem {
  id: number;
  type: 'book' | 'movie';
  title: string;
}

const FAVORITES_KEY = 'litflix_favorites';

// Get all favorites from localStorage
export const getFavorites = (): FavoriteItem[] => {
  const favoritesJson = localStorage.getItem(FAVORITES_KEY);
  return favoritesJson ? JSON.parse(favoritesJson) : [];
};

// Add an item to favorites
export const addToFavorites = (item: FavoriteItem): FavoriteItem[] => {
  const favorites = getFavorites();
  
  // Check if already in favorites
  const existingIndex = favorites.findIndex(
    (fav) => fav.id === item.id && fav.type === item.type
  );
  
  // If not in favorites, add it
  if (existingIndex === -1) {
    const newFavorites = [...favorites, item];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    return newFavorites;
  }
  
  return favorites;
};

// Remove an item from favorites
export const removeFromFavorites = (id: number, type: 'book' | 'movie'): FavoriteItem[] => {
  const favorites = getFavorites();
  const newFavorites = favorites.filter(
    (item) => !(item.id === id && item.type === type)
  );
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  return newFavorites;
};

// Check if an item is in favorites
export const isInFavorites = (id: number, type: 'book' | 'movie'): boolean => {
  const favorites = getFavorites();
  return favorites.some((item) => item.id === id && item.type === type);
};

// Toggle favorite status
export const toggleFavorite = (item: FavoriteItem): boolean => {
  if (isInFavorites(item.id, item.type)) {
    removeFromFavorites(item.id, item.type);
    return false;
  } else {
    addToFavorites(item);
    return true;
  }
};
