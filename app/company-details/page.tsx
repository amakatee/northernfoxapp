"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowLeft, Building2, MapPin, User, Calendar, DollarSign, CreditCard, ShieldCheck, FileText, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CompanyDetails() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!root.current) return;
  
    const q = gsap.utils.selector(root);
  
    const ctx = gsap.context(() => {
      gsap.set(q(".reveal"), { opacity: 0, y: 30 });
  
      gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 90%",
          once: true,
        },
      }).to(q(".reveal"), {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });
    }, root);
  
    return () => ctx.revert();
  }, []);

  const companyData = {
    fullName: "广州北赋贸易有限公司",
    fullNameRu: "Гуанчжоу Бэйфу Трейдинг Ко., Лтд.",
    fullNameEn: "Guangzhou Beifu Trading Co., Ltd.",
    code: "91440100MA5D0U9UX7",
    legalAddress: "Китай, г. Гуанчжоу, р-н Ливань, ул. Хуаншиси, д. 37, комната 2511, офис A2",
    legalRepresentative: "SUELANAPONOMARENKO",
    representativeRu: "Суэлана Пономаренко",
    registeredCapital: "100 000 юаней",
    capitalRub: "≈ 1 300 000 ₽",
    capitalUsd: "≈ $13 800 USD",
    establishmentDate: "11 июля 2024 года",
    companyType: "Общество с ограниченной ответственностью (有限责任公司)",
    businessScope: "Оптовая торговля (批发业)",
    registrationAuthority: "Государственное управление по надзору за рынком КНР",
    verificationLink: "http://www.gsxt.gov.cn",
  };

  return (
    <div ref={root} className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#071123] transition-colors mb-8 group reveal"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Вернуться на главную
        </Link>

        {/* Header */}
        <div className="mb-8 reveal">
          <h1 className="text-3xl md:text-4xl font-bold text-[#071123] mb-3 flex items-center gap-3">
            <Building2 className="w-8 h-8 text-[#0b2249]" />
            Реквизиты компании
          </h1>
          <p className="text-gray-600 text-lg">
            Официальные реквизиты и регистрационные данные компании Northern Fox
          </p>
        </div>

        {/* QR Code Note */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded-r-lg reveal">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm text-blue-800">
                <strong className="font-semibold">Проверьте компанию онлайн:</strong> Сканируйте QR-код на营业执照 
                или перейдите на официальный сайт госсистемы КНР для проверки регистрационных данных.
              </p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 reveal">
          <div className="bg-gradient-to-r from-[#071123] to-[#0b2249] px-6 py-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Свидетельство о регистрации (Business License)
            </h2>
          </div>
          
          <div className="p-6 space-y-5">
            {/* Company Name */}
            <div className="border-b border-gray-100 pb-3">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-[#0b2249] mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Полное наименование</p>
                  <p className="text-gray-900 font-medium">{companyData.fullName}</p>
                  <p className="text-gray-600 text-sm">{companyData.fullNameRu}</p>
                  <p className="text-gray-500 text-sm">{companyData.fullNameEn}</p>
                </div>
              </div>
            </div>

            {/* Unified Code */}
            <div className="border-b border-gray-100 pb-3">
              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-[#0b2249] mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Unified Social Credit Code</p>
                  <p className="text-gray-900 font-mono text-lg font-semibold">{companyData.code}</p>
                  <p className="text-gray-500 text-sm">(Единый социальный кредитный код / ИНН)</p>
                </div>
              </div>
            </div>

            {/* Legal Address */}
            <div className="border-b border-gray-100 pb-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#0b2249] mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Юридический адрес</p>
                  <p className="text-gray-800">{companyData.legalAddress}</p>
                  <p className="text-gray-500 text-sm mt-1">Китай, провинция Гуандун, город Гуанчжоу</p>
                </div>
              </div>
            </div>

            {/* Legal Representative */}
            {/* <div className="border-b border-gray-100 pb-3">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-[#0b2249] mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Юридическое лицо / Генеральный директор</p>
                  <p className="text-gray-800 font-medium">{companyData.representativeRu}</p>
                  <p className="text-gray-500 text-sm">{companyData.legalRepresentative}</p>
                </div>
              </div>
            </div> */}

            {/* Registration Date */}
            <div className="border-b border-gray-100 pb-3">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#0b2249] mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Дата регистрации</p>
                  <p className="text-gray-800">{companyData.establishmentDate}</p>
                </div>
              </div>
            </div>

            {/* Capital */}
            <div className="border-b border-gray-100 pb-3">
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-[#0b2249] mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Уставный капитал</p>
                  <p className="text-gray-800 font-medium">{companyData.registeredCapital}</p>
                  <div className="flex gap-3 mt-1 text-sm text-gray-500">
                    <span>{companyData.capitalRub}</span>
                    <span>{companyData.capitalUsd}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Type */}
            <div className="border-b border-gray-100 pb-3">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-[#0b2249] mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Организационно-правовая форма</p>
                  <p className="text-gray-800">{companyData.companyType}</p>
                </div>
              </div>
            </div>

            {/* Business Scope */}
            <div className="border-b border-gray-100 pb-3">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-[#0b2249] mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Основной вид деятельности</p>
                  <p className="text-gray-800">{companyData.businessScope}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Полный перечень разрешенных видов деятельности доступен для проверки в госсистеме КНР
                  </p>
                </div>
              </div>
            </div>

            {/* Registration Authority */}
            <div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#0b2249] mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Регистрирующий орган</p>
                  <p className="text-gray-800">{companyData.registrationAuthority}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Section */}
        <div className="bg-gray-900 text-white rounded-2xl p-6 mb-8 reveal">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            Онлайн-проверка компании
          </h3>
          <p className="text-gray-300 text-sm mb-4">
            Вы можете проверить легальность компании через официальную систему国家企业信用信息公示系统
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <code className="bg-gray-800 px-3 py-2 rounded text-sm font-mono">
              Код для проверки: {companyData.code}
            </code>
            <a
              href={companyData.verificationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
            >
              Перейти на сайт проверки
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Bank Details Placeholder */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 reveal">
          <h3 className="text-lg font-semibold text-[#071123] mb-3 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Банковские реквизиты
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            Для получения актуальных банковских реквизитов для оплаты, пожалуйста, свяжитесь с нашим менеджером.
          </p>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">Банковские реквизиты предоставляются по запросу для юридических лиц и ИП</p>
          </div>
        </div>

        {/* Note */}
        <div className="text-center text-gray-500 text-xs reveal">
          <p>Информация актуальна на {new Date().toLocaleDateString('ru-RU')}</p>
          <p className="mt-1">© {new Date().getFullYear()} Northern Fox. Все права защищены.</p>
        </div>

      </div>
    </div>
  );
}