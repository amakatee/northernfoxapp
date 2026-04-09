import React from 'react';

interface CardProps {
  text: string;
  top: string;
  zIndex: number;
}

const DeliveryCard = React.forwardRef<HTMLDivElement, CardProps>(({ text, top, zIndex }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        top,
        zIndex,
      }}
      className="absolute w-full max-w-2xl mx-auto bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 border-t border-2 rounded-2xl shadow-lg p-8 h-56"
    >
      <h2 className="text-xl font-semibold text-white">{text}</h2>
    </div>
  );
});

export default DeliveryCard;