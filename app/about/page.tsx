"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowLeft, Truck, Shield, Clock, Globe, Users, Award, Package, Building2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
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

  const stats = [
    { icon: Clock, value: "7+", label: "Лет на рынке" },
    { icon: Package, value: "5000+", label: "Доставленных грузов" },
    { icon: Users, value: "98%", label: "Довольных клиентов" },
    { icon: Globe, value: "15+", label: "Стран-партнеров" },
  ];

  return (
    <div ref={root} className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#071123] transition-colors mb-8 group reveal"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Вернуться на главную
        </Link>

        <div className="text-center mb-10 reveal">
          <h1 className="text-3xl md:text-4xl font-bold text-[#071123] mb-3">О компании Northern Fox</h1>
          <p className="text-gray-600 text-lg">Ваш надежный партнер по доставке грузов из Китая в Россию</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 reveal">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 text-center shadow-sm">
              <stat.icon className="w-8 h-8 text-[#0b2249] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#071123]">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 reveal">
          <h2 className="text-xl font-semibold text-[#071123] mb-3 flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Кто мы
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Northern Fox — это профессиональная логистическая компания, специализирующаяся на доставке грузов из Китая в Россию. 
            Мы работаем с 2017 года и за это время помогли сотням предпринимателей и компаний наладить стабильные поставки товаров.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 reveal">
          <h2 className="text-xl font-semibold text-[#071123] mb-3 flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Наша миссия
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Сделать доставку из Китая простой, прозрачной и доступной для каждого бизнеса. 
            Мы берем на себя все заботы по логистике, таможенному оформлению и контролю качества, 
            чтобы вы могли сосредоточиться на развитии своего дела.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 reveal">
          <h2 className="text-xl font-semibold text-[#071123] mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Почему нам доверяют
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-[#0b2249] rounded-full mt-2"></div>
              <p className="text-gray-700">Прямые контракты со складами в Китае → лучшие цены</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-[#0b2249] rounded-full mt-2"></div>
              <p className="text-gray-700">Полное юридическое сопровождение и таможенное оформление</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-[#0b2249] rounded-full mt-2"></div>
              <p className="text-gray-700">Личный менеджер для каждого клиента</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-[#0b2249] rounded-full mt-2"></div>
              <p className="text-gray-700">Прозрачная система отслеживания грузов</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#071123] to-[#0b2249] rounded-2xl p-8 text-center text-white reveal">
          <h3 className="text-xl font-semibold mb-2">Готовы начать сотрудничество?</h3>
          <p className="text-white/80 mb-4">Свяжитесь с нами для бесплатной консультации</p>
          <Link
            href="/contact"
            className="inline-block bg-white text-[#071123] px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            Связаться с нами
          </Link>
        </div>

      </div>
    </div>
  );
}