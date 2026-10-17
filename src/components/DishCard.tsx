import { Link } from 'react-router-dom'
import { Star, Clock, Flame, Leaf, Wheat, Sparkles, Crown } from 'lucide-react'
import { tagLabel, type Item, type Tag } from '../data'
import { useCart, money } from '../store'
import s from '../styles/DishCard.module.css'

const tagColors: Partial<Record<Tag, { bg: string; color: string }>> = {
  spicy:     { bg: 'rgba(255,69,58,.12)',   color: '#FF453A' },
  vegan:     { bg: 'rgba(52,199,89,.12)',   color: '#34C759' },
  veg:       { bg: 'rgba(52,199,89,.1)',    color: '#30D158' },
  gf:        { bg: 'rgba(255,159,10,.1)',   color: '#FF9F0A' },
  new:       { bg: 'rgba(10,132,255,.12)',  color: '#0A84FF' },
  signature: { bg: 'rgba(191,90,242,.12)', color: '#BF5AF2' },
}

export function Qty({ id, compact = false }: { id: number; compact?: boolean }) {
  const { cart, change } = useCart()
  return (
    <div className={s.qty}>
      <button className={s.qtyBtn} onClick={() => change(id, -1)} aria-label="Remove one">−</button>
      <span className={s.qtyVal}>{cart[id]}</span>
      <button className={s.qtyBtn} onClick={() => change(id, 1)} aria-label="Add one">+</button>
    </div>
  )
}

export function AddButton({ id }: { id: number }) {
  const { cart, change } = useCart()
  return cart[id]
    ? <Qty id={id} />
    : <button className={s.addBtn} onClick={() => change(id, 1)}>+ Add</button>
}

export default function DishCard({ i }: { i: Item }) {
  return (
    <article className={s.card}>
      {/* Image */}
      <Link to={`/dish/${i.id}`} className={s.imgWrap} aria-label={`View ${i.name}`} tabIndex={-1}>
        <img
          src={i.img}
          alt={i.name}
          className={s.img}
          loading="lazy"
          onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80' }}
        />
        <div className={s.imgOverlay} />

        {/* Badges */}
        <div className={s.badges}>
          {i.popular && (
            <span className={s.badgePop}><Star size={10} fill="currentColor" /> Popular</span>
          )}
          {i.tags.includes('new') && (
            <span className={s.badgeNew}><Sparkles size={10} /> New</span>
          )}
          {i.tags.includes('signature') && (
            <span className={s.badgeSig}><Crown size={10} /> Signature</span>
          )}
        </div>

        <span className={s.pricePill}>{money(i.price)}</span>
      </Link>

      {/* Body */}
      <div className={s.body}>
        <div className={s.bodyTop}>
          <h2 className={s.name}>
            <Link to={`/dish/${i.id}`}>{i.name}</Link>
          </h2>
          <div className={s.facts}>
            <span className={s.rating}><Star size={11} fill="currentColor" /> {i.rating}</span>
            <span><Flame size={11} /> {i.kcal} kcal</span>
            <span><Clock size={11} /> {i.mins} min</span>
          </div>
          <p className={s.desc}>{i.desc}</p>
        </div>

        <div className={s.footer}>
          <div className={s.tags}>
            {i.tags
              .filter(t => t !== 'new' && t !== 'signature')
              .slice(0, 2)
              .map(t => {
                const c = tagColors[t] ?? { bg: 'rgba(255,255,255,.06)', color: 'var(--c-text-3)' }
                return (
                  <span
                    key={t}
                    className={s.tag}
                    style={{ background: c.bg, color: c.color }}
                  >
                    {tagLabel[t]}
                  </span>
                )
              })}
          </div>
          <AddButton id={i.id} />
        </div>
      </div>
    </article>
  )
}
