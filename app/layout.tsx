import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import localFont from "next/font/local";
import AIWidgetIcon from "./components/helpers/AIWidgetIcon";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import { ModalProvider } from "./components/providers/ModalProvider";
import AnalyticsLoader from "./components/AnalyticLoader";
import CookieBanner from "./components/CookieBanner";
import YandexMetrikaWrapper from './components/YandexMetrikaWrapper';

import "./globals.css";


export const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const helveticaNeue = localFont({
  src: [
    { path: "/fonts/HelveticaNeue-Light.otf", weight: "200", style: "light" },
    { path: "/fonts/HelveticaNeue-Regular.otf", weight: "400", style: "normal" },
    { path: "/fonts/HelveticaNeue-Medium.otf", weight: "600", style: "medium" },
    { path: "/fonts/HelveticaNeue-Bold.otf", weight: "800", style: "medium" },
  ],
  display: "swap",
  variable: "--font-helvetica-neue",
});

/* ================= SEO Metadata ================= */

export const metadata: Metadata = {
  metadataBase: new URL("https://beihunorthernfox.com"),

  title: {
    default: "Northern Fox — Карго и доставка грузов из Китая в Россию",
    template: "%s | Northern Fox",
  },

  description:
    "Northern Fox — карго доставка грузов из Китая в Россию. Таможенное оформление, поиск поставщиков, проверка фабрик и логистика под ключ.",

  keywords: [
    "карго Китай",
    "карго доставка из Китая",
    "груз из Китая",
    "доставка груза Китай Россия",
    "таможенное оформление Китай",
    "поиск поставщиков Китай",
    "проверка поставщика Китай",
    "логистика Китай Россия",
  ],

  openGraph: {
    type: "website",
    url: "https://beihunorthernfox.com",
    title: "Northern Fox — Карго доставка из Китая",
    description:
      "Карго, таможня, поиск поставщиков и доставка грузов из Китая в Россию.",
    siteName: "Northern Fox",
    locale: "ru_RU",
    images: [
      {
        url: "/images/fox.png",
        width: 1200,
        height: 630,
        alt: "Northern Fox Cargo",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/images/fox.png",
  },
};

/* ================= Layout ================= */

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className="bg-white">
      <body className={`${manrope.className} ${geistMono.variable} antialiased`}>
        {/* Schema.org для Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Epolet Logistics",
              url: "https://northernfox.ru",
              logo: "https://northernfox.ru",
              description:
                "Поставщик логистических услуг: грузоперевозки, складирование, управление цепями поставок.",
            }),
          }}
        />

        <ModalProvider>
          <Navbar
            logoText="Northern Fox"
            showSignIn={true}
            showDemo={true}
            demoHref="/contact"
          />
          <AIWidgetIcon />
          <main className="flex-grow" role="main">
            {children}
          </main>
          <Footer />
        </ModalProvider>
        <CookieBanner />
        <AnalyticsLoader />
        <YandexMetrikaWrapper  counterId={108598299} />
      </body>
     
    </html>
  );
}