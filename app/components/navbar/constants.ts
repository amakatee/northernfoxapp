// components/navbar/constants.ts
import { NavItem } from "./types";

export const DEFAULT_NAV_ITEMS: NavItem[] = [
  { 
    label: "Поиск поставщиков", 
    href: "/suppliers",
    
  },
  { 
    label: "Страхование груза", 
    href: "/insurance",
    
  },
  { 
    label: "Таможенное оформление", 
    href: "/customs",
    
  },
  
];

export const SCROLL_THRESHOLD = 20;
export const MOBILE_BREAKPOINT = 768;