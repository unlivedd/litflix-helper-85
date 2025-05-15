
export type FavoriteItem = {
  id: number;
  type: 'book' | 'movie';
  title: string;
  subtitle?: string; // Adding an optional subtitle field
};

export const isInFavorites = (id: number, type: 'book' | 'movie'): boolean => {
  try {
    // Проверяем, авторизован ли пользователь
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return false;
    
    const userData = JSON.parse(currentUser);
    
    // Получаем избранное пользователя
    const favorites = userData.favorites || [];
    
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
    const currentUserString = localStorage.getItem('currentUser');
    if (!currentUserString) return false;
    
    const currentUser = JSON.parse(currentUserString);
    
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
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      
      // Обновляем также в общем списке пользователей
      updateUserInStorage(currentUser);
      return false;
    }
    
    // Если элемента нет - добавляем его
    currentUser.favorites.push(item);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Обновляем также в общем списке пользователей
    updateUserInStorage(currentUser);
    return true;
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return false;
  }
};

export const getFavorites = (): FavoriteItem[] => {
  try {
    // Проверяем, авторизован ли пользователь
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return [];
    
    const userData = JSON.parse(currentUser);
    return userData.favorites || [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

// Вспомогательная функция для обновления пользователя в общем хранилище
const updateUserInStorage = (currentUser: any) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const userIndex = users.findIndex((u: any) => u.id === currentUser.id);
  
  if (userIndex !== -1) {
    users[userIndex] = currentUser;
    localStorage.setItem('users', JSON.stringify(users));
  }
};
