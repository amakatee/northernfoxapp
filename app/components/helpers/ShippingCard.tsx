"use client";

import Image from "next/image";
import { FC } from "react";

interface DeliveryMethodCardProps {
  id: number;
  icon?: React.ReactNode;               // SVG или компонент иконки (рекомендую размер 48–64px)
  title: string;
  subtitle: string;
  duration: string;
  suitableFor: string[];
  cost: "Низкая" | "Средняя" | "Высокая";
  reliability: number;                  // можно отобразить звёздочками позже
  features: string[];
  imageSrc?: string;                    // если хочешь фоновое изображение (пока закомментировано)
  onCalculate?: (id: number) => void;
  bgGradient?: string;
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
  bgGradient = "bg-gradient-to-br from-gray-950/90 to-gray-900/90", // fallback
}) => {
  const costStyles = {
    Низкая: "text-emerald-400/90",
    Средняя: "text-amber-400/90",
    Высокая: "text-rose-400/90",
  };

  return (
    <div
      className={`
        group relative h-[30vh] w-full
        ${bgGradient}
        backdrop-blur-2xl bg-opacity-65
        rounded-3xl md:rounded-[2.5rem]

        
        overflow-hidden
        transition-all duration-700 ease-out
        hover:scale-[1.015] hover:shadow-2xl hover:shadow-black/60
        hover:border-cyan/500/15
      `}
    >
      <div className="relative z-10 flex flex-col h-full p-6 sm:p-8 md:p-10">
        {/* Верхняя часть: иконка + заголовок + длительность */}
        <div className="flex items-start justify-between gap-6 mb-6 md:mb-8">
          <div className="flex items-center gap-4 md:gap-5">
  
            <div>
              <h3 className="text-[1.1rem] md:text-3xl font-medium text-white tracking-tight">
                {title}
              </h3>
              <p className="text-sm md:text-lg text-cyan-200/70 mt-1 font-light">
                {subtitle}
              </p>
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <div className="text-sm md:text-2xl font-semibold text-white/90">
              {duration}
            </div>
            <div className="text-sm text-cyan-300/60 mt-0.5">доставка</div>
          </div>
        </div>

        {/* Подходящие грузы */}
        <div className="mb-6 md:mb-8">
          <h4 className="text-[.7rem] uppercase tracking-wider text-cyan-300/80 mb-3 font-medium">
            Подходящие грузы
          </h4>
          <div className="flex flex-wrap gap-2.5">
            {suitableFor.map((item, i) => (
              <span
                key={i}
                className="
                  text-xs font-medium
                 
                   rounded-full
                  text-cyan-100/90
                  transition-colors hover:bg-white/10
                "
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Особенности */}
        <div className="mt-auto">
          <h4 className="text-xs uppercase tracking-wider text-cyan-300/80 mb-3 font-medium">
            Особенности
          </h4>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs text-gray-200/90"
              >
                <div className="w-[.4px] h-5 rounded-full bg-cyan-400/70 flex-shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Кнопка — можно раскомментировать и стилизовать */}
        {/* {onCalculate && (
          <button
            onClick={() => onCalculate(id)}
            className="
              mt-8 w-full py-4
              bg-gradient-to-r from-cyan-600/20 to-blue-600/20
              hover:from-cyan-500/40 hover:to-blue-500/40
              border border-cyan-500/30 hover:border-cyan-400/50
              rounded-2xl text-white font-medium text-lg
              transition-all duration-500
              hover:shadow-lg hover:shadow-cyan-500/20
              active:scale-98
            "
          >
            Рассчитать стоимость →
          </button>
        )} */}
      </div>
    </div>
  );
};

export default DeliveryMethodCard;