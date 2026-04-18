export type CourseStatus = 'ongoing' | 'completed' | 'not_started';

export interface Course {
   id: string;
   title: string;
   subtitle: string;
   category: string;
   thumbnail: string;
   progress: number;
   instructor?: string;
}

export interface StatCard {
   id: string;
   label: string;
   value: number;
   iconType: 'play' | 'book' | 'trophy';
}