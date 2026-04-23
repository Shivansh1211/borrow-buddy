import { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar.jsx'
import { Card } from '../components/ui/Card.jsx'
import { Button } from '../components/ui/Button.jsx'
import { Input } from '../components/ui/Input.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { LogIn, UserPlus } from 'lucide-react'

const SHARDA_DOMAIN = '@ug.sharda.ac.in'

const initial = { name: '', registrationNumber: '', collegeEmail: '', password: '' }

function validate(values, mode) {
  const errors = {}
  const reg = values.registrationNumber.trim()

  if (mode === 'register') {
    if (!values.name.trim()) errors.name = 'Name is required'
    else if (values.name.trim().length < 2) errors.name = 'At least 2 characters'

    if (!reg) {
      errors.registrationNumber = 'Registration number is required'
    } else if (!/^[A-Za-z0-9/-]{4,}$/.test(reg)) {
      errors.registrationNumber = 'Use letters, numbers, or slashes (min 4 chars)'
    }
  }

  const emailRaw = values.collegeEmail.trim()
  if (!emailRaw) {
    errors.collegeEmail = 'College email is required'
  } else {
    const normalized = emailRaw.toLowerCase()
    if (!normalized.endsWith(SHARDA_DOMAIN)) {
      errors.collegeEmail = `Use your Sharda email ending with ${SHARDA_DOMAIN}`
    } else if (normalized.split('@').length !== 2) {
      errors.collegeEmail = 'Enter a valid email address'
    } else {
      const local = normalized.slice(0, -SHARDA_DOMAIN.length)
      const segments = local.split('.')
      if (segments.length < 2 || !segments[1]) {
        errors.collegeEmail = `Format: ${reg || 'REG'}.firstname${SHARDA_DOMAIN}`
      } else if (segments[0].toLowerCase() !== reg.toLowerCase()) {
        errors.collegeEmail =
          'The part before the first dot must match your registration number (e.g. 2023351166.shivansh)'
      } else if (!/^[a-z0-9._-]+$/i.test(local)) {
        errors.collegeEmail = 'Email contains invalid characters'
      }
    }
  }

  if (!values.password) {
    errors.password = 'Password is required'
  } else if (values.password.length < 6) {
    errors.password = 'Minimum 6 characters'
  }

  return errors
}

export function Auth() {
  const [mode, setMode] = useState('login')
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const next = validate(values, mode)
    setErrors(next)
    if (Object.keys(next).length) return

    setSubmitting(true)
    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
      const payload = mode === 'login' 
        ? { email: values.collegeEmail.trim().toLowerCase(), password: values.password }
        : { name: values.name.trim(), email: values.collegeEmail.trim().toLowerCase(), password: values.password }
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      
      if (res.ok) {
        login(data)
        navigate('/dashboard')
      } else {
        setErrors({ general: data.message || 'Authentication failed' })
      }
    } catch (error) {
      setErrors({ general: 'Network error. Please try again later.' })
    } finally {
      setSubmitting(false)
    }
  }

  const toggleMode = () => {
    setMode((m) => (m === 'login' ? 'register' : 'login'))
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-brand-50/20">
      <Navbar />
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-12 sm:px-6 sm:py-16">
        <Card className="w-full max-w-md shadow-card">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-soft">
              {mode === 'login' ? (
                <LogIn className="h-7 w-7" />
              ) : (
                <UserPlus className="h-7 w-7" />
              )}
            </div>
            <h1 className="font-display text-2xl font-bold text-slate-900">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {mode === 'login'
                ? 'Sign in with your campus details.'
                : 'Join Borrow Buddy with your college credentials.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {mode === 'register' && (
              <>
                <Input
                  id="name"
                  name="name"
                  label="Full name"
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="e.g. Shivansh Kumar"
                />
                <Input
                  id="registrationNumber"
                  name="registrationNumber"
                  label="Registration number"
                  value={values.registrationNumber}
                  onChange={handleChange}
                  error={errors.registrationNumber}
                  placeholder="e.g. 2023351166"
                  hint="Same number you use before the dot in your college email."
                />
              </>
            )}
            <Input
              id="collegeEmail"
              name="collegeEmail"
              type="email"
              label="College email ID"
              autoComplete="email"
              value={values.collegeEmail}
              onChange={handleChange}
              error={errors.collegeEmail}
              hint={mode === 'register' ? "registration.firstname@ug.sharda.ac.in — the domain is the same for everyone." : ""}
            />
            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="••••••••"
            />

            {errors.general && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                {errors.general}
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={submitting}>
              {submitting ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Register'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            {mode === 'login' ? (
              <>
                New here?{' '}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="font-semibold text-brand-700 hover:text-brand-800"
                >
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="font-semibold text-brand-700 hover:text-brand-800"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
          <p className="mt-4 text-center">
            <Link to="/" className="text-sm text-slate-500 hover:text-brand-600">
              ← Back to home
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
