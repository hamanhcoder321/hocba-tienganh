import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronDown } from 'lucide-react';
import { CourseDetailsBookmark } from '@/components/common/icons';

interface OptionItem {
  label: string;
  content: string;
}

interface Lesson {
  id: number | string;
  title: string;
  description?: string;
  content?: string;
  type?: 'text' | 'lesson';
  items?: OptionItem[];
}

interface Section {
  id: number | string;
  title: string;
  description?: string;
  Lesson?: Lesson[];
  options?: Lesson[];
}

interface CourseSectionAccordionProps {
  sections: Section[];
  activeBgClass?: string;
}

function SectionAccordionItem({ section, activeBgClass }: { section: Section; activeBgClass?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`w-full rounded-[9.18px] lg:rounded-2xl border-[0.25px] border-black lg:border lg:border-[#e2e8f0] py-[4.08px] pl-[10.2px] pr-[16px] lg:p-4 transition-colors duration-300 ${isOpen && activeBgClass ? activeBgClass : 'bg-transparent'}`}>
      <Accordion type="single" collapsible onValueChange={(value) => setIsOpen(!!value)}>
        <AccordionItem value={`section-${section.id}`} className="!border-none">
          <div className="w-full gap-2">
            <AccordionTrigger className="relative w-full p-0 hover:no-underline [&>svg:last-child]:hidden flex items-center justify-between min-h-[25.2px] lg:min-h-0">
              <div className="flex items-center gap-2">
                <CourseDetailsBookmark className="w-[12.24px] h-[12.24px] lg:w-6 lg:h-6 shrink-0 text-[#F97316]" />
                <h3 className="font-gilroy font-semibold text-[14px] lg:text-[24px] leading-[110%] text-black">{section.title}</h3>
              </div>
              <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-[12.24px] h-[12.24px] lg:w-6 lg:h-6" />
            </AccordionTrigger>
          </div>
          <AccordionContent className="pb-0 pt-2">
            <div className="rounded px-4">
              <p className="whitespace-break-spaces text-wrap pb-2 font-gilroy text-[12px] lg:text-base font-normal leading-[140%] text-black">{section.description}</p>
              {(section.Lesson?.length || section.options?.length) ? (
                <div className="space-y-4 pl-0">
                  {(section.options || section.Lesson || []).map((lesson) => (
                    <div key={lesson.id} className="rounded-xl border bg-white p-4">
                      <Accordion type="single" collapsible>
                        <AccordionItem value={`lesson-${lesson.id}`} className="!border-none">
                          <div className="w-full gap-2">
                            <AccordionTrigger className="relative w-full p-0 text-base font-semibold hover:no-underline pr-6 [&>svg:last-child]:hidden">
                              <span className="text-left">{lesson.title}</span>
                              <ChevronDown className="absolute right-0 top-0" />
                            </AccordionTrigger>
                          </div>
                          <AccordionContent className="pb-0">
                            <div className="space-y-4 whitespace-break-spaces text-wrap pt-4 font-gilroy text-[12px] lg:text-base font-normal leading-[140%] text-black">
                              {lesson.type === 'lesson' && lesson.items && lesson.items.length > 0 ? (
                                <div className="space-y-4">
                                  {lesson.items.map((item, idx) => (
                                    <div key={idx}>
                                      <span className="font-semibold block">{item.label}</span>
                                      {item.content && <p className="mt-1 whitespace-break-spaces text-gray-700">{item.content}</p>}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="whitespace-break-spaces">{lesson.content || lesson.description}</p>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default function CourseSectionAccordion({ sections, activeBgClass }: CourseSectionAccordionProps) {
  if (!sections || sections.length === 0) {
    return (
      <div className="my-8 flex w-full flex-col items-center justify-center rounded-[8px] border p-6">
        <p className="text-lg">Chưa có chương trình giảng dạy</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pl-[17.85px] lg:pl-0">
      {sections.map((section) => (
        <SectionAccordionItem key={section.id} section={section} activeBgClass={activeBgClass} />
      ))}
    </div>
  );
}
