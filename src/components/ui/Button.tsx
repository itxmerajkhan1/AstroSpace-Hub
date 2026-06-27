import { cn } from '@/lib/utils';
import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button = ({ className, isLoading, children, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'relative flex items-center justify-center px-6 py-3 bg-blue-600/80 hover:bg-blue-600 text-white rounded-xl font-medium transition-all backdrop-blur-sm border border-white/10 disabled:opacity-50',
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
      {children}
    </button>
  );
};
