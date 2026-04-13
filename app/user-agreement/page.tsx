"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function UserAgreementPage() {
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

        {/* Agreement content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0b2249] mb-4">
            Пользовательское соглашение
          </h1>
          <p className="text-gray-500 mb-8 text-sm">
            Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
          </p>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">1. Общие положения</h2>
              <p className="leading-relaxed">
                Настоящее Пользовательское соглашение (далее - "Соглашение") регулирует отношения 
                между владельцем сайта (далее - "Компания") и пользователем (далее - "Пользователь") 
                при использовании сервисов и услуг, предоставляемых через сайт и связанные с ним 
                сервисы.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">2. Предмет соглашения</h2>
              <p className="leading-relaxed">
                Компания предоставляет Пользователю возможность:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Оставлять заявки на логистические услуги</li>
                <li>Загружать файлы (инвойсы, фото, документы)</li>
                <li>Получать консультации по вопросам доставки грузов</li>
                <li>Использовать иные сервисы, доступные на сайте</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">3. Права и обязанности сторон</h2>
              
              <h3 className="font-semibold mt-3 mb-2">3.1. Пользователь обязуется:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Предоставлять достоверную информацию при заполнении форм</li>
                <li>Не загружать запрещенные или вредоносные файлы</li>
                <li>Не использовать сайт для незаконной деятельности</li>
                <li>Соблюдать законодательство РФ</li>
              </ul>

              <h3 className="font-semibold mt-3 mb-2">3.2. Компания обязуется:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Обрабатывать заявки в установленные сроки</li>
                <li>Обеспечивать конфиденциальность персональных данных</li>
                <li>Предоставлять качественные логистические услуги</li>
                <li>Информировать о статусе выполнения заявки</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">4. Конфиденциальность и защита данных</h2>
              <p className="leading-relaxed">
                Компания обязуется не разглашать персональные данные Пользователя третьим лицам 
                без его согласия, за исключением случаев, предусмотренных законодательством РФ. 
                Все данные используются исключительно для выполнения обязательств по обработке заявок 
                и предоставлению услуг.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">5. Ответственность сторон</h2>
              <p className="leading-relaxed">
                Компания не несет ответственности за:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Сбои в работе сайта по независящим причинам</li>
                <li>Достоверность информации, предоставленной Пользователем</li>
                <li>Убытки, возникшие в результате форс-мажорных обстоятельств</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">6. Срок действия и изменения соглашения</h2>
              <p className="leading-relaxed">
                Компания оставляет за собой право вносить изменения в настоящее Соглашение 
                без предварительного уведомления Пользователя. Актуальная версия всегда 
                доступна по этому адресу. Продолжение использования сайта после изменений 
                означает принятие новой версии Соглашения.
              </p>
            </section>

           

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg mt-8">
              <p className="text-sm text-blue-800">
                Нажимая "Отправить заявку" и принимая условия данного соглашения, 
                вы подтверждаете, что ознакомлены и согласны с его условиями, 
                а также даете согласие на обработку персональных данных.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-200 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#0b2249] text-white px-8 py-3 rounded-full hover:bg-blue-800 transition-colors font-semibold"
            >
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}