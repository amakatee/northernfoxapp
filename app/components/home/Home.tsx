import React from 'react'
import WhyChooseUs from '../sections/WhyChooseUs'
import {Slider} from  "../slider"
import HeroSection from '../Hero'


const slides =[
  {
    id:1,
    title: "Найдем и выкупим любой товар под заказ",
    description: "Работаем напрямую с фабриками и торговыми площадками. Организуем закупку, выкуп и доставку вашего заказа.",
    imageUrl:"/images/fox.JPG",
    altText: "Dsfsdf"
  },
  {
    id:2,
    title: "Склады в ключевых городах Китая",
    description: "Принимаем товар от разных поставщиков.Работаем с грузами любого объема и габаритов.",
    imageUrl:"/images/msc.jpeg",
    altText: "Dsfsdf"
  },
  {
    id:3,
    title: "Легальная таможня и сертификация",
    description: "Полный брокеридж «под ключ»: декларирование, подготовка разрешительной документации, сертификаты соответствия и ТР ТС.",
    imageUrl:"/images/air.JPG",
    altText: "Dsfsdf"
  },
  {
    id:4,
    title: "Страхование 100% стоимости",
    description: "Защищаем ваш груз на всех этапах перевозки. Страхование полной стоимости товара — ваша финансовая безопасность. ",
    imageUrl:"/images/air.JPG",
    altText: "Dsfsdf"
  },
  {
    id:5,
    title: "Доставим до вашего склада или магазина",
    description: "Защищаем ваш груз на всех этапах перевозки. Страхование полной стоимости товара — ваша финансовая безопасность. ",
    imageUrl:"/images/air.JPG",
    altText: "Dsfsdf"
  },
]



function Home() {
  return (
    <div className=' antialiased font-feature-settings letter-spacing: -0.05em text-[#08162F]'>
     

        {/* <HeroSection /> */}
{/*       
       <NorthernFoxNavbar /> */}
      
        <Slider slides={slides} />
        <WhyChooseUs />
       
       
       
      
     </div>
  )
}

export default Home