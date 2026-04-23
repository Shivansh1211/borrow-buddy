import { Link } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar.jsx'
import { Button } from '../components/ui/Button.jsx'
import { Card } from '../components/ui/Card.jsx'
import { ClipboardList, Shield, Users, ArrowRight } from 'lucide-react'

const features = [
  {
    icon: ClipboardList,
    title: 'Track items',
    description:
      'Listings show WhatsApp or Instagram—tap Borrow to send a ready-made message with your contact details.',
  },
  {
    icon: Shield,
    title: 'Safe lending',
    description:
      'Built for trust: clear ownership, availability, and simple handoffs between trusted users.',
  },
  {
    icon: Users,
    title: 'Community driven',
    description:
      'Join a growing community of people sharing items securely and building a local rental economy.',
  },
]

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-brand-50/30">
      <Navbar />

      <section className="relative overflow-hidden px-4 pt-12 pb-20 sm:px-6 sm:pt-16 sm:pb-28 lg:pt-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-flex items-center justify-center gap-2 rounded-full border border-brand-200/80 bg-white/80 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-brand-700 shadow-sm">
            For everyone, everywhere
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 text-balance sm:text-5xl lg:text-6xl">
            Borrow Buddy
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600 sm:text-xl">
            Borrow smarter. Return responsibly.
          </p>
          <p className="mx-auto mt-3 max-w-lg text-slate-500">
            Rent out your gear or borrow what you need. A calm, modern way to lend and borrow
            in your neighborhood—without the hassle.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/auth">
              <Button size="lg" className="min-w-[200px] shadow-card">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <a href="#features">
              <Button variant="secondary" size="lg" className="min-w-[200px]">
                See features
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-slate-100 bg-white/80 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
              Everything you need to share safely
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-slate-600">
              Three pillars that make Borrow Buddy feel like a real product—not a weekend prototype.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title} hover className="transition-transform duration-300">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-50/80 px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} Borrow Buddy. Demo UI.</p>
          <Link to="/auth" className="text-sm font-medium text-brand-700 hover:text-brand-800">
            Create an account →
          </Link>
        </div>
      </footer>
    </div>
  )
}
