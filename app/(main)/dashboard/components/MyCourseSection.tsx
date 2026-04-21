import { CourseCard } from "@/components/shared/CourseCard";
import { serverFetch } from "@/lib/api/serverFetch";
import type { EnrolledCourse } from "@/types/course";

export async function MyCourseSection() {
    const { courses } = await serverFetch("/api/dashboard/enrolled-courses");

    return (
        <section className="mt-10">
            <h2 className="text-xl font-semibold mb-6 font-heading">
                Kursus saya ({courses.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.map((course: EnrolledCourse) => (
                    <CourseCard
                        key={course.id}
                        variant="enrolled"
                        courseName={course.title}
                        moduleName={`${course.currentLessonNumber}. ${course.currentLesson}`}
                        progress={course.progress}
                        imageUrl={course.thumbnail}
                    />
                ))}
            </div>
        </section>
    );
}

export function MyCourseSkeleton() {
    return (
        <section className="mt-10">
            <h2 className="text-xl font-semibold mb-6 font-heading">Kursus saya (...)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="h-90 bg-gray-100 animate-pulse rounded-2xl"
                    />
                ))}
            </div>
        </section>
    );
}
