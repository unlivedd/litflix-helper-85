
import { toast } from 'sonner';
import { MongoDocument, getDatabase } from './mongoService';

interface User extends MongoDocument {
  name: string;
  email: string;
  password: string;
  favorites: any[];
}

// Get users collection
const getUsersCollection = () => {
  return getDatabase().collection('users');
};

// Register a new user
export const registerUser = async (userData: { name: string; email: string; password: string }): Promise<boolean> => {
  try {
    const usersCollection = getUsersCollection();
    
    // Check if user already exists
    const existingUser = usersCollection.findOne({ email: userData.email });
    if (existingUser) {
      toast.error('Пользователь с таким email уже существует');
      return false;
    }
    
    // Create new user
    const newUser: User = {
      ...userData,
      favorites: []
    };
    
    usersCollection.insertOne(newUser);
    
    // Auto login
    const createdUser = usersCollection.findOne({ email: userData.email });
    if (createdUser) {
      localStorage.setItem('currentUser', JSON.stringify(createdUser));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error registering user:', error);
    toast.error('Произошла ошибка при регистрации');
    return false;
  }
};

// Login user
export const loginUser = async (email: string, password: string): Promise<boolean> => {
  try {
    const usersCollection = getUsersCollection();
    
    // Find user by email and password
    const user = usersCollection.findOne({ email, password });
    
    if (user) {
      // Store user in localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    
    toast.error('Неверный email или пароль');
    return false;
  } catch (error) {
    console.error('Error logging in:', error);
    toast.error('Произошла ошибка при входе');
    return false;
  }
};

// Logout user
export const logoutUser = (): void => {
  localStorage.removeItem('currentUser');
};

// Get current user
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('currentUser');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr) as User;
  } catch {
    return null;
  }
};

// Update user data
export const updateUser = (userData: Partial<User>): boolean => {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    
    const usersCollection = getUsersCollection();
    
    // Update user in database
    usersCollection.updateOne(
      { _id: currentUser._id },
      { $set: userData }
    );
    
    // Update user in localStorage
    const updatedUser = { ...currentUser, ...userData };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    return true;
  } catch (error) {
    console.error('Error updating user:', error);
    return false;
  }
};

// Initialize with a test user if none exists
export const initializeAuthService = () => {
  const usersCollection = getUsersCollection();
  if (usersCollection.find().length === 0) {
    usersCollection.insertOne({
      name: 'Тестовый пользователь',
      email: 'test@example.com',
      password: 'password',
      favorites: []
    });
  }
};

// Call initialization
initializeAuthService();
