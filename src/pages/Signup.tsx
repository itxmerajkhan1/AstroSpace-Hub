import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/validations/authSchemas';
import { authService } from '@/firebase/auth.service';
import { toast } from 'react-hot-toast';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await authService.signUp(data.email, data.password);
      toast.success('Account created successfully');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold text-white mb-6">Create Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input {...register('name')} placeholder="Full Name" error={errors.name?.message as string} />
        <Input {...register('email')} placeholder="Email" type="email" error={errors.email?.message as string} />
        <Input {...register('password')} placeholder="Password" type="password" error={errors.password?.message as string} />
        <Input {...register('confirmPassword')} placeholder="Confirm Password" type="password" error={errors.confirmPassword?.message as string} />
        <Button type="submit" className="w-full" isLoading={isSubmitting}>Sign Up</Button>
      </form>
    </AuthLayout>
  );
};
