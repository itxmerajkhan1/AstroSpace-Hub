import { cn } from '@/lib/utils';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors',
        className
      )}
      {...props}
    />
  );
};
