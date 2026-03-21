'use client'
import React from 'react'
import FinchStyleBorderCard from '../helpers/AnimatedBorder'
import WhiteVsGrayDelivery from '../helpers/WhiteVsGrey'

const WhyUs = () => {
  return (
    <div className='flex flex-col md:flex-row items-stretch gap-6 p-4 md:p-10'>
  {/* Finch Card - на мобильных сверху, на десктопе слева */}
  <div className='w-full md:w-1/2 lg:w-1/2'>
    <FinchStyleBorderCard borderRadius={20}>
      <WhiteVsGrayDelivery />
    </FinchStyleBorderCard>
  </div>
  
    {/* Колонка с маленькими карточками - на мобильных снизу, на десктопе справа */}
    <div className='flex flex-col gap-6 w-full md:w-1/2 lg:w-1/2'>
      
      {/* Первая маленькая карточка */}
      <div
        className={`
          group relative h-auto min-h-[260px] w-full
          bg-gradient-to-br from-[#0a0a0f]/96 via-teal-950/60 via-cyan-900/45 via-emerald-900/30 to-[#0b0b13]/94
          backdrop-blur-2xl bg-opacity-65
          rounded-2xl md:rounded-3xl
          overflow-hidden
          transition-all duration-700 ease-out
          hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/60
          hover:border-cyan-500/15
          cursor-pointer
        `}
      >
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 md:gap-4">
            <div>
              <h3 className="text-lg md:text-xl font-medium text-white tracking-tight leading-tight">
                Заголовок 1
              </h3>
              <p className="text-xs md:text-sm text-cyan-200/70 mt-1 font-light">
                Подзаголовок 1
              </p>
            </div>
          </div>
        </div>
      </div>
  
      {/* Вторая маленькая карточка */}
      <div
        className={`
          group relative h-auto min-h-[260px] w-full
          bg-gradient-to-tr from-[#0a0a0f]/95 via-fuchsia-950/55 via-purple-900/45 via-indigo-900/35 to-[#0c0c15]/92
          backdrop-blur-2xl bg-opacity-65
          rounded-2xl md:rounded-3xl
          overflow-hidden
          transition-all duration-700 ease-out
          hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/60
          hover:border-cyan-500/15
          cursor-pointer
        `}
      >
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 md:gap-4">
            <div>
              <h3 className="text-lg md:text-xl font-medium text-white tracking-tight leading-tight">
                Заголовок 2
              </h3>
              <p className="text-xs md:text-sm text-cyan-200/70 mt-1 font-light">
                Подзаголовок 2
              </p>
            </div>
          </div>
        </div>
      </div>
  
      {/* Опционально: третья карточка */}
      <div
        className={`
          group relative h-auto min-h-[260px] w-full
          bg-gradient-to-tr from-[#0a0a0f]/95 via-fuchsia-950/55 via-purple-900/45 via-indigo-900/35 to-[#0c0c15]/92
          backdrop-blur-2xl bg-opacity-65
          rounded-2xl md:rounded-3xl
          overflow-hidden
          transition-all duration-700 ease-out
          hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/60
          hover:border-cyan-500/15
          cursor-pointer
        `}
      >
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 md:gap-4">
            <div>
              <h3 className="text-lg md:text-xl font-medium text-white tracking-tight leading-tight">
                Заголовок 3
              </h3>
              <p className="text-xs md:text-sm text-cyan-200/70 mt-1 font-light">
                Подзаголовок 3
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default WhyUs