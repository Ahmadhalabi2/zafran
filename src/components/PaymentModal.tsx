import { useState } from 'react'
import { CheckCircle, X } from 'lucide-react'
import { useReservation, PAYMENT_TIMEOUT_MS } from '../reservationStore'
import { sectionMeta } from '../data'
import s from '../styles/PaymentModal.module.css'

const RADIUS   = 22
const CIRC     = 2 * Math.PI * RADIUS
const TOTAL_SEC = PAYMENT_TIMEOUT_MS / 1000

export default function PaymentModal() {
  const { state, confirmPayment, cancelReservation, dismissModal, shaamNumber, price, formattedTime } = useReservation()
  const [copied, setCopied] = useState(false)

  if (!state.showPaymentModal || !state.reservation) return null

  const { reservation, secondsLeft } = state
  const isExpired   = reservation.status === 'cancelled'
  const isConfirmed = reservation.status === 'confirmed'
  const isPending   = reservation.status === 'pending'
  const secMeta     = sectionMeta[reservation.table.section]

  // Ring progress
  const progress  = secondsLeft / TOTAL_SEC
  const offset    = CIRC * (1 - progress)
  const ringClass = secondsLeft > 300 ? s.ringGreen : secondsLeft > 60 ? s.ringAmber : s.ringRed

  const copyPhone = () => {
    navigator.clipboard.writeText(shaamNumber).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={s.overlay} onClick={e => { if (e.target === e.currentTarget) dismissModal() }}>
      <div className={s.modal} role="dialog" aria-modal="true" aria-label="ShaamCash payment">

        {/* ── Header ─────────────────────────────── */}
        <div className={s.header}>
          <div className={s.headerLeft}>
            <div className={s.scLogo}>💳</div>
            <div>
              <div className={s.scName}>ShaamCash</div>
              <div className={s.scSub}>Secure Payment</div>
            </div>
          </div>

          {isPending && (
            <div className={s.countdown}>
              <div className={s.countdownRing}>
                <svg className={s.countdownSvg} width="52" height="52" viewBox="0 0 52 52">
                  <circle className={s.ringBg} cx="26" cy="26" r={RADIUS} />
                  <circle
                    className={`${s.ringFg} ${ringClass}`}
                    cx="26" cy="26" r={RADIUS}
                    strokeDasharray={CIRC}
                    strokeDashoffset={offset}
                  />
                </svg>
                <div className={s.countdownTime}>{formattedTime}</div>
              </div>
              <span className={s.countdownLabel}>remaining</span>
            </div>
          )}

          <button className={s.closeBtn} onClick={dismissModal} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* ── Body ───────────────────────────────── */}
        <div className={s.body}>

          {/* Confirmed */}
          {isConfirmed && (
            <div className={s.confirmed}>
              <div className={s.confirmedIcon}>✅</div>
              <div className={s.confirmedTitle}>Payment Confirmed!</div>
              <p className={s.confirmedSub}>
                Your reservation <strong>{reservation.ref}</strong> is now active.
                Table <strong>{reservation.table.label}</strong> — {secMeta.label} is reserved for you.
                See you soon! 🍽️
              </p>
              <div className={s.actions}>
                <button className={s.btnClose} onClick={dismissModal}>Done</button>
              </div>
            </div>
          )}

          {/* Expired */}
          {isExpired && (
            <div className={s.expired}>
              <div className={s.expiredIcon}>⏰</div>
              <div className={s.expiredTitle}>Reservation Expired</div>
              <p className={s.expiredSub}>
                The 10-minute payment window has passed. Your reservation for Table{' '}
                <strong>{reservation.table.label}</strong> has been cancelled and the table is now available again.
              </p>
              <div className={s.actions}>
                <button className={s.btnClose} style={{ background: 'linear-gradient(135deg,var(--c-text),var(--c-text-2))' }} onClick={dismissModal}>
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Pending — payment instructions */}
          {isPending && (
            <>
              {/* Booking summary */}
              <div className={s.summary}>
                <div className={s.summaryRow}>
                  <span className={s.summaryLabel}>Booking Ref</span>
                  <span className={s.summaryRef}>{reservation.ref}</span>
                </div>
                <div className={s.summaryRow}>
                  <span className={s.summaryLabel}>Table</span>
                  <span className={s.summaryVal}>{reservation.table.label} — {secMeta.label}</span>
                </div>
                <div className={s.summaryRow}>
                  <span className={s.summaryLabel}>Date &amp; Time</span>
                  <span className={s.summaryVal}>{reservation.form.date} · {reservation.form.time}</span>
                </div>
                <div className={s.summaryRow}>
                  <span className={s.summaryLabel}>Guests</span>
                  <span className={s.summaryVal}>{reservation.form.guests}</span>
                </div>
                <div className={s.divider} />
                <div className={s.amountRow}>
                  <span className={s.amountLabel}>Total Amount</span>
                  <span className={s.amount}>
                    {price} <span className={s.amountCurrency}>JD</span>
                  </span>
                </div>
              </div>

              {/* Step-by-step */}
              <div className={s.instructions}>
                <div className={s.instructionsTitle}>How to pay via ShaamCash:</div>

                <div className={s.step}>
                  <span className={s.stepNum}>1</span>
                  <span>Open your <strong>ShaamCash</strong> app or dial <strong>*111#</strong></span>
                </div>

                <div className={s.phoneCard}>
                  <div>
                    <div className={s.phoneLabel}>Send to this number</div>
                    <div className={s.phoneNumber}>{shaamNumber}</div>
                  </div>
                  <button
                    className={`${s.copyBtn} ${copied ? s.copyBtnDone : ''}`}
                    onClick={copyPhone}
                  >
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>

                <div className={s.step}>
                  <span className={s.stepNum}>2</span>
                  <span>Enter the exact amount:</span>
                </div>

                <div className={s.amountCode}>
                  <div>
                    <div className={s.amountCodeLabel}>Amount (JD)</div>
                    <div>{price}.00</div>
                  </div>
                </div>

                <div className={s.step}>
                  <span className={s.stepNum}>3</span>
                  <span>Use booking ref as note: <strong>{reservation.ref}</strong></span>
                </div>

                <div className={s.step}>
                  <span className={s.stepNum}>4</span>
                  <span>Click <strong>"I've Paid"</strong> below to confirm</span>
                </div>
              </div>

              {/* Warning */}
              <div className={s.warning}>
                <span className={s.warningIcon}>⚠️</span>
                <span>
                  Pay within the countdown. After <strong>10 minutes</strong> your reservation
                  will be automatically cancelled and the table released.
                </span>
              </div>

              {/* Actions */}
              <div className={s.actions}>
                <button className={s.btnConfirm} onClick={confirmPayment}>
                  <CheckCircle size={18} /> I've Paid — Confirm Reservation
                </button>
                <button className={s.btnCancel} onClick={cancelReservation}>
                  Cancel reservation
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className={s.footer}>
          <span>Powered by</span>
          <span className={s.footerLogo}>💳 ShaamCash</span>
          <span>· Secure · Instant</span>
        </div>
      </div>
    </div>
  )
}
