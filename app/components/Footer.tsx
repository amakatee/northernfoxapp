"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!root.current) return;
  
    const q = gsap.utils.selector(root);
  
    const ctx = gsap.context(() => {
      gsap.set(q(".reveal"), { opacity: 0, y: 40 });
  
      gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 90%",
          once: true,
        },
      }).to(q(".reveal"), {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1.1,
        ease: "power3.out",
      });
    }, root);
  
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={root}
      className="w-full rounded-t-3xl bg-[#071123] bg-[radial-gradient(circle_at_8%_18%,rgba(0,140,255,0.20)_0%,transparent_50%),radial-gradient(circle_at_82%_80%,rgba(0,140,255,0.21)_0%,transparent_63%)] text-white px-6 pt-16 pb-10"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Left - Company Info */}
        <div className="flex-1 space-y-6 reveal">
          <h3 className="text-2xl text-[#a7e8f6] font-bold">
            北狐 Northern Fox Co.
          </h3>

          <p className="text-[#a7e8f6]/80 text-[16.5px] leading-relaxed max-w-xs">
            7 лет доставки из Китая в Россию. <br />
            Прямые связи на складах Китая → оптимальные цены. <br />
            Минимум переговоров, максимум результата. <br />
            Ваша задача — получить груз. Решим всё остальное.
          </p>
        </div>

        {/* Right - Contact & Links */}
        <div className="flex-1 space-y-4 reveal">
          <h4 className="text-lg font-semibold text-[#a7e8f6]/90">
            Связаться с нами
          </h4>
          <p className="text-[#a7e8f6]/80 text-[15px] leading-relaxed">
            <Link href="mailto:logistics@beihunorthernfox.com" className="hover:text-white transition-colors">
              Email: logistics@beihunorthernfox.com
            </Link>
            <br />
            Адрес: A22, Building 2511, No. 37, Huanshi West Road, Liwan District,
            Guangzhou City
          </p>

          {/* Navigation Links */}
          <div className="pt-3">
            <h4 className="text-lg font-semibold text-[#a7e8f6]/90 mb-2">
              Информация
            </h4>
            <ul className="space-y-1.5 text-[#a7e8f6]/80 text-[14px]">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link href="/company-details" className="hover:text-white transition-colors">
                  Реквизиты
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Контакты
                </Link>
              </li>
              <li>
                <Link href="/customs" className="hover:text-white transition-colors">
                  Таможенное оформление
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="pt-3">
            <h4 className="text-sm font-semibold text-[#a7e8f6]/70 mb-2">
              Юридическая информация
            </h4>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[#a7e8f6]/60 text-[11px]">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-white transition-colors">
                  Политика cookies
                </Link>
              </li>
              <li>
                <Link href="/user-agreement" className="hover:text-white transition-colors">
                  Пользовательское соглашение
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-white/20 pt-6 text-center text-[#a7e8f6]/40 text-sm reveal">
        <p>© {new Date().getFullYear()} Northern Fox. Все права защищены.</p>
      </div>
    </footer>
  );
}