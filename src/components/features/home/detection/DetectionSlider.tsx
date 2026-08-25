'use client';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';
import bookIcon from '@/assets/images/img-hocba-tienganh-optimized/icon-sach.webp';
import blockIcon from '@/assets/images/img-hocba-tienganh-optimized/img-ABC-Block.webp';
import rocketIcon from '@/assets/images/img-hocba-tienganh-optimized/icon-maybay.webp';
import chartIcon from '@/assets/images/img-hocba-tienganh-optimized/icon-growth.webp';
import telescopeIcon from '@/assets/images/img-hocba-tienganh-optimized/images-icon-chieu.webp';
import trophyIcon from '@/assets/images/img-hocba-tienganh-optimized/images-icon-cup.webp';


interface RoadmapData {
  id: string;
  score: string;
  title: string;
  subtitle: string;
  color: string;
  icon: string;
  details: string[];
}

interface IeltsRoadmapProps {
  data: RoadmapData[];
}

import type { ImageMetadata } from 'astro';

const getImgSrc = (img: ImageMetadata | string | any) => typeof img === 'string' ? img : img.src;

const IconMap: Record<string, string> = {
  BookOpen: getImgSrc(bookIcon),
  Box: getImgSrc(blockIcon),
  Rocket: getImgSrc(rocketIcon),
  TrendingUp: getImgSrc(chartIcon),
  Telescope: getImgSrc(telescopeIcon),
  Trophy: getImgSrc(trophyIcon),
};



