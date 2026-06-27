import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/validations/authSchemas';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';
import { Input } from './Input';
import { Button } from './Button';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Animated Signup Page with Glassmorphism and character eye-tracking UI.
 */
export const AnimatedSignupPage = () => {
  const navigate = useNavigate();
  const { signupWithEmail } = useAuth();
  const [isTyping, setIsTyping] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await signupWithEmail(data.email, data.password);
      toast.success('Account created successfully');
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
        <h1 className="text-3xl font-bold text-white mb-6">Create Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input 
            {...register('name')} 
            placeholder="Full Name" 
            error={errors.name?.message as string} 
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
          />
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
          <Input 
            {...register('confirmPassword')} 
            placeholder="Confirm Password" 
            type="password" 
            error={errors.confirmPassword?.message as string} 
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
          />
          <Button type="submit" className="w-full" isLoading={isSubmitting}>Sign Up</Button>
        </form>
        
        <div className="mt-4 text-center text-gray-400">
          Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-300">Login</Link>
        </div>
      </div>
    </div>
  );
};
