import Link from "next/link";
import { CourseCard } from "@/components/shared/CourseCard";
import { serverFetch } from "@/lib/api/serverFetch";
import type { Course } from "@/types/course";

export async function RecommendationSection() {
    const { courses } = await serverFetch("/api/dashboard/recommendations");

    return (
        <section className="mt-10">
            <h2 className="text-xl font-semibold mb-6 font-heading">
                Rekomendasi kursus
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.map((course: Course, index: number) => (
                    <CourseCard
                        key={course.id}
                        variant="recommendation"
                        courseName={course.title}
                        moduleName={`${course.currentLessonNumber}. ${course.currentLesson}`}
                        imageUrl={course.thumbnail}
                        category={course.category}
                        priority={index === 0}
                    />
                ))}
            </div>

            <div className="mt-8">
                <Link
                    href="/courses"
                    className="block w-full py-3.5 bg-white border border-gray-300 hover:bg-gray-50 text-[14px] font-semibold text-gray-700 rounded-xl transition-colors text-center"
                >
                    Lihat Lebih Banyak
                </Link>
            </div>
        </section>
    );
}

export function RecommendationSkeleton() {
    return (
        <section className="mt-10">
            <h2 className="text-xl font-semibold mb-6 font-heading">
                Rekomendasi kursus
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="h-90 bg-gray-100 animate-pulse rounded-2xl"
                    />
                ))}
            </div>
            <div className="mt-8">
                <div className="w-full py-3.5 bg-gray-100 animate-pulse rounded-xl h-[46px]" />
            </div>
        </section>
    );
}
