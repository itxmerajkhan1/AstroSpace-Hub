import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-3 bg-gray-950/50 text-white placeholder-gray-400 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-all backdrop-blur-sm',
            error && 'border-red-500/50',
            className
          )}
          {...props}
        />
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
