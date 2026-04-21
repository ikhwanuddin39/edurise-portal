import fs from 'fs'
import path from 'path'

import { NotificationSettings } from '@/types/user'

export interface UserProfileData {
  id: string
  name: string
  firstName: string
  lastName: string
  email: string
  username: string
  avatarUrl: string | null
  phone: string
  jobTitle: string
  password: string
  notifications: NotificationSettings
}

const DATA_PATH = path.join(process.cwd(), 'data', 'user-profile.json')

export function readUserProfile(): UserProfileData {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8')
  return JSON.parse(raw) as UserProfileData
}

export function writeUserProfile(data: UserProfileData): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8')
}
