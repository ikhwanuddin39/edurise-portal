import { NextResponse } from 'next/server'
import { delay } from '@/lib/utils/delay'
import type { DashboardData } from '@/types/dashboard'

const MOCK_DATA: DashboardData = {
  stats: {
    totalEnrolled: 957,
    activeCourses: 6,
    completedCourses: 951,
  },
  enrolledCourses: [
    {
      id: 'c-001',
      title: 'Belajar Pemrograman di Tahun 2025',
      currentLesson: 'Perkenalan dengan CSS',
      category: 'IT',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
      totalLessons: 20,
      currentLessonNumber: 10,
      progress: 100,
      isCompleted: true,
    },
    {
      id: 'c-002',
      title: 'Membangun Restoran di Tahun 2025',
      currentLesson: 'Pembuatan business model',
      category: 'Bisnis',
      thumbnail: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
      totalLessons: 8,
      currentLessonNumber: 2,
      progress: 25,
      isCompleted: false,
    },
    {
      id: 'c-003',
      title: 'Belajar Desain Interior',
      currentLesson: 'Perkenalan dengan Autocad',
      category: 'Desain',
      thumbnail: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400',
      totalLessons: 12,
      currentLessonNumber: 5,
      progress: 0,
      isCompleted: false,
    },
  ],
  recommendedCourses: [
    {
      id: 'r-001',
      title: 'Belajar 3D Modelling dengan Blender',
      currentLesson: 'Perkenalan dengan rigging',
      category: 'Desain',
      thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      totalLessons: 15,
      currentLessonNumber: 5,
    },
    {
      id: 'r-002',
      title: 'Belajar Coding dengan Javascript',
      currentLesson: 'Belajar variable',
      category: 'IT',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
      totalLessons: 22,
      currentLessonNumber: 3,
    },
    {
      id: 'r-003',
      title: '3D Modelling Lanjutan dengan 3Ds Max',
      currentLesson: 'Perkenalan vertex',
      category: 'Desain',
      thumbnail: 'https://images.unsplash.com/photo-1617396900799-f4ec2b43c7d3?w=400',
      totalLessons: 18,
      currentLessonNumber: 10,
    },
    {
      id: 'r-004',
      title: 'Belajar Visualisasi Data dengan Tableu',
      currentLesson: 'Jenis jenis diagram',
      category: 'Visualisasi data',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      totalLessons: 10,
      currentLessonNumber: 2,
    },
  ],
}

export async function GET() {
  await delay(800)
  return NextResponse.json(MOCK_DATA)
}
