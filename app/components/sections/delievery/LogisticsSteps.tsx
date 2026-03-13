'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Все шаги (1–9)
const allSteps = [
  {
    number: 1,
    title: 'Отправляем КП',
    description: '',
  },
  {
    number: 2,
    title: 'Подписываем договор',
    description: '',
  },
  {
    number: 3,
    title: 'Забираем груз',
    description:
      'Связываемся с отправителем и наш водитель забирает груз со склада поставщика',
  },
  {
    number: 4,
    title: 'Консолидируем, взвешиваем',
    description: 'Подтверждаем ставку, страхуем груз и готовимся к отправке',
  },
  {
    number: 5,
    title: 'Производим отправку',
    description:
      'Ежедневно присылаем вам информацию о передвижении груза и готовимся к таможне',
  },
  {
    number: 6,
    title: 'Оплата',
    description: 'Счет оплачивают после отправки груза',
  },
  {
    number: 7,
    title: 'Принимаем груз на СВХ',
    description:
      'Получаем документы на таможенном складе, уведомляем вас о прибытии груза',
  },
  {
    number: 8,
    title: 'Растаможиваем груз',
    description:
      'Осуществляем таможенное оформление, минимизируя сроки рассмотрения вашей ГТД',
  },
  {
    number: 9,
    title: 'Вывозим «до двери»',
    description:
      'При необходимости планируем и осуществляем груз «до двери» по вашим инструкциям',
  },
];

// Разделяем на две колонки
const leftSteps = allSteps.slice(0, 4);
const rightSteps = allSteps.slice(4);

export default function LogisticsStepsNoIcons() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.step-card');

      gsap.from(cards, {
        opacity: 0,
        y: 30,
        scale: 0.98,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderStepCard = (step: typeof allSteps[0]) => (
    <article
      key={step.number}
      className="step-card group bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/80 shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200"
    >
      {/* Только текст, без иконки */}
      <div className="flex-1">
        <h3 className="font-semibold text-xl text-gray-800 mb-1 flex items-center gap-2">
          <span className="text-blue-600">{step.number}.</span>
          {step.title}
        </h3>
        {step.description && (
          <p className="text-gray-500 text-sm leading-relaxed">
            {step.description}
          </p>
        )}
      </div>

      {/* Декоративная линия (появляется при наведении) */}
      <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500 rounded-full" />
    </article>
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-gray-50 to-blue-50/20 py-20 px-4 md:px-8 font-sans antialiased overflow-hidden"
    >
      {/* Легкий фоновый шум */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Заголовок */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-2">
            Northern Fox —{' '}
            <span className="font-medium bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
              поставки и логистика «под ключ»
            </span>
          </h2>
          <p className="text-gray-500 text-sm tracking-wide uppercase">
            прозрачный процесс от заявки до доставки
          </p>
        </div>

        {/* Две колонки */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div className="space-y-5">{leftSteps.map(renderStepCard)}</div>
          <div className="space-y-5">{rightSteps.map(renderStepCard)}</div>
        </div>

        {/* Нижняя плашка */}
        <div className="mt-16 text-center text-xs text-gray-400 border-t border-gray-200/70 pt-6">
          <span className="tracking-wide">❄️ Прозрачность • Надёжность • Опыт</span>
        </div>
      </div>
    </section>
  );
}