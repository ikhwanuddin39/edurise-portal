import { NextRequest, NextResponse } from 'next/server'
import { delay } from '@/lib/utils/delay'
import { readUserProfile, writeUserProfile } from '@/lib/data/userProfileStore'

export async function PUT(req: NextRequest) {
  await delay(800)
  const { currentPassword, newPassword } = await req.json()

  const profile = readUserProfile()

  if (profile.password !== currentPassword) {
    return NextResponse.json(
      { message: 'Password saat ini tidak tepat' },
      { status: 400 }
    )
  }

  writeUserProfile({ ...profile, password: newPassword })

  return NextResponse.json({ message: 'Password berhasil diubah' })
}
