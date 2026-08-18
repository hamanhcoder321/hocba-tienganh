import { cn } from '@/lib/utils';
import React, { useState } from 'react';

type RoadmapTabsProps = {
  icons: {
    hsk: string;
    hskSrcset: string;
    job: string;
    jobSrcset: string;
    icon: string;
  };
};

export const RoadmapTabs: React.FC<RoadmapTabsProps> = ({ icons }) => {
  const [activeTab, setActiveTab] = useState<'hsk' | 'job'>('hsk');

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 md:gap-4">
          {icons.icon && (
            <img
              src={icons.icon}
              alt="Roadmap Icon"
              width={112}
              height={112}
              className="h-10 w-auto [filter:contrast(1.15)_saturate(1.2)_brightness(1.02)] md:h-28"
            />
          )}
          <div className="">
            <h2 className="rounded-[8px] bg-gradient-to-r from-[#B90E00] to-[#F3C650] px-3 py-1 text-lg font-bold uppercase text-white md:py-4 md:text-[32px]">
              Chiến lược học tinh gọn
            </h2>
            <p className="bg-gradient-to-r from-[#7D1900] to-[#B90E0A] bg-clip-text text-xl font-black uppercase text-transparent md:py-5 md:text-[42px]">
              Lộ trình tổng quan
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 hidden items-end justify-center gap-8 md:flex">
        {/* HSK Tab */}
        <div className="relative flex flex-col items-center justify-end">
          <button
            onClick={() => setActiveTab('hsk')}
            className={cn(
              'relative flex h-[66px] w-[320px] items-center justify-center rounded-[12px] text-[20px] font-medium uppercase tracking-wider transition-all',
              activeTab === 'hsk'
                ? 'h-[86px] border-[1px] border-white bg-gradient-to-r from-[#FBC335] via-[#E46B2C] to-[#B90E0A] font-black text-white shadow-[0_0_25px_rgba(243,198,80,0.6)]'
                : 'bg-[#CCCCCC] text-[#3A3A3A] hover:h-[86px] hover:border-[1px] hover:border-white hover:bg-gradient-to-r hover:from-[#FBC335] hover:via-[#E46B2C] hover:to-[#B90E0A] hover:font-black hover:text-white hover:shadow-[0_0_25px_rgba(243,198,80,0.6)]',
            )}
          >
            Luyện thi HSK
          </button>
          <div
            className={cn(
              'absolute top-full z-10 -mt-0.5 flex w-full justify-center transition-all duration-300',
              activeTab === 'hsk' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none',
            )}
          >
            <svg
              width="29"
              height="48"
              viewBox="0 0 36 24"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18 24L0.679491 0L35.3205 0L18 24Z" fill="url(#arrow_grad)" />
              <defs>
                <linearGradient id="arrow_grad" x1="18" y1="0" x2="18" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E46B2C" />
                  <stop offset="1" stopColor="#B90E0A" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Job Tab */}
        <div className="relative flex flex-col items-center justify-end">
          <button
            onClick={() => setActiveTab('job')}
            className={cn(
              'relative flex h-[66px] w-[320px] items-center justify-center rounded-[12px] text-center text-[20px] font-medium uppercase leading-snug tracking-wider transition-all',
              activeTab === 'job'
                ? 'h-[86px] border-[1px] border-white bg-gradient-to-r from-[#7D1900] to-[#B90E0A] font-black text-white shadow-[0_0_25px_rgba(243,198,80,0.6)]'
                : 'bg-[#CCCCCC] text-[#3A3A3A] hover:h-[86px] hover:border-[1px] hover:border-white hover:bg-gradient-to-r hover:from-[#7D1900] hover:to-[#B90E0A] hover:font-black hover:text-white hover:shadow-[0_0_25px_rgba(243,198,80,0.6)]',
            )}
          >
            Tiếng trung cho
            <br /> Người đi làm
          </button>
          <div
            className={cn(
              'absolute top-full z-10 -mt-0.5 flex w-full justify-center transition-all duration-300',
              activeTab === 'job' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none',
            )}
          >
            <svg
              width="29"
              height="48"
              viewBox="0 0 36 24"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18 24L0.679491 0L35.3205 0L18 24Z" fill="url(#arrow_grad_job)" />
              <defs>
                <linearGradient id="arrow_grad_job" x1="18" y1="0" x2="18" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E46B2C" />
                  <stop offset="1" stopColor="#B90E0A" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      <div className="mb-4 mt-4 flex justify-center px-4 sm:mb-10 md:hidden">
        <div className="grid h-14 w-full max-w-[400px] grid-cols-2 items-center rounded-[12px] border border-[#E5E5E5] bg-white p-1 shadow-sm">
          <button
            onClick={() => setActiveTab('hsk')}
            className={cn(
              'col-span-1 rounded-[8px] py-3 text-[14px] font-black uppercase transition-all',
              activeTab === 'hsk'
                ? 'bg-gradient-to-r from-[#7D1900] to-[#B90E0A] text-white shadow-md'
                : 'bg-transparent text-[#666666]',
            )}
          >
            Luyện thi HSK
          </button>
          <button
            onClick={() => setActiveTab('job')}
            className={cn(
              'col-span-1 rounded-[8px] text-[14px] font-black uppercase transition-all',
              activeTab === 'job'
                ? 'bg-gradient-to-r from-[#7D1900] to-[#B90E0A] text-white shadow-md'
                : 'bg-transparent text-[#666666]',
            )}
          >
            Khoá học Học Bá Chinese
          </button>
        </div>
      </div>

      <div className="relative mx-auto mt-4 max-w-[1240px]">
        <div className="grid grid-cols-1 grid-rows-1 items-start">
          {/* HSK Content */}
          <div
            className={cn(
              'col-start-1 row-start-1 transition-all duration-700 ease-in-out',
              activeTab === 'hsk'
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0 pointer-events-none',
            )}
          >
            <h3 className="sr-only">Lộ trình HSK</h3>
            <h4 className="sr-only">0-HSK2</h4>
            <h4 className="sr-only">HSK3</h4>
            <h4 className="sr-only">HSK4</h4>
            <h4 className="sr-only">HSK5</h4>
            <h4 className="sr-only">HSK6</h4>
            <img
              src={icons.hsk}
              srcSet={icons.hskSrcset}
              sizes="(max-width: 1280px) calc(100vw - 2rem), 1240px"
              alt="Lộ trình HSK"
              className="h-auto w-auto [filter:contrast(1.08)_saturate(1.1)]"
            />
          </div>

          {/* Job Content */}
          <div
            className={cn(
              'col-start-1 row-start-1 transition-all duration-700 ease-in-out',
              activeTab === 'job'
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0 pointer-events-none',
            )}
          >
            <h3 className="sr-only">Lộ trình Người đi làm</h3>
            <h4 className="sr-only">Tiếng Trung cơ bản</h4>
            <h4 className="sr-only">Giao tiếp nâng cao</h4>
            <h4 className="sr-only">Giao tiếp công sở</h4>
            <h4 className="sr-only">Giao tiếp thương mại</h4>
            <h4 className="sr-only">Giao tiếp doanh nhân</h4>
            <img
              src={icons.job}
              srcSet={icons.jobSrcset}
              sizes="(max-width: 1280px) calc(100vw - 2rem), 1240px"
              alt="Lộ trình Người đi làm"
              className="h-auto w-full [filter:contrast(1.08)_saturate(1.1)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
