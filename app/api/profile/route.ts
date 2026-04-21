import { NextResponse } from 'next/server'
import { delay } from '@/lib/utils/delay'
import { readUserProfile } from '@/lib/data/userProfileStore'

export async function GET() {
  await delay(600)
  const profile = readUserProfile()
  
  return NextResponse.json(profile)
}
