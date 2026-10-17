import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, ArrowRight, Check } from 'lucide-react'
import { useCart, money } from '../store'
import { Qty } from '../components/DishCard'
import s from '../styles/Checkout.module.css'

export default function Checkout() {
  const { lines, cart, total, clear } = useCart()
  const [done, setDone] = useState<{ no: number; name: string } | null>(null)
  const [f, setF] = useState({ name: '', phone: '', table: '', note: '' })

  const set = (k: keyof typeof f) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setF({ ...f, [k]: e.target.value })

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setDone({ no: Math.floor(1000 + Math.random() * 9000), name: f.name })
    clear()
  }

  if (done) return (
    <main className={s.wrap}>
      <div className={s.done}>
        <div className={s.doneIcon}><Check size={36} /></div>
        <h1 className={s.doneTitle}>Order Placed!</h1>
        <p className={s.doneSub}>
          Thank you, <strong>{done.name}</strong>. Your order <strong>#{done.no}</strong>{' '}
          is with the kitchen. We'll bring it to your table shortly. 🍳
        </p>
        <Link className={s.doneBtn} to="/menu">
          Order Something Else <ArrowRight size={16} />
        </Link>
      </div>
    </main>
  )

  if (lines.length === 0) return (
    <main className={s.wrap}>
      <div className={s.empty}>
        <div className={s.emptyIcon}>🛒</div>
        <h1 className={s.emptyTitle}>Cart is empty</h1>
        <p className={s.emptySub}>Add some dishes from our menu first.</p>
        <Link className={s.emptyBtn} to="/menu">Browse the Menu</Link>
      </div>
    </main>
  )

  return (
    <>
      <header style={{ background: 'var(--c-surface)', borderBottom: '1px solid var(--c-border)', padding: '52px clamp(16px,5vw,64px) 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 50% 0%, rgba(212,168,67,.08), transparent 70%)', pointerEvents: 'none' }} />
        <h1 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(2.2rem,6vw,3.8rem)', color: 'var(--c-text)', position: 'relative' }}>Checkout</h1>
        <p style={{ color: 'var(--c-text-3)', marginTop: 10, position: 'relative' }}>Review your order and enter your details</p>
      </header>

      <main className={s.wrap}>
        <div className={s.layout}>
          {/* ─ Form */}
          <div className={s.formCard}>
            <h2 className={s.formTitle}><ShoppingCart size={20} /> Your Details</h2>
            <form className={s.form} onSubmit={submit}>
              <div className={s.formRow2}>
                <label className={s.field}>
                  Full Name
                  <input className={s.input} required value={f.name} onChange={set('name')} placeholder="Ahmad Al-Rashid" autoComplete="name" />
                </label>
                <label className={s.field}>
                  Phone Number
                  <input className={s.input} required type="tel" value={f.phone} onChange={set('phone')} placeholder="+962 7X XXX XXXX" autoComplete="tel" />
                </label>
              </div>
              <label className={s.field}>
                Table Number
                <input className={s.input} required inputMode="numeric" pattern="[0-9]+" value={f.table} onChange={set('table')} placeholder="e.g. 7" />
              </label>
              <label className={s.field}>
                Note for Kitchen <span className={s.fieldOptional}>(optional)</span>
                <textarea className={s.textarea} rows={3} value={f.note} onChange={set('note')} placeholder="Allergies, no onions, extra sauce…" />
              </label>
              <button className={s.submitBtn} type="submit">
                <Check size={18} /> Place Order · {money(total)}
              </button>
            </form>
          </div>

          {/* ─ Summary */}
          <aside className={s.summary}>
            <h2 className={s.summaryTitle}>Order Summary</h2>
            <ul className={s.list}>
              {lines.map(i => (
                <li key={i.id} className={s.item}>
                  <img
                    src={i.img} alt={i.name} className={s.itemImg}
                    onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&q=60' }}
                  />
                  <div className={s.itemInfo}>
                    <span className={s.itemName}>{i.name}</span>
                    <span className={s.itemPrice}>{money(i.price * cart[i.id])}</span>
                  </div>
                  <Qty id={i.id} />
                </li>
              ))}
            </ul>
            <div className={s.totalRow}>
              <span className={s.totalLabel}>Total</span>
              <span className={s.totalAmount}>{money(total)}</span>
            </div>
          </aside>
        </div>
      </main>
    </>
  )
}
