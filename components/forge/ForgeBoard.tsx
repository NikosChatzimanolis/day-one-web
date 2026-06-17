// ── components/forge/ForgeBoard.tsx ──
// A real, working mini-Forge — not a screenshot. This is the truest proof on
// the site that we build systems: the queue actually runs. You can
//   • drag task cards to reorder them within a lane (the order IS the priority),
//   • check off steps (they strike through),
//   • promote / demote a card between the Urgent and Normal lanes,
//   • watch a task settle to the bottom of its lane the moment it's fully done,
//   • add a task and see the queue grow.
// Local state only, no backend. Stays inside Forge's "Quiet Workshop" palette
// and the existing panel chrome so it reads as the real interface.
'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Reorder, useReducedMotion, AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowUp, Plus } from 'lucide-react'

// Forge's "Quiet Workshop" tokens (kept in sync with ForgeMock)
const ink = '#141210'
const inkRaised = '#1A1816'
const inkBlock = '#262320' // --color-dark-raised (reference ticket surface)
const cream = '#F5F0EA'
const creamMuted = '#A39E96'
const creamDim = '#6B665F'
const terracotta = '#C04C2A'

type LaneId = 'urgent' | 'normal'
type Step = { id: string; label: string; done: boolean }
type Task = { id: string; title: string; steps: Step[] }

const seed: Record<LaneId, Task[]> = {
  urgent: [
    {
      id: 't-news',
      title: 'Astrala — newsletter draft',
      steps: [
        { id: 's1', label: 'Draft the lead essay', done: true },
        { id: 's2', label: 'Edit & lay out', done: true },
        { id: 's3', label: 'Schedule the send', done: false },
      ],
    },
    {
      id: 't-brand',
      title: 'Astrala — brand board v2',
      steps: [
        { id: 's4', label: 'Pick the type pairing', done: false },
        { id: 's5', label: 'Export the tokens', done: false },
      ],
    },
  ],
  normal: [
    {
      id: 't-delb',
      title: 'Delbeteris — copy pass',
      steps: [
        { id: 's6', label: 'Draft the tours page', done: true },
        { id: 's7', label: 'Greek translation', done: false },
      ],
    },
    {
      id: 't-sync',
      title: 'Forge — realtime sync polish',
      steps: [
        { id: 's8', label: 'Reconnect on wake', done: false },
        { id: 's9', label: 'Optimistic order', done: false },
      ],
    },
    {
      id: 't-inv',
      title: 'Studio — June invoices',
      steps: [
        { id: 's10', label: 'Tally the hours', done: false },
        { id: 's11', label: 'Send to clients', done: false },
      ],
    },
  ],
}

// Templates the "+" cycles through, so a new card always looks like real work.
const templates: Omit<Task, 'id'>[] = [
  { title: 'Delbeteris — fleet photos', steps: [{ id: 'n1', label: 'Shortlist shots', done: false }, { id: 'n2', label: 'Retouch & crop', done: false }] },
  { title: 'Astrala — LinkedIn cadence', steps: [{ id: 'n1', label: 'Plan the week', done: false }, { id: 'n2', label: 'Queue the posts', done: false }] },
  { title: 'Forge — keyboard nav', steps: [{ id: 'n1', label: 'Map the shortcuts', done: false }, { id: 'n2', label: 'Focus rings', done: false }] },
]

const isDone = (t: Task) => t.steps.every((s) => s.done)

// fully-done tasks settle below the still-open ones, order otherwise preserved
function settle(tasks: Task[]): Task[] {
  const open = tasks.filter((t) => !isDone(t))
  const done = tasks.filter((t) => isDone(t))
  return [...open, ...done]
}

let uid = 0

