/**
 * Reservation Store
 * ─────────────────
 * Manages the full lifecycle of a table reservation + ShaamCash payment.
 *
 * Flow:
 *  1. User selects table → fills form → submits → status = 'pending'
 *  2. ShaamCash modal opens — user has 10 minutes to pay
 *  3. Countdown ticks every second; table is marked 'pending' in local state
 *  4a. User clicks "Confirm Payment" → status = 'confirmed', table = 'reserved'
 *  4b. Timer hits 0           → status = 'cancelled', table = 'available'
 */

import {
  createContext, useContext, useReducer, useEffect, useRef,
  useCallback, type ReactNode,
} from 'react'
import { type TableDef, type TableSection, sectionMeta } from './data'

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export interface ReservationFormData {
  name: string
  phone: string
  date: string
  time: string
  guests: string
  note: string
}

export type ReservationStatus =
  | 'idle'        // nothing pending
  | 'pending'     // awaiting ShaamCash payment (countdown running)
  | 'confirmed'   // paid successfully
  | 'cancelled'   // timed out or user cancelled

export interface Reservation {
  ref: string
  table: TableDef
  form: ReservationFormData
  status: ReservationStatus
  createdAt: number        // Date.now() when pending started
  expiresAt: number        // createdAt + PAYMENT_TIMEOUT_MS
  reservedUntil?: number   // Date.now() of the booked date+time — table auto-releases after this
  paidAt?: number
}

export interface TableOverride {
  tableId: number
  status: 'pending' | 'reserved'
}

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
export const PAYMENT_TIMEOUT_MS = 10 * 60 * 1000  // 10 minutes

const SHAAM_CASH_NUMBERS: Record<TableSection, string> = {
  study:   '0791234001',
  meeting: '0791234002',
  vip:     '0791234003',
}

// ─────────────────────────────────────────────
// State / Reducer
// ─────────────────────────────────────────────
interface State {
  reservation: Reservation | null
  overrides: TableOverride[]        // live table status overrides
  secondsLeft: number
  showPaymentModal: boolean
}

type Action =
  | { type: 'START_PENDING'; reservation: Reservation }
  | { type: 'TICK' }
  | { type: 'CONFIRM_PAYMENT' }
  | { type: 'CANCEL' }
  | { type: 'DISMISS_MODAL' }
  | { type: 'REOPEN_MODAL' }
  | { type: 'RELEASE_TABLE'; tableId: number }
  | { type: 'RESET' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START_PENDING': {
      const sec = Math.ceil(PAYMENT_TIMEOUT_MS / 1000)
      return {
        ...state,
        reservation: action.reservation,
        secondsLeft: sec,
        showPaymentModal: true,
        overrides: [
          ...state.overrides.filter(o => o.tableId !== action.reservation.table.id),
          { tableId: action.reservation.table.id, status: 'pending' },
        ],
      }
    }
    case 'TICK': {
      if (!state.reservation || state.reservation.status !== 'pending') return state
      const newSec = state.secondsLeft - 1
      if (newSec <= 0) {
        // auto-cancel
        return {
          ...state,
          secondsLeft: 0,
          showPaymentModal: true,          // keep modal open to show expired msg
          reservation: { ...state.reservation, status: 'cancelled' },
          overrides: state.overrides.filter(o => o.tableId !== state.reservation!.table.id),
        }
      }
      return { ...state, secondsLeft: newSec }
    }
    case 'CONFIRM_PAYMENT': {
      if (!state.reservation) return state
      return {
        ...state,
        reservation: { ...state.reservation, status: 'confirmed', paidAt: Date.now() },
        showPaymentModal: false,
        overrides: [
          ...state.overrides.filter(o => o.tableId !== state.reservation!.table.id),
          { tableId: state.reservation.table.id, status: 'reserved' },
        ],
      }
    }
    case 'CANCEL': {
      const tid = state.reservation?.table.id
      return {
        ...state,
        reservation: state.reservation ? { ...state.reservation, status: 'cancelled' } : null,
        showPaymentModal: false,
        overrides: tid ? state.overrides.filter(o => o.tableId !== tid) : state.overrides,
      }
    }
    case 'DISMISS_MODAL':
      return { ...state, showPaymentModal: false }
    case 'REOPEN_MODAL':
      return state.reservation ? { ...state, showPaymentModal: true } : state
    case 'RELEASE_TABLE': {
      // Auto-release after the booked session time passes
      const isOwned = state.reservation?.table.id === action.tableId
      return {
        ...state,
        overrides: state.overrides.filter(o => o.tableId !== action.tableId),
        reservation: isOwned
          ? { ...state.reservation!, status: 'cancelled' }
          : state.reservation,
      }
    }
    case 'RESET':
      return { reservation: null, overrides: [], secondsLeft: 0, showPaymentModal: false }
    default:
      return state
  }
}

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────
interface Ctx {
  state: State
  startReservation: (table: TableDef, form: ReservationFormData) => void
  confirmPayment: () => void
  cancelReservation: () => void
  dismissModal: () => void
  reopenModal: () => void
  reset: () => void
  shaamNumber: string
  price: number
  formattedTime: string   // mm:ss for countdown
}

