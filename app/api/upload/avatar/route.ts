import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir, unlink } from 'fs/promises'
import path from 'path'
import { readUserProfile, writeUserProfile } from '@/lib/data/userProfileStore'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('avatar') as File | null

    if (!file) {
      return NextResponse.json({ message: 'File tidak ditemukan' }, { status: 400 })
    }

    // Validate type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ message: 'Hanya file gambar yang diperbolehkan' }, { status: 400 })
    }

    // Validate size (max 1MB)
    if (file.size > 1024 * 1024) {
      return NextResponse.json({ message: 'Ukuran file maksimal 1MB' }, { status: 400 })
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadDir, { recursive: true })

    // Delete old avatar file if it was previously uploaded (not external URL)
    const profile = readUserProfile()
    if (profile.avatarUrl?.startsWith('/uploads/')) {
      const oldFilePath = path.join(process.cwd(), 'public', profile.avatarUrl)
      try {
        await unlink(oldFilePath)
      } catch {
        // File might already be gone — ignore
      }
    }

    // Save new file
    const ext = file.name.split('.').pop() ?? 'jpg'
    const filename = `avatar-${Date.now()}.${ext}`
    const bytes = await file.arrayBuffer()
    await writeFile(path.join(uploadDir, filename), Buffer.from(bytes))

    const avatarUrl = `/uploads/${filename}`

    // Persist new avatarUrl to JSON store
    writeUserProfile({ ...profile, avatarUrl })

    return NextResponse.json({ avatarUrl, message: 'Foto berhasil diupload' })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'Terjadi kesalahan saat upload' }, { status: 500 })
  }
}
