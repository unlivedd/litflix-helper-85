
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/BackButton';
import { toast } from 'sonner';
import { useForm } from "react-hook-form";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>();
  
  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    try {
      // Проверяем, существует ли уже пользователь с таким email
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some((u: any) => u.email === data.email)) {
        toast.error('Пользователь с таким email уже существует');
        setIsLoading(false);
        return;
      }
      
      // Добавляем нового пользователя
      const newUser = {
        id: Date.now(),
        name: data.name,
        email: data.email,
        password: data.password,
        favorites: []
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Входим автоматически после регистрации
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      toast.success('Регистрация успешна!');
      navigate('/');
    } catch (error) {
      toast.error('Произошла ошибка при регистрации');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-litflix-cream">
      <div className="page-background">
        <img 
          src="/lovable-uploads/117cd767-a1f6-4f8f-9219-f52549ac689b.png" 
          alt="Background" 
          className="page-background-image opacity-60"
        />
        <div className="page-background-overlay" />
      </div>
      
      <div className="container mx-auto p-4 pt-8">
        <div className="mb-6">
          <BackButton onClick={() => navigate('/')} />
        </div>
        
        <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-serif font-bold text-litflix-darkGreen text-center mb-6">
            Регистрация
          </h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                type="text"
                placeholder="Ваше имя"
                {...register("name", { 
                  required: "Имя обязательно",
                  minLength: {
                    value: 2,
                    message: "Имя должно содержать не менее 2 символов"
                  } 
                })}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="ваш@email.com"
                {...register("email", { 
                  required: "Email обязателен",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Неверный формат email"
                  }
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", { 
                  required: "Пароль обязателен",
                  minLength: {
                    value: 6,
                    message: "Пароль должен содержать не менее 6 символов"
                  } 
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Подтверждение пароля</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword", { 
                  required: "Подтвердите пароль",
                  validate: value => value === watch("password") || "Пароли не совпадают"
                })}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-litflix-mediumGreen hover:bg-litflix-darkGreen"
              disabled={isLoading}
            >
              {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-litflix-darkGreen/70">
                Уже есть аккаунт?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-litflix-darkGreen hover:underline font-medium"
                >
                  Войти
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
