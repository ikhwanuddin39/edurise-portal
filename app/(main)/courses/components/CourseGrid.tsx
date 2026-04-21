import { serverFetch } from "@/lib/api/serverFetch";
import { CourseGridInteractive } from "./CourseGridInteractive";
import { CourseCard } from "@/components/shared/CourseCard";
import { EmptyState } from "@/components/shared/EmptyState";
import type { CourseCategory, Course } from "@/types/course";

export async function CourseGrid({ search, category }: { search: string; category: string }) {
  const query = new URLSearchParams();
  if (search) query.set("search", search);
  if (category) query.set("category", category);

  const { courses, total, categoryCounts } = await serverFetch(`/api/courses?${query.toString()}`);

  let initialCategories: CourseCategory[] = [];

  if (category) {
    initialCategories = category
      .split(",")
      .map((cat) => cat.trim())
      .filter((cat) => cat !== "") as CourseCategory[];
  }

  return (
    <CourseGridInteractive
      initialSearch={search}
      initialCategories={initialCategories}
      total={total}
      categoryCounts={categoryCounts || {}}
    >
      {courses.length === 0 ? (
        <div className="col-span-full">
          <EmptyState
            title="Kursus tidak ditemukan"
            description="Coba ubah kata kunci atau filter kategori."
          />
        </div>
      ) : (
        courses.map((course: Course) => (
          <CourseCard
            key={course.id}
            variant="recommendation"
            courseName={course.title}
            moduleName={`${course.currentLessonNumber}. ${course.currentLesson}`}
            imageUrl={course.thumbnail}
            category={course.category}
          />
        ))
      )}
    </CourseGridInteractive>
  );
}

export function CourseGridSkeleton() {
  return (
    <div className="space-y-6 pt-8">
      {/* Header */}
      <div className="h-8 w-48 bg-gray-100 animate-pulse rounded" />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="h-10 w-24 bg-gray-100 animate-pulse rounded-xl" />
        <div className="h-10 w-64 bg-gray-100 animate-pulse rounded-full" />
      </div>

      {/* Content */}
      <div className="flex gap-6 items-start">
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-95 bg-gray-100 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
