import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, MapPin, Clock, MessageCircle, Phone } from 'lucide-react'
import LogisticsFormSection from '../components/helpers/DelieveryForm'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты и расчет доставки | Northern Fox",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#071123] transition-colors mb-6 group max-w-4xl mx-auto block"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Вернуться на главную
        </Link>

        {/* Header */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[#071123] mb-3">
            Свяжитесь с нами
          </h1>
          <p className="text-gray-600 text-lg">
            Оставьте заявку для расчета доставки или свяжитесь с нами любым удобным способом
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Left Column - Contact Info */}
          <div className="space-y-6">
            {/* Email */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-[#071123]/10 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-[#071123]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#071123] mb-1">Email</h2>
                  <a 
                    href="mailto:logistics@beihunorthernfox.com" 
                    className="text-[#0b2249] bg-[#0b2249] hover:underline break-all"
                  >
                    logistics@beihunorthernfox.com
                  </a>
                  <p className="text-gray-500 text-sm mt-2">Ответ в течение 2-4 часов</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-[#071123]/10 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-[#071123]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#071123] mb-1">Адрес офиса</h2>
                  <p className="text-gray-700">
                    A22, Building 2511, No. 37, Huanshi West Road
                  </p>
                  <p className="text-gray-700">
                    Liwan District, Guangzhou City, China
                  </p>
                  <p className="text-gray-500 text-sm mt-2">Китай, провинция Гуандун, г. Гуанчжоу</p>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-[#071123]/10 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-[#071123]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#071123] mb-1">Режим работы</h2>
                  <div className="space-y-1">
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-600">Пн - Пт:</span>
                      <span className="font-medium text-gray-800">09:00 - 18:00 (UTC+8)</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-600">Суббота:</span>
                      <span className="font-medium text-gray-800">10:00 - 15:00 (UTC+8)</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-600">Воскресенье:</span>
                      <span className="text-gray-500">Выходной</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Messengers */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-[#071123]/10 p-3 rounded-full">
                  <MessageCircle className="w-6 h-6 text-[#071123]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#071123] mb-1">Мессенджеры</h2>
                  <p className="text-gray-700">WhatsApp / Telegram / WeChat</p>
                  <p className="text-gray-500 text-sm mt-2">
                    *Для получения номера, пожалуйста, напишите на email
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <LogisticsFormSection />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 max-w-2xl mx-auto">
          <p className="text-gray-500 text-sm">
            Или свяжитесь с нами напрямую по email — мы ответим в течение рабочего дня
          </p>
        </div>

      </div>
    </div>
  )
}

export default ContactPage