import { cn } from '@/lib/utils';
import { BaseProps } from '@/types';

export const Card = ({ children, className }: BaseProps) => {
  return (
    <div className={cn('p-4 bg-white shadow rounded-lg border border-gray-200', className)}>
      {children}
    </div>
  );
};
