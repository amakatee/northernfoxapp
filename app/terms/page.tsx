"use client"

import Link from "next/link"
import { ArrowLeft, FileText, Shield, Truck, Clock, CreditCard, AlertCircle } from "lucide-react"

export default function TermsOfServicePage() {
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

        {/* Terms of Service content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
          <div className="text-center mb-8">
            
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0b2249] mb-4">
              Условия предоставления услуг
            </h1>
            <p className="text-gray-500 text-sm">
              Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
            </p>
          </div>

          <div className="space-y-8 text-gray-700">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Краткое содержание:</strong> Настоящие Условия регулируют отношения между 
                компанией и клиентом при оказании логистических услуг. Пожалуйста, внимательно 
                ознакомьтесь с ними перед отправкой заявки.
              </p>
            </div>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3 flex items-center gap-2">
                <Truck className="w-5 h-5" />
                1. Общие положения
              </h2>
              <p className="leading-relaxed">
                1.1. Настоящие Условия предоставления услуг (далее - "Условия") являются официальным 
                документом, регулирующим отношения между Исполнителем (далее - "Компания", "Мы", "Наш") 
                и Заказчиком (далее - "Клиент", "Вы") при оказании логистических услуг.
              </p>
              <p className="leading-relaxed mt-2">
                1.2. Отправляя заявку через форму на сайте, Вы подтверждаете, что ознакомлены, 
                понимаете и соглашаетесь с настоящими Условиями в полном объеме.
              </p>
              <p className="leading-relaxed mt-2">
                1.3. Компания оставляет за собой право вносить изменения в Условия без 
                предварительного уведомления. Актуальная версия всегда доступна по этому адресу.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                2. Предмет соглашения
              </h2>
              <p className="leading-relaxed">
                2.1. Компания обязуется оказать, а Клиент принять и оплатить следующие услуги:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Организация перевозки грузов по России и международным направлениям</li>
                <li>Таможенное оформление и брокерские услуги</li>
                <li>Складское хранение и обработка грузов</li>
                <li>Страхование грузов</li>
                <li>Консультационные услуги в области логистики</li>
                <li>Иные услуги, согласованные сторонами дополнительно</li>
              </ul>
              <p className="leading-relaxed mt-2">
                2.2. Конкретный перечень, объем и стоимость услуг определяются в индивидуальном 
                порядке и фиксируются в договоре-заявке или коммерческом предложении.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                3. Порядок оказания услуг
              </h2>
              
              <h3 className="font-semibold mt-4 mb-2">3.1. Этапы сотрудничества:</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Клиент заполняет форму заявки на сайте или связывается с менеджером</li>
                <li>Компания предоставляет коммерческое предложение и сроки выполнения</li>
                <li>Стороны согласовывают условия и подписывают договор</li>
                <li>Клиент предоставляет необходимые документы и груз</li>
                <li>Компания выполняет услуги в согласованные сроки</li>
                <li>Стороны подписывают акт выполненных работ</li>
                <li>Клиент производит окончательную оплату</li>
              </ol>

              <h3 className="font-semibold mt-4 mb-2">3.2. Сроки оказания услуг:</h3>
              <p className="leading-relaxed">
                Сроки оказания услуг указываются в договоре и зависят от вида услуг, 
                расстояния перевозки, маршрута, сезонности и других факторов. Компания 
                обязуется приложить все разумные усилия для соблюдения заявленных сроков.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                4. Цены и порядок оплаты
              </h2>
              <p className="leading-relaxed">
                4.1. Стоимость услуг определяется в зависимости от:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Типа и характеристик груза (вес, объем, хрупкость, опасность)</li>
                <li>Расстояния и маршрута перевозки</li>
                <li>Способа доставки (авиа, Ж/Д, авто, море)</li>
                <li>Необходимости дополнительных услуг (упаковка, страховка, хранение)</li>
                <li>Срочности выполнения заказа</li>
              </ul>
              <p className="leading-relaxed mt-2">
                4.2. Оплата услуг может производиться в следующем порядке:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>100% предоплата для новых клиентов</li>
                <li>Частичная предоплата (50-70%) и постоплата для постоянных клиентов</li>
                <li>Постоплата по факту выполнения услуг (по согласованию)</li>
              </ul>
              <p className="leading-relaxed mt-2">
                4.3. Валюта расчетов - рубли РФ, если иное не предусмотрено договором.
              </p>
              <p className="leading-relaxed mt-2">
                4.4. В случае просрочки оплаты Компания вправе приостановить оказание услуг 
                до полного погашения задолженности.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                5. Права и обязанности сторон
              </h2>
              
              <h3 className="font-semibold mt-4 mb-2">5.1. Компания обязуется:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Оказать услуги качественно и в согласованные сроки</li>
                <li>Предоставить Клиенту полную информацию об услугах</li>
                <li>Обеспечить сохранность груза во время перевозки</li>
                <li>Предоставить отчетные документы по итогам оказания услуг</li>
                <li>Соблюдать конфиденциальность информации о Клиенте и его грузе</li>
              </ul>

              <h3 className="font-semibold mt-4 mb-2">5.2. Компания имеет право:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Привлекать третьих лиц для оказания услуг с сохранением ответственности</li>
                <li>Приостановить оказание услуг при нарушении Клиентом условий оплаты</li>
                <li>Отказаться от оказания услуг при предоставлении недостоверной информации</li>
                <li>Изменять маршрут при возникновении форс-мажорных обстоятельств</li>
              </ul>

              <h3 className="font-semibold mt-4 mb-2">5.3. Клиент обязуется:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Предоставить достоверную информацию о грузе и отправителе/получателе</li>
                <li>Своевременно оплачивать услуги в соответствии с договором</li>
                <li>Предоставить все необходимые документы для таможенного оформления</li>
                <li>Обеспечить правильную упаковку груза (если не заказана услуга упаковки)</li>
                <li>Своевременно принимать груз при доставке</li>
              </ul>

              <h3 className="font-semibold mt-4 mb-2">5.4. Клиент имеет право:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Получать полную информацию о статусе выполнения заказа</li>
                <li>Требовать возмещения убытков в случае порчи или утери груза по вине Компании</li>
                <li>Отказаться от услуг при условии компенсации фактически понесенных расходов</li>
                <li>Вносить предложения по улучшению качества обслуживания</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">6. Ответственность сторон</h2>
              
              <h3 className="font-semibold mt-4 mb-2">6.1. Ответственность Компании:</h3>
              <p className="leading-relaxed">
                Компания несет ответственность за сохранность груза с момента его принятия 
                до момента выдачи получателю. В случае утраты или повреждения груза по вине 
                Компании, возмещение ограничивается:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Объявленной ценностью груза (если заявлена)</li>
                <li>Фактической стоимостью груза, подтвержденной документально (макс. 50 000 руб.)</li>
                <li>Суммой страхового возмещения (при наличии страховки)</li>
              </ul>

              <h3 className="font-semibold mt-4 mb-2">6.2. Компания НЕ несет ответственность за:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Задержки, вызванные форс-мажорными обстоятельствами</li>
                <li>Недостатки груза, возникшие из-за ненадлежащей упаковки Клиента</li>
                <li>Убытки, связанные с коммерческими рисками Клиента</li>
                <li>Действия государственных и таможенных органов</li>
                <li>Скрытые дефекты груза, не обнаруженные при приемке</li>
              </ul>

              <h3 className="font-semibold mt-4 mb-2">6.3. Ответственность Клиента:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>За достоверность сведений, указанных в заявке и документах</li>
                <li>За соблюдение требований к упаковке и маркировке груза</li>
                <li>За своевременность оплаты и предоставления документов</li>
                <li>За убытки, причиненные Компании из-за недостоверной информации о грузе</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                7. Форс-мажор
              </h2>
              <p className="leading-relaxed">
                Стороны освобождаются от ответственности за частичное или полное неисполнение 
                обязательств, если это явилось следствием обстоятельств непреодолимой силы:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Стихийные бедствия (землетрясения, наводнения, ураганы)</li>
                <li>Военные действия, террористические акты, гражданские волнения</li>
                <li>Забастовки, локауты, изменения в законодательстве</li>
                <li>Действия государственных органов, запрещающие или ограничивающие перевозки</li>
                <li>Эпидемии, пандемии и связанные с ними ограничения</li>
                <li>Аварии на транспорте, не зависящие от воли сторон</li>
              </ul>
              <p className="leading-relaxed mt-2">
                Сторона, для которой создалась невозможность исполнения обязательств, обязана 
                незамедлительно уведомить другую сторону. Срок исполнения обязательств отодвигается 
                соразмерно времени действия форс-мажора.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">8. Порядок разрешения споров</h2>
              <p className="leading-relaxed">
                8.1. Все споры и разногласия решаются путем переговоров с соблюдением 
                претензионного порядка. Срок рассмотрения претензии - 10 рабочих дней.
              </p>
              <p className="leading-relaxed mt-2">
                8.2. При недостижении согласия спор передается на рассмотрение в суд по месту 
                нахождения Компании в соответствии с законодательством РФ.
              </p>
              <p className="leading-relaxed mt-2">
                8.3. Применимое право - законодательство Российской Федерации.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">9. Конфиденциальность и персональные данные</h2>
              <p className="leading-relaxed">
                9.1. Компания обязуется не разглашать конфиденциальную информацию о Клиенте 
                и его грузе третьим лицам без согласия Клиента.
              </p>
              <p className="leading-relaxed mt-2">
                9.2. Обработка персональных данных осуществляется в соответствии с 
                <Link href="/privacy" className="text-blue-600 hover:underline mx-1">
                  Политикой конфиденциальности
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0b2249] mb-3">10. Заключительные положения</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Настоящие Условия вступают в силу с момента отправки заявки Клиентом</li>
                <li>Если какое-либо положение признано недействительным, остальные сохраняют силу</li>
                <li>Бездействие Компании не означает отказа от прав по настоящим Условиям</li>
                <li>Все уведомления направляются на контактные данные, указанные в заявке</li>
              </ul>
            </section>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-6 rounded-xl mt-8">
              <h3 className="font-bold text-[#0b2249] mb-3 text-lg">Важно!</h3>
              <p className="text-sm text-gray-700">
                Отправляя заявку через форму на сайте, вы подтверждаете, что:
              </p>
              <ul className="list-disc pl-6 mt-2 text-sm text-gray-700 space-y-1">
                <li>Ознакомлены и согласны с настоящими Условиями предоставления услуг</li>
                <li>Подтверждаете достоверность предоставленной информации</li>
                <li>Согласны с 
                  <Link href="/privacy" className="text-blue-600 hover:underline mx-1">
                    Политикой конфиденциальности
                  </Link>
                  и 
                  <Link href="/user-agreement" className="text-blue-600 hover:underline mx-1">
                    Пользовательским соглашением
                  </Link>
                </li>
                <li>Даете согласие на обработку персональных данных</li>
              </ul>
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
            <Link
              href="/privacy"
              className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full hover:bg-gray-50 transition-colors font-semibold"
            >
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}