export default function ForgeBoard() {
  const reduce = useReducedMotion()
  const [lanes, setLanes] = useState(seed)
  const addIndex = useRef(0)

  const spring = reduce
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 520, damping: 38, mass: 0.7 }

  function setLane(id: LaneId, tasks: Task[]) {
    setLanes((prev) => ({ ...prev, [id]: tasks }))
  }

  function toggleStep(laneId: LaneId, taskId: string, stepId: string) {
    setLanes((prev) => {
      const tasks = prev[laneId].map((t) =>
        t.id !== taskId
          ? t
          : { ...t, steps: t.steps.map((s) => (s.id === stepId ? { ...s, done: !s.done } : s)) }
      )
      return { ...prev, [laneId]: settle(tasks) }
    })
  }

  function move(from: LaneId, taskId: string) {
    const to: LaneId = from === 'urgent' ? 'normal' : 'urgent'
    setLanes((prev) => {
      const task = prev[from].find((t) => t.id === taskId)
      if (!task) return prev
      return {
        ...prev,
        [from]: prev[from].filter((t) => t.id !== taskId),
        [to]: settle([task, ...prev[to]]),
      }
    })
  }

  function addTask() {
    const tpl = templates[addIndex.current % templates.length]
    addIndex.current += 1
    const id = `new-${uid++}`
    const task: Task = { id, title: tpl.title, steps: tpl.steps.map((s, i) => ({ ...s, id: `${id}-${i}` })) }
    setLanes((prev) => ({ ...prev, normal: [task, ...prev.normal] }))
  }

  const total = lanes.urgent.length + lanes.normal.length
  const doneCount = [...lanes.urgent, ...lanes.normal].filter(isDone).length

  return (
    <div className="rounded-xl overflow-hidden shadow-card" style={{ background: ink, border: '1px solid #34302B' }}>
      {/* top chrome */}
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: inkRaised, borderBottom: '1px solid #34302B' }}>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(224,87,63,0.6)' }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(224,162,63,0.5)' }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(143,175,126,0.5)' }} />
        </span>
        <span className="ml-2 font-body text-[0.6875rem]" style={{ color: creamDim }}>
          Live demo — drag, check, reorder
        </span>
      </div>

      <div className="flex" style={{ minHeight: 380 }}>
        {/* sidebar */}
        <aside className="hidden sm:flex w-48 flex-col gap-5 p-5" style={{ background: inkRaised, borderRight: '1px solid #34302B' }}>
          <div className="flex items-center gap-2.5">
            <Image src="/forge-mark.png" alt="Forge" width={26} height={26} className="rounded-[6px]" />
            <span className="font-display text-base tracking-wide" style={{ color: cream }}>Forge</span>
          </div>
          <div className="flex flex-col gap-1 mt-1">
            <span className="font-body text-[0.625rem] uppercase tracking-[0.2em] mb-1" style={{ color: creamDim }}>Groups</span>
            {[
              { name: 'Client work', active: true },
              { name: 'Studio', active: false },
              { name: 'Forge', active: false },
              { name: 'Admin', active: false },
            ].map((g) => (
              <span
                key={g.name}
                className="font-body text-sm rounded-md px-2.5 py-1.5"
                style={{ color: g.active ? cream : creamMuted, background: g.active ? inkBlock : 'transparent' }}
              >
                {g.name}
              </span>
            ))}
          </div>
          <div className="mt-auto font-body text-[0.6875rem] leading-relaxed" style={{ color: creamDim }}>
            {total} in queue
            {doneCount > 0 && <> · {doneCount} done</>}
          </div>
        </aside>

        {/* queue */}
        <div className="flex-1 p-5 sm:p-7">
          <div className="flex items-center justify-between mb-6">
            <span className="font-display text-lg font-light" style={{ color: cream }}>The Queue</span>
            <button
              type="button"
              onClick={addTask}
              aria-label="Add a task to the queue"
              className="h-7 w-7 rounded-md flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95"
              style={{ background: terracotta }}
            >
              <Plus size={16} strokeWidth={2.4} style={{ color: ink }} />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-5">
            <LaneColumn
              laneId="urgent"
              label="Urgent"
              accent
              tasks={lanes.urgent}
              spring={spring}
              reduce={!!reduce}
              onReorder={(t) => setLane('urgent', t)}
              onToggle={toggleStep}
              onMove={move}
            />
            <LaneColumn
              laneId="normal"
              label="Normal"
              tasks={lanes.normal}
              spring={spring}
              reduce={!!reduce}
              onReorder={(t) => setLane('normal', t)}
              onToggle={toggleStep}
              onMove={move}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function LaneColumn({
  laneId,
  label,
  accent,
  tasks,
  spring,
  reduce,
  onReorder,
  onToggle,
  onMove,
}: {
  laneId: LaneId
  label: string
  accent?: boolean
  tasks: Task[]
  spring: object
  reduce: boolean
  onReorder: (t: Task[]) => void
  onToggle: (lane: LaneId, taskId: string, stepId: string) => void
  onMove: (lane: LaneId, taskId: string) => void
}) {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-3">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent ? terracotta : creamDim }} />
        <span
          className="font-body text-[0.625rem] font-medium uppercase tracking-[0.2em]"
          style={{ color: accent ? terracotta : creamMuted }}
        >
          {label}
        </span>
        <span className="font-body text-[0.625rem]" style={{ color: creamDim }}>{tasks.length}</span>
      </div>

      <Reorder.Group
        axis="y"
        values={tasks}
        onReorder={onReorder}
        as="div"
        className="flex flex-col gap-3"
        layoutScroll
      >
        <AnimatePresence initial={false}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              laneId={laneId}
              task={task}
              accent={accent}
              spring={spring}
              reduce={reduce}
              onToggle={onToggle}
              onMove={onMove}
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  )
}

