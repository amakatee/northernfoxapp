// hooks/useYandexMetrika.ts
import { useCallback } from 'react';

declare global {
  interface Window {
    ym: (counterId: number, action: string, ...args: unknown[]) => void;
  }
}

interface ReachGoalParams {
  [key: string]: string | number | boolean;
}

interface EcommerceItem {
  id: string;
  name: string;
  price?: number;
  quantity?: number;
  brand?: string;
  category?: string;
}

interface EcommerceOrder {
  id: string;
  revenue?: number;
  items?: EcommerceItem[];
}

export function useYandexMetrika(counterId: number) {
  const sendGoal = useCallback(
    (target: string, params?: ReachGoalParams) => {
      if (typeof window !== 'undefined' && window.ym) {
        if (params) {
          window.ym(counterId, 'reachGoal', target, params);
        } else {
          window.ym(counterId, 'reachGoal', target);
        }
      }
    },
    [counterId]
  );

  const sendEcommerce = useCallback(
    (action: 'add' | 'remove' | 'purchase', data: EcommerceOrder) => {
      if (typeof window !== 'undefined' && window.ym) {
        window.ym(counterId, 'ecommerce', action, data);
      }
    },
    [counterId]
  );

  const getUserID = useCallback(
    (callback: (clientId: string) => void) => {
      if (typeof window !== 'undefined' && window.ym) {
        window.ym(counterId, 'getClientID', callback);
      }
    },
    [counterId]
  );

  return { sendGoal, sendEcommerce, getUserID };
}