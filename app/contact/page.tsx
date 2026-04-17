import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react' 
import LogisticsFormSection from '../components/helpers/DelieveryForm'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Контакты и расчет доставки",
  description:
    "Свяжитесь с Northern Fox для расчета доставки из Китая, таможенного оформления и поиска поставщиков. Бесплатная консультация.",

  keywords: [
    "доставка из Китая контакты",
    "логистика Китай Россия",
    "расчет доставки Китай",
    "таможенное оформление контакты",
    "карго Китай",
    "карго доставка из Китая",
    "груз из Китая",
    "доставка груза Китай Россия",
    "таможенное оформление Китай",
    "поиск поставщиков Китай",
    "проверка поставщика Китай",
    "логистика Китай Россия",
  ],

  alternates: {
    canonical: "https://beihunorthernfox.com/contact",
  },

  openGraph: {
    title: "Контакты Northern Fox",
    description:
      "Оставьте заявку и получите расчет доставки и консультацию по логистике.",
    url: "https://beihunorthernfox.com/contact",
    siteName: "Northern Fox",
    locale: "ru_RU",
    type: "website",
  },
};

const ContactPage = () => {
  return (
    <section className='bg-white w-full max-w-4xl mx-auto px-7 sm:px-6 lg:px-8 py-12 md:py-16 rounded-3xl shadow-lg'>
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-5 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Вернуться назад
      </Link>
      
      <LogisticsFormSection />
    </section>
  )
}

export default ContactPage