const ReservationCtx = createContext<Ctx>(null!)
export const useReservation = () => useContext(ReservationCtx)

// ─────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────
export function ReservationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    reservation: null,
    overrides: [],
    secondsLeft: 0,
    showPaymentModal: false,
  })

  const intervalRef = useRef<number | null>(null)

  // Start or stop the countdown timer
  useEffect(() => {
    if (state.reservation?.status === 'pending' && state.secondsLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        dispatch({ type: 'TICK' })
      }, 1000)
    } else {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [state.reservation?.status, state.secondsLeft])

  const startReservation = useCallback((table: TableDef, form: ReservationFormData) => {
    const now = Date.now()
    // Parse the booked date+time into a timestamp for auto-release
    let reservedUntil: number | undefined
    if (form.date && form.time) {
      const parsed = new Date(`${form.date}T${form.time}:00`).getTime()
      if (!isNaN(parsed) && parsed > now) reservedUntil = parsed
    }
    const reservation: Reservation = {
      ref: `ZFR-${Math.floor(1000 + Math.random() * 9000)}`,
      table,
      form,
      status: 'pending',
      createdAt: now,
      expiresAt: now + PAYMENT_TIMEOUT_MS,
      reservedUntil,
    }
    dispatch({ type: 'START_PENDING', reservation })
  }, [])

  const confirmPayment    = useCallback(() => dispatch({ type: 'CONFIRM_PAYMENT' }), [])
  const cancelReservation = useCallback(() => dispatch({ type: 'CANCEL' }), [])
  const dismissModal      = useCallback(() => dispatch({ type: 'DISMISS_MODAL' }), [])
  const reopenModal       = useCallback(() => dispatch({ type: 'REOPEN_MODAL' }), [])
  const reset             = useCallback(() => dispatch({ type: 'RESET' }), [])

  // Auto-release the table when the booked session time passes
  useEffect(() => {
    const res = state.reservation
    if (res?.status !== 'confirmed' || !res.reservedUntil) return
    const msLeft = res.reservedUntil - Date.now()
    if (msLeft <= 0) {
      dispatch({ type: 'RELEASE_TABLE', tableId: res.table.id })
      return
    }
    const t = window.setTimeout(() => {
      dispatch({ type: 'RELEASE_TABLE', tableId: res.table.id })
    }, msLeft)
    return () => window.clearTimeout(t)
  }, [state.reservation?.status, state.reservation?.reservedUntil])
  const section    = state.reservation?.table.section ?? 'study'
  const shaamNumber = SHAAM_CASH_NUMBERS[section]
  const price      = state.reservation ? sectionMeta[state.reservation.table.section].price : 0

  const mm = String(Math.floor(state.secondsLeft / 60)).padStart(2, '0')
  const ss = String(state.secondsLeft % 60).padStart(2, '0')
  const formattedTime = `${mm}:${ss}`

  return (
    <ReservationCtx.Provider value={{
      state, startReservation, confirmPayment, cancelReservation,
      dismissModal, reopenModal, reset, shaamNumber, price, formattedTime,
    }}>
      {children}
    </ReservationCtx.Provider>
  )
}
