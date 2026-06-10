// ── app/review/page.tsx — client review submission page ──
'use client'

import { useState } from 'react'
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import { ArrowLeft, Home, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/context/LanguageContext'
import { t, languages, type TranslationKey } from '@/lib/translations'
import Logo from '@/components/ui/Logo'
import Footer from '@/components/layout/Footer'
import ScrollProvider from '@/context/ScrollContext'

// ─── Types ─────────────────────────────────────────────────────────────────

const RATING_QUESTIONS: { key: RatingKey; labelKey: TranslationKey }[] = [
  { key: 'overall', labelKey: 'review.q1' },
  { key: 'represents', labelKey: 'review.q2' },
  { key: 'enquiries', labelKey: 'review.q3' },
  { key: 'communication', labelKey: 'review.q4' },
  { key: 'speed', labelKey: 'review.q5' },
  { key: 'refer', labelKey: 'review.q6' },
]

type RatingKey = 'overall' | 'represents' | 'enquiries' | 'communication' | 'speed' | 'refer'
type Ratings = Partial<Record<RatingKey, number>>
type Permission = 'named' | 'anonymous' | 'private'
type Status = 'idle' | 'loading' | 'success' | 'error'

const PERMISSION_OPTIONS: { value: Permission; labelKey: TranslationKey }[] = [
  { value: 'named', labelKey: 'review.permissionNamed' },
  { value: 'anonymous', labelKey: 'review.permissionAnonymous' },
  { value: 'private', labelKey: 'review.permissionPrivate' },
]

// ─── Animation variants ──────────────────────────────────────────────────────

const errorVariants: Variants = {
  hidden: { opacity: 0, y: -6, height: 0 },
  visible: { opacity: 1, y: 0, height: 'auto', transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, y: -4, height: 0, transition: { duration: 0.15 } },
}

const successVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

// ─── Shared input styling (mirrors ContactFormCard) ──────────────────────────

const inputClass = cn(
  'w-full px-4 py-3 font-body text-sm text-text-primary bg-bg border rounded-sm',
  'placeholder:text-text-secondary/50 outline-none transition-all duration-200',
  'focus:ring-2 focus:ring-accent/20 focus:border-accent',
  'border-border hover:border-text-secondary/30'
)

// ─── Rating row ──────────────────────────────────────────────────────────────

function RatingRow({
  question,
  value,
  onChange,
}: {
  question: { key: RatingKey; labelKey: TranslationKey }
  value: number | undefined
  onChange: (v: number) => void
}) {
  const { lang } = useLanguage()

  return (
    <div className="flex flex-col gap-2.5">
      <p
        id={`q-${question.key}`}
        className="font-body text-sm font-[500] text-text-primary leading-snug"
      >
        {t(question.labelKey, lang)}
      </p>
      <div role="radiogroup" aria-labelledby={`q-${question.key}`} className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => {
          const active = value === n
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={`${n}`}
              onClick={() => onChange(n)}
              className={cn(
                'flex-1 h-11 rounded-sm border font-body text-sm font-[500] transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-accent/30',
                active
                  ? 'bg-accent text-white border-accent shadow-sm'
                  : 'bg-bg text-text-secondary border-border hover:border-accent/50 hover:text-text-primary'
              )}
            >
              {n}
            </button>
          )
        })}
      </div>
      <div className="flex justify-between font-body text-xs text-text-secondary/60">
        <span>{t('review.anchorLow', lang)}</span>
        <span>{t('review.anchorHigh', lang)}</span>
      </div>
    </div>
  )
}

// ─── Form card ───────────────────────────────────────────────────────────────

