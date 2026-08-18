'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import clsx from 'clsx';
import { ChevronDown, ChevronRight, List, X } from 'lucide-react';
import { useEffect, useRef, useState, type RefObject } from 'react';

type SidebarItem = {
  id: string;
  name: string;
  children: {
    id: string;
    name: string;
  }[];
};

type DetailBlogSidebarProps = {
  listTitle: SidebarItem[];
  stickyRef: RefObject<HTMLDivElement | null>;
  open?: boolean;
  openCloseButton?: boolean;
  variant?: 'static' | 'drawer';
  handleClick: (id: string) => void;
  onClose?: () => void;
  onOpenDropdown?: () => void;
  scrollToElement: (id: string) => void;
  activeId?: string;
};

const DetailBlogSidebar = ({
  listTitle,
  stickyRef,
  open = true,
  openCloseButton = false,
  variant = 'static',
  handleClick,
  onClose,
  onOpenDropdown,
  scrollToElement,
  activeId,
}: DetailBlogSidebarProps) => {
  const variantClassName = variant === 'drawer' ? 'list-title--drawer' : 'list-title--static';
  const [expandedItems, setExpandedItems] = useState<string[]>([listTitle[0]?.id || '']);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleClose = () => {
    onClose?.();
  };

  useEffect(() => {
    if (listTitle.length > 0) {
      setExpandedItems(
        listTitle
          .map((item) => (item.children.length > 0 ? item.id.toString() : undefined))
          .filter((id): id is string => Boolean(id)),
      );
    }
  }, [listTitle]);

  useEffect(() => {
    if (activeId && scrollContainerRef.current && open) {
      const activeEl = scrollContainerRef.current.querySelector(
        `button[data-target-id="${activeId}"], a[href="#${activeId}"]`,
      );
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [activeId, open]);

  return (
    <div
      ref={stickyRef}
      className={clsx('z-30 w-full flex-col rounded-lg xl:flex', variant === 'drawer' ? 'h-full' : 'h-fit')}
      style={{
        backgroundColor: 'rgba(243,243,243,0.95)',
      }}
    >
      <div className="h-full w-full pl-4">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between">
            <Button
              className="flex h-11 w-full items-center justify-start gap-2 pl-0 text-sm font-semibold uppercase hover:bg-transparent hover:no-underline"
              variant="ghost"
              onClick={onOpenDropdown}
            >
              <List />
              Nội dung chính
            </Button>
            {openCloseButton && (
              <Button
                aria-label="Close sidebar"
                onClick={handleClose}
                variant="ghost"
                className="flex h-8 w-8 items-center justify-center rounded-md p-0 text-gray-900"
              >
                <X className="size-5 text-gray-900 hover:text-gray-950" />
              </Button>
            )}
            {variant === 'static' && (
              <ChevronRight
                className={cn(
                  'mr-4 size-5 text-gray-500 hover:text-gray-950',
                  open ? 'rotate-90 transition-transform duration-200' : 'transition-transform duration-200',
                )}
              />
            )}
          </div>
          <div
            ref={scrollContainerRef}
            className={clsx(
              'list-title custom-scrollbar max-h-screen overflow-auto',
              open ? 'block' : 'hidden',
              variantClassName,
            )}
          >
            <ul className="list-disc pl-6 pr-2">
              {listTitle.map((item) => (
                <li key={item.id} className="list-none">
                  <Button
                    data-target-id={item.id}
                    variant="link"
                    className={cn(
                      'menu-highlightable relative h-auto w-full rounded-none py-2 pl-0 text-start text-lg font-bold text-black hover:no-underline',
                      item.id === activeId && 'menu-active-bg bg-primary text-white',
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleClick(item.id);
                    }}
                  >
                    {item.children.length > 0 && (
                      <span className="absolute -left-5 top-1/2 ml-auto flex-shrink-0 -translate-y-1/2 transition-transform duration-200">
                        <ChevronDown
                          className={cn(
                            'size-5 text-gray-500 hover:text-gray-950',
                            expandedItems.includes(item.id)
                              ? 'rotate-180 transition-transform duration-200'
                              : 'transition-transform duration-200',
                          )}
                          size={20}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleExpand(item.id);
                          }}
                        />
                      </span>
                    )}
                    <span
                      className={cn(
                        'ml-2 w-full flex-1 text-wrap hover:text-primary',
                        item.id === activeId && 'hover:text-white',
                      )}
                    >
                      {item.name}
                    </span>
                  </Button>
                  {item.children.length > 0 && expandedItems.includes(item.id) && (
                    <ul>
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <a
                            href={`#${child.id}`}
                            className={cn(
                              'menu-highlightable inline-block w-full py-2 pl-2 text-gray-500 hover:text-primary',
                              child.id === activeId &&
                                'menu-active-bg rounded-md bg-primary text-white hover:text-white',
                            )}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToElement(child.id);
                            }}
                          >
                            {child.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBlogSidebar;
