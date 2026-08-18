'use client';

import AutoScroll from 'embla-carousel-auto-scroll';
import useEmblaCarousel from 'embla-carousel-react';
import React from 'react';
import { TestimonialCard } from './TestimonialCard';
export type TestimonialItem = {
  name: string;
  role: string;
  location: string;
  rating: number;
  hskLevel: string;
  timeSpent: string;
  content: string;
  likes: number;
  shares: number;
  avatar: string;
};

interface TestimonialSliderProps {
  items: TestimonialItem[];
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ items }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
      dragFree: true,
      containScroll: false,
      breakpoints: {
        '(min-width: 1024px)': { slidesToScroll: 2 },
      },
    },
    [AutoScroll({ speed: 3, stopOnInteraction: false, stopOnMouseEnter: true })],
  );

  return (
    <div className="mx-auto overflow-hidden pb-10 pt-6 sm:pb-16 sm:pt-12 xl:w-[1173px] 3xl:w-[1440px]">
      <div className="px-4 md:px-4" ref={emblaRef}>
        <div className="flex">
          {items.map((item, index) => (
            <div key={index} className="min-w-0 flex-[0_0_105%] pr-4 sm:pr-10 md:flex-[0_0_80%] lg:flex-[0_0_60%]">
              <TestimonialCard {...item} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
