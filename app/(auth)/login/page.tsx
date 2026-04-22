import { redirect } from 'next/navigation'
import Image from 'next/image'
import { getSessionUser } from '@/lib/auth/Session'
import { LoginForm } from './_components/LoginForm'

export default async function LoginPage() {
  return (
    <main className="min-h-screen w-full bg-white flex">
      {/* Left side: Illustration */}
      <div className="hidden lg:flex w-1/3 bg-white flex-col items-center justify-center relative">
        <div className="relative w-full h-full">
          <Image
            src="/images/Saly-10.png"
            alt="3D Character"
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 w-2/3">
        <div className="w-full mx-auto">
          {/* Header */}
          <div className="mb-10 lg:mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold text-primary mb-4">EduRise</h1>
            <p className="text-secondary-text font-medium text-base">Tingkatkan kemampuanmu, raih masa depan lebih baik</p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-secondary-text">Masuk</h2>
          </div>

          <LoginForm />
        </div>
      </div>
    </main>
  )
}
