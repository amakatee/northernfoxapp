"use client";

import Image from "next/image";
import { FC } from "react";

interface DeliveryMethodCardProps {
  id: number;
  icon: React.ReactNode;               // Now accepts React nodes (your icon components)
  title: string;
  subtitle: string;
  duration: string;
  suitableFor: string[];
  cost: "Низкая" | "Средняя" | "Высокая";
  reliability: number;                  // 1–5
  features: string[];
  imageSrc: string;
  onCalculate?: (id: number) => void;   // Optional callback for the button
  bgGradient?: string;                  // optional Tailwind gradient class
}

const DeliveryMethodCard: FC<DeliveryMethodCardProps> = ({
  id,
  icon,
  title,
  subtitle,
  duration,
  suitableFor,
  cost,
  reliability,
  features,
  imageSrc,
  onCalculate,
  bgGradient = "bg-gray-950",           // default fallback
}) => {
  // Color mapping for cost (unused in this version but kept for consistency)
  const costColorClass = {
    Низкая: "text-green-400",
    Средняя: "text-yellow-400",
    Высокая: "text-red-400",
  }[cost];

  return (
    <div
      className={`
        group relative overflow-hidden rounded-3xl
        ${bgGradient}
        backdrop-blur-sm
        transition-all duration-500 ease-out
        hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-900/30
        hover:border-blue-500/20
      `}
    >
      {/* Background image with gradient overlay */}
      {/* <div className="absolute inset-0 h-2/5">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover opacity-0 group-hover:opacity-40 transition-opacity duration-700"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-gray-950/50" />
      </div> */}

      {/* Content */}
      <div className="relative z-10 p-4 md:p-8 flex flex-col gap-5">
        {/* Header: icon, title, subtitle, and duration */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Icon is rendered only if provided */}
            {icon && <div className="text-white">{icon}</div>}
            <div>
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className="text-sm text-cyan-200/70">{subtitle}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-white">{duration}</div>
            <div className="text-xs text-white/60">доставка</div>
          </div>
        </div>

        {/* Suitable For */}
        <div>
          <h4 className="text-sm font-semibold text-blue-200 mb-3">Подходящие грузы:</h4>
          <div className="flex flex-wrap gap-2">
            {suitableFor.map((item, index) => (
              <span
                key={index}
                className="px-3 py-1.5 text-blue-200 text-xs font-medium rounded-lg bg-blue-950/15"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Features grid */}
        <div>
          <h4 className="text-sm font-semibold text-blue-200 mb-3">Особенности:</h4>
          <div className="grid grid-cols-2 gap-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-white/80"
              >
                <div className="w-[.4px] h-5 bg-cyan-500"></div>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Action Button (commented out as in original) */}
        {/* {onCalculate && (
          <button
            onClick={() => onCalculate(id)}
            className="
              w-full py-3 mt-2
              bg-gradient-to-r from-cyan-600/30 to-blue-600/30
              hover:from-cyan-600/50 hover:to-blue-600/50
              border border-cyan-500/30 hover:border-cyan-400/50
              text-white font-medium rounded-lg
              transition-all duration-300 active:scale-95
            "
          >
            Рассчитать стоимость
          </button>
        )} */}
      </div>
    </div>
  );
};

export default DeliveryMethodCard;