// app/customs/page.tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Таможенное оформление грузов из Китая в Россию",
  description:
    "Профессиональное таможенное оформление грузов из Китая в Россию: декларирование, расчет пошлин, сертификация, сопровождение ВЭД и срочный выпуск за 24 часа.",

  keywords: [
    "таможенное оформление Китай Россия",
    "таможенный брокер",
    "декларирование товаров",
    "ВЭД консультации",
    "расчет таможенных пошлин",
    "сертификация товаров",
    "СВХ хранение",
    "карго Китай",
    "карго доставка из Китая",
    "груз из Китая",
    "доставка груза Китай Россия",
    "таможенное оформление Китай",
    "поиск поставщиков Китай",
    "проверка поставщика Китай",
    "логистика Китай Россия",
  ],

  openGraph: {
    title: "Таможенное оформление грузов — NorthernFox",
    description:
      "Полное таможенное сопровождение грузов из Китая в Россию. Минимальные сроки, отсутствие простоев.",
    url: "https://beihunorthernfox.com/customs",
    siteName: "Epolet Logistics",
    locale: "ru_RU",
    type: "article",
    images: [
      {
        url: "/fox.png",
        width: 1200,
        height: 630,
        alt: "Таможенное оформление грузов",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Таможенное оформление Китай → Россия",
    description:
      "Декларирование, пошлины, сертификация и сопровождение ВЭД.",
    images: ["/fox.png"],
  },

  alternates: {
    canonical: "https://beihunorthernfox.com/customs",
  },
};

export default function CustomsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#0b2249] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Вернуться на главную
        </Link>

        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0b2249] mb-4">
            Таможенное оформление
          </h1>
          <p className="text-gray-700 text-lg">
            Профессиональное таможенное оформление грузов из Китая в Россию. Полное сопровождение, минимальные сроки, отсутствие простоев
          </p>
        </div>

        {/* Services */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#0b2249] mb-6">Наши услуги по таможенному оформлению</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-800">Декларирование товаров</h3>
              <p className="text-gray-600 text-sm">Оформление таможенных деклараций любой сложности</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Расчет пошлин и налогов</h3>
              <p className="text-gray-600 text-sm">Точный расчет всех таможенных платежей</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Сертификация</h3>
              <p className="text-gray-600 text-sm">Оформление сертификатов и разрешительных документов</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Ускоренное оформление</h3>
              <p className="text-gray-600 text-sm">Срочное таможенное оформление за 24 часа</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Консультации по ВЭД</h3>
              <p className="text-gray-600 text-sm">Полное юридическое сопровождение ВЭД</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Транзит и хранение</h3>
              <p className="text-gray-600 text-sm">Организация временного хранения на СВХ</p>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#0b2249] mb-6">Необходимые документы</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">От продавца (Китай)</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Инвойс (коммерческий счет)</li>
                <li>Упаковочный лист (Packing List)</li>
                <li>Коносамент или CMR</li>
                <li>Сертификат происхождения</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">От покупателя (Россия)</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Контракт ВЭД</li>
                <li>Паспорт сделки</li>
                <li>Доверенность на таможню</li>
                <li>Регистрационные документы</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#0b2249] mb-6">Процесс таможенного оформления</h2>
          <div className="space-y-3 text-gray-700">
            <div><span className="font-bold text-gray-900">1.</span> Подача документов - Вы передаете нам все необходимые документы</div>
            <div><span className="font-bold text-gray-900">2.</span> Проверка - Мы проверяем документы и коды ТН ВЭД</div>
            <div><span className="font-bold text-gray-900">3.</span> Расчет платежей - Рассчитываем таможенные пошлины и налоги</div>
            <div><span className="font-bold text-gray-900">4.</span> Подача декларации - Подаем декларацию в электронном виде</div>
            <div><span className="font-bold text-gray-900">5.</span> Выпуск товара - Получаем разрешение на выпуск товара</div>
          </div>
        </div>

        {/* Advantages */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#0b2249] mb-6">Наши преимущества</h2>
          <div className="space-y-3 text-gray-700">
            <div><span className="font-bold text-gray-900">Скорость:</span> Оформление от 2 часов, срочный выпуск за 24 часа</div>
            <div><span className="font-bold text-gray-900">Экспертиза:</span> 5+ лет опыта</div>
            <div><span className="font-bold text-gray-900">Безопасность:</span> Минимизация рисков, полное юридическое сопровождение</div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Нужна помощь с таможней?</h2>
          <p className="text-gray-700 mb-4">Проконсультируем бесплатно</p>
          <Link href="/contact" className="inline-block bg-[#0b2249] text-white px-6 py-2 rounded-full hover:bg-[#1a3a6e] transition">
            Получить консультацию
          </Link>
        </div>

      </div>
    </div>
  );
}