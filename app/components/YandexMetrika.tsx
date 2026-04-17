// components/YandexMetrika.tsx
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    ym: (counterId: number, action: string, ...args: unknown[]) => void;
  }
}

interface YandexMetrikaProps {
  counterId: number;
}

export default function YandexMetrika({ counterId }: YandexMetrikaProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialized = useRef(false);

  useEffect(() => {
    // Инициализация после загрузки скрипта
    if (typeof window !== 'undefined' && window.ym && !isInitialized.current) {
      window.ym(counterId, 'init', {
        ssr: true,
        webvisor: true,
        clickmap: true,
        ecommerce: "dataLayer",
        referrer: document.referrer,
        url: location.href,
        accurateTrackBounce: true,
        trackLinks: true
      });
      isInitialized.current = true;
    }
  }, [counterId]);

  useEffect(() => {
    // Отслеживание виртуальных просмотров страниц в SPA
    if (typeof window !== 'undefined' && window.ym && isInitialized.current) {
      const url = window.location.href;
      window.ym(counterId, 'hit', url);
    }
  }, [pathname, searchParams, counterId]);

  return (
    <>
      <Script
        id={`yandex-metrika-${counterId}`}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {
                  if (document.scripts[j].src === r) { return; }
                }
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],
                k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script',
              'https://mc.yandex.ru/metrika/tag.js?id=${counterId}', 'ym');
          `,
        }}
      />
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${counterId}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}