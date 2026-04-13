"use client";

import React, { useEffect, useRef } from "react";
import { Send, Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  const WechatIcon = ({ size = 18 }: { size?: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M8.5 3C4.36 3 1 5.69 1 9c0 1.77 1.02 3.38 2.73 4.55L3 17l3.06-1.53c.47.08.96.13 1.44.13 4.14 0 7.5-2.69 7.5-6S12.64 3 8.5 3zm-2 5.25a1 1 0 110 2 1 1 0 010-2zm4 0a1 1 0 110 2 1 1 0 010-2zm8.5 1.75c0-2.76-2.91-5-6.5-5-.34 0-.67.02-1 .06 2.1 1.2 3.5 3.16 3.5 5.44 0 3.31-3.36 6-7.5 6-.17 0-.33 0-.5-.02C7.97 18.34 10.33 20 13.5 20c.48 0 .97-.05 1.44-.13L18 21l-.73-3.45C18.98 16.38 20 14.77 20 13c0-.34-.03-.67-.1-1zM12 12.25a1 1 0 110 2 1 1 0 010-2zm4 0a1 1 0 110 2 1 1 0 010-2z" />
    </svg>
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
      });

      tl
        .from(footerRef.current, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        })
        .from(
          ".footer-left",
          {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .from(
          ".footer-right",
          {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.85"
        )
        .from(
          ".footer-social a",
          {
            y: 20,
            opacity: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.7"
        )
        .from(
          ".footer-bottom",
          {
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.6"
        );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-full rounded-t-3xl bg-[#071123] bg-[radial-gradient(circle_at_8%_18%,rgba(0,140,255,0.20)_0%,transparent_50%),radial-gradient(circle_at_82%_80%,rgba(0,140,255,0.21)_0%,transparent_63%)] text-white px-6 pt-16 pb-10"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Left */}
        <div className="flex-1 space-y-6 footer-left">
          <h3 className="text-2xl text-[#a7e8f6] font-bold tracking-normal">
            北狐 Northern Fox Co.
          </h3>

          <p className="text-[#a7e8f6]/80 text-[17.5px] leading-relaxed max-w-xs">
            7 лет доставки из Китая в Россию. <br />
            Прямые связи на складах Китая → оптимальные цены. <br />
            Минимум переговоров, максимум результата. <br />
            Ваша задача — получить груз. Решим всё остальное.
          </p>

          {/* Social */}
          <div className="flex gap-4 pt-2 footer-social">
            <a
              href="https://t.me/yourtelegram"
              target="_blank"
              className="w-10 h-10 flex text-[#a7e8f6] items-center justify-center rounded-full border border-[#a7e8f6]/20 hover:border-white hover:bg-white/10 transition"
            >
              <Send size={18} />
            </a>

            <a
              href="#"
              className="w-10 h-10 text-[#a7e8f6] flex items-center justify-center rounded-full border border-white/20 hover:border-white hover:bg-white/10 transition"
            >
              <WechatIcon />
            </a>

            <a
              href="mailto:info@northernfox-logistics.com"
              className="w-10 h-10 text-[#a7e8f6] flex items-center justify-center rounded-full border border-white/20 hover:border-white hover:bg-white/10 transition"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 space-y-4 footer-right">
          <h4 className="text-lg font-semibold text-[#a7e8f6]/90">
            Связаться с нами
          </h4>
          <p className="text-[#a7e8f6]/80 text-[15px] leading-relaxed">
            Email: beihunorthernfox.yandex.ru <br />
            Адрес: Guangzhou, Tian he qu
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-white/20 pt-6 text-center text-[#a7e8f6]/40 text-sm footer-bottom">
        <p>© {new Date().getFullYear()} Northern Fox. Все права защищены.</p>
      </div>
    </footer>
  );
}