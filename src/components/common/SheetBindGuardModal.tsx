'use client';

import React from 'react';
import { Modal } from './Modal';

interface SheetBindGuardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToPublicExams: () => void;
  onGoToSettings: () => void;
}

export const SheetBindGuardModal: React.FC<SheetBindGuardModalProps> = ({
  isOpen,
  onClose,
  onGoToPublicExams,
  onGoToSettings,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="自選題庫與組卷防護提示" maxWidthClass="max-w-lg">
      <div className="flex flex-col gap-5 py-2">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[28px]">warning</span>
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-[#191c1d] leading-snug">
              自選題庫與自組考卷防護
            </h3>
            <p className="text-sm text-[#434655] mt-2 leading-relaxed">
              自組考卷需存放於個人 Google Sheet。是否立即前往個人設定頁面進行綁定？
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row-reverse gap-3 pt-3 border-t border-[#c3c6d7]/30">
          <button
            type="button"
            onClick={onGoToSettings}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-sm font-bold bg-[#004ac6] text-white hover:bg-[#003da6] transition-colors shadow-sm cursor-pointer text-center"
          >
            前往綁定
          </button>
          <button
            type="button"
            onClick={onGoToPublicExams}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-sm font-bold border border-[#c3c6d7] text-[#434655] hover:bg-[#f2f4f6] hover:text-[#191c1e] transition-colors cursor-pointer text-center"
          >
            不綁定，直接選考卷考試
          </button>
        </div>
      </div>
    </Modal>
  );
};

