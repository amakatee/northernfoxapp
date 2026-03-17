"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import AnimatedBorder from "../helpers/AnimatedBorder";
import ProblemSolutionCard from "../helpers/SolutionCard"

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
    // {
    //   question: "Как ввозить товары без риска для бизнеса?",
    //   answer: "Полное юридическое сопровождение без претензий от органов.",
    // },
    {
      question: "Хотите вернуть НДС 20–22%?",
      answer: "Законная экономия: возврат НДС из бюджета или его зачет.",
    },
    // {
    //   question: "Нужно снизить себестоимость товаров?",
    //   answer: "Снижайте стоимость за счет грамотных налоговых решений.",
    // },
  ];

// ---------- Component ----------
export default function Home() {
  const rowsRef = useRef<HTMLDivElement[]>([]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !rowsRef.current.includes(el)) {
      rowsRef.current.push(el);
    }
  };

  useEffect(() => {
    if (rowsRef.current.length === 0) return;

    gsap.set(rowsRef.current, { opacity: 0, y: 40 });

    gsap.to(rowsRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.3,
    });
  }, []);

  return (
    <main
    
     className="min-h-screen   pt-20 px-4 flex flex-col items-center">
        <div className="text-center w-full px-2 pb-25 ">
          <h1 
            className="text-3xl text-white  md:text-4xl font-light text-start leading-8 tracking-wide mb-4"
          >
            Комплексные решения для вашего бизнеса
          </h1>
          <p 
            className="text-white/85 text-[.9rem] max-w-2xl text-start font-light tracking-wide leading-5 mx-auto"
          >
            Полный спектр услуг по логистике, таможенному оформлению и налоговой оптимизации
          </p>
        </div>
      <div className="max-w-5xl w-full">
        {/* Grid of rows – each row contains two cells (question & answer) */}
        <div className="flex flex-col gap-3 md:gap-6">
          {qaItems.map((item, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="grid grid-cols-2 gap-4 md:gap-6"
              style={{ minHeight: "25vh" }} // each row is ~30vh tall
            >
              {/* Left cell – question */}
              {/* <div className="bg-[#004eda]/25 text-white  rounded-xl shadow-xl text-base p-4 flex items-star justify-center text-start font-normal leading-[1.2]  md:text-2xl">
                {item.question}
              </div> */}
              <ProblemSolutionCard 
              content={item.question} 
              author = ""
              mode='question' />
  
              <ProblemSolutionCard 
              content={item.answer} 
              author = "北狐 Northern Fox"
              mode='solution' />





            </div>
          ))}
        </div>

      
      </div>
    </main>
  );
}

{/*               
              <AnimatedBorder
  width={155}
  height={200}
  borderWidth={.2}
  color="#004eda"
  glowColor="rgba(0,78,218, 0.06)"  // полупрозрачный синий
  topBottomGlowBlur={20}              // большое размытие сверху/снизу
  leftRightGlowBlur={20}              // умеренное размытие по бокам
  topBottomGlowSpread={1}             // небольшое распространение
  leftRightGlowSpread={1}
  duration={8.5}
  segmentLength={280}
  borderRadius={12}
>
  <p className="text-white">{item.answer}</p>
</AnimatedBorder>
       */}