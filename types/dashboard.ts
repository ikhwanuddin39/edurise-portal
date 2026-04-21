import type { Course, EnrolledCourse } from './course'

export interface DashboardStats {
  totalEnrolled: number
  activeCourses: number
  completedCourses: number
}

export interface DashboardData {
  stats: DashboardStats
  enrolledCourses: EnrolledCourse[]
  recommendedCourses: Course[]
}
