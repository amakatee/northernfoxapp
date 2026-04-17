"use client";

import Link from "next/link";
import { ArrowLeft, Cookie, Shield, Settings, Clock } from "lucide-react";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Вернуться назад
        </Link>

        {/* Cookie Policy content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
          <div className="flex items-center gap-3 mb-4">
            <Cookie className="w-8 h-8 text-[#0b2249]" />
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0b2249]">
              Политика использования cookies
            </h1>
          </div>
          <p className="text-gray-500 mb-8 text-sm">
            Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
          </p>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">Что такое cookies?</h2>
              <p className="leading-relaxed">
                Cookies — это небольшие текстовые файлы, которые сохраняются на вашем 
                устройстве (компьютере, телефоне, планшете) при посещении веб-сайтов. 
                Они помогают сайту запоминать ваши действия и предпочтения, чтобы 
                улучшить ваш опыт использования.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">Зачем мы используем cookies?</h2>
              <p className="leading-relaxed">
                Наш сайт использует cookies для следующих целей:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Обеспечение корректной работы сайта</li>
                <li>Запоминание ваших настроек и предпочтений</li>
                <li>Анализ трафика и поведения пользователей</li>
                <li>Улучшение работы и удобства сайта</li>
                <li>Предотвращение мошенничества</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">Типы cookies, которые мы используем</h2>
              
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 border text-left">Тип cookies</th>
                      <th className="p-3 border text-left">Назначение</th>
                      <th className="p-3 border text-left">Срок хранения</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border font-semibold">Необходимые (Essential)</td>
                      <td className="p-3 border">Обеспечивают работу основных функций сайта. Без них сайт не может работать корректно.</td>
                      <td className="p-3 border">Сессия</td>
                    </tr>
                    <tr>
                      <td className="p-3 border font-semibold">Функциональные (Functional)</td>
                      <td className="p-3 border">Запоминают ваши предпочтения и настройки для улучшения пользовательского опыта.</td>
                      <td className="p-3 border">До 1 года</td>
                    </tr>
                    <tr>
                      <td className="p-3 border font-semibold">Аналитические (Analytics)</td>
                      <td className="p-3 border">Собирают анонимную информацию о том, как посетители используют сайт (страницы, время, переходы).</td>
                      <td className="p-3 border">До 2 лет</td>
                    </tr>
                    <tr>
                      <td className="p-3 border font-semibold">Маркетинговые (Marketing)</td>
                      <td className="p-3 border">Используются для показа релевантной рекламы и отслеживания эффективности кампаний.</td>
                      <td className="p-3 border">До 2 лет</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">Какие конкретно cookies мы используем?</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 border text-left">Название</th>
                      <th className="p-3 border text-left">Тип</th>
                      <th className="p-3 border text-left">Назначение</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border">cookie_consent</td>
                      <td className="p-3 border">Необходимый</td>
                      <td className="p-3 border">Запоминает ваш выбор по использованию cookies</td>
                    </tr>
                    <tr>
                      <td className="p-3 border">session_id</td>
                      <td className="p-3 border">Необходимый</td>
                      <td className="p-3 border">Идентификация сессии пользователя</td>
                    </tr>
                    <tr>
                      <td className="p-3 border">_ga</td>
                      <td className="p-3 border">Аналитический</td>
                      <td className="p-3 border">Аналитика Google — идентификация уникальных пользователей</td>
                    </tr>
                    <tr>
                      <td className="p-3 border">_gid</td>
                      <td className="p-3 border">Аналитический</td>
                      <td className="p-3 border">Аналитика Google — разграничение пользователей</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">Как управлять cookies?</h2>
              <p className="leading-relaxed">
                Вы можете управлять cookies через настройки вашего браузера. Большинство 
                браузеров позволяют:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Просматривать сохраненные cookies и удалять их</li>
                <li>Блокировать cookies от определенных сайтов</li>
                <li>Блокировать все cookies</li>
                <li>Настроить уведомления перед сохранением cookies</li>
              </ul>
              <p className="leading-relaxed mt-2">
                Инструкции для популярных браузеров:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <a href="#" className="text-blue-600 hover:underline">Google Chrome</a> — Настройки → Конфиденциальность и безопасность → Cookies
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">Mozilla Firefox</a> — Настройки → Приватность и защита → Cookies
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">Safari</a> — Настройки → Конфиденциальность → Cookies
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">Microsoft Edge</a> — Настройки → Файлы cookie и разрешения сайтов
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">Что произойдет при отключении cookies?</h2>
              <p className="leading-relaxed">
                Если вы отключите cookies, некоторые функции сайта могут работать некорректно:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Формы могут не сохранять введенные данные</li>
                <li>Некоторые интерактивные элементы могут не работать</li>
                <li>Вам придется заново вводить настройки при каждом посещении</li>
                <li>Аналитика использования сайта станет недоступной</li>
              </ul>
              <p className="leading-relaxed mt-2">
                Обратите внимание, что необходимые cookies нельзя отключить, так как 
                они обеспечивают базовую функциональность сайта.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">Сторонние cookies</h2>
              <p className="leading-relaxed">
                Наш сайт может использовать сторонние сервисы, которые устанавливают 
                свои cookies:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Google Analytics</strong> — для анализа трафика (политика Google)</li>
                <li><strong>Яндекс.Метрика</strong> — для анализа трафика (политика Яндекса)</li>
                <li><strong>Мессенджеры</strong> — для кнопок связи (WhatsApp, Telegram, WeChat)</li>
              </ul>
              <p className="leading-relaxed mt-2">
                Мы не контролируем cookies, установленные сторонними сервисами. 
                Рекомендуем ознакомиться с их политиками конфиденциальности.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">Изменения в политике cookies</h2>
              <p className="leading-relaxed">
                Мы можем периодически обновлять настоящую Политику использования cookies. 
                О существенных изменениях мы уведомим вас через уведомление на сайте. 
                Рекомендуем периодически проверять эту страницу для ознакомления с актуальной версией.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">Контакты</h2>
              <p className="leading-relaxed">
                Если у вас есть вопросы по использованию cookies на нашем сайте, 
                пожалуйста, свяжитесь с нами:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Email: <a href="mailto:logistics@beihunorthernfox.com" className="text-blue-600 hover:underline">logistics@beihunorthernfox.com</a></li>
                <li>Адрес: A22, Building 2511, No. 37, Huanshi West Road, Liwan District, Guangzhou City, China</li>
              </ul>
            </section>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg mt-8">
              <p className="text-sm text-blue-800">
                Продолжая использовать наш сайт, вы соглашаетесь с использованием 
                cookies в соответствии с настоящей Политикой.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-[#0b2249] text-white px-8 py-3 rounded-full hover:bg-blue-800 transition-colors font-semibold"
            >
              Вернуться на главную
            </Link>
           
          </div>
        </div>
      </div>
    </div>
  );
}