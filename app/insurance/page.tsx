// app/insurance/page.tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function InsurancePage() {
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
            Страхование грузов
          </h1>
          <p className="text-gray-700 text-lg">
            Полная защита вашего груза при перевозке из Китая в Россию. Страхуем от любых рисков на всех этапах доставки
          </p>
        </div>

        {/* Coverage Options */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#0b2249] mb-6">Варианты страхового покрытия</h2>
          
          <div className="space-y-4">
            <div className="border border-gray-200 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Базовое - от 0.3%</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>ДТП и столкновения</li>
                <li>Пожар и взрыв</li>
                <li>Стихийные бедствия</li>
                <li className="text-gray-400">Хищение (не включено)</li>
              </ul>
            </div>

            <div className="border-2 border-[#0b2249] p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Расширенное - от 0.5% (Рекомендуем)</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Все риски базового пакета</li>
                <li>Хищение и кража</li>
                <li>Повреждение при погрузке</li>
                <li>Таможенные риски</li>
              </ul>
            </div>

            <div className="border border-gray-200 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Полное - от 0.8%</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Все риски расширенного пакета</li>
                <li>Ответственность перевозчика</li>
                <li>Хранение на складе</li>
                <li>Политические риски</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Us */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#0b2249] mb-6">Почему выбирают нас</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-bold text-2xl text-gray-900">24/7</div>
              <div className="text-gray-600 text-sm">Поддержка на всех этапах</div>
            </div>
            <div>
              <div className="font-bold text-2xl text-gray-900">99%</div>
              <div className="text-gray-600 text-sm">Выплат по страховым случаям</div>
            </div>
            <div>
              <div className="font-bold text-2xl text-gray-900">5+ лет</div>
              <div className="text-gray-600 text-sm">На рынке страхования грузов</div>
            </div>
            <div>
              <div className="font-bold text-2xl text-gray-900">50+</div>
              <div className="text-gray-600 text-sm">Страховых партнеров</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#0b2249] p-6 rounded-lg text-center">
          <h2 className="text-xl font-bold text-white mb-2">Застраховать груз</h2>
          <p className="text-blue-100 mb-4">Получите расчет страховки за 15 минут</p>
          <Link href="/contact" className="inline-block bg-white text-[#0b2249] px-6 py-2 rounded-full hover:bg-gray-100 transition">
            Оставить заявку
          </Link>
        </div>

      </div>
    </div>
  );
}