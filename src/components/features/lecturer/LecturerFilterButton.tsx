import { Button } from '@/components/ui/button';
import { Funnel } from 'lucide-react';
import { useState } from 'react';
import LecturerFilterSidebar from './LecturerFilterSidebar';

interface LecturerFilterButtonProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

export default function LecturerFilterButton({ filters, onFilterChange, onReset }: LecturerFilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Button - Mobile only */}
      <div className="md:hidden">
        <Button
          variant={'ghost'}
          onClick={() => setIsOpen(true)}
          className={
            'mt-2 flex h-[38px] w-auto items-center gap-4 rounded-lg border border-black px-5 md:mt-8 md:h-[60px] md:rounded-[20px]'
          }
        >
          <Funnel className="size-4 md:size-6" />
          <p className="text-base md:text-2xl">Bộ lọc giảng viên</p>
        </Button>
      </div>

      {/* Desktop Title */}
      <div className="hidden md:block">
        <div
          className={
            'mb-4 mt-2 flex h-8 w-auto items-center gap-4 rounded-xl border border-black px-5 md:mt-14 md:h-[60px] md:rounded-[20px]'
          }
        >
          <Funnel className="size-4 md:size-6" />
          <p className="text-base md:text-2xl">Bộ lọc giảng viên</p>
        </div>
      </div>

      {/* Sidebar */}
      <LecturerFilterSidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        filters={filters}
        onFilterChange={onFilterChange}
        onApply={() => setIsOpen(false)}
        onReset={onReset}
      />
    </>
  );
}
