export type CourseCategory =
  | 'Desain'
  | 'IT'
  | 'Keuangan'
  | 'Bisnis'
  | 'Visualisasi data'
  | 'Pemrograman'

export interface Course {
  id: string
  title: string
  currentLesson: string
  category: CourseCategory
  thumbnail: string
  totalLessons: number
  currentLessonNumber: number
}

export interface EnrolledCourse extends Course {
  progress: number           // 0–100
  isCompleted: boolean
}

// Dua varian untuk CourseCard
export type CourseCardVariant = 'enrolled' | 'recommendation'