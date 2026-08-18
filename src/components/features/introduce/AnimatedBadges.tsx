'use client';

import { useEffect, useState } from 'react';
import { Subtract } from '../../common/icons';

const badges = [{ text: 'Học thật' }, { text: 'Thi thật' }, { text: 'Ứng dụng thật' }];

export default function AnimatedBadges() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % badges.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-0 flex items-center gap-4 md:mt-6 md:gap-16">
      {badges.map((badge, index) => (
        <div
          key={index}
          className={`flex h-6 min-w-20 items-center gap-2 text-nowrap rounded-sm bg-white p-0 px-1 text-[10px] font-black uppercase text-primary transition-transform duration-500 md:h-[54px] md:min-w-48 md:rounded-xl md:px-3 md:text-2xl ${
            activeIndex === index ? 'scale-110 md:scale-125' : 'scale-100 opacity-50'
          }`}
        >
          <Subtract className="size-4 md:size-6" />
          {badge.text}
        </div>
      ))}
    </div>
  );
}
