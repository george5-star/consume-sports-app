'use client'

import { signOut } from 'next-auth/react'

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/auth/signin' })}
      className="text-gray-300 hover:text-white transition-colors"
    >
      Sign out
    </button>
  )
} 