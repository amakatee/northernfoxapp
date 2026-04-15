import React from 'react'
import HeroSection from "../sections/HeroSection/HeroSection"
import {StackingCardsSection} from '../sections/ShippingMethods'
import ServiceQAPage from '../sections/ServiceQAPage'
import NeonSection from '../helpers/NeonSection'
import WorkProcess from '../sections/WorkProcess'
import WhyWhiteLogisticsSection  from '../sections/WhyWhite'
import LogisticsFormSection from '../helpers/DelieveryForm'
const data = {
  workProcess: {
    title: "Процесс работы",
    subtitle:
      "От поиска поставщика до отправки товара — прозрачно и без лишних звеньев",
    steps: [
      {
        step: 1,
        name: "Анализ задач",
        description:
          "Изучаем ваш товар, рынок и потребности. Определяем, нужен ли вам новый поставщик или оптимизация текущих отгрузок.",
        shape: "circle",
      },
      {
        step: 2,
        name: "Поиск и проверка поставщиков",
        description:
          "Находим надёжных партнёров, проверяем качество и условия. Согласовываем цены и логистику.",
        shape: "square",
      },
      {
        step: 3,
        name: "Бюджет и договор",
        description:
          "Фиксируем стоимость, сроки и KPI. Прозрачная смета: без скрытых платежей.",
        shape: "diamond",
      },
      {
        step: 4,
        name: "Организация отправки",
        description:
          "Готовим документы, бронируем транспорт, контролируем упаковку и таможню.",
        shape: "hex",
      },
      {
        step: 5,
        name: "Отслеживание и отчётность",
        description:
          "Вы получаете онлайн-трекинг груза и регулярные отчёты по статусу поставки.",
        shape: "circle",
      },
      {
        step: 6,
        name: "Доставка и финал",
        description:
          "Товар прибывает точно в срок. Мы остаёмся на связи для следующих партий или новых поставщиков.",
        shape: "square",
      },
    ],
  },
};






function Home() {
  return (
    <div className=' antialiased font-feature-settings letter-spacing: -0.05em text-[#08162F]'>
     <HeroSection />

     <NeonSection>
     <ServiceQAPage />
      </NeonSection>

      <StackingCardsSection  />
      <WorkProcess work_process={data.workProcess} />
      <WhyWhiteLogisticsSection />
      
      <section className='bg-white w-full max-w-4xl mx-auto px-7 sm:px-6 lg:px-8 py-12 md:py-16 rounded-3xl shadow-lg'>
      <LogisticsFormSection />
      </section>
     </div>
  )
}

export default Home


