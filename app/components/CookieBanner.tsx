"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("nf_cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const acceptCookies = () => {
    Cookies.set("nf_cookie_consent", "accepted", { expires: 365 });
    setVisible(false);

    // Включаем аналитику только после согласия
    window.dispatchEvent(new Event("cookie-consent-granted"));
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#0b2249] text-white p-4 z-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          Мы используем cookies для аналитики и улучшения сервиса. Продолжая
          использовать сайт, вы соглашаетесь с этим.
        </p>
        <button
          onClick={acceptCookies}
          className="bg-white text-[#0b2249] px-4 py-2 rounded-full font-medium"
        >
          Принять
        </button>
      </div>
    </div>
  );
}