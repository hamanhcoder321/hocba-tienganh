import { searchApi } from '@/lib/api/search';
import { useEffect, useRef, useState } from 'react';

export const useSearch = (isOpen: boolean) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [results, setResults] = useState<TResponsePagination<TBlogs[]> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery('');
      setResults(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(
      async () => {
        setIsLoading(true);
        try {
          const response = await searchApi.globalSearch({ s: searchQuery, limit: 4 });
          if (response) {
            setResults(response.data);
          }
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setIsLoading(false);
        }
      },
      searchQuery.trim() === '' ? 0 : 400,
    );

    return () => clearTimeout(timer);
  }, [searchQuery, isOpen]);

  return {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    results,
    isLoading,
    inputRef,
  };
};
