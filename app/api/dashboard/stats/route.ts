import { NextResponse } from 'next/server'
import { getDashboardStats } from '@/lib/data/stats'

export async function GET() {
  const data = await getDashboardStats()
  return NextResponse.json(data)
}
