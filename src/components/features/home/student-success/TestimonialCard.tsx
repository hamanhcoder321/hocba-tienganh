'use client';

import { HeartIcon, LikeIcon, ShareIcon } from '@/components/common/icons';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import React from 'react';

interface TestimonialCardProps {
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
  index?: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  location,
  rating,
  hskLevel,
  timeSpent,
  content,
  likes,
  shares,
  avatar,
  index = 0,
}) => {
  return (
    <div className="relative flex h-full select-none flex-col rounded-[24px] border-2 border-[#FFDFDF] bg-white p-6 shadow-[12px_12px_28px_0px_#FFBEBE80] md:p-8">
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full md:h-20 md:w-20">
            <img width={150} height={150} src={avatar} alt={name} className="h-full w-full scale-[1.25] object-cover object-center" />
          </div>
          <div>
            <h3 className="text-lg font-black uppercase leading-tight text-[#B11702] md:text-[32px]">{name}</h3>
            <p className="my-2 text-sm font-bold text-[#373737] md:text-[24px]">
              {role}, {location}
            </p>
            <div className="mt-1 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={cn(i < rating ? 'fill-[#F3C650] text-[#F3C650]' : 'text-gray-300')}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex h-[45px] w-[84px] flex-shrink-0 flex-col items-center justify-center rounded-[86px] bg-[#017D31] text-white shadow-md md:h-[86px] md:w-[159px]">
          <span className="text-[17px] font-black uppercase md:text-[32px] md:leading-10">{hskLevel}</span>
          <span className="text-[8px] md:text-base">{timeSpent}</span>
        </div>
      </div>

      <div className="flex-grow">
        <p className="mb-8 text-justify text-sm font-medium italic leading-relaxed text-[#504E4E] md:text-base">
          "{content}"
        </p>
      </div>
      <div className="flex items-center gap-6 border-t border-gray-100 pt-6">
        <div className="flex h-[33px] items-center gap-7">
          <div className="flex items-center gap-3">
            {index % 2 === 0 ? (
              <>
                <HeartIcon />
                <LikeIcon />
              </>
            ) : (
              <>
                <LikeIcon />
                <HeartIcon />
              </>
            )}
            <span className="text-xs font-bold text-[#373737] md:text-sm">{likes}</span>
          </div>
          <div className="flex items-center gap-3">
            <ShareIcon />
            <span className="text-xs font-bold text-[#373737] md:text-sm">{shares}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
