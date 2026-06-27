import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '@/validations/authSchemas';
import { authService } from '@/firebase/auth.service';
import { toast } from 'react-hot-toast';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await authService.resetPassword(data.email);
      toast.success('Reset email sent');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold text-white mb-6">Forgot Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input {...register('email')} placeholder="Email" type="email" error={errors.email?.message as string} />
        <Button type="submit" className="w-full" isLoading={isSubmitting}>Send Reset Email</Button>
      </form>
    </AuthLayout>
  );
};
