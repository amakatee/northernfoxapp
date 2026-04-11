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
interface CardData {
  id: string;
  title: string;
  description: string;
  className?: string; // optional extra Tailwind classes per card
}

const cards = [
  {
    id: '1',
    title: 'Early Discovery',
    description: 'We begin by deeply understanding your industry and the problems that matter most.',
  },
  {
    id: '2',
    title: 'Solution Mapping',
    description: 'Every possibility is explored and mapped against real-world constraints.',
  },
  {
    id: '3',
    title: 'Rapid Prototyping',
    description: 'Ideas turn into testable prototypes in days, not months.',
  },
  {
    id: '4',
    title: 'Scaled Impact',
    description: 'From pilot to enterprise deployment — we stay with you every step.',
  },
  {
    id: '5',
    title: 'Rapid Prototyping',
    description: 'Ideas turn into testable prototypes in days, not months.',
  },
  
];
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
const industries = [
  {
    title: 'Healthcare',
    description:
      'We understand the critical role technology plays in revolutionizing healthcare. That’s why we’re dedicated to supporting the MedTech industry with healthcare software development solutions that enhance patient care, streamline operations, and drive positive health outcomes.',
  },
  {
    title: 'FinTech',
    description:
      'Technology is the key to unlocking the future of finance. We’re passionate about empowering FinTech businesses with custom software development solutions that drive innovation, enhance security, and streamline financial processes.',
  },
  {
    title: 'Manufacturing',
    description:
      'The complexities of modern manufacturing are comprehensive. That’s why we are dedicated to empowering manufacturers with solutions that optimize operations, boost efficiency, and drive growth.',
  },
  {
    title: 'SaaS',
    description:
      'Embrace the power of SaaS with Darly Solutions, your trusted partner for custom software engineering and development. We bring your SaaS ideas to life, crafting scalable, secure, and user-centric applications that drive business growth.',
  },
];

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
const gradients = [
  "bg-gradient-to-br from-purple-900/80 to-blue-900/80",
  "bg-gradient-to-br from-teal-900/70 to-cyan-900/70",
  "bg-gradient-to-br from-amber-900/70 to-orange-900/70",
  "bg-gradient-to-br from-emerald-900/70 to-green-900/70",
];

const shippingMethods = [
  {
    id: 1,
    icon: <></>,                    // empty icon
    title: "Авиаперевозки",
    subtitle: "Самый быстрый способ",
    duration: "3-7 дн.",
    suitableFor: ["Образцы", "Электроника", "Мед. товары", "Документы"],
    cost: "Высокая" as const,
    reliability: 5,
    features: ["Скорость доставки", "Безопасность", "Трекинг", "Таможня"],
    imageSrc: "/images/airpng.png",
  },
  {
    id: 2,
    icon: <></>,
    title: "Железнодорожные",
    subtitle: "Баланс цены и скорости",
    duration: "18-40 дн.",
    suitableFor: ["Контейнеры FCL", "Сборные грузы LCL", "Оборудование", "Стройматериалы"],
    cost: "Средняя" as const,
    reliability: 4,
    features: ["Оптимальная стоимость", "Надежность", "Контейнерные", "Сборные грузы"],
    imageSrc: "/images/train.jpg",
  },
  {
    id: 3,
    icon: <></>,
    title: "Автомобильные",
    subtitle: "Гибкий и универсальный",
    duration: "14-25 дн.",
    suitableFor: ["Региональные", "Междугородные", "Температура", "Частичные загрузки"],
    cost: "Средняя" as const,
    reliability: 4,
    features: ["Гибкость маршрутов", "Дверь-дверь", "Экспедирование", "Мультимодальные"],
    imageSrc: "/images/truck-cargo.jpg",
  },
  {
    id: 4,
    icon: <></>,
    title: "Морские контейнерные",
    subtitle: "Самый экономичный",
    duration: "30-60 дн.",
    suitableFor: ["Международные", "Консолидация", "Крупногабаритные", "Сырье"],
    cost: "Низкая" as const,
    reliability: 3,
    features: ["Низкая стоимость", "Большие объёмы", "Международные", "Контейнеры"],
    imageSrc: "/images/cargo.jpg",
  },
];

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