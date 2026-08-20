'use client';

import { useEffect, useState } from 'react';
import { VectorArrow, VectorArrowSwapped } from './icons';

interface AnimatedArrowProps {
  toColor: string;
  fromColor: string;
  stopOffset?: string;
  className?: string;
}

export default function AnimatedArrow({ toColor, fromColor, stopOffset = "1", className = '' }: AnimatedArrowProps) {
  const [showFirst, setShowFirst] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirst((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <VectorArrow
        toColor={toColor}
        fromColor={fromColor}
        stopOffset={stopOffset}
        className={`${className} transition-opacity duration-500 ${showFirst ? 'opacity-100' : 'opacity-0'}`}
      />
      <VectorArrowSwapped
        toColor={fromColor}
        fromColor={toColor}
        stopOffset={(1 - parseFloat(stopOffset)).toString()}
        className={`${className} transition-opacity duration-500 ${showFirst ? 'opacity-0' : 'opacity-100'}`}
      />
    </>
  );
}
