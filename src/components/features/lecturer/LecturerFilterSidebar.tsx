import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { EXPERIENCE_OPTIONS, PROGRAM_OPTIONS } from '@/lib/constants/content';
import { Funnel, Grip, Search } from 'lucide-react';
import { useEffect } from 'react';

interface LecturerFilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onApply?: () => void;
  onReset?: () => void;
}

export default function LecturerFilterSidebar({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onApply,
  onReset,
}: LecturerFilterSidebarProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleProgramToggle = (program: string) => {
    const newPrograms = filters.selectedPrograms.includes(program) ? [] : [program];

    onFilterChange({
      ...filters,
      selectedPrograms: newPrograms,
    });
  };

  const handleExperienceToggle = (experience: (typeof EXPERIENCE_OPTIONS)[number]) => {
    const isSelected = filters.selectedExperience.some((e) => e.label === experience.label);

    const newExperience = isSelected
      ? filters.selectedExperience.filter((e) => e.label !== experience.label)
      : [...filters.selectedExperience, experience];

    onFilterChange({
      ...filters,
      selectedExperience: newExperience,
    });
  };

  const handleSearchChange = (value: string) => {
    onFilterChange({
      ...filters,
      searchQuery: value,
    });
  };

  const handleApply = () => {
    if (onApply) {
      onApply();
    }
    onClose();
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    }
  };

  return (
    <>
      {/* Overlay - Mobile only */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className={`fixed left-1/2 top-1/2 z-50 h-auto w-[90%] max-w-[344px] -translate-y-1/2 overflow-y-auto rounded-xl bg-white shadow-2xl transition-all duration-300 ease-in-out md:sticky md:left-0 md:top-20 md:z-auto md:w-full md:max-w-[344px] md:translate-x-0 md:translate-y-0 md:self-start md:rounded-none md:bg-transparent md:shadow-none md:transition-none ${isOpen ? '-translate-x-1/2 opacity-100' : '-translate-x-[150%] pb-10 opacity-0 md:translate-x-0 md:opacity-100'}`}
      >
        <div className="p-4 md:p-0">
          {/* Filter Title - Mobile only */}
          <p className="mx-auto mb-4 flex h-[38px] w-fit items-center justify-center rounded-lg border border-black px-4 text-[15px] font-bold text-black md:hidden md:text-xl">
            <Funnel className="mr-4 size-4 md:size-6" />
            Bộ lọc giảng viên
          </p>

          {/* Theo chương trình */}
          <div className="flex flex-col gap-3 border-t border-gray-400 pt-4 md:gap-[18px] md:border-black md:pt-5">
            <div className="flex items-center gap-2">
              <Grip />
              <p className="text-[15px] font-bold md:text-lg">Theo chương trình</p>
            </div>

            {/* HSK Programs */}
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <div className="size-[18px] rounded-full bg-primary"></div>
                <p className="text-[15px] font-bold md:text-base">HSK</p>
              </div>
              <div className="ml-10 flex flex-col gap-2">
                {PROGRAM_OPTIONS.HSK.options.map((program) => (
                  <button
                    key={program}
                    onClick={() => handleProgramToggle(program)}
                    className="flex cursor-pointer items-center gap-2 transition-colors hover:text-primary"
                  >
                    <div
                      className={`size-[10px] rounded-full border border-black transition-colors ${filters.selectedPrograms.includes(program) ? 'border-primary bg-primary' : ''
                        }`}
                    ></div>
                    <p className="text-[13px] md:text-base">{program}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Chinese Programs */}
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <div className="size-[18px] rounded-full bg-primary"></div>
                <p className="text-base font-bold">{PROGRAM_OPTIONS.CHINESE.label}</p>
              </div>
              <div className="ml-10 flex flex-col gap-2">
                {PROGRAM_OPTIONS.CHINESE.options.map((program) => (
                  <button
                    key={program}
                    onClick={() => handleProgramToggle(program)}
                    className="flex cursor-pointer items-center gap-2 transition-colors hover:text-primary"
                  >
                    <div
                      className={`size-[10px] rounded-full border border-black transition-colors ${filters.selectedPrograms.includes(program) ? 'border-primary bg-primary' : ''
                        }`}
                    ></div>
                    <p className="text-[13px] md:text-base">{program}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Theo kinh nghiệm */}
          <div className="mt-3 flex flex-col gap-[18px] border-t border-gray-400 pt-4 md:mt-7 md:border-black md:pt-5">
            <div className="flex items-center gap-2">
              <Grip />
              <p className="text-[15px] font-bold md:text-lg">Theo kinh nghiệm</p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="ml-10 flex items-center gap-2">
                <FieldGroup className="mx-auto w-56 gap-2">
                  {EXPERIENCE_OPTIONS.map((exp) => (
                    <Field key={exp.label} orientation="horizontal">
                      <Checkbox
                        id={`exp-${exp.label}`}
                        name="min_experience"
                        className="rounded-none border-black"
                        checked={filters.selectedExperience.some((e) => e.label === exp.label)}
                        onCheckedChange={() => handleExperienceToggle(exp)}
                      />
                      <FieldLabel htmlFor={`exp-${exp.label}`} className="text-[13px] md:text-base">
                        {exp.label}
                      </FieldLabel>
                    </Field>
                  ))}
                </FieldGroup>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mt-3 flex flex-col gap-[18px] border-t border-gray-400 pt-5 md:mt-7 md:border-black">
            <InputGroup className="h-10 max-w-xs rounded-full border-black">
              <InputGroupInput
                placeholder="Tên giảng viên"
                value={filters.searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
          </div>

          {/* Action Buttons - Mobile only */}
          <div className="mt-6 flex flex-col gap-3 pb-2 md:hidden">
            <Button
              onClick={handleApply}
              className="mx-auto h-8 w-fit rounded-full border border-black bg-primary text-[13px] font-bold uppercase text-white"
            >
              Lọc giảng viên
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