function ReviewFormCard() {
  const shouldReduceMotion = useReducedMotion()
  const { lang } = useLanguage()

  const [ratings, setRatings] = useState<Ratings>({})
  const [businessName, setBusinessName] = useState('')
  const [permission, setPermission] = useState<Permission | ''>('')
  const [oneLiner, setOneLiner] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [validationError, setValidationError] = useState<string>('')
  const [serverError, setServerError] = useState<string>('')

  const setRating = (key: RatingKey, v: number) => {
    setRatings((prev) => ({ ...prev, [key]: v }))
    if (validationError) setValidationError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const allRated = RATING_QUESTIONS.every((q) => typeof ratings[q.key] === 'number')
    if (!allRated) {
      setValidationError(t('review.ratingsRequired', lang))
      return
    }
    if (!permission) {
      setValidationError(t('review.permissionRequired', lang))
      return
    }

    setStatus('loading')
    setValidationError('')
    setServerError('')
    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ratings,
          businessName: businessName.trim(),
          permission,
          oneLiner: oneLiner.trim(),
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || t('review.error', lang))
      }
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setServerError(err instanceof Error ? err.message : t('review.error', lang))
    }
  }

  return (
    <div className="bg-bg rounded-md border border-border p-7 md:p-8">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            className="flex flex-col items-center justify-center py-12 text-center"
            variants={shouldReduceMotion ? undefined : successVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="w-14 h-14 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mb-5">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <h3 className="font-display text-2xl font-[400] text-text-primary mb-2">
              {t('review.successTitle', lang)}
            </h3>
            <p className="font-body text-sm text-text-secondary leading-relaxed max-w-xs">
              {t('review.successText', lang)}
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-8"
            noValidate
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Rating questions */}
            <div className="flex flex-col gap-7">
              {RATING_QUESTIONS.map((q) => (
                <RatingRow
                  key={q.key}
                  question={q}
                  value={ratings[q.key]}
                  onChange={(v) => setRating(q.key, v)}
                />
              ))}
            </div>

            <div className="h-px bg-border" />

            {/* Business name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="businessName" className="font-body text-sm font-[500] text-text-primary">
                {t('review.businessName', lang)}{' '}
                <span className="text-text-secondary/50 font-[400]">
                  ({t('review.businessNameOptional', lang)})
                </span>
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder={t('review.businessNamePlaceholder', lang)}
                className={inputClass}
                maxLength={200}
                autoComplete="organization"
              />
            </div>

            {/* Permission */}
            <div className="flex flex-col gap-2.5">
              <p id="permission-label" className="font-body text-sm font-[500] text-text-primary">
                {t('review.permission', lang)}
              </p>
              <div role="radiogroup" aria-labelledby="permission-label" className="flex flex-col gap-2">
                {PERMISSION_OPTIONS.map((opt) => {
                  const active = permission === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => {
                        setPermission(opt.value)
                        if (validationError) setValidationError('')
                      }}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-sm border font-body text-sm text-left transition-all duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-accent/30',
                        active
                          ? 'bg-accent/5 border-accent text-text-primary'
                          : 'bg-bg border-border text-text-secondary hover:border-accent/50'
                      )}
                    >
                      <span
                        className={cn(
                          'flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors',
                          active ? 'border-accent' : 'border-border'
                        )}
                        aria-hidden="true"
                      >
                        {active && <span className="w-2 h-2 rounded-full bg-accent" />}
                      </span>
                      {t(opt.labelKey, lang)}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* One-liner */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="oneLiner" className="font-body text-sm font-[500] text-text-primary">
                {t('review.oneLiner', lang)}
              </label>
              <div className="relative">
                <textarea
                  id="oneLiner"
                  name="oneLiner"
                  value={oneLiner}
                  onChange={(e) => setOneLiner(e.target.value)}
                  placeholder={t('review.oneLinerPlaceholder', lang)}
                  rows={3}
                  maxLength={1000}
                  className={cn(inputClass, 'resize-none')}
                />
                <span className="absolute bottom-3 right-3 font-body text-xs text-text-secondary/40">
                  {oneLiner.length}/1000
                </span>
              </div>
            </div>

            {/* Validation / server error */}
            <AnimatePresence mode="wait">
              {(validationError || (status === 'error' && serverError)) && (
                <motion.div
                  key={validationError || serverError}
                  className="flex items-start gap-2 px-3 py-2.5 rounded-sm bg-red-50 border border-red-200 overflow-hidden"
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  role="alert"
                >
                  <AlertCircle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="font-body text-xs text-red-700">
                    {validationError || serverError}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={status === 'loading'}
              className="relative flex items-center justify-center overflow-hidden px-6 py-3.5 font-body font-[500] text-sm text-white bg-accent rounded-sm disabled:opacity-70 disabled:cursor-not-allowed"
              whileHover={shouldReduceMotion || status === 'loading' ? {} : { scale: 1.01 }}
              whileTap={shouldReduceMotion || status === 'loading' ? {} : { scale: 0.99 }}
              transition={{ duration: 0.15 }}
            >
              {status !== 'loading' && (
                <motion.span
                  className="absolute inset-0 bg-accent-dark"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {status === 'loading' ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    {t('review.sending', lang)}
                  </>
                ) : (
                  t('review.submit', lang)
                )}
              </span>
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Page header ─────────────────────────────────────────────────────────────

function PageHeader() {
  const { lang, setLang } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[rgba(247,244,239,0.95)] backdrop-blur-md border-b border-border">
      <div className="container-wide">
        <div className="flex items-center justify-between h-[72px]">
          <Link href="/" className="hover:opacity-80 transition-opacity duration-250">
            <Logo variant="primary" size="sm" showTagline={false} />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-body font-[400] text-text-secondary hover:text-accent transition-colors duration-250"
            >
              <ArrowLeft size={14} />
              {t('review.back', lang)}
            </Link>

            {/* Language switcher */}
            <div className="flex items-center gap-0.5" aria-label="Language switcher">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={cn(
                    'px-2 py-1 font-body text-xs rounded-sm transition-all duration-200',
                    lang === l
                      ? 'bg-accent/10 text-accent font-[500]'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                  aria-label={`Switch to ${l}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

// ─── Floating home button ────────────────────────────────────────────────────

function FloatingHomeButton() {
  const shouldReduceMotion = useReducedMotion()
  const { lang } = useLanguage()

  return (
    <motion.div
      className="fixed bottom-8 left-8 z-50 hidden md:block"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href="/"
        className="group flex items-center gap-2.5 pl-3.5 pr-5 py-2.5 bg-dark text-[#F7F4EF] rounded-full shadow-lg ring-1 ring-white/15 hover:bg-accent hover:ring-accent transition-colors duration-300"
      >
        <Home size={14} className="text-accent group-hover:text-white transition-colors" />
        <span className="font-body text-xs font-[500]">{t('review.back', lang)}</span>
      </Link>
    </motion.div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

function ReviewContent() {
  const shouldReduceMotion = useReducedMotion()
  const { lang } = useLanguage()

  return (
    <div className="min-h-screen bg-bg">
      <FloatingHomeButton />
      <PageHeader />

      <section className="pt-[72px]">
        <div className="container-wide py-14 md:py-20">
          <motion.div
            className="max-w-xl mx-auto"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-body text-sm text-text-secondary hover:text-accent transition-colors mb-8 md:hidden"
            >
              <ArrowLeft size={14} />
              {t('review.back', lang)}
            </Link>
            <p className="section-label mb-4">{t('review.label', lang)}</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-[400] text-text-primary leading-[1.1] mb-5">
              {t('review.heading', lang)}
            </h1>
            <p className="font-body text-sm md:text-base text-text-secondary leading-relaxed mb-10">
              {t('review.intro', lang)}
            </p>

            <ReviewFormCard />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function ReviewPage() {
  return (
    <ScrollProvider>
      <ReviewContent />
    </ScrollProvider>
  )
}
