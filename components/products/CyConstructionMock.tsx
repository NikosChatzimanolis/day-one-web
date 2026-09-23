// ── components/products/CyConstructionMock.tsx ──
// CY-Construction: dark sidebar, sites table with progress bars and status
// dots. Placeholder data only ("Site 1", "Project A", initials "AB").
import { Building2, ClipboardList, FolderKanban, Settings, Users, BarChart3, Search, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Sites', icon: Building2, active: true },
  { label: 'Projects', icon: FolderKanban },
  { label: 'Tasks', icon: ClipboardList },
  { label: 'Team', icon: Users },
  { label: 'Reports', icon: BarChart3 },
  { label: 'Settings', icon: Settings },
]

const rows = [
  { site: 'Site 1', project: 'Project A', progress: 72, tasks: 24, status: [18, 5, 1] },
  { site: 'Site 2', project: 'Project B', progress: 54, tasks: 16, status: [10, 4, 2] },
  { site: 'Site 3', project: 'Project C', progress: 31, tasks: 28, status: [12, 12, 4] },
  { site: 'Site 4', project: 'Project D', progress: 88, tasks: 14, status: [11, 2, 1] },
]

const dot = ['bg-[#8FAF7E]', 'bg-[#E0A23F]', 'bg-rust']

export default function CyConstructionMock() {
  return (
    <div className="flex h-full w-full overflow-hidden rounded-md border border-line bg-card text-[10px] leading-none sm:text-[11px]">
      {/* sidebar */}
      <aside className="hidden w-[29%] max-w-[150px] shrink-0 flex-col bg-dark p-3 text-dark-text sm:flex sm:p-4">
        <div className="flex items-center gap-1.5 px-1">
          <span className="block h-3 w-3 rounded-[3px] border border-rust/70" />
          <span className="font-body font-medium tracking-wide">CY-Construction</span>
        </div>
        <ul className="mt-4 flex flex-col gap-0.5">
          {navItems.map(({ label, icon: Icon, active }) => (
            <li
              key={label}
              className={cn(
                'flex items-center gap-2 rounded px-2 py-1.5',
                active ? 'bg-dark-raised text-dark-text' : 'text-dark-text-secondary'
              )}
            >
              <Icon size={11} strokeWidth={1.6} />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-line px-3 py-2 sm:px-4">
          <span className="flex gap-1">
            <span className="block h-1.5 w-8 rounded-full bg-surface-deep" />
            <span className="block h-1.5 w-5 rounded-full bg-surface-deep" />
          </span>
          <span className="flex items-center gap-1.5 text-text-secondary">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-surface-deep text-[8px] font-medium text-text-primary">
              AB
            </span>
            <span className="hidden sm:inline">Project manager</span>
          </span>
        </div>

        <div className="flex flex-1 flex-col px-3 pb-3 pt-2.5 sm:px-4 sm:pt-3">
          <div className="flex items-center justify-between gap-2">
            <span className="font-display text-[13px] text-text-primary sm:text-[15px]">Sites</span>
            <span className="flex items-center gap-1.5">
              <span className="hidden items-center gap-1 rounded border border-line px-1.5 py-1 text-text-tertiary sm:flex">
                <Search size={9} strokeWidth={1.6} />
                Search
              </span>
              <span className="rounded border border-line px-1.5 py-1 text-text-secondary">All sites</span>
              <span className="rounded border border-line px-1.5 py-1 text-text-secondary">Active</span>
              <span className="flex items-center gap-1 rounded bg-rust px-1.5 py-1 text-bg">
                <Plus size={9} strokeWidth={2} />
                Add site
              </span>
            </span>
          </div>

          <div className="mt-2.5 grid grid-cols-[1.5fr_1fr_0.7fr_0.9fr] gap-2 border-b border-line pb-1.5 text-text-tertiary">
            <span>Project</span>
            <span>Progress</span>
            <span>Tasks</span>
            <span>Status</span>
          </div>

          <ul className="flex flex-col">
            {rows.map((r) => (
              <li
                key={r.site}
                className="grid grid-cols-[1.5fr_1fr_0.7fr_0.9fr] items-center gap-2 border-b border-line py-2 last:border-b-0"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span className="block h-5 w-6 shrink-0 rounded-[3px] bg-surface-deep" />
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="truncate text-text-primary">{r.site}</span>
                    <span className="truncate text-text-tertiary">{r.project}</span>
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="block h-1 flex-1 rounded-full bg-surface-deep">
                    <span className="block h-1 rounded-full bg-rust" style={{ width: `${r.progress}%` }} />
                  </span>
                  <span className="w-6 text-right tabular-nums text-text-secondary">{r.progress}%</span>
                </span>
                <span className="text-text-secondary">{r.tasks} tasks</span>
                <span className="flex items-center gap-1.5 tabular-nums text-text-secondary">
                  {r.status.map((n, i) => (
                    <span key={i} className="flex items-center gap-0.5">
                      <span className={cn('block h-1.5 w-1.5 rounded-full', dot[i])} />
                      {n}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
