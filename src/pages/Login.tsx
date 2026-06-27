import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/validations/authSchemas';
import { authService } from '@/firebase/auth.service';
import { toast } from 'react-hot-toast';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await authService.signIn(data.email, data.password);
      toast.success('Logged in successfully');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold text-white mb-6">Welcome Back</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input {...register('email')} placeholder="Email" type="email" error={errors.email?.message as string} />
        <Input {...register('password')} placeholder="Password" type="password" error={errors.password?.message as string} />
        <Button type="submit" className="w-full" isLoading={isSubmitting}>Login</Button>
      </form>
      <div className="mt-4 text-center text-gray-400">
        <Link to="/forgot-password" className="hover:text-white">Forgot password?</Link>
      </div>
    </AuthLayout>
  );
};
