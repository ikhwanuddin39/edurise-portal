import { NextResponse } from 'next/server'
import { getRecommendations } from '@/lib/data/courses'

export async function GET() {
  const data = await getRecommendations()
  return NextResponse.json(data)
}
