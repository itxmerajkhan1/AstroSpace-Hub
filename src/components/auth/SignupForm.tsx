import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';
import { authService } from '@/firebase/auth.service';
import { AuthLayout } from './AuthLayout';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const SignupForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
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
      <h1 className="text-2xl font-bold text-white mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input {...register('email')} placeholder="Email" type="email" className="w-full bg-gray-800 text-white" />
        {errors.email && <p className="text-red-400 text-sm">{errors.email.message as string}</p>}
        <Input {...register('password')} placeholder="Password" type="password" className="w-full bg-gray-800 text-white" />
        {errors.password && <p className="text-red-400 text-sm">{errors.password.message as string}</p>}
        <Button type="submit" className="w-full">Sign Up</Button>
      </form>
    </AuthLayout>
  );
};
