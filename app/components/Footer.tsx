"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-reveal",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: root.current,
            start: "top 92%",
            once: true,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={root}
      className="w-full bg-[radial-gradient(circle_at_10%_10%,rgba(0,140,255,0.12),transparent_40%)] rounded-t-3xl bg-[#071123] text-white px-6 pt-20 pb-12"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-14">
        {/* Company */}
        <div className="space-y-6 footer-reveal">
          <h3 className="text-2xl font-semibold text-[#a7e8f6]">
            北狐 Northern Fox Co.
          </h3>

          <p className="text-[#a7e8f6]/80 text-[15.5px] leading-relaxed max-w-sm">
            Команда с 7+ лет опыта доставки из Китая в Россию.
            <br />
            Официально зарегистрированы в 2024 году для вашей безопасности.
            <br />
            Прямые связи на складах Китая — оптимальные цены.
            <br />
            Минимум переговоров, максимум результата.
          </p>

          <div className="text-[#a7e8f6]/50 text-[11px] leading-relaxed border-t border-white/10 pt-4 space-y-1">
            <p>© 广州北赋贸易有限公司 (Guangzhou Beifu Trading Co., Ltd.)</p>
            <p>Unified Social Credit Code: 91440100MA5D0U9UX7</p>
            <p>
              Китай, г. Гуанчжоу, р-н Ливань, ул. Хуаншиси, д. 37, офис A2
            </p>
            <a
              href="http://www.gsxt.gov.cn"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              Проверить компанию в реестре КНР →
            </a>
          </div>
        </div>

        {/* Contacts */}
        <div className="space-y-6 footer-reveal">
          <h4 className="text-lg font-medium text-[#a7e8f6]/90">
            Связаться с нами
          </h4>

          <div className="text-[#a7e8f6]/80 text-[15px] leading-relaxed space-y-2">
            <Link
              href="mailto:logistics@beihunorthernfox.com"
              className="block hover:text-white transition-colors"
            >
              logistics@beihunorthernfox.com
            </Link>

            <p>
              2511, Office A2, No.37 Huanshi West Road,
              <br />
              Liwan District, Guangzhou
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-[#a7e8f6]/70 mb-2">
              Информация
            </h4>
            <ul className="space-y-1.5 text-[#a7e8f6]/70 text-[14px]">
              <li>
                <Link href="/about" className="hover:text-white">
                  О компании
                </Link>
              </li>
              <li>
                <Link href="/company-details" className="hover:text-white">
                  Реквизиты
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Контакты
                </Link>
              </li>
              <li>
                <Link href="/customs" className="hover:text-white">
                  Таможенное оформление
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="space-y-6 footer-reveal">
          <h4 className="text-sm font-medium text-[#a7e8f6]/70">
            Юридическая информация
          </h4>

          <ul className="space-y-2 text-[#a7e8f6]/60 text-[13px]">
            <li>
              <Link href="/privacy-policy" className="hover:text-white">
                Политика конфиденциальности
              </Link>
            </li>
            <li>
              <Link href="/cookie-policy" className="hover:text-white">
                Политика cookies
              </Link>
            </li>
            <li>
              <Link href="/user-agreement" className="hover:text-white">
                Пользовательское соглашение
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-16 border-t border-white/10 pt-6 text-center text-[#a7e8f6]/40 text-sm footer-reveal">
        © {new Date().getFullYear()} Northern Fox. Все права защищены.
      </div>
    </footer>
  );
}