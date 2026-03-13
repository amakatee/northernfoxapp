import React from 'react'
import WhyChooseUs from '../sections/WhyChooseUs'
import {Slider} from  "../slider"
import ServicesSection from '../ServicesPage'
import HeroSection from "../sections/HeroSection/HeroSection"
import ShippingMethodsPage from '../sections/ShippingMethods'
import DeliveryForm from '../sections/DelieveryForm'
import LogisticsSteps from '../sections/delievery/LogisticsSteps'
import ServiceQAPage from '../sections/ServiceQAPage'

// const slides =[
//   {
//     id:1,
//     title: "Найдем и выкупим любой товар под заказ",
//     description: "Работаем напрямую с фабриками и торговыми площадками. Организуем закупку, выкуп и доставку вашего заказа.",
//     imageUrl:"/images/fox.JPG",
//     altText: "Dsfsdf"
//   },
//   {
//     id:2,
//     title: "Склады в ключевых городах Китая",
//     description: "Принимаем товар от разных поставщиков.Работаем с грузами любого объема и габаритов.",
//     imageUrl:"/images/msc.jpeg",
//     altText: "Dsfsdf"
//   },
//   {
//     id:3,
//     title: "Легальная таможня и сертификация",
//     description: "Полный брокеридж «под ключ»: декларирование, подготовка разрешительной документации, сертификаты соответствия и ТР ТС.",
//     imageUrl:"/images/air.JPG",
//     altText: "Dsfsdf"
//   },
//   {
//     id:4,
//     title: "Страхование 100% стоимости",
//     description: "Защищаем ваш груз на всех этапах перевозки. Страхование полной стоимости товара — ваша финансовая безопасность. ",
//     imageUrl:"/images/air.JPG",
//     altText: "Dsfsdf"
//   },
//   {
//     id:5,
//     title: "Доставим до вашего склада или магазина",
//     description: "Защищаем ваш груз на всех этапах перевозки. Страхование полной стоимости товара — ваша финансовая безопасность. ",
//     imageUrl:"/images/air.JPG",
//     altText: "Dsfsdf"
//   },
// ]


const slides = [
  {
    id: 1,
    title: 'Авиаперевозки',
    subtitle: 'Самый быстрый способ',
    duration: '3-7 дн.',
    suitableFor: ['Срочные грузы', 'Электроника', 'Документы', 'Образцы'],
    cost: 'Высокая',
    reliability: 5,
    description: 'Идеально для ценных и срочных отправлений. Полный трекинг.',
  },
  {
    id: 2,
    title: 'Железнодорожные',
    subtitle: 'Баланс цены и скорости',
    duration: '18-40 дн.',
    suitableFor: ['FCL контейнеры', 'Сборные грузы', 'Оборудование', 'Сырьё'],
    cost: 'Средняя',
    reliability: 4,
    description: 'Надёжный и экономичный вариант для больших партий.',
  },
  {
    id: 3,
    title: 'Автомобильные',
    subtitle: 'Гибкость и универсальность',
    duration: '14-25 дн.',
    suitableFor: ['Дверь-дверь', 'Регионы', 'Температура', 'Частичные загрузки'],
    cost: 'Средняя',
    reliability: 4,
    description: 'Прямая доставка от склада до склада без перегрузок.',
  },
  {
    id: 4,
    title: 'Морские контейнерные',
    subtitle: 'Максимальная экономия',
    duration: '30-60 дн.',
    suitableFor: ['Массовые грузы', 'Консолидация', 'Крупногабарит', 'Международные'],
    cost: 'Низкая',
    reliability: 3,
    description: 'Самый низкий тариф при перевозке больших объёмов.',
  },
];

function Home() {
  return (
    <div className=' antialiased font-feature-settings letter-spacing: -0.05em text-[#08162F]'>
     

      
{/*       
       <NorthernFoxNavbar /> */}
        <HeroSection />
        {/* <Slider slides={slides} /> */}
        
        <WhyChooseUs />
       <ServiceQAPage />
        <ServicesSection />
        {/* <ShippingMethodsPage /> */}
        {/* <LogisticsSteps /> */}
        <DeliveryForm />
       
       
       
      
     </div>
  )
}

export default Home