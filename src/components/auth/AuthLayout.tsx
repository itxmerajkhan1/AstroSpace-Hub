import { BaseProps } from '@/types';
import { cn } from '@/lib/utils';

/**
 * Glassmorphism auth layout.
 */
export const AuthLayout = ({ children, className }: BaseProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
      <div className={cn('w-full max-w-md p-8 bg-gray-900/50 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl', className)}>
        {children}
      </div>
    </div>
  );
};
