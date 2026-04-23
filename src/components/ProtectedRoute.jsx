import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { Skeleton } from './ui/Skeleton.jsx'

export function ProtectedRoute({ children }) {
  const { ready, isAuthenticated } = useAuth()

  if (!ready) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-4">
        <Skeleton className="h-12 w-48 rounded-2xl" />
        <Skeleton className="h-4 w-64 rounded-lg" />
        <p className="text-sm text-slate-500">Loading Borrow Buddy…</p>
      </div>
    )
  }

  if (!isAuthenticated) return <Navigate to="/auth" replace />

  return children
}
