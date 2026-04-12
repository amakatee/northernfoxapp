export function StepShape({ step, shape }: { step: number; shape: string }) {
    const base =
      "flex items-center justify-center w-12 h-12 text-white text-xl font-semibold shadow-[0_0_20px_#6d4aff55]";
  
    switch (shape) {
      case "square":
        return <div className={`${base} bg-[#6d4aff] rounded-md`}>{step}</div>;
  
      case "diamond":
        return (
          <div className={`${base} bg-[#6d4aff] rotate-45`}>
            <span className="-rotate-45">{step}</span>
          </div>
        );
  
      case "hex":
        return (
          <div className={`${base} bg-[#6d4aff] clip-hex`}>
            {step}
          </div>
        );
  
      default:
        return <div className={`${base} bg-[#6d4aff] rounded-full`}>{step}</div>;
    }
  }
  