import { createContext, useContext, useRef, useState, type ReactNode } from 'react'
import { items } from './data'

interface Ctx {
  cart: Record<number, number>
  change: (id: number, d: number) => void
  clear: () => void
  count: number
  total: number
  lines: typeof items
  open: boolean
  toast: string
  setOpen: (v: boolean) => void
}

const C = createContext<Ctx>(null!)
export const useCart = () => useContext(C)
export const money = (n: number) => `$${n.toFixed(2)}`

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart]   = useState<Record<number, number>>({})
  const [open, setOpen]   = useState(false)
  const [toast, setToast] = useState('')
  const timer             = useRef<number>()

  const change = (id: number, d: number) => {
    if (d > 0) {
      setToast(`Added ${items.find(x => x.id === id)?.name ?? ''}`)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setToast(''), 2000)
    }
    setCart(c => {
      const n = (c[id] ?? 0) + d
      const { [id]: _, ...rest } = c
      return n > 0 ? { ...rest, [id]: n } : rest
    })
  }

  const lines  = items.filter(i => cart[i.id])
  const count  = lines.reduce((s, i) => s + cart[i.id], 0)
  const total  = lines.reduce((s, i) => s + cart[i.id] * i.price, 0)

  return (
    <C.Provider value={{ cart, change, clear: () => setCart({}), count, total, lines, open, setOpen, toast }}>
      {children}
    </C.Provider>
  )
}
