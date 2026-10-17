import { useState, type FormEvent } from 'react'
import { CreditCard, CheckCircle } from 'lucide-react'
import { tables, sectionMeta, type TableDef, type TableSection } from '../data'
import { useReservation } from '../reservationStore'
import TableMap from '../components/TableMap'
import PaymentModal from '../components/PaymentModal'
import CustomSelect from '../components/CustomSelect'
import s from '../styles/Tables.module.css'

type Step = 'pick' | 'form'

export default function Tables() {
  const { state: resState, startReservation, reset: resetReservation } = useReservation()

  const [filter, setFilter]     = useState<TableSection | 'all'>('all')
  const [selected, setSelected] = useState<TableDef | null>(null)
  const [step, setStep]         = useState<Step>('pick')
  const [form, setForm]         = useState({ name: '', phone: '', date: '', time: '', guests: '2', note: '' })

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSelect = (t: TableDef) => {
    setSelected(t)
    setStep('form')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!selected) return
    startReservation(selected, form)
    // Modal opens automatically via store
  }

  // Redirect to done state when confirmed
  const isConfirmed = resState.reservation?.status === 'confirmed'
  const isCancelled = resState.reservation?.status === 'cancelled'

  // After confirmed + modal dismissed → show success
  const showSuccess = isConfirmed && !resState.showPaymentModal

  if (showSuccess && resState.reservation) {
    const r = resState.reservation
    return (
      <main className={s.wrap}>
        <div className={s.done}>
          <div className={s.doneIcon}>🎉</div>
          <h1 className={s.doneTitle}>Reservation Confirmed!</h1>
          <p className={s.doneSub}>
            Thank you, <strong>{r.form.name}</strong>. Your booking reference is{' '}
            <strong>{r.ref}</strong>. We'll see you soon!
          </p>
          <div className={s.confirmCard}>
            <div className={s.confirmRow}><span>Table</span><strong>{r.table.label} — {sectionMeta[r.table.section].label}</strong></div>
            <div className={s.confirmRow}><span>Date &amp; Time</span><strong>{r.form.date} at {r.form.time}</strong></div>
            <div className={s.confirmRow}><span>Guests</span><strong>{r.form.guests} people</strong></div>
            <div className={s.confirmRow}><span>Amount Paid</span><strong>{sectionMeta[r.table.section].price} JD</strong></div>
          </div>
          <button className={s.doneBtn} onClick={() => {
            resetReservation()
            setSelected(null)
            setStep('pick')
            setForm({ name: '', phone: '', date: '', time: '', guests: '2', note: '' })
          }}>
            Book Another Table
          </button>
        </div>
        <PaymentModal />
      </main>
    )
  }

  return (
    <>
      <header style={{ background: 'var(--c-surface)', borderBottom: '1px solid var(--c-border)', padding: '52px clamp(16px,5vw,64px) 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 50% 0%, rgba(124,58,237,.06), transparent 70%)', pointerEvents: 'none' }} />
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.13em', color: 'var(--c-purple)', fontWeight: 700, marginBottom: 12, padding: '4px 11px', borderRadius: 999, background: 'var(--c-purple-bg)', border: '1px solid rgba(124,58,237,.2)', position: 'relative' }}>
          🪑 Interactive Floor Plan
        </span>
        <h1 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(2rem,5.5vw,3.8rem)', color: 'var(--c-text)', marginBottom: 10, position: 'relative' }}>Reserve a Table</h1>
        <p style={{ color: 'var(--c-text-3)', fontSize: '.98rem', position: 'relative' }}>Pick your exact spot · Pay via ShaamCash · Instant confirmation</p>
      </header>

      <main className={s.wrap}>
        {/* Steps */}
        <div className={s.steps}>
          <div className={`${s.step} ${step === 'pick' ? s.stepActive : selected ? s.stepDone : ''}`}>
            <span className={s.stepNum}>{selected && step === 'form' ? '✓' : '1'}</span>
            <span>Choose Table</span>
          </div>
          <div className={s.stepLine} />
          <div className={`${s.step} ${step === 'form' ? s.stepActive : ''}`}>
            <span className={s.stepNum}>2</span>
            <span>Your Details</span>
          </div>
          <div className={s.stepLine} />
          <div className={s.step}>
            <span className={s.stepNum}>3</span>
            <span>ShaamCash Payment</span>
          </div>
        </div>

        {/* ─ PICK ─ */}
        {step === 'pick' && (
          <>
            {/* Section pricing cards */}
            <div className={s.pricingGrid}>
              {(Object.entries(sectionMeta) as [TableSection, typeof sectionMeta.study][]).map(([key, m]) => {
                const isActive = filter === key
                const avail = tables.filter(t => t.section === key && t.status === 'available').length
                return (
                  <div
                    key={key}
                    className={`${s.pricingCard} ${isActive ? s.pricingCardActive : ''}`}
                    style={{ borderColor: isActive ? m.color : 'var(--c-border)', background: isActive ? m.bg : 'var(--c-surface)' }}
                    onClick={() => setFilter(key)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && setFilter(key)}
                  >
                    <div className={s.pricingCardTop}>
                      <span className={s.pricingCardName} style={{ color: m.color }}>{m.label}</span>
                      <span className={s.pricingCardPrice} style={{ color: m.color }}>{m.priceLabel}</span>
                    </div>
                    <div className={s.pricingCardDesc}>{m.desc}</div>
                    <span className={s.pricingCardBadge} style={{ background: `${m.color}15`, color: m.color }}>
                      {avail} tables available
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Filter buttons */}
            <div className={s.filters}>
              {(['all', 'study', 'meeting', 'vip'] as const).map(f => (
                <button
                  key={f}
                  className={filter === f ? `${s.filterBtn} ${s.filterBtnOn}` : s.filterBtn}
                  onClick={() => setFilter(f)}
                >
                  {f === 'all' ? 'All Sections' : sectionMeta[f].label}
                </button>
              ))}
            </div>

            <TableMap
              onSelect={handleSelect}
              selectedId={selected?.id ?? null}
              filter={filter}
              overrides={resState.overrides}
            />
            <p className={s.hint}>🟢 Click a green table to continue</p>
          </>
        )}

        {/* ─ FORM ─ */}
        {step === 'form' && selected && (
          <>
            <div className={s.selectedCard}>
              <div>
                <div className={s.selectedLabel}>Selected Table</div>
                <div className={s.selectedName}>
                  Table {selected.label}
                  <span className={s.selectedBadge} style={{ background: sectionMeta[selected.section].color }}>
                    {sectionMeta[selected.section].label}
                  </span>
                </div>
              </div>
              <div className={s.selectedMeta}>
                <span>👤 {selected.seats} seats</span>
                <span>{sectionMeta[selected.section].desc}</span>
              </div>
              <button className={s.changeBtn} onClick={() => setStep('pick')}>← Change</button>
            </div>

            <div className={s.formWrap}>
              <form className={s.form} onSubmit={handleSubmit}>
                <h2 className={s.formTitle}>Your Details</h2>

                <div className={s.formRow2}>
                  <label className={s.field}>
                    Full Name
                    <input className={s.input} required value={form.name} onChange={set('name')} placeholder="Ahmad Al-Rashid" autoComplete="name" />
                  </label>
                  <label className={s.field}>
                    Phone Number
                    <input className={s.input} required type="tel" value={form.phone} onChange={set('phone')} placeholder="+962 7X XXX XXXX" autoComplete="tel" />
                  </label>
                </div>

                <div className={s.formRow2}>
                  <label className={s.field}>
                    Date
                    <input className={s.input} required type="date" value={form.date} onChange={set('date')} min={new Date().toISOString().split('T')[0]} />
                  </label>
                  <label className={s.field}>
                    Time
                    <input className={s.input} required type="time" value={form.time} onChange={set('time')} min="10:00" max="23:00" />
                  </label>
                </div>

                <label className={s.field}>
                  Number of Guests
                  <CustomSelect
                    value={form.guests}
                    onChange={v => setForm(f => ({ ...f, guests: v }))}
                    options={Array.from({ length: selected.seats }, (_, i) => i + 1).map(n => ({
                      value: String(n),
                      label: `${n} ${n === 1 ? 'guest' : 'guests'}`,
                      icon: n === 1 ? '🧑' : n <= 3 ? '👥' : n <= 6 ? '👨‍👩‍👧‍👦' : '🎪',
                    }))}
                  />
                </label>

                <label className={s.field}>
                  Special Requests <span className={s.fieldOptional}>(optional)</span>
                  <textarea className={s.textarea} rows={3} value={form.note} onChange={set('note')} placeholder="Birthday, allergies, wheelchair…" />
                </label>

                {/* Price banner */}
                <div className={s.priceBanner}>
                  <div>
                    <div className={s.priceBannerLabel}>Reservation Fee</div>
                    <div className={s.priceBannerSub}>{sectionMeta[selected.section].label} · {sectionMeta[selected.section].priceLabel}</div>
                  </div>
                  <div className={s.priceBannerAmount}>{sectionMeta[selected.section].price} JD</div>
                </div>

                <button className={s.submitBtn} type="submit">
                  <CreditCard size={17} /> Continue to ShaamCash Payment
                </button>
              </form>

              {/* Info panel */}
              <div className={s.infoPanel}>
                <h3 className={s.infoPanelTitle}>Payment Info</h3>
                <div className={s.infoItem}>
                  <div className={s.infoItemIcon} style={{ background: 'rgba(0,200,83,.1)' }}>💳</div>
                  <div className={s.infoItemText}><strong>ShaamCash Only</strong>We accept ShaamCash mobile payments</div>
                </div>
                <div className={s.infoItem}>
                  <div className={s.infoItemIcon} style={{ background: 'var(--c-amber-bg)' }}>⏰</div>
                  <div className={s.infoItemText}><strong>10 Minutes to Pay</strong>Table is held for 10 minutes after you submit</div>
                </div>
                <div className={s.infoItem}>
                  <div className={s.infoItemIcon} style={{ background: 'var(--c-red-bg)' }}>🚫</div>
                  <div className={s.infoItemText}><strong>Auto-Cancel</strong>Unpaid reservations are released after timeout</div>
                </div>
                <div className={s.infoItem}>
                  <div className={s.infoItemIcon} style={{ background: 'var(--c-green-bg)' }}>✅</div>
                  <div className={s.infoItemText}><strong>Instant Confirmation</strong>Table marked reserved immediately after payment</div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Payment modal lives here — mounts globally when triggered */}
      <PaymentModal />
    </>
  )
}
