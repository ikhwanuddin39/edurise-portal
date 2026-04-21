import { NextRequest, NextResponse } from 'next/server'
import { delay } from '@/lib/utils/delay'
import { readUserProfile, writeUserProfile } from '@/lib/data/userProfileStore'

export async function PUT(req: NextRequest) {
  await delay(800)
  const body = await req.json()

  const current = readUserProfile()
  const updated = {
    ...current,
    firstName: body.firstName ?? current.firstName,
    lastName: body.lastName ?? current.lastName,
    name: `${body.firstName ?? current.firstName} ${body.lastName ?? current.lastName}`.trim(),
    email: body.email ?? current.email,
    username: body.username ?? current.username,
    phone: body.phone ?? current.phone,
    jobTitle: body.jobTitle ?? current.jobTitle,
  }

  writeUserProfile(updated)

  return NextResponse.json({ user: updated, message: 'Profil berhasil disimpan' })
}
