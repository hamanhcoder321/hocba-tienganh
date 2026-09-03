import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronDown } from 'lucide-react';
import { CourseDetailsBookmark } from '@/components/common/icons';

export interface SubTarget {
  id: number | string;
  title: string;
  description?: string;
}

export interface CourseTarget {
  id?: number | string;
  title: string;
  description?: string;
  content?: string;
  SubTarget?: SubTarget[];
  items?: SubTarget[] | any[];
}

interface CourseTargetAccordionProps {
  targets: (string | CourseTarget)[];
  activeBgClass?: string;
}

function TargetAccordionItem({ target, index, activeBgClass }: { target: string | CourseTarget; index: number; activeBgClass?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!target) return null;

  // Xử lý dữ liệu: trường hợp dữ liệu CMS bị null hoặc thiếu field
  const isLongText = typeof target === 'string' && target.length > 60;
  const title = typeof target === 'string' ? (isLongText ? 'Chi tiết mục tiêu' : target) : (target?.title || '');
  const description = typeof target === 'string' ? (isLongText ? target : null) : (target?.description || (target as any)?.content);
  
  // Handle both old SubTarget format and new items format
  const rawSubTargets: any[] = typeof target === 'string' ? [] : (target?.SubTarget || (target as any)?.items || []);
  const subTargets: SubTarget[] = rawSubTargets.map((item: any) => ({
    id: item.id || item.label,
    title: item.title || item.label,
    description: item.description || item.content
  }));
  
  const id = typeof target === 'string' ? index : (target?.id || index);

  if (!title) return null; // Nếu không có title thì không render block này để tránh lỗi giao diện


  return (
    <div className={`w-full rounded-[9.18px] lg:rounded-2xl border-[0.25px] border-black lg:border lg:border-[#e2e8f0] py-[4.08px] pl-[10.2px] pr-[16px] lg:p-4 transition-colors duration-300 ${isOpen && activeBgClass ? activeBgClass : 'bg-transparent'}`}>
      <Accordion type="single" collapsible onValueChange={(value) => setIsOpen(!!value)}>
        <AccordionItem value={`target-${id}`} className="!border-none">
          <div className="w-full gap-2">
            <AccordionTrigger className="relative w-full p-0 hover:no-underline [&>svg:last-child]:hidden flex items-center justify-between min-h-[25.2px] lg:min-h-0">
              <div className="flex items-center gap-2 pr-6">
                <CourseDetailsBookmark className="w-[12.24px] h-[12.24px] lg:w-6 lg:h-6 shrink-0 text-[#F97316]" />
                <h3 className="font-gilroy font-semibold text-[14px] lg:text-[24px] leading-[110%] text-black text-left">{title}</h3>
              </div>
              <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-[12.24px] h-[12.24px] lg:w-6 lg:h-6 shrink-0" />
            </AccordionTrigger>
          </div>
          <AccordionContent className="pb-0 pt-2">
            <div className="rounded px-4">
              {description ? (
                <p className="whitespace-break-spaces text-wrap pb-2 font-gilroy text-[12px] lg:text-base font-normal leading-[140%] text-black">{description}</p>
              ) : (
                <p className="whitespace-break-spaces text-wrap pb-2 font-gilroy text-[12px] lg:text-base font-normal leading-[140%] text-black italic text-gray-500">
                  Chi tiết đang được cập nhật...
                </p>
              )}
              
              {subTargets.length > 0 && (
                <div className="space-y-4 pl-0">
                  {subTargets.map((subItem, sIdx) => (
                    <div key={subItem.id || sIdx} className="rounded-xl border bg-white p-4">
                      <Accordion type="single" collapsible>
                        <AccordionItem value={`subtarget-${subItem.id || sIdx}`} className="!border-none">
                          <div className="w-full gap-2">
                            <AccordionTrigger className="relative w-full p-0 text-base font-semibold hover:no-underline pr-6 [&>svg:last-child]:hidden">
                              <span className="text-left">{subItem.title}</span>
                              <ChevronDown className="absolute right-0 top-0 shrink-0" />
                            </AccordionTrigger>
                          </div>
                          <AccordionContent className="pb-0">
                            <div className="space-y-2 whitespace-break-spaces text-wrap pt-4 font-gilroy text-[12px] lg:text-base font-normal leading-[140%] text-black">
                              {subItem.description ? (
                                <p className="whitespace-break-spaces">{subItem.description}</p>
                              ) : (
                                <p className="whitespace-break-spaces italic text-gray-600">Đang cập nhật...</p>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default function CourseTargetAccordion({ targets, activeBgClass }: CourseTargetAccordionProps) {
  if (!targets || targets.length === 0) return null;

  return (
    <div className="space-y-4 pl-[17.85px] lg:pl-0">
      {targets.map((line, index) => (
        <TargetAccordionItem key={typeof line === 'string' ? index : (line.id || index)} target={line} index={index} activeBgClass={activeBgClass} />
      ))}
    </div>
  );
}
