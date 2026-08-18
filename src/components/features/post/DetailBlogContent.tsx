'use client';

import DetailBlogSidebar from '@/components/features/post/DetailBlogSidebar';
import { Button } from '@/components/ui/button';
import { useUpdateBlogViews } from '@/hooks/features/use-blog-filter';
import '@/styles/ckeditor.css';
import parse from 'html-react-parser';
import { List } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

type sidebarLists = {
  id: string;
  name: string;
  children: {
    id: string;
    name: string;
  }[];
};

type DetailBlogContentProps = {
  blog?: TBlogs;
  blogSlug?: string;
};

const DetailBlogContent = ({ blog, blogSlug }: DetailBlogContentProps) => {
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const [hasTouchedTop, setHasTouchedTop] = useState(false);
  const [showListButton, setShowListButton] = useState(false);
  const [isExtraSidebarOpen, setIsExtraSidebarOpen] = useState(false);
  const [hasClosedSidebar, setHasClosedSidebar] = useState(false);
  const [isStaticSidebarOpen, setIsStaticSidebarOpen] = useState(false);
  const extraSidebarRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [containerLeft, setContainerLeft] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const hasUpdatedViews = useRef(false);
  const { updateViews } = useUpdateBlogViews();

  useEffect(() => {
    if (!blogSlug || hasUpdatedViews.current) return;

    const viewKey = `blog_view_${blogSlug}`;
    const lastViewTime = localStorage.getItem(viewKey);
    const now = Date.now();
    const VIEW_COOLDOWN = 30 * 60 * 1000;

    if (!lastViewTime || now - parseInt(lastViewTime) > VIEW_COOLDOWN) {
      hasUpdatedViews.current = true;

      updateViews(blogSlug).then(() => {
        localStorage.setItem(viewKey, now.toString());
      });
    }
  }, [blogSlug, updateViews]);

  const { modifiedHtml, listTitle } = useMemo((): {
    modifiedHtml?: string;
    listTitle: sidebarLists[];
  } => {
    const titles: sidebarLists[] = [];
    let currentH2: sidebarLists | null = null;
    let modified = blog?.description;

    if (modified) {
      modified = modified.replace(/<(h2|h3)\b([^>]*)>([\s\S]*?)<\/\1>/gi, (match, tag, attrs, content) => {
        // Strip tags and decode basic entities for ID
        const plainText = content
          .replace(/<[^>]*>/g, '')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .trim();

        if (!plainText) return match;

        const textId = plainText
          .replace(/["']/g, '')
          .replace(/[^\w\s\u00C0-\u1EF9-]/g, '')
          .trim()
          .replace(/\s+/g, '-');

        if (tag.toLowerCase() === 'h2') {
          currentH2 = {
            id: textId,
            name: plainText,
            children: [],
          };
          titles.push(currentH2);
        } else if (tag.toLowerCase() === 'h3' && currentH2) {
          currentH2.children.push({
            id: textId,
            name: plainText,
          });
        }

        return `<${tag}${attrs} id="${textId}">${content}</${tag}>`;
      });
    }
    return { modifiedHtml: modified, listTitle: titles };
  }, [blog]);

  const scrollToElement = (id: string) => {
    // 1. Try finding by ID
    let element = document.getElementById(id);

    // 2. Fallback: Try finding by text content if ID fails (due to potential mismatches)
    if (!element) {
      const headings = document.querySelectorAll('.custom-editor h2, .custom-editor h3');
      for (const h of headings) {
        const text = h.textContent?.replace(/&nbsp;/g, ' ').trim();
        const normalizedId = text
          ?.replace(/[^\w\s\u00C0-\u1EF9-]/g, '')
          .trim()
          .replace(/\s+/g, '-');
        if (normalizedId === id) {
          element = h as HTMLElement;
          break;
        }
      }
    }

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const [flag, setFlag] = useState(false);

  const handleClick = (id: string) => {
    setFlag(true);
    scrollToElement(id);
    setTimeout(() => {
      setFlag(false);
    }, 500);
  };

  useEffect(() => {
    if (!listTitle) return;

    const updateActiveByPosition = () => {
      if (flag) return;
      const headings = document.querySelectorAll('.custom-editor h2, .custom-editor h3');
      if (!headings || headings.length === 0) return;

      const navHeight = document.getElementById('header-nav')?.offsetHeight || 0;
      let chosenId: string | null = null;

      headings.forEach((h) => {
        const el = h as Element;
        const top = el.getBoundingClientRect().top;
        if (top <= window.innerHeight / 2) {
          chosenId = el.id;
        }
      });

      if (!chosenId) {
        chosenId = (headings[0] as Element).id;
      }

      if (chosenId !== activeId) {
        setActiveId(chosenId);
      }
    };

    updateActiveByPosition();
    const scrollContainer = document.getElementById('main-scroll-container') || window;
    scrollContainer.addEventListener('scroll', updateActiveByPosition);
    window.addEventListener('resize', updateActiveByPosition);
    return () => {
      scrollContainer.removeEventListener('scroll', updateActiveByPosition);
      window.removeEventListener('resize', updateActiveByPosition);
    };
  }, [modifiedHtml, listTitle, flag, activeId]);

  useEffect(() => {
    let tocObserver: IntersectionObserver | null = null;
    let relatedObserver: IntersectionObserver | null = null;

    const relatedPostsElement = document.getElementById('related_posts');

    const updateSidebarVisibility = (isRelatedVisible: boolean, tocRect: DOMRect | null) => {
      if (isRelatedVisible || (tocRect && tocRect.top > 0)) {
        // Hide scenarios: TOC top is back in view or we hit related posts
        setShowListButton(false);
        setIsExtraSidebarOpen(false);
        setHasTouchedTop(false);
      } else if (tocRect && tocRect.bottom <= 200) {
        // Show scenarios: TOC bottom is scrolled past
        setHasTouchedTop(true);
        if (window.innerWidth < 768) {
          setShowListButton(true);
          setIsExtraSidebarOpen(false);
        } else {
          if (!hasClosedSidebar) {
            setIsExtraSidebarOpen(true);
            setShowListButton(false);
          } else {
            setShowListButton(true);
            setIsExtraSidebarOpen(false);
          }
        }
      }
    };

    // 1. Observer for the Table of Contents (Sidebar)
    if (stickyRef.current) {
      tocObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          const isRelatedVisible = !!(
            relatedPostsElement && relatedPostsElement.getBoundingClientRect().top < window.innerHeight - 300
          );
          updateSidebarVisibility(isRelatedVisible, entry.boundingClientRect);
        },
        { threshold: [0, 0.1, 0.5, 1.0] },
      );
      tocObserver.observe(stickyRef.current);
    }

    // 2. Observer for the Related Posts section
    if (relatedPostsElement) {
      relatedObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            // Hide everything when related posts enter view
            setShowListButton(false);
            setIsExtraSidebarOpen(false);
            setHasTouchedTop(false);
          } else {
            // Re-evaluate when leaving related posts (scrolling back up)
            const tocRect = stickyRef.current?.getBoundingClientRect() || null;
            updateSidebarVisibility(false, tocRect);
          }
        },
        { rootMargin: '0px 0px -300px 0px' }, // Triggers when element is 300px above the bottom of the viewport
      );
      relatedObserver.observe(relatedPostsElement);
    }

    // Initial check
    const initialTocRect = stickyRef.current?.getBoundingClientRect() || null;
    const initialRelatedVisible = !!(
      relatedPostsElement && relatedPostsElement.getBoundingClientRect().top < window.innerHeight - 300
    );
    updateSidebarVisibility(initialRelatedVisible, initialTocRect);

    return () => {
      if (tocObserver) tocObserver.disconnect();
      if (relatedObserver) relatedObserver.disconnect();
    };
  }, [hasTouchedTop, hasClosedSidebar, listTitle]);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const nav = document.getElementById('header-nav');
      const height = nav?.offsetHeight || 0;
      setHeaderHeight(height);
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

  useEffect(() => {
    const updateContainerLeft = () => {
      if (window.innerWidth < 768) {
        setContainerLeft(12);
      } else if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerLeft(rect.left - 60);
      }
    };

    updateContainerLeft();
    const scrollContainer = document.getElementById('main-scroll-container') || window;
    window.addEventListener('resize', updateContainerLeft);
    scrollContainer.addEventListener('scroll', updateContainerLeft);

    return () => {
      window.removeEventListener('resize', updateContainerLeft);
      scrollContainer.removeEventListener('scroll', updateContainerLeft);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative flex min-h-[300px] flex-col gap-4 max-xl:w-full md:gap-8">
      <DetailBlogSidebar
        listTitle={listTitle}
        stickyRef={stickyRef}
        handleClick={handleClick}
        scrollToElement={scrollToElement}
        open={isStaticSidebarOpen}
        onOpenDropdown={() => setIsStaticSidebarOpen(!isStaticSidebarOpen)}
        variant="static"
        activeId={activeId || ''}
      />
      {showListButton && !isExtraSidebarOpen && (
        <Button
          aria-label="Open sidebar"
          onClick={() => {
            setIsExtraSidebarOpen(true);
            setHasClosedSidebar(false);
          }}
          variant="ghost"
          className="fixed top-1/2 z-40 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg p-0 shadow-md"
          style={{
            backgroundColor: 'rgba(243,243,243,0.95)',
            left: `${containerLeft}px`,
          }}
        >
          <List className="size-8" />
        </Button>
      )}
      {/* Sidebar Drawer Container - Always present for stability */}
      <div
        ref={extraSidebarRef}
        onClick={(e) => e.stopPropagation()}
        className="fixed left-0 z-[98] w-full rounded-r-lg transition-transform duration-700 ease-in-out md:w-[450px]"
        style={{
          backgroundColor: 'rgba(243,243,243,0.98)',
          top: headerHeight,
          height: `calc(100vh - ${headerHeight}px)`,
          transform: isExtraSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          visibility: isExtraSidebarOpen || hasTouchedTop ? 'visible' : 'hidden', // Add hasTouchedTop check if we are in transition zone
          pointerEvents: isExtraSidebarOpen ? 'auto' : 'none',
        }}
      >
        <div className="h-full px-2 pb-4">
          <DetailBlogSidebar
            listTitle={listTitle}
            stickyRef={extraSidebarRef}
            handleClick={(id) => {
              handleClick(id);
              setShowListButton(true);
              if (window.innerWidth < 768) {
                setIsExtraSidebarOpen(false);
              }
            }}
            scrollToElement={(id) => {
              scrollToElement(id);
              setShowListButton(true);
              if (window.innerWidth < 768) {
                setIsExtraSidebarOpen(false);
              }
            }}
            open={true}
            onClose={() => {
              setIsExtraSidebarOpen(false);
              setHasClosedSidebar(true);
              setShowListButton(true);
            }}
            openCloseButton={true}
            variant="drawer"
            activeId={activeId || ''}
          />
        </div>
      </div>
      <div className="mx-auto w-full flex-shrink-0 lg:w-[896px] 3xl:w-[970px]">
        <div className="parent-a-red parent-tr-hover ck-content custom-editor w-full [&_.table]:max-lg:!w-full">
          {modifiedHtml && parse(modifiedHtml)}
        </div>
      </div>
    </div>
  );
};

export default DetailBlogContent;
