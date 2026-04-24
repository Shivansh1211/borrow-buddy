import { useState, useEffect } from 'react'
import { DashboardLayout } from '../components/layout/DashboardLayout.jsx'
import { Card } from '../components/ui/Card.jsx'
import { Button } from '../components/ui/Button.jsx'
import { Input } from '../components/ui/Input.jsx'
import { Users, Plus, KeyRound } from 'lucide-react'

export function Communities() {
  const [communities, setCommunities] = useState([])
  const [loading, setLoading] = useState(true)
  
  const [joinCode, setJoinCode] = useState('')
  const [newCommunityName, setNewCommunityName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchCommunities = async () => {
    try {
      const token = localStorage.getItem('borrow-buddy-token')
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/communities/my-communities`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setCommunities(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCommunities()
  }, [])

  const handleJoin = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      const token = localStorage.getItem('borrow-buddy-token')
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/communities/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ inviteCode: joinCode })
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess('Successfully joined community!')
        setJoinCode('')
        fetchCommunities()
      } else {
        setError(data.message || 'Failed to join community')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      const token = localStorage.getItem('borrow-buddy-token')
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/communities/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: newCommunityName })
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess(`Community created! Invite code: ${data.inviteCode}`)
        setNewCommunityName('')
        fetchCommunities()
      } else {
        setError(data.message || 'Failed to create community')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    }
  }

  return (
    <DashboardLayout
      title="My Communities"
      subtitle="Join private communities or create your own to start sharing items."
    >
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 font-medium">
          {success}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card className="shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-brand-700">
            <KeyRound className="h-5 w-5" />
            <h2 className="font-semibold text-lg text-slate-900">Join a Community</h2>
          </div>
          <form onSubmit={handleJoin} className="space-y-4">
            <Input
              id="joinCode"
              label="Invite Code"
              placeholder="e.g. A1B2C3"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            />
            <Button type="submit" disabled={!joinCode.trim()}>Join Community</Button>
          </form>
        </Card>

        <Card className="shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-brand-700">
            <Plus className="h-5 w-5" />
            <h2 className="font-semibold text-lg text-slate-900">Create a Community</h2>
          </div>
          <form onSubmit={handleCreate} className="space-y-4">
            <Input
              id="newCommunityName"
              label="Community Name"
              placeholder="e.g. Horizon Hostel"
              value={newCommunityName}
              onChange={(e) => setNewCommunityName(e.target.value)}
            />
            <Button type="submit" disabled={!newCommunityName.trim()} variant="secondary">Create Community</Button>
          </form>
        </Card>
      </div>

      <h3 className="font-display text-xl font-semibold text-slate-900 mb-4">Your Communities</h3>
      {loading ? (
        <div className="text-sm text-slate-500">Loading communities...</div>
      ) : communities.length === 0 ? (
        <div className="text-sm text-slate-500">You haven't joined any communities yet.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {communities.map(community => (
            <Card key={community._id} className="shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-brand-50 text-brand-600 rounded-lg">
                  <Users className="h-5 w-5" />
                </div>
                <h4 className="font-semibold text-slate-900">{community.name}</h4>
              </div>
              <p className="text-sm text-slate-500 bg-slate-50 p-2 rounded inline-block mt-2 font-mono">
                Code: {community.inviteCode}
              </p>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