function TaskCard({
  laneId,
  task,
  accent,
  spring,
  reduce,
  onToggle,
  onMove,
}: {
  laneId: LaneId
  task: Task
  accent?: boolean
  spring: object
  reduce: boolean
  onToggle: (lane: LaneId, taskId: string, stepId: string) => void
  onMove: (lane: LaneId, taskId: string) => void
}) {
  const done = isDone(task)
  const stop = (e: React.PointerEvent) => e.stopPropagation()

  return (
    <Reorder.Item
      value={task}
      layout
      transition={spring}
      initial={reduce ? false : { opacity: 0, y: -6 }}
      animate={{ opacity: done ? 0.62 : 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      whileDrag={reduce ? undefined : { scale: 1.035, boxShadow: '0 18px 40px -16px rgba(0,0,0,0.7)', cursor: 'grabbing' }}
      dragElastic={0.08}
      dragMomentum={false}
      style={{
        background: inkBlock,
        border: `1px solid ${done ? '#34302B' : accent ? 'rgba(192,76,42,0.35)' : '#34302B'}`,
        borderRadius: 8,
        cursor: 'grab',
        touchAction: 'pan-y',
      }}
      className="group/card p-4 select-none"
    >
      <div className="flex items-start justify-between gap-2">
        <p
          className="font-body text-sm font-medium leading-snug"
          style={{ color: done ? creamDim : cream, textDecoration: done ? 'line-through' : 'none' }}
        >
          {task.title}
        </p>
        <button
          type="button"
          onPointerDown={stop}
          onClick={() => onMove(laneId, task.id)}
          aria-label={laneId === 'urgent' ? 'Move to Normal' : 'Move to Urgent'}
          title={laneId === 'urgent' ? 'Move to Normal' : 'Move to Urgent'}
          className="shrink-0 rounded-[5px] p-1 opacity-0 transition-all duration-200 group-hover/card:opacity-100 focus-visible:opacity-100 hover:bg-white/5"
          style={{ color: creamMuted }}
        >
          {laneId === 'urgent' ? <ArrowDown size={14} strokeWidth={2} /> : <ArrowUp size={14} strokeWidth={2} />}
        </button>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {task.steps.map((s) => (
          <button
            key={s.id}
            type="button"
            onPointerDown={stop}
            onClick={() => onToggle(laneId, task.id, s.id)}
            className="flex items-center gap-2 text-left"
          >
            <Check done={s.done} />
            <span
              className="font-body text-xs leading-none transition-colors duration-200"
              style={{ color: s.done ? creamDim : creamMuted, textDecoration: s.done ? 'line-through' : 'none' }}
            >
              {s.label}
            </span>
          </button>
        ))}
      </div>
    </Reorder.Item>
  )
}

function Check({ done }: { done?: boolean }) {
  return (
    <motion.span
      initial={false}
      animate={{ scale: done ? [1, 1.18, 1] : 1 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-[3px] shrink-0"
      style={{ border: `1.5px solid ${done ? terracotta : creamDim}`, background: done ? terracotta : 'transparent' }}
    >
      {done && (
        <svg viewBox="0 0 10 10" className="h-2 w-2" fill="none" stroke={ink} strokeWidth={2}>
          <path d="M1.5 5L4 7.5L8.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </motion.span>
  )
}
