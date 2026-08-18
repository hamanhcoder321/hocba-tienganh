import { useDebounce } from '@/hooks/useDebounce';
import { fetchLecturersClient } from '@/lib/api/lecturer';
import { useEffect, useState } from 'react';
import LecturerFilterButton from './LecturerFilterButton';
import LecturerList from './LecturerList';

interface LecturerPageClientProps {
  initialLecturers: TLecturer[];
}

export default function LecturerPageClient({ initialLecturers }: LecturerPageClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedPrograms: [],
    selectedExperience: [],
  });

  const [lecturers, setLecturers] = useState<TLecturer[]>(initialLecturers);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchQuery = useDebounce(filters.searchQuery, 500);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        let minExperience: number | undefined;
        let maxExperience: number | undefined;

        if (filters.selectedExperience.length > 0) {
          minExperience = Math.min(...filters.selectedExperience.map((e) => e.min));
          maxExperience = Math.max(...filters.selectedExperience.map((e) => e.max));
        }

        const result = await fetchLecturersClient({
          page: 1,
          limit: 100,
          search: debouncedSearchQuery || undefined,
          program: filters.selectedPrograms[0] || undefined,
          min_experience: minExperience,
          max_experience: maxExperience,
        });

        setLecturers(result);
      } catch (error) {
        console.error('Error fetching lecturers:', error);
        setLecturers(initialLecturers);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [debouncedSearchQuery, filters.selectedPrograms, filters.selectedExperience, initialLecturers]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleReset = () => {
    setFilters({
      searchQuery: '',
      selectedPrograms: [],
      selectedExperience: [],
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:gap-10">
      {/* Filter Sidebar */}
      <div className="mb-4 w-full max-w-full md:max-w-[344px]">
        <LecturerFilterButton filters={filters} onFilterChange={handleFilterChange} onReset={handleReset} />
      </div>

      {/* Lecturer List */}
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center py-20 md:mt-14 md:pb-14">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
        </div>
      ) : (
        <LecturerList lecturers={lecturers} />
      )}
    </div>
  );
}