export const IeltsRoadmap: React.FC<IeltsRoadmapProps> = ({ data }) => {
  // index của mốc lộ trình đang được click chọn (Mặc định: 0)
  const [activeIndex, setActiveIndex] = useState(0);
  // index của mốc lộ trình đang được hover, dùng để đồng bộ animation giữa icon và tab
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full">
      <div className="hidden md:block relative mb-16 md:mb-24 h-[200px] px-4 md:px-10">
        <div className="absolute inset-x-10 top-1/2 -translate-y-1/2 z-0">
          <svg className="w-full h-[160px]" preserveAspectRatio="none" viewBox="0 0 1000 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 50 L230 80 L410 20 L590 80 L760 25 L865 80 L970 30" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="relative z-10 flex md:justify-between items-center w-max md:w-full min-w-full gap-8 md:gap-0 h-full">
          {data.map((item, index) => {
            const isActive = activeIndex === index;
            
            const getTranslateYClass = (idx: number) => {
              if (idx === 0) return "md:translate-y-0";
              if (idx === 1 || idx === 3) return "md:translate-y-[48px]";
              if (idx === 2) return "md:-translate-y-[48px]";
              if (idx === 4) return "md:-translate-y-[40px] md:-translate-x-2";
              if (idx === 5) return "md:-translate-y-[32px] md:translate-x-6";
              return "";
            };

            return (
              <div 
                key={item.id}
                className={cn(
                  "relative flex flex-col items-center justify-center cursor-pointer w-24 md:w-32 transition-all duration-300 group",
                  isActive ? "scale-110 opacity-100 grayscale-0" : (hoveredIndex === index ? "scale-105 opacity-100 grayscale-0" : "scale-100 opacity-100 grayscale-[50%]"),
                  getTranslateYClass(index)
                )}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div 
                  className="absolute left-0 md:left-2 -top-2 md:-top-4 transition-all duration-300 z-20 flex items-center justify-center pointer-events-none"
                  style={(isActive || hoveredIndex === index) ? { filter: `drop-shadow(0 4px 6px ${item.color}40)` } : undefined}
                >
                  {/* Lớp viền trắng (Halo) - Luôn đặc để che đường kẻ */}
                  <span 
                    className="absolute font-black italic text-[24px] md:text-[32px] tracking-[-0.05em] leading-none select-none block text-[#F8FAFC]"
                    style={{ 
                      transform: 'rotate(-30deg)',
                      textShadow: '-2px -2px 0 #F8FAFC, 2px -2px 0 #F8FAFC, -2px 2px 0 #F8FAFC, 2px 2px 0 #F8FAFC, 0px 2px 0 #F8FAFC, 0px -2px 0 #F8FAFC, 2px 0px 0 #F8FAFC, -2px 0px 0 #F8FAFC'
                    }}
                  >
                    {item.score}
                  </span>
                  {/* Lớp chữ màu - Có hiệu ứng mờ khi không active */}
                  <span 
                    className={cn(
                      "relative font-black italic text-[24px] md:text-[32px] tracking-[-0.05em] leading-none select-none block transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"
                    )}
                    style={{ 
                      color: item.color,
                      transform: 'rotate(-30deg)'
                    }}
                  >
                    {item.score}
                  </span>
                </div>
                
                {/* các khối banner 3d */}
                <div className="relative w-20 h-20 md:w-[96px] md:h-[96px]">
                  {/* Shadow base (extrusion) */}
                  <div 
                    className={cn(
                      "absolute inset-0 rounded-[14px] md:rounded-[22px] transition-colors duration-300",
                      isActive ? "opacity-100" : "opacity-80"
                    )}
                    style={{ 
                      backgroundColor: item.color,
                      transform: 'translateY(12px) scaleY(0.577) rotate(45deg)'
                    }}
                  />
                  {/* Soft glow below */}
                  <div 
                    className={cn(
                      "absolute inset-0 rounded-[14px] md:rounded-[22px] transition-all duration-300",
                      isActive ? "opacity-70 blur-xl md:blur-[24px]" : "opacity-30 blur-lg md:blur-xl"
                    )}
                    style={{ 
                      backgroundColor: item.color,
                      transform: 'translateY(24px) scaleY(0.577) rotate(45deg)'
                    }}
                  />
                  {/* Top face */}
                  <div 
                    className="absolute inset-0 bg-white border-[2px] md:border-[3px] rounded-[14px] md:rounded-[22px] z-10"
                    style={{ 
                      borderColor: item.color,
                      transform: 'scaleY(0.577) rotate(45deg)'
                    }}
                  />
                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <img 
                      src={IconMap[item.icon]} 
                      alt={item.title} 
                      className="w-10 h-10 md:w-[44px] md:h-[44px] object-contain transition-all duration-300"
                      style={isActive ? { filter: `drop-shadow(0 1px 1px ${item.color}) contrast(1.2) saturate(1.1)` } : undefined}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Tabs */}
      <div className="mb-8">
        <div className="flex overflow-x-auto gap-4 md:gap-[41px] custom-scrollbar pb-4 px-4 md:px-4 md:flex-nowrap md:justify-center md:bg-white md:rounded-[24px] md:shadow-sm md:border md:border-gray-200 md:max-w-[1266px] md:mx-auto md:h-[161px] md:items-center" role="tablist">
          {data.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${item.id}`}
                id={`tab-${item.id}`}
                // Cập nhật state khi tương tác với tab (click, hover)
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "flex-shrink-0 flex items-center p-3 pr-6 md:flex-col md:justify-center md:px-2 md:py-4 min-w-[170px] md:min-w-0 md:flex-1 transition-all duration-300 outline-none rounded-xl md:rounded-none",
                  isActive ? "bg-[#21409A] md:bg-transparent shadow-md md:shadow-none" : "bg-[#5E87F9] md:bg-transparent",
                  index !== data.length - 1 && "md:border-r md:border-gray-100"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 md:hidden",
                  isActive ? "bg-white/20" : "bg-white/30"
                )}>
                  {index + 1}
                </div>
                <div className="flex flex-col items-center text-center w-full px-1 md:px-2 lg:px-4">
                  <span 
                    className={cn(
                      "text-[14px] md:text-[22px] font-bold uppercase transition-all duration-300 mb-0.5 md:mb-1 md:leading-[24px] whitespace-nowrap text-white md:text-[var(--active-color)] opacity-100"
                    )}
                    style={{ '--active-color': item.color } as React.CSSProperties}
                  >
                    {item.title}
                  </span>
                  <span 
                    className={cn(
                      "text-[12px] md:text-[13px] font-medium mb-0 md:mb-3 whitespace-nowrap transition-all duration-300 text-white/90 md:text-[#555555] opacity-100"
                    )}
                  >
                    {item.subtitle}
                  </span>
                  
                  {/* Progress(hiển thị trên laptop) */}
                  <div className="hidden md:flex w-full justify-start">
                    <div 
                      className={cn(
                        "h-1.5 lg:h-2 rounded-full transition-all duration-500 ease-out",
                        // (từ trái sang phải)
                        (isActive || hoveredIndex === index) ? "w-full" : "w-10 md:w-12"
                      )}
                      style={{ backgroundColor: item.color }}
                    ></div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Content Box */}
      <div className="bg-[#0B328F] rounded-[24px] md:rounded-[32px] p-8 md:p-12 relative overflow-hidden transition-all duration-500 min-h-[300px]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#06B6D4]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 flex flex-col items-start text-left w-full px-2">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4 md:mb-8 w-full pb-2 md:pb-0">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-[#0B328F]">
                  <img src={getImgSrc(bookIcon)} alt="book" className="w-5 h-5 md:w-8 md:h-8" />
                </div>
                
                {/* Text Container */}
                <div className="flex flex-col gap-1 md:gap-2">
                  <h3 className="text-white text-[18px] md:text-[30px] font-semibold md:leading-[24px] text-center mb-3">Chi tiết khóa học</h3>
                  {/* Blue line - Desktop only (under text) */}
                  <div className="hidden md:block w-20 h-1.5 bg-[#1C4EE5] rounded-full ml-2"></div>
                </div>
              </div>
              {/* Blue line - Mobile only (spanning under icon and text) */}
              <div className="md:hidden block w-20 h-1 bg-[#1C4EE5] rounded-full mt-2 ml-1"></div>
            </div>
          </div>

          <div className="relative w-full mb-0 md:mb-10 lg:pr-10">
            {data.map((stage, index) => {
              const isActive = activeIndex === index;
              return (
                <div 
                  key={stage.id}
                  id={`panel-${stage.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${stage.id}`}
                  className={cn("w-full", isActive ? "block" : "hidden")}
                >
                  
                  <h4 className="sr-only">Chi tiết lộ trình: {stage.title} - {stage.subtitle}</h4>
                  <ul className="md:ml-6 space-y-4 text-white/90 text-[15px] md:text-[20px] font-normal md:leading-[47px]">
                    {stage.details.map((detail, idx) => (
                      <li key={idx} className={cn("flex items-start gap-2.5", detail.startsWith('-') && "ml-[14px] md:ml-[15px]")}>
                        {!detail.startsWith('-') && (
                          <div className="mt-[9px] md:mt-[21px] w-1 h-1 md:w-[5px] md:h-[5px] rounded-full bg-white/60 flex-shrink-0" aria-hidden="true"></div>
                        )}
                        <span className="text-left block">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            
            <div className="absolute -bottom-0 md:-bottom-4 -right-6 md:right-26 lg:right-[8%] flex items-end gap-1 pointer-events-none">
              <div className="text-white/20">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              </div>
              <div className="text-white/20 mb-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* (laptop & mobil) */}
      <div className="mt-8 flex justify-center w-full">
        <a
          href="/khoa-hoc-hsk"
          className="inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-full bg-[#F97316] px-8 py-3.5 text-[15px] font-bold text-white uppercase"
        >
          XEM CHI TIẾT KHÓA HỌC
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </a>
      </div>
      
    </div>
  );
};
