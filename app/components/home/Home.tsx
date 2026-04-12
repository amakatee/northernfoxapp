import React from 'react'
import WhyChooseUs from '../sections/WhyChooseUs'
import {Slider} from  "../slider"
import ServicesSection from '../ServicesPage'
import HeroSection from "../sections/HeroSection/HeroSection"
import {StackingCardsSection} from '../sections/ShippingMethods'
import DeliveryForm from '../sections/DelieveryForm'
import LogisticsSteps from '../sections/delievery/LogisticsSteps'
import ServiceQAPage from '../sections/ServiceQAPage'
import NeonSection from '../helpers/NeonSection'
import WhyUs from '../sections/WhyUs'
import IndustriesStackSection from '../helpers/DelieveryContainer'
import StackingCards from '../helpers/Cards'
import HireUs from '../helpers/Animated'
import WorkProcess from '../sections/WorkProcess'
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
     

      
{/*       
       <NorthernFoxNavbar /> */}
        <HeroSection />

        {/* <Slider slides={slides} /> */}
       
    
       
      {/* <StackingCards  cards={industries} /> */}
      {/* <IndustriesStackSection  cards={cards} /> */}
      
    
        {/* <WhyChooseUs /> */}
        
     <NeonSection>

    
      <ServiceQAPage />
      {/* <HireUs /> */}
      </NeonSection>
      <StackingCardsSection  />
      <WorkProcess work_process={data.workProcess} />
     
     
    
      <WhyUs />
     

     
        {/* <ServicesSection /> */}
     
        {/* <LogisticsSteps /> */}
        <DeliveryForm />
       
       
       
      
     </div>
  )
}

export default Home


// style={{
  //   background: `
  //     radial-gradient(ellipse at top left, rgba(59, 130, 246, 0.09) 0%, transparent 50%),
  //     radial-gradient(ellipse at bottom right, rgba(139, 92, 246, 0.07) 0%, transparent 60%),
  //     radial-gradient(ellipse at 20% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 45%),
  //     linear-gradient(to bottom, #0f172a 0%, #0b1425 100%)
  //   `,
  // }}
  
  function Card({ title }: { title: string }) {
    return (
      <div className="rounded-3xl bg-neutral-900 text-white p-16 text-4xl font-semibold shadow-xl">
        {title}
        <p className="mt-6 text-lg text-neutral-400">
          Dynamic height content. This can be anything.
        </p>
      </div>
    )
  }