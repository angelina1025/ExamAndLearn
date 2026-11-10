import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidthClass?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidthClass = 'max-w-2xl',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div
        className={`relative bg-white rounded-xl ${maxWidthClass} w-full shadow-2xl p-6 flex flex-col gap-4 z-10 border border-[#c3c6d7]/30 max-h-[90vh] overflow-y-auto`}
      >
        {title && (
          <div className="flex items-center justify-between pb-3 border-b border-[#c3c6d7]/30">
            <h2 className="text-[18px] text-[#191c1e] font-bold">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-[#434655] hover:text-[#191c1e] p-1 rounded cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

