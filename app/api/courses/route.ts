import { NextRequest, NextResponse } from 'next/server'
import { delay } from '@/lib/utils/delay'
import { ALL_COURSES } from '@/lib/data/courses'

export async function GET(req: NextRequest) {
  await delay(600)

  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search')?.toLowerCase() ?? ''
  const categoryParam = searchParams.get('category') ?? ''
  const categories = categoryParam
    ? categoryParam.split(',').map((c) => c.trim()).filter(Boolean)
    : []

  let searchFiltered = ALL_COURSES

  if (search) {
    searchFiltered = searchFiltered.filter(
      (c) =>
        c.title.toLowerCase().includes(search) ||
        c.category.toLowerCase().includes(search) ||
        c.currentLesson.toLowerCase().includes(search)
    )
  }

  const categoryCounts = searchFiltered.reduce((acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  let finalCourses = searchFiltered;

  if (categories.length > 0) {
    finalCourses = finalCourses.filter((c) => categories.includes(c.category))
  }

  return NextResponse.json({
    courses: finalCourses,
    total: finalCourses.length,
    categoryCounts,
  })
}
