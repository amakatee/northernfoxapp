// app/supplier-search/page.tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SupplierSearchPage() {
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
            Проверка и поиск поставщиков в Китае
          </h1>
          <p className="text-gray-700 text-lg">
            Найдем надежных поставщиков, проверим их благонадежность и организуем полный цикл поставок из Китая в Россию
          </p>
        </div>

        {/* Services */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#0b2249] mb-6">Наши услуги по поиску поставщиков</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Поиск поставщиков</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>1688.com, Taobao, Alibaba</li>
                <li>Прямые контакты с фабриками</li>
                <li>Подбор по вашим требованиям</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Верификация поставщиков</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Проверка регистрационных документов</li>
                <li>Выезд на производство</li>
                <li>Финансовая проверка</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Контроль качества</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Предотгрузочная инспекция</li>
                <li>Лабораторные испытания</li>
                <li>Фото и видео отчеты</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#0b2249] mb-6">Процесс работы</h2>
          <div className="space-y-3 text-gray-700">
            <div><span className="font-bold text-gray-900">01.</span> Заявка - Вы оставляете заявку с описанием товара</div>
            <div><span className="font-bold text-gray-900">02.</span> Поиск - Мы находим 3-5 подходящих поставщиков</div>
            <div><span className="font-bold text-gray-900">03.</span> Проверка - Проводим полную верификацию</div>
            <div><span className="font-bold text-gray-900">04.</span> Доставка - Организуем поставку в Россию</div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Готовы найти надежного поставщика?</h2>
          <p className="text-gray-700 mb-4">Оставьте заявку, и мы начнем поиск уже сегодня</p>
          <Link href="/contact" className="inline-block bg-[#0b2249] text-white px-6 py-2 rounded-full hover:bg-[#1a3a6e] transition">
            Оставить заявку
          </Link>
        </div>

      </div>
    </div>
  );
}