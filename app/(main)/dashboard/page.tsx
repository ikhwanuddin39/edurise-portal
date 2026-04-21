import { MyCourseSection, MyCourseSkeleton } from "./components/MyCourseSection";
import { StatsCards, StatsCardsSkeleton } from "./components/StatsCards";
import { RecommendationSection, RecommendationSkeleton } from "./components/RecommendationSection";
import { Suspense } from "react";

export default function DashboardPage() {
    return (
        <div className="mx-auto max-w-7xl px-10 pt-10">
            {/* Main Header */}
            <h1 className="text-[20px] font-semibold font-heading text-[#334155]">
                Dashboard
            </h1>

            {/* Stat Cards */}
            <Suspense fallback={<StatsCardsSkeleton />}>
                <StatsCards />
            </Suspense>

            {/* Purchased/Enrolled Courses grid */}
            <Suspense fallback={<MyCourseSkeleton />}>
                <MyCourseSection />
            </Suspense>

            {/* Catalog Recommendations */}
            <Suspense fallback={<RecommendationSkeleton />}>
                <RecommendationSection />
            </Suspense>
        </div>
    );
}
