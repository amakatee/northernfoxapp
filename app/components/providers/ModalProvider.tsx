"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import LogisticsFormModal from "../helpers/LogisticFormModal";

type ModalContextType = {
  openLogisticsModal: () => void;
  closeLogisticsModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);

  const openLogisticsModal = () => {
    setModalKey(prev => prev + 1);
    setIsOpen(true);
  };
//   const openLogisticsModal = () => setIsOpen(true);
  const closeLogisticsModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ openLogisticsModal, closeLogisticsModal }}>
      {children}
      <LogisticsFormModal 
        isOpen={isOpen} 
        onClose={closeLogisticsModal} 
      />
    </ModalContext.Provider>
  );
}

// Custom hook to use the modal anywhere
export const useLogisticsModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useLogisticsModal must be used within a ModalProvider");
  }
  return context;
};