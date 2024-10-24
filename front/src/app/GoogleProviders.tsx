//front/src/app/GoogleProoviders.tsx
"use client"
import { SessionProvider } from 'next-auth/react'

const GoogleProviders = ({children}: {children: React.ReactNode}) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default GoogleProviders;
