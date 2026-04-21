export interface SessionUser {
  id: string
  name: string
  email: string
  username: string
  avatarUrl?: string | null
  bio?: string | null
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  user: SessionUser
  token: string
}
