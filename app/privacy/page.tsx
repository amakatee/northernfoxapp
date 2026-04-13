"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
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

        {/* Privacy policy content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0b2249] mb-4">
            Политика конфиденциальности
          </h1>
          <p className="text-gray-500 mb-8 text-sm">
            Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
          </p>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">1. Общие положения</h2>
              <p className="leading-relaxed">
                Настоящая Политика конфиденциальности (далее - "Политика") описывает, 
                как компания (далее - "Компания", "мы", "нас", "наш") собирает, использует 
                и защищает персональные данные пользователей (далее - "Пользователь", "вы") 
                при использовании нашего сайта и услуг.
              </p>
              <p className="leading-relaxed mt-2">
                Используя наш сайт и отправляя заявки, вы соглашаетесь с условиями 
                настоящей Политики конфиденциальности.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">2. Какие данные мы собираем</h2>
              
              <h3 className="font-semibold mt-3 mb-2">2.1. Данные, предоставляемые вами:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Контактная информация: имя, телефон, email</li>
                <li>Информация о грузе: вес, габариты, описание</li>
                <li>Загружаемые файлы: инвойсы, фотографии, документы</li>
                <li>Сообщения и комментарии</li>
              </ul>

              <h3 className="font-semibold mt-3 mb-2">2.2. Данные, собираемые автоматически:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>IP-адрес и данные о местоположении</li>
                <li>Тип браузера и устройства</li>
                <li>Файлы cookie и данные об использовании сайта</li>
                <li>Дата и время посещения</li>
                <li>Страницы, которые вы просматриваете</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">3. Как мы используем ваши данные</h2>
              <p className="leading-relaxed">Мы используем собранные данные для следующих целей:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Обработка и рассмотрение ваших заявок на логистические услуги</li>
                <li>Связь с вами по вопросам доставки и предоставления услуг</li>
                <li>Улучшение качества обслуживания и оптимизация сайта</li>
                <li>Отправка информационных и маркетинговых материалов (с вашего согласия)</li>
                <li>Анализ и статистика использования сайта</li>
                <li>Предотвращение мошенничества и обеспечение безопасности</li>
                <li>Выполнение требований законодательства</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">4. Правовые основания обработки данных</h2>
              <p className="leading-relaxed">
                Обработка ваших персональных данных осуществляется на следующих правовых основаниях:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Ваше согласие, выраженное путем заполнения формы заявки</li>
                <li>Необходимость для выполнения договорных обязательств</li>
                <li>Соблюдение законодательных требований РФ</li>
                <li>Законные интересы Компании (улучшение сервиса, безопасность)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">5. Передача данных третьим лицам</h2>
              <p className="leading-relaxed">
                Мы не продаем и не передаем ваши персональные данные третьим лицам, 
                за исключением следующих случаев:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Когда это необходимо для оказания услуги (например, перевозчикам, таможенным брокерам)</li>
                <li>Когда это требуется по закону или запросу государственных органов</li>
                <li>Для защиты наших прав и предотвращения мошенничества</li>
                <li>С вашего явного согласия на такую передачу</li>
              </ul>
              <p className="leading-relaxed mt-2">
                Все третьи лица, получающие доступ к данным, обязаны обеспечивать их 
                конфиденциальность и использовать только для указанных целей.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">6. Хранение и защита данных</h2>
              <p className="leading-relaxed">
                Мы принимаем все необходимые организационные и технические меры для 
                защиты ваших персональных данных от несанкционированного доступа, 
                изменения, раскрытия или уничтожения:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Шифрование данных при передаче (SSL/TLS)</li>
                <li>Регулярное обновление систем безопасности</li>
                <li>Ограничение доступа к данным сотрудниками</li>
                <li>Безопасное хранение на защищенных серверах</li>
                <li>Регулярное резервное копирование данных</li>
              </ul>
              <p className="leading-relaxed mt-2">
                Ваши данные хранятся в течение срока, необходимого для выполнения целей 
                их сбора, или в соответствии с требованиями законодательства.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">7. Ваши права</h2>
              <p className="leading-relaxed">В соответствии с законодательством РФ, вы имеете право:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Получить информацию о том, какие данные о вас хранятся</li>
                <li>Требовать исправления неточных или неполных данных</li>
                <li>Требовать удаления ваших данных (право на забвение)</li>
                <li>Отозвать согласие на обработку данных в любое время</li>
                <li>Получить копию ваших данных в машиночитаемом формате</li>
                <li>Подать жалобу в уполномоченный орган</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">8. Файлы cookie</h2>
              <p className="leading-relaxed">
                Наш сайт использует файлы cookie для улучшения пользовательского опыта, 
                анализа трафика и персонализации контента. Вы можете управлять настройками 
                cookie через настройки вашего браузера.
              </p>
              <p className="leading-relaxed mt-2">
                Типы cookie, которые мы используем:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Необходимые cookie</strong> - для работы основных функций сайта</li>
                <li><strong>Аналитические cookie</strong> - для сбора анонимной статистики использования</li>
                <li><strong>Функциональные cookie</strong> - для запоминания ваших предпочтений</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">9. Конфиденциальность детей</h2>
              <p className="leading-relaxed">
                Наш сайт не предназначен для лиц младше 18 лет. Мы сознательно не собираем 
                персональные данные от несовершеннолетних. Если вам станет известно, что 
                ребенок предоставил нам свои данные, пожалуйста, свяжитесь с нами.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">10. Изменения в политике конфиденциальности</h2>
              <p className="leading-relaxed">
                Мы оставляем за собой право периодически обновлять настоящую Политику 
                конфиденциальности. О существенных изменениях мы уведомим вас через 
                уведомление на сайте или по email. Продолжение использования сайта после 
                изменений означает принятие новой версии Политики.
              </p>
              <p className="leading-relaxed mt-2">
                Рекомендуем периодически проверять эту страницу для ознакомления с актуальной версией.
              </p>
            </section>

            

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg mt-8">
              <p className="text-sm text-blue-800 font-semibold mb-2">
                Согласие на обработку персональных данных
              </p>
              <p className="text-sm text-blue-800">
                Отправляя заявку через форму на нашем сайте, вы даете согласие на обработку 
                своих персональных данных в соответствии с настоящей Политикой конфиденциальности 
                и Федеральным законом № 152-ФЗ "О персональных данных".
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
            <Link
              href="/user-agreement"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#0b2249] text-[#0b2249] px-8 py-3 rounded-full hover:bg-gray-50 transition-colors font-semibold"
            >
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}