import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'bg-[#004ac6] text-white hover:bg-[#003da6] shadow-xs',
    secondary: 'bg-[#f2f4f6] text-[#191c1e] hover:bg-[#e6e8ea] border border-[#c3c6d7]/50',
    danger: 'bg-[#ba1a1a] text-white hover:bg-[#93000a] shadow-xs',
    ghost: 'text-[#434655] hover:text-[#191c1e] hover:bg-[#eceef0]',
  };

  const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'px-2.5 py-1 text-[12px] rounded-md',
    md: 'px-4 py-2 text-[13px] rounded-lg',
    lg: 'px-5 py-2.5 text-[14px] rounded-lg',
  };

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-1.5 font-semibold transition-all cursor-pointer disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

