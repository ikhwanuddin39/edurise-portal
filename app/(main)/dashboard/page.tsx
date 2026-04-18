import { MyCourseSection } from "./components/MyCourseSection";
import { StatsCards } from "./components/StatsCards";

export default function DashboardPage() {
    return (
        <div className="mx-auto max-w-5xl">
            <h1 className="text-2xl font-medium font-heading">Dashboard</h1>
            <StatsCards />
            <MyCourseSection />
        </div>
    );
}
