
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Heart } from 'lucide-react';
import { toast } from 'sonner';

const UserMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Проверяем, вошел ли пользователь
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    toast.success('Вы успешно вышли из системы');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      {currentUser ? (
        <button
          className="flex items-center gap-2 bg-litflix-paleYellow/60 hover:bg-litflix-paleYellow text-litflix-darkGreen px-3 py-1 rounded-full transition-colors"
          onClick={toggleMenu}
        >
          <User size={18} />
          <span className="text-sm font-medium">{currentUser.name}</span>
        </button>
      ) : (
        <button
          className="flex items-center gap-2 bg-litflix-mediumGreen hover:bg-litflix-darkGreen text-white px-3 py-1 rounded-full transition-colors"
          onClick={() => navigate('/login')}
        >
          <User size={18} />
          <span className="text-sm font-medium">Войти</span>
        </button>
      )}

      {isMenuOpen && currentUser && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <div className="px-4 py-2 border-b">
            <p className="font-medium text-litflix-darkGreen">{currentUser.name}</p>
            <p className="text-xs text-litflix-darkGreen/70">{currentUser.email}</p>
          </div>
          
          <button
            className="w-full text-left px-4 py-2 text-sm text-litflix-darkGreen hover:bg-litflix-paleYellow/30 flex items-center gap-2"
            onClick={() => {
              navigate('/favorites');
              setIsMenuOpen(false);
            }}
          >
            <Heart size={16} />
            Избранное
          </button>
          
          <button
            className="w-full text-left px-4 py-2 text-sm text-litflix-darkGreen hover:bg-litflix-paleYellow/30 flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Выйти
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
