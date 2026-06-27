import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@/validations/authSchemas';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: any) => {
    // Implement password update logic using Firebase
    console.log(data);
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold text-white mb-6">Reset Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input {...register('password')} placeholder="New Password" type="password" error={errors.password?.message as string} />
        <Input {...register('confirmPassword')} placeholder="Confirm Password" type="password" error={errors.confirmPassword?.message as string} />
        <Button type="submit" className="w-full" isLoading={isSubmitting}>Reset Password</Button>
      </form>
    </AuthLayout>
  );
};
