import { useMutation } from '@tanstack/react-query';
import { authService } from '@/firebase/auth.service';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/Button';

export const VerifyEmail = () => {
  const { user } = useAuth();
  
  const mutation = useMutation({
    mutationFn: () => authService.verifyEmail(user),
    onSuccess: () => toast.success('Verification email sent'),
    onError: (error: any) => toast.error(error.message),
  });

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold text-white mb-6">Verify Email</h1>
      <p className="text-gray-400 mb-6">Please check your inbox for verification email.</p>
      <Button onClick={() => mutation.mutate()} className="w-full" isLoading={mutation.isPending}>Resend Verification Email</Button>
    </AuthLayout>
  );
};
