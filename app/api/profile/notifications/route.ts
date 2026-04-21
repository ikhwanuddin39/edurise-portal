import { NextRequest, NextResponse } from 'next/server'
import { delay } from '@/lib/utils/delay'
import { readUserProfile, writeUserProfile } from '@/lib/data/userProfileStore'

export async function GET() {
  const profile = readUserProfile()
  return NextResponse.json({ notifications: profile.notifications })
}

export async function PUT(req: NextRequest) {
  await delay(500)
  const body = await req.json()

  const profile = readUserProfile()
  const updated = { ...profile, notifications: { ...profile.notifications, ...body } }
  writeUserProfile(updated)

  return NextResponse.json({ settings: updated.notifications, message: 'Berhasil disimpan' })
}
