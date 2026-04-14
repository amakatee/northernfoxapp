"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import LogisticsFormSection from "./DelieveryForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogisticsFormModal({ isOpen, onClose }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Key to force full remount of the form every time modal opens
  const [modalKey, setModalKey] = useState(0);

  // Update key when modal opens
  useEffect(() => {
    if (isOpen) {
      setModalKey((prev) => prev + 1);
    }
  }, [isOpen]);

  // Escape key + scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // GSAP Animation
  useEffect(() => {
    if (!isOpen || !contentRef.current || !backdropRef.current) return;

    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4 }
    );

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, scale: 0.95, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "back.out(1.2)" }
    );
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/75 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal Content - Key forces remount */}
      <div
        key={modalKey}
        ref={contentRef}
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[96vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-12 h-12 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all"
        >
          <X size={25} strokeWidth={2} />
        </button>

        {/* Form Container */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12 custom-scrollbar">
          <LogisticsFormSection />
        </div>
      </div>
    </div>
  );
}