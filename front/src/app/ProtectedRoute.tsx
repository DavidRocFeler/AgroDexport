// components/ProtectedRoute.tsx
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/useUserStore'
import { IProtectedRouteProps } from '@/interface/types'

export default function ProtectedRoute({ 
  children, 
  allowedRoles = [] 
}: IProtectedRouteProps) {
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