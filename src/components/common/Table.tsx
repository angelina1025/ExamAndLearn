import React from 'react';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <div className={`w-full overflow-x-auto bg-white rounded-xl border border-[#c3c6d7]/40 shadow-2xs ${className}`}>
      <table className="w-full text-left border-collapse">{children}</table>
    </div>
  );
};

