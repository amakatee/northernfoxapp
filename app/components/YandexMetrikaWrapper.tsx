// components/YandexMetrikaWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

// Динамический импорт с отключением SSR
const YandexMetrika = dynamic(
  () => import('./YandexMetrika'),
  { ssr: false }
);

interface YandexMetrikaWrapperProps {
  counterId: number;
}

export default function YandexMetrikaWrapper({ counterId }: YandexMetrikaWrapperProps) {
  return <YandexMetrika counterId={counterId} />;
}