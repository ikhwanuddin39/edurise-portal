import { delay } from '@/lib/utils/delay';
import type { EnrolledCourse, Course } from '@/types/course';

export const ALL_COURSES: Course[] = [
  { id: '1', title: 'Belajar 3D Modelling dengan Blender', currentLesson: 'Perkenalan dengan rigging', category: 'Desain', thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', totalLessons: 15, currentLessonNumber: 5 },
  { id: '2', title: 'Belajar Coding dengan Javascript', currentLesson: 'Belajar variable', category: 'IT', thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400', totalLessons: 22, currentLessonNumber: 3 },
  { id: '3', title: '3D Modelling Lanjutan dengan 3Ds Max', currentLesson: 'Perkenalan vertex', category: 'Desain', thumbnail: 'https://images.unsplash.com/photo-1666235729156-7fc93d7922ff?w=400', totalLessons: 18, currentLessonNumber: 10 },
  { id: '4', title: 'Belajar Visualisasi Data dengan Tableu', currentLesson: 'Jenis jenis diagram', category: 'Visualisasi data', thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400', totalLessons: 10, currentLessonNumber: 2 },
  { id: '5', title: 'Manajemen Proyek dengan Excel', currentLesson: 'Belajar pivot table', category: 'Keuangan', thumbnail: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=400', totalLessons: 8, currentLessonNumber: 10 },
  { id: '6', title: 'Desain Furniture dengan Sketch up', currentLesson: 'Perkenalan sketch up warehouse', category: 'Desain', thumbnail: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', totalLessons: 12, currentLessonNumber: 4 },
  { id: '7', title: 'Motion Grafis dengan After Effect', currentLesson: 'Teknik stop motion', category: 'Desain', thumbnail: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400', totalLessons: 14, currentLessonNumber: 4 },
  { id: '8', title: 'Manipulasi foto dengan Photoshop', currentLesson: 'Mengenal layer', category: 'Desain', thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400', totalLessons: 16, currentLessonNumber: 3 },
  { id: '9', title: 'Pemrograman Python untuk Data Science', currentLesson: 'Pandas DataFrame', category: 'Pemrograman', thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400', totalLessons: 20, currentLessonNumber: 7 },
  { id: '10', title: 'Akuntansi Dasar untuk Bisnis', currentLesson: 'Laporan keuangan', category: 'Keuangan', thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400', totalLessons: 10, currentLessonNumber: 2 },
  { id: '11', title: 'UI/UX Design dengan Figma', currentLesson: 'Auto layout', category: 'Desain', thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400', totalLessons: 18, currentLessonNumber: 6 },
  { id: '12', title: 'Strategi Bisnis Digital', currentLesson: 'Customer journey', category: 'Bisnis', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', totalLessons: 12, currentLessonNumber: 3 },
  { id: 'c1', title: 'Belajar Pemrograman di Tahun 2025', currentLesson: 'Perkenalan dengan CSS', category: 'Pemrograman', thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800', totalLessons: 10, currentLessonNumber: 10 },
  { id: 'c2', title: 'Membangun Restoran di Tahun 2025', currentLesson: 'Pembuatan business model', category: 'Bisnis', thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800', totalLessons: 8, currentLessonNumber: 2 },
  { id: 'c3', title: 'Belajar Desain Interior', currentLesson: 'Perkenalan dengan Autocad', category: 'Desain', thumbnail: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800', totalLessons: 15, currentLessonNumber: 5 },
];

export const ENROLLED_COURSES: EnrolledCourse[] = [
  { ...ALL_COURSES.find(c => c.id === 'c1')!, progress: 100, isCompleted: true },
  { ...ALL_COURSES.find(c => c.id === 'c2')!, progress: 25, isCompleted: false },
  { ...ALL_COURSES.find(c => c.id === 'c3')!, progress: 0, isCompleted: false },
];

export async function getEnrolledCourses() {
  await delay(500);
  return { courses: ENROLLED_COURSES, total: ENROLLED_COURSES.length };
}

export const RECOMMENDATIONS: Course[] = ALL_COURSES.filter(c => ['1', '2', '3', '4'].includes(c.id));

export async function getRecommendations() {
  await delay(500);
  return { courses: RECOMMENDATIONS };
}

