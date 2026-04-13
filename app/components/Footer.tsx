"use client";

import React, { useEffect, useRef } from "react";
import { Send, Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  // WeChat icon
  const WechatIcon = ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#a7e8f6">
      <path d="M9.5 4C5.36 4 2 6.69 2 10c0 1.7.9 3.24 2.43 4.38L4 18l3.3-1.7c.36.06.73.1 1.1.1 4.14 0 7.5-2.69 7.5-6S13.64 4 9.5 4zm-2 5a1 1 0 110 2 1 1 0 010-2zm4 0a1 1 0 110 2 1 1 0 010-2zM14.5 11c-3.03 0-5.5 1.94-5.5 4.33 0 .25.03.5.08.74C9.9 17.3 11.53 18 13.5 18c.37 0 .74-.04 1.1-.1L18 19l-.43-2.3C19.1 15.57 20 14.04 20 12.33 20 11.05 17.76 11 14.5 11zm-1.5 2.5a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2z"/>
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
          ".footer-icon",
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
          <h3 className="text-2xl text-[#a7e8f6] font-bold">
            北狐 Northern Fox Co.
          </h3>

          <p className="text-[#a7e8f6]/80 text-[16.5px] leading-relaxed max-w-xs">
            7 лет доставки из Китая в Россию. <br />
            Прямые связи на складах Китая → оптимальные цены. <br />
            Минимум переговоров, максимум результата. <br />
            Ваша задача — получить груз. Решим всё остальное.
          </p>

          {/* Social */}
          {/* <div className="flex gap-4 pt-2 footer-social">
            <a
              href="https://t.me/yourtelegram"
              target="_blank"
              className="footer-icon w-11 h-11 flex items-center justify-center rounded-full border border-[#a7e8f6]/30 text-[#a7e8f6] hover:bg-white/10 transition"
            >
              <Send size={20} />
            </a>

            <a
              href="#"
              className="footer-icon w-11 h-11 flex items-center justify-center rounded-full border border-[#a7e8f6]/30 hover:bg-white/10 transition"
            >
              <WechatIcon />
            </a>

            <a
              href="mailto:info@northernfox-logistics.com"
              className="footer-icon w-11 h-11 flex items-center justify-center rounded-full border border-[#a7e8f6]/30 text-[#a7e8f6] hover:bg-white/10 transition"
            >
              <Mail size={20} />
            </a>
          </div> */}
        </div>

        {/* Right */}
        <div className="flex-1 space-y-4 footer-right">
          <h4 className="text-lg font-semibold text-[#a7e8f6]/90">
            Связаться с нами
          </h4>
          <p className="text-[#a7e8f6]/80 text-[15px] leading-relaxed">
            Email: beihunorthernfox.yandex.ru <br />
            Адрес: Guangzhou, Tian he qu <br />
            
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
