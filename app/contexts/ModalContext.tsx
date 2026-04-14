// app/contexts/ModalContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from 'react';
import LogisticsFormModal from '../components/helpers/LogisticFormModal';

type ModalContextType = {
  openFormModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openFormModal = () => setIsOpen(true);

  return (
    <ModalContext.Provider value={{ openFormModal }}>
      {children}
      <LogisticsFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </ModalContext.Provider>
  );
}

export const useFormModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useFormModal must be used within ModalProvider");
  return context;
};