import React from 'react';
import { cn } from '@/lib/utils';

interface CommitmentBadgeProps {
  children: React.ReactNode;
  className?: string;
  as?: 'p' | 'h2' | 'div';
}

const CommitmentBadge: React.FC<CommitmentBadgeProps> = ({ children, className, as: Tag = 'p' }) => {
  return (
    <Tag
      className={cn(
        'flex items-center justify-center rounded-[8px] bg-gradient-to-r from-[#B90E0A] to-[#F3C650] px-1 py-1 text-center text-sm font-black uppercase text-white sm:px-3 sm:py-4 sm:text-lg lg:text-[32px]',
        className,
      )}
    >
      {children}
    </Tag>
  );
};

export default CommitmentBadge;
