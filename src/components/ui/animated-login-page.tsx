import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/validations/authSchemas';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';
import { Input } from './Input';
import { Button } from './Button';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Animated Login Page with Glassmorphism and character eye-tracking UI.
 */
export const AnimatedLoginPage = () => {
  const navigate = useNavigate();
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const [isTyping, setIsTyping] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await loginWithEmail(data.email, data.password);
      toast.success('Logged in successfully');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success('Logged in with Google');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
      {/* Character Animation Placeholder - UI Scaffolding */}
      <div className="absolute top-20 flex gap-4">
         <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white">Eye</div>
         <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white">Eye</div>
      </div>

      <div className="w-full max-w-md p-8 bg-gray-900/50 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-6">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input 
            {...register('email')} 
            placeholder="Email" 
            type="email" 
            error={errors.email?.message as string} 
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
          />
          <Input 
            {...register('password')} 
            placeholder="Password" 
            type="password" 
            error={errors.password?.message as string} 
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
          />
          <Button type="submit" className="w-full" isLoading={isSubmitting}>Login</Button>
        </form>
        
        <Button onClick={handleGoogleLogin} className="w-full mt-4 bg-gray-800 hover:bg-gray-700">Login with Google</Button>
        
        <div className="mt-4 text-center text-gray-400">
          Don't have an account? <Link to="/signup" className="text-blue-400 hover:text-blue-300">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};
