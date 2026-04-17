"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { gsap } from "gsap";
import { useRef, useCallback } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const consent = Cookies.get("nf_cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  // GSAP smooth entrance animation
  const animateIn = useCallback(() => {
    if (!bannerRef.current || !backdropRef.current) return;

    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" }
    );

    gsap.fromTo(
      bannerRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(animateIn, 100);
      return () => clearTimeout(timeout);
    }
  }, [visible, animateIn]);

  const acceptCookies = () => {
    Cookies.set("nf_cookie_consent", "accepted", { expires: 365 });
    closeBanner();
    window.dispatchEvent(new Event("cookie-consent-granted"));
  };

  const rejectCookies = () => {
    Cookies.set("nf_cookie_consent", "rejected", { expires: 365 });
    closeBanner();
  };

  const closeBanner = () => {
    if (!bannerRef.current || !backdropRef.current) {
      setVisible(false);
      return;
    }

    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    });

    gsap.to(bannerRef.current, {
      y: 80,
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => setVisible(false),
    });
  };

  if (!visible) return null;

  return (
    <>
      {/* Dark Backdrop with Blur */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-50"
        style={{ willChange: "opacity" }}
      />

      {/* Cookie Consent Card - Mobile First Design */}
      <div
        ref={bannerRef}
        className="fixed bottom-0 left-0 right-0 z-[60] px-3 sm:px-4 md:px-6"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="rounded-t-2xl sm:rounded-2xl bg-[#0a1328]/80 backdrop-blur-xl shadow-2xl overflow-hidden mx-auto max-w-full sm:max-w-xl md:max-w-2xl sm:mb-6">
          <div className="py-3 sm:py-4 px-4 sm:px-5 flex flex-col gap-2 sm:gap-3">
            {/* Header and Text */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5">
              <div className="space-y-1.5 sm:space-y-2 flex-1">
                <h3 className="text-white text-xs sm:text-sm font-semibold tracking-tight">
                  Мы используем cookies
                </h3>
                <p className="text-slate-300 text-[11px] sm:text-[12px] leading-relaxed">
                  Мы используем файлы cookies для аналитики и
                  улучшения вашего опыта на сайте. Продолжая использовать сайт,
                  вы соглашаетесь с нашей{" "}
                  <a
                    href="/privacy"
                    className="text-[#00e5ff] hover:text-[#00f0ff] underline underline-offset-4 transition-colors"
                  >
                    Политикой конфиденциальности
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Buttons - Smaller and responsive */}
            <div className="flex flex-row gap-2 sm:gap-3 mt-1 sm:mt-2">
              <button
                onClick={rejectCookies}
                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-medium py-1.5 sm:py-2 px-2 sm:px-3 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs transition-all duration-200 active:scale-[0.98]"
              >
                Отклонить
              </button>

              <button
                onClick={acceptCookies}
                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-medium py-1.5 sm:py-2 px-2 sm:px-3 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs transition-all duration-200 active:scale-[0.98]"
              >
                Принять все
              </button>
            </div>

            {/* Footer text */}
            <p className="text-center text-[5px] sm:text-xs text-slate-500 mt-1">
              Вы всегда можете изменить настройки в любое время
            </p>
          </div>
        </div>
      </div>
    </>
  );
}