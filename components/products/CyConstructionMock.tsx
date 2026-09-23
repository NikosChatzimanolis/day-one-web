// ── components/products/CyConstructionMock.tsx ──
// CY-Construction: browser chrome, dark sidebar, sites table with progress
// bars and status dots. Placeholder data only ("Site 1", "Project A", "AB").
// Sized to be cropped by its frame (bleed placement), so it fills the panel.
import { Building2, ClipboardList, FolderKanban, Settings, Users, BarChart3, Search, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import MockChrome from '@/components/products/MockChrome'

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
  { site: 'Site 5', project: 'Project E', progress: 46, tasks: 19, status: [9, 7, 3] },
  { site: 'Site 6', project: 'Project F', progress: 63, tasks: 22, status: [14, 6, 2] },
]

const dot = ['bg-[#8FAF7E]', 'bg-[#E0A23F]', 'bg-rust']

export default function CyConstructionMock() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-md border border-line bg-card text-[11px] leading-none sm:text-[12px]">
      <MockChrome />
      <div className="flex min-h-0 flex-1">
        {/* sidebar */}
        <aside className="hidden w-[26%] max-w-[170px] shrink-0 flex-col bg-dark p-4 text-dark-text sm:flex">
          <div className="flex items-center gap-2 px-1">
            <span className="block h-3.5 w-3.5 rounded-[3px] border border-rust/70" />
            <span className="font-body font-medium tracking-wide">CY-Construction</span>
          </div>
          <ul className="mt-5 flex flex-col gap-1">
            {navItems.map(({ label, icon: Icon, active }) => (
              <li
                key={label}
                className={cn(
                  'flex items-center gap-2.5 rounded px-2.5 py-2',
                  active ? 'bg-dark-raised text-dark-text' : 'text-dark-text-secondary'
                )}
              >
                <Icon size={12} strokeWidth={1.6} />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* main */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5 sm:px-5">
            <span className="flex gap-1.5">
              <span className="block h-1.5 w-10 rounded-full bg-surface-deep" />
              <span className="block h-1.5 w-6 rounded-full bg-surface-deep" />
            </span>
            <span className="flex items-center gap-2 text-text-secondary">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-deep text-[9px] font-medium text-text-primary">
                AB
              </span>
              <span className="hidden sm:inline">Project manager</span>
            </span>
          </div>

          <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5 sm:px-5">
            <div className="flex items-center justify-between gap-2">
              <span className="font-display text-[15px] text-text-primary sm:text-[17px]">Sites</span>
              <span className="flex items-center gap-1.5">
                <span className="hidden items-center gap-1 rounded border border-line px-2 py-1.5 text-text-tertiary sm:flex">
                  <Search size={10} strokeWidth={1.6} />
                  Search sites, projects or tasks
                </span>
                <span className="rounded border border-line px-2 py-1.5 text-text-secondary">All sites</span>
                <span className="rounded border border-line px-2 py-1.5 text-text-secondary">Active</span>
                <span className="flex items-center gap-1 rounded bg-rust px-2 py-1.5 text-bg">
                  <Plus size={10} strokeWidth={2} />
                  Add site
                </span>
              </span>
            </div>

            <div className="mt-3.5 grid grid-cols-[1.5fr_1fr_0.7fr_0.9fr] gap-2 border-b border-line pb-2 text-text-tertiary">
              <span>Project</span>
              <span>Progress</span>
              <span>Tasks</span>
              <span>Status</span>
            </div>

            <ul className="flex flex-col">
              {rows.map((r) => (
                <li
                  key={r.site}
                  className="grid grid-cols-[1.5fr_1fr_0.7fr_0.9fr] items-center gap-2 border-b border-line py-2.5"
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span className="block h-6 w-8 shrink-0 rounded-[3px] bg-surface-deep" />
                    <span className="flex min-w-0 flex-col gap-1">
                      <span className="truncate text-text-primary">{r.site}</span>
                      <span className="truncate text-text-tertiary">{r.project}</span>
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="block h-1 flex-1 rounded-full bg-surface-deep">
                      <span className="block h-1 rounded-full bg-rust" style={{ width: `${r.progress}%` }} />
                    </span>
                    <span className="w-7 text-right tabular-nums text-text-secondary">{r.progress}%</span>
                  </span>
                  <span className="text-text-secondary">{r.tasks} tasks</span>
                  <span className="flex items-center gap-2 tabular-nums text-text-secondary">
                    {r.status.map((n, i) => (
                      <span key={i} className="flex items-center gap-1">
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
    </div>
  )
}
