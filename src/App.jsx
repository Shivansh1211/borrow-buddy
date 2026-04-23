import { Routes, Route, Navigate } from 'react-router-dom'
import { Landing } from './pages/Landing.jsx'
import { Auth } from './pages/Auth.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { AddItem } from './pages/AddItem.jsx'
import { Borrowed } from './pages/Borrowed.jsx'
import { Lent } from './pages/Lent.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/items/new"
        element={
          <ProtectedRoute>
            <AddItem />
          </ProtectedRoute>
        }
      />
      <Route
        path="/borrowed"
        element={
          <ProtectedRoute>
            <Borrowed />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lent"
        element={
          <ProtectedRoute>
            <Lent />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
