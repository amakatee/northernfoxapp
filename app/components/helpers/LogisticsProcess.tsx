// app/components/LogisticsProcess.tsx
import React from 'react';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  stage: 'preparation' | 'start' | 'development' | 'finish';
}

const stageConfig = {
  preparation: {
    label: 'Подготовка',
    bgColor: 'bg-gray-600',
    textColor: 'text-white',
  },
  start: {
    label: 'Старт',
    bgColor: 'bg-blue-600',
    textColor: 'text-white',
  },
  development: {
    label: 'Развитие',
    bgColor: 'bg-amber-500',
    textColor: 'text-white',
  },
  finish: {
    label: 'Финиш',
    bgColor: 'bg-emerald-600',
    textColor: 'text-white',
  },
};

const getNumberShape = (num: number) => {
  // 1 и 4 — круг, 2 и 5 — квадрат, 3 и 6 — rounded-lg
  if (num === 1 || num === 4) return 'rounded-full';
  if (num === 2 || num === 5) return 'rounded-none';
  return 'rounded-lg';
};

const StepCard: React.FC<StepCardProps> = ({ number, title, description, stage }) => {
  const config = stageConfig[stage];
  const shape = getNumberShape(number);

  const isEven = number % 2 === 0;

  return (
    <div
      className={`
        group relative text-white rounded-3xl p-6 lg:p-8
        
        transition-all duration-300
        hover:shadow-xl hover:-translate-y-1
        min-h-[220px] flex flex-col 
        ${isEven ? 'lg:translate-y-8' : ''}
      `}
    >
      {/* Номер шага — левый верхний угол */}
      <div
        className={`
           w-12 h-12 
          bg-white text-black font-black text-3xl
          flex items-center justify-center shadow-md
          border border-gray-200
          ${shape}
          z-10
        `}
      >
        {number}
      </div>

      {/* Бейдж стадии — правый верхний угол */}
      <div
        className={`
          absolute top-4 right-5
          ${config.bgColor} ${config.textColor}
          text-xs font-bold uppercase tracking-wider
          px-4 py-1.5 rounded-full shadow-sm
        `}
      >
        {config.label}
      </div>

      {/* Контент */}
      <div className="mt-10 flex flex-col flex-grow">
        <h3 className="text-xl lg:text-2xl font-extrabold text-white mb-4">
          {title}
        </h3>
        <p className="text-white leading-relaxed text-[15px] lg:text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

// Mobile version step card with horizontal layout (number + arrow + content)
const MobileStepCard: React.FC<StepCardProps & { showArrow: boolean }> = ({ 
  number, 
  title, 
  description, 
  stage, 
  showArrow 
}) => {
  const config = stageConfig[stage];
  const shape = getNumberShape(number);

  return (
    <div className="flex gap-4 items-start">
      {/* Left section: number + arrow */}
      <div className="flex flex-col items-center shrink-0 w-16">
        <div
          className={`
            w-9 h-9
            bg-white text-black font-black text-xl
            flex items-center justify-center shadow-md
            border border-gray-200
            ${shape}
          `}
        >
          {number}
        </div>
        {showArrow && (
          <div className="mt-3 text-gray-300 font-light text-2xl select-none">
            ↓
          </div>
        )}
      </div>

      {/* Right section: stage badge + title + description */}
      <div className="flex-1">
        {/* Stage badge */}
        {/* <div
          className={`
            inline-block
            ${config.bgColor} ${config.textColor}
            text-xs font-bold uppercase tracking-wider
            px-3 py-1 rounded-full shadow-sm
            mb-3
          `}
        >
          {config.label}
        </div> */}
        
        {/* Title */}
        <h3 className="text-xl font-extrabold  text-white mb-3">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-white/90 leading-relaxed text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

const Arrow = ({ direction }: { direction: 'right' | 'left' | 'down' }) => {
  const base = "text-gray-300 font-light text-4xl sm:text-5xl select-none";

  if (direction === 'down') {
    return <div className={`${base} mx-auto`}>↓</div>;
  }
  if (direction === 'right') {
    return <div className={`${base}`}>→</div>;
  }
  return <div className={`${base}`}>←</div>;
};

const LogisticsProcess: React.FC = () => {
  const steps: StepCardProps[] = [
    {
      number: 1,
      title: 'Консультация и стратегия поиска',
      description:
        'Первичная встреча, анализ потребностей клиента, определение целевого рынка в России, требований compliance. Разработка стратегии поиска поставщиков в Китае.',
      stage: 'preparation',
    },
    {
      number: 2,
      title: 'Поиск и верификация поставщиков',
      description:
        'Выявление надёжных производителей в Китае, аудит заводов, проверка образцов, согласование цен и условий.',
      stage: 'preparation',
    },
    {
      number: 3,
      title: 'Контроль качества и мониторинг производства',
      description:
        'Сопровождение производства, проведение промежуточных и предпогрузочных инспекций, контроль соответствия спецификациям.',
      stage: 'start',
    },
    {
      number: 4,
      title: 'Таможенное оформление и freight forwarding',
      description:
        'Организация экспорта из Китая, выбор маршрута, трансграничная перевозка, таможенное оформление в России.',
      stage: 'start',
    },
    {
      number: 5,
      title: 'Складирование и фулфилмент',
      description:
        'Приёмка товаров на складах в России, управление запасами, комплектация заказов.',
      stage: 'development',
    },
    {
      number: 6,
      title: 'White label доставка и финальная миля',
      description:
        'Доставка под брендом клиента, брендированные уведомления, трекинг, передача конечному покупателю в России.',
      stage: 'finish',
    },
  ];

  return (
    <section className="py-10 lg:py-28 px-5 bg-gradient-to-b ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl md:text-5xl font-extrabold text-white mb-14 lg:mb-20">
          Процесс работы
        </h2>

        {/* Мобильная версия + планшет - horizontal layout with number + arrow */}
        <div className="block lg:hidden space-y-8">
          {steps.map((step, idx) => (
            <React.Fragment key={step.number}>
              <MobileStepCard 
                {...step} 
                showArrow={idx < steps.length - 1}
              />
            </React.Fragment>
          ))}
        </div>

        {/* Десктоп — зигзаг 3+3 */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 xl:gap-12 relative">
          {/* Первый ряд → */}
          <div className="col-span-3 grid grid-cols-3 gap-8 xl:gap-12 items-start">
            {steps.slice(0, 3).map((step) => (
              <StepCard key={step.number} {...step} />
            ))}
          </div>

          {/* Стрелки первого ряда */}
          <div className="absolute top-[38%] left-1/4 right-1/4 flex justify-between pointer-events-none">
            <Arrow direction="right" />
            <Arrow direction="right" />
          </div>

          {/* Второй ряд ← (с небольшим смещением вниз) */}
          <div className="col-span-3 grid grid-cols-3 gap-8 xl:gap-12 items-start mt-16 xl:mt-20">
            {steps.slice(3, 6).reverse().map((step) => (
              <StepCard key={step.number} {...step} />
            ))}
          </div>

          {/* Стрелки второго ряда ← */}
          <div className="absolute top-[76%] left-1/4 right-1/4 flex justify-between pointer-events-none scale-x-[-1]">
            <Arrow direction="right" />
            <Arrow direction="right" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogisticsProcess;