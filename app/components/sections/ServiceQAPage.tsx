"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProblemSolutionCard from "../helpers/SolutionCard";

gsap.registerPlugin(ScrollTrigger);

// ---------- Types ----------
interface QAItem {
  question: string;
  answer: string;
}

// ---------- Data ----------
const qaItems: QAItem[] = [
  {
    question: "Нужен надёжный представитель в Китае?",
    answer: "Ваш законный агент с правом подписи и контролем на месте.",
  },
  {
    question: "Хотите экспортировать с нулевой ставкой НДС?",
    answer: "Легально оптимизируйте налоги и возвращайте НДС при экспорте.",
  },
  {
    question: "Боитесь ошибок в таможенных документах?",
    answer: "Мы подготовим все документы: от инвойсов до сертификатов.",
  },
  {
    question: "Хотите вернуть НДС 20–22%?",
    answer: "Законная экономия: возврат НДС из бюджета или его зачет.",
  },
];

export default function Home() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLDivElement>(".qa-row");

      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { y: 40 },
          {
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={sectionRef}
      className="min-h-screen pt-30 px-4 flex flex-col items-center"
    >
      <div className="max-w-5xl w-full px-3">
        <div className="flex flex-col gap-3 md:gap-6">
          {qaItems.map((item, index) => (
            <div
              key={index}
              className="qa-row grid grid-cols-2 gap-4 md:gap-6"
              style={{ minHeight: "25vh" }}
            >
              <ProblemSolutionCard
                content={item.question}
                author=""
                mode="question"
              />
              <ProblemSolutionCard
                content={item.answer}
                author="北狐 Northern Fox"
                mode="solution"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
