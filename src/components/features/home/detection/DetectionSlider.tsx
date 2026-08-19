'use client';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';
import bookIcon from '@/assets/images/img-hocba-tienganh/icon-sach.png';
import blockIcon from '@/assets/images/img-hocba-tienganh/img-ABC-Block.png';
import rocketIcon from '@/assets/images/img-hocba-tienganh/icon-maybay.png';
import chartIcon from '@/assets/images/img-hocba-tienganh/icon-growth.png';
import telescopeIcon from '@/assets/images/img-hocba-tienganh/images-icon-chieu.png';
import trophyIcon from '@/assets/images/img-hocba-tienganh/images-icon-cup.png';
import score3 from '@/assets/images/img-hocba-tienganh/3.0+.png';
import score4 from '@/assets/images/img-hocba-tienganh/4.0+.png';
import score5 from '@/assets/images/img-hocba-tienganh/5.0+.png';
import score6 from '@/assets/images/img-hocba-tienganh/6.0+.png';
import score7 from '@/assets/images/img-hocba-tienganh/7.0+.png';
import score8 from '@/assets/images/img-hocba-tienganh/8.0+.png';

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

const ScoreMap: Record<string, string> = {
  '3.0+': getImgSrc(score3),
  '4.0+': getImgSrc(score4),
  '5.0+': getImgSrc(score5),
  '6.0+': getImgSrc(score6),
  '7.0+': getImgSrc(score7),
  '8.0+': getImgSrc(score8),
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
            <path d="M50 50 L230 80 L410 20 L590 80 L770 20 L950 50" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="relative z-10 flex md:justify-between items-center w-max md:w-full min-w-full gap-8 md:gap-0 h-full">
          {data.map((item, index) => {
            const isActive = activeIndex === index;
            
            const getTranslateYClass = (idx: number) => {
              if (idx === 0 || idx === 5) return "md:translate-y-0";
              if (idx === 1 || idx === 3) return "md:translate-y-[48px]";
              if (idx === 2 || idx === 4) return "md:-translate-y-[48px]";
              return "";
            };

            return (
              <div 
                key={item.id}
                className={cn(
                  "relative flex flex-col items-center justify-center cursor-pointer w-24 md:w-32 transition-transform duration-300 group",
                  isActive ? "scale-110" : (hoveredIndex === index ? "scale-105" : ""),
                  getTranslateYClass(index)
                )}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div 
                  className={cn(
                    "absolute bottom-[calc(100%-8px)] md:bottom-[calc(100%-16px)] -ml-10 md:-ml-16 transition-all duration-300 w-[55px] md:w-[75px] z-20",
                    isActive ? "opacity-100 scale-110" : "opacity-50 group-hover:opacity-80"
                  )}
                  style={isActive ? { filter: `drop-shadow(0 4px 12px ${item.color}80)` } : undefined}
                >
                  <img src={ScoreMap[item.score]} alt={item.score} className="w-full h-auto object-contain" />
                </div>
                
                {/* các khối banner 3d */}
                <div className="relative w-16 h-16 md:w-20 md:h-20">
                  {/* Shadow base (extrusion) */}
                  <div 
                    className={cn(
                      "absolute inset-0 translate-y-[8px] rounded-[16px] md:rounded-[20px] rotate-45 transition-colors duration-300",
                      isActive ? "opacity-100" : "opacity-80"
                    )}
                    style={{ backgroundColor: item.color }}
                  />
                  {/* Soft glow below */}
                  <div 
                    className="absolute inset-0 translate-y-4 md:translate-y-6 blur-xl rounded-full transition-opacity duration-300 opacity-50 md:opacity-60"
                    style={{ backgroundColor: item.color }}
                  />
                  {/* Top face */}
                  <div 
                    className="absolute inset-0 bg-white border-[3px] rounded-[16px] md:rounded-[20px] rotate-45 flex items-center justify-center z-10"
                    style={{ borderColor: item.color }}
                  >
                    <img src={IconMap[item.icon]} alt={item.title} className="w-8 h-8 md:w-[42px] md:h-[42px] -rotate-45 object-contain" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Tabs */}
      <div className="mb-8">
        <div className="flex overflow-x-auto gap-4 md:gap-0 custom-scrollbar pb-4 px-4 md:px-0 md:flex-nowrap md:justify-between md:bg-white md:rounded-2xl md:shadow-sm md:border md:border-gray-100 md:p-2" role="tablist">
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
                <div className="flex flex-col items-start w-full px-1 md:px-4 lg:px-6">
                  <span 
                    className={cn(
                      "text-[14px] md:text-[15px] lg:text-[16px] font-bold uppercase transition-colors mb-0.5 md:mb-1",
                      "text-white md:text-[var(--active-color)]"
                    )}
                    style={{ '--active-color': item.color } as React.CSSProperties}
                  >
                    {item.title}
                  </span>
                  <span className="text-[12px] md:text-[13px] font-medium text-white/90 md:text-[#555555] mb-0 md:mb-3">
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
                  <h3 className="text-white text-[18px] md:text-[28px] font-bold">Chi tiết khóa học</h3>
                  {/* Blue line - Desktop only (under text) */}
                  <div className="hidden md:block w-20 h-1.5 bg-[#1C4EE5] rounded-full ml-2"></div>
                </div>
              </div>
              {/* Blue line - Mobile only (spanning under icon and text) */}
              <div className="md:hidden block w-20 h-1 bg-[#1C4EE5] rounded-full mt-2 ml-1"></div>
            </div>
          </div>

          <div className="relative w-full mb-0 md:mb-10 lg:pr-8">
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
                  <ul className="space-y-4 text-white/90 text-[15px] md:text-[17px] font-normal leading-[1.5] md:leading-[1.6]">
                    {stage.details.map((detail, idx) => (
                      <li key={idx} className={cn("flex items-start gap-2.5", detail.startsWith('-') && "ml-[14px] md:ml-4")}>
                        {!detail.startsWith('-') && (
                          <div className="mt-2.5 w-1 h-1 md:w-[5px] md:h-[5px] rounded-full bg-white/60 flex-shrink-0" aria-hidden="true"></div>
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
          href="#tu-van"
          className="inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-full bg-[#F97316] px-8 py-3.5 text-[15px] font-bold text-white shadow-[0_4px_15px_rgba(249,115,22,0.4)] transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-[#F97316] hover:to-[#FBBF24] hover:shadow-[0_0_25px_rgba(249,115,22,0.7)] hover:[text-shadow:0_0_10px_rgba(255,255,255,0.9)] uppercase"
        >
          XEM THÊM KHÓA HỌC
        </a>
      </div>
      
    </div>
  );
};
