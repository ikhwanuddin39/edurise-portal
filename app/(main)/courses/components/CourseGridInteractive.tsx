"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterButton } from "./FilterButton";
import { SearchBar } from "./SearchBar";
import { FilterModal } from "./FilterModal";
import { useDebounce } from "@/hooks/useDebounce";
import type { CourseCategory } from "@/types/course";

interface CourseGridInteractiveProps {
  initialSearch: string;
  initialCategories: CourseCategory[];
  total: number;
  categoryCounts: Record<string, number>;
  children: React.ReactNode;
}

function useCourseFilters(initialSearch: string, initialCategories: CourseCategory[]) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(initialSearch || "");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Set<CourseCategory>>(() =>
    new Set(initialCategories)
  );

  const [isPending, startTransition] = useTransition();
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const buildQueryParams = (s: string, cats: Set<CourseCategory>): URLSearchParams => {
      const params = new URLSearchParams();
      if (s) params.set("search", s);
      if (cats.size > 0) params.set("category", Array.from(cats).join(","));
      return params;
    };

    const current = searchParams.toString();
    const next = buildQueryParams(debouncedSearch, selectedCategories).toString();

    if (current !== next) {
      startTransition(() => {
        router.replace(`?${next}`, { scroll: false });
      });
    }
  }, [debouncedSearch, selectedCategories, router, searchParams]);

  function toggleCategory(cat: CourseCategory) {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  }

  function clearFilter() {
    setSelectedCategories(new Set());
  }

  return {
    search,
    setSearch,
    filterOpen,
    setFilterOpen,
    selectedCategories,
    toggleCategory,
    clearFilter,
    isPending,
  };
}

export function CourseGridInteractive({
  initialSearch,
  initialCategories,
  total,
  categoryCounts,
  children,
}: CourseGridInteractiveProps) {
  const {
    search,
    setSearch,
    filterOpen,
    setFilterOpen,
    selectedCategories,
    toggleCategory,
    clearFilter,
    isPending,
  } = useCourseFilters(initialSearch, initialCategories);

  const gridCols = filterOpen
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className="space-y-6 pt-8">
      {/* Header */}
      <h1 className="text-xl font-semibold text-secondary-text font-heading">
        Daftar kursus ({isPending ? "..." : total.toLocaleString("id-ID")})
      </h1>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <FilterButton
          isOpen={filterOpen}
          activeCount={selectedCategories.size}
          onClick={() => setFilterOpen((v) => !v)}
        />
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Content */}
      <div className="flex gap-6 items-start">
        {filterOpen && (
          <FilterModal
            selected={selectedCategories}
            onToggle={toggleCategory}
            onClear={clearFilter}
            categoryCounts={categoryCounts}
          />
        )}
        <div className="flex-1">
          <div className={`grid gap-6 ${gridCols} ${isPending ? 'opacity-50 pointer-events-none' : ''}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
