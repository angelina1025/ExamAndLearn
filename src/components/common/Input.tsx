import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-[12px] font-semibold text-[#191c1e]">{label}</label>
      )}
      <input
        className={`px-3 py-2 text-[13px] bg-white border border-[#c3c6d7] rounded-lg text-[#191c1e] focus:outline-none focus:border-[#004ac6] transition-colors ${className}`}
        {...props}
      />
      {error && <span className="text-[11px] text-[#ba1a1a]">{error}</span>}
    </div>
  );
};

