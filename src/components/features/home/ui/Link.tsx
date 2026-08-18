import React from 'react';
import { cn } from '@/lib/utils';

interface LinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ href, className, children }) => {
  return (
    <a
      href={href}
      className={cn(
        'inline-flex transform items-center justify-center rounded-[13px] bg-primary px-8 py-2 text-[15px] text-white shadow-redGlow transition-all duration-300 md:rounded-full md:text-lg',
        'hover:bg-gradient-to-r hover:from-[#F3C650] hover:to-[#B90E0A] hover:font-bold hover:text-white hover:shadow-redGlow',
        className,
      )}
    >
      {children}
    </a>
  );
};

export default Link;
