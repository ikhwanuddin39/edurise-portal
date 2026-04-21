import { delay } from '@/lib/utils/delay'

export const DASHBOARD_STATS = [
  { id: 'diikuti', title: 'Kursus diikuti', value: 957 },
  { id: 'aktif',   title: 'Kursus aktif',   value: 6   },
  { id: 'selesai', title: 'Kursus selesai',  value: 951 },
];

export async function getDashboardStats() {
  await delay(400)
  return { stats: DASHBOARD_STATS }
}
