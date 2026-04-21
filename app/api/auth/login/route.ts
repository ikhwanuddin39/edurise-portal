import { NextRequest, NextResponse } from 'next/server'
import { delay } from '@/lib/utils/delay'
import { readUserProfile } from '@/lib/data/userProfileStore'

export async function POST(req: NextRequest) {
  await delay(1000)

  const body = await req.json()
  const { email, password } = body

  if (!email || !password) {
    return NextResponse.json(
      { message: 'Email dan password wajib diisi' },
      { status: 400 }
    )
  }

  // Validate against JSON file
  const profile = readUserProfile()

  if (email !== profile.email || password !== profile.password) {
    return NextResponse.json(
      { message: 'Email atau password salah' },
      { status: 401 }
    )
  }

  const token = 'mock-jwt-token-' + Date.now()

  const response = NextResponse.json({
    user: {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      username: profile.username,
      avatarUrl: profile.avatarUrl,
    },
    token,
  })

  response.cookies.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  return response
}
