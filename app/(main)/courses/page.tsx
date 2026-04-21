import { CourseGrid, CourseGridSkeleton } from "./components/CourseGrid";
import { Suspense } from "react";

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const search = params.search || "";
  const categoryParam = params.category ?? "";

  return (
    <div className="mx-auto max-w-7xl px-10">
      <Suspense fallback={<CourseGridSkeleton />}>
        <CourseGrid search={search} category={categoryParam} />
      </Suspense>
    </div>
  );
}
