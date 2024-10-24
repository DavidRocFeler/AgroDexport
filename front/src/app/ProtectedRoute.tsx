// components/ProtectedRoute.tsx
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/useUserStore'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
}

export default function ProtectedRoute({ 
  children, 
  allowedRoles = [] 
}: ProtectedRouteProps) {
  const router = useRouter()
  const { role_name, isAuthenticated } = useUserStore()

  if (!isAuthenticated) {
    router.replace('/')
    return null
  }

  if (allowedRoles.length > 0 && role_name && !allowedRoles.includes(role_name)) {
    router.replace('/') 
    return null
  }

  return <>{children}</>
}