import { NextResponse } from 'next/server'
import { getEnrolledCourses } from '@/lib/data/courses'

export async function GET() {
  const data = await getEnrolledCourses()
  return NextResponse.json(data)
}
