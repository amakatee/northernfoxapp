import React from 'react'
import {Slider} from  "../slider"

const slides =[
  {
    id:1,
    title: "Логистика из Китая «под ключ»",
    description: "Полный цикл логистики из Китая",
    imageUrl:"/images/fox.JPG",
    altText: "Dsfsdf"
  },
  {
    id:2,
    title: "Бизнес-логистика из Китая",
    description: "Экспертный подбор поставщиков с полным due diligence, юридическое сопровождение контрактов,  страхование груза на 100% стоимости, легальное таможенное оформление и премиальная доставка с end-to-end контролем.",
    imageUrl:"/images/msc.jpeg",
    altText: "Dsfsdf"
  },
  {
    id:3,
    title: "因势利导",
    description: "Полный цикл логистики из Китая",
    imageUrl:"/images/air.JPG",
    altText: "Dsfsdf"
  },
]

function Home() {
  return (
    <div className=' antialiased font-feature-settings letter-spacing: -0.05em text-[#08162F]'>
{/*       
       <NorthernFoxNavbar /> */}

        <Slider slides={slides} />
       
       
       
      
     </div>
  )
}

export default Home