"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";

export default function AnalyticsLoader() {
  useEffect(() => {
    const loadAnalytics = () => {
      const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
      const YM_ID = process.env.NEXT_PUBLIC_YM_ID;

      if (!GA_ID || !YM_ID) return;

      // Google Analytics
      const gtagScript = document.createElement("script");
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      gtagScript.async = true;
      document.head.appendChild(gtagScript);

      const gtagInit = document.createElement("script");
      gtagInit.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `;
      document.head.appendChild(gtagInit);

      // Yandex Metrika
      const ymScript = document.createElement("script");
      ymScript.innerHTML = `
        (function(m,e,t,r,i,k,a){
          m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          k=e.createElement(t),a=e.getElementsByTagName(t)[0];
          k.async=1;k.src=r;a.parentNode.insertBefore(k,a)
        })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        ym(${YM_ID}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true });
      `;
      document.head.appendChild(ymScript);
    };

    if (Cookies.get("nf_cookie_consent") === "accepted") {
      loadAnalytics();
    }

    window.addEventListener("cookie-consent-granted", loadAnalytics);
  }, []);

  return null;
}