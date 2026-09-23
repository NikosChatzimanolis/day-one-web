// ── components/work/NexusMock.tsx ──
// Astrala Nexus: candidates table with pipeline stages and a profile panel.
// Placeholder people only ("Candidate A", initials "AB"); departments stand in
// for roles.
import { Users, Briefcase, GitBranch, Building2, Settings, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Candidates', icon: Users, active: true },
  { label: 'Jobs', icon: Briefcase },
  { label: 'Pipeline', icon: GitBranch },
  { label: 'Clients', icon: Building2 },
  { label: 'Settings', icon: Settings },
]

const stageTone: Record<string, string> = {
  Interview: 'bg-rust/12 text-rust',
  Shortlist: 'bg-surface-deep text-text-secondary',
  New: 'bg-[#8FAF7E]/20 text-[#4F6B44]',
  Offer: 'bg-[#E0A23F]/20 text-[#7A5210]',
}

const rows = [
  { initials: 'AB', name: 'Candidate A', role: 'Product', stage: 'Interview', updated: '2 days ago' },
  { initials: 'CD', name: 'Candidate B', role: 'Engineering', stage: 'Shortlist', updated: '3 days ago' },
  { initials: 'EF', name: 'Candidate C', role: 'Design', stage: 'New', updated: '3 days ago' },
  { initials: 'GH', name: 'Candidate D', role: 'Operations', stage: 'Offer', updated: '4 days ago' },
  { initials: 'JK', name: 'Candidate E', role: 'Finance', stage: 'Interview', updated: '5 days ago' },
]

const lines = ['w-[92%]', 'w-[76%]', 'w-[84%]', 'w-[60%]']

export default function NexusMock() {
  return (
    <div className="flex h-full w-full overflow-hidden rounded-md border border-line bg-card text-[10px] leading-none sm:text-[11px]">
      {/* sidebar */}
      <aside className="hidden w-[24%] max-w-[140px] shrink-0 flex-col border-r border-line bg-surface p-3 sm:flex sm:p-4">
        <div className="flex items-center gap-1.5 px-1 text-text-primary">
          <span className="block h-3 w-3 rounded-full border border-rust/70" />
          <span className="font-body font-medium tracking-wide">Astrala Nexus</span>
        </div>
        <ul className="mt-4 flex flex-col gap-0.5">
          {navItems.map(({ label, icon: Icon, active }) => (
            <li
              key={label}
              className={cn(
                'flex items-center gap-2 rounded px-2 py-1.5',
                active ? 'bg-card text-rust' : 'text-text-secondary'
              )}
            >
              <Icon size={11} strokeWidth={1.6} />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* table */}
      <div className="flex min-w-0 flex-1 flex-col px-3 pb-3 pt-3 sm:px-4 sm:pt-4">
        <div className="flex items-center justify-between gap-2">
          <span className="font-display text-[13px] text-text-primary sm:text-[15px]">Candidates</span>
          <span className="flex items-center gap-1.5">
            <span className="hidden items-center gap-1 rounded border border-line px-1.5 py-1 text-text-tertiary sm:flex">
              <Search size={9} strokeWidth={1.6} />
              Search
            </span>
            <span className="rounded border border-line px-1.5 py-1 text-text-secondary">All roles</span>
            <span className="rounded border border-line px-1.5 py-1 text-text-secondary">All stages</span>
          </span>
        </div>

        <div className="mt-2.5 grid grid-cols-[1.5fr_1fr_0.9fr_0.9fr] gap-2 border-b border-line pb-1.5 text-text-tertiary">
          <span>Name</span>
          <span>Role</span>
          <span>Stage</span>
          <span>Updated</span>
        </div>

        <ul className="flex flex-col">
          {rows.map((r) => (
            <li
              key={r.name}
              className="grid grid-cols-[1.5fr_1fr_0.9fr_0.9fr] items-center gap-2 border-b border-line py-1.5 last:border-b-0"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-surface-deep text-[7px] font-medium text-text-primary">
                  {r.initials}
                </span>
                <span className="truncate text-text-primary">{r.name}</span>
              </span>
              <span className="truncate text-text-secondary">{r.role}</span>
              <span>
                <span className={cn('inline-block rounded-sm px-1.5 py-0.5', stageTone[r.stage])}>{r.stage}</span>
              </span>
              <span className="truncate text-text-tertiary">{r.updated}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* profile panel */}
      <aside className="hidden w-[28%] max-w-[170px] shrink-0 flex-col border-l border-line bg-surface p-3 md:flex md:p-4">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-deep text-[8px] font-medium text-text-primary">
            AB
          </span>
          <span className="flex flex-col gap-1">
            <span className="text-text-primary">Candidate A</span>
            <span className="text-text-tertiary">Product</span>
          </span>
        </div>
        <div className="mt-3 flex gap-3 border-b border-line pb-1.5">
          <span className="border-b border-rust pb-1 text-rust">Profile</span>
          <span className="text-text-tertiary">CV</span>
          <span className="text-text-tertiary">Activity</span>
        </div>
        <div className="mt-3 flex flex-col gap-1.5">
          {lines.map((w, i) => (
            <span key={i} className={cn('block h-1 rounded-full bg-surface-deep', w)} />
          ))}
        </div>
      </aside>
    </div>
  )
}
