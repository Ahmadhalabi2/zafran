import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Star, Clock, Flame, ShoppingCart } from 'lucide-react'
import { items, tagLabel, type Tag } from '../data'
import { money, useCart } from '../store'
import DishCard from '../components/DishCard'
import s from '../styles/Dish.module.css'

const tagColors: Partial<Record<Tag, { bg: string; color: string }>> = {
  spicy:     { bg: 'rgba(255,69,58,.12)',   color: '#FF453A' },
  vegan:     { bg: 'rgba(52,199,89,.12)',   color: '#34C759' },
  veg:       { bg: 'rgba(52,199,89,.1)',    color: '#30D158' },
  gf:        { bg: 'rgba(255,159,10,.1)',   color: '#FF9F0A' },
  new:       { bg: 'rgba(10,132,255,.12)',  color: '#0A84FF' },
  signature: { bg: 'rgba(191,90,242,.12)', color: '#BF5AF2' },
}

export default function Dish() {
  const { id } = useParams()
  const { change, setOpen } = useCart()
  const [n, setN] = useState(1)

  const dish = items.find(i => i.id === Number(id))

  if (!dish) return (
    <div className={s.notFound}>
      <div className={s.notFoundIcon}>🍽</div>
      <h1>Dish not found</h1>
      <Link className={s.notFoundBtn} to="/menu">Back to Menu</Link>
    </div>
  )

  const related = items.filter(i => i.cat === dish.cat && i.id !== dish.id).slice(0, 3)

  return (
    <main className={s.wrap}>
      <Link to={`/menu?cat=${encodeURIComponent(dish.cat)}`} className={s.back}>
        <ArrowLeft size={15} /> {dish.cat}
      </Link>

      <div className={s.detail}>
        {/* Image */}
        <div className={s.imgWrap}>
          <img
            src={dish.img}
            alt={dish.name}
            className={s.img}
            onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&q=80' }}
          />
          {dish.popular && <span className={s.imgBadge}>⭐ Popular</span>}
        </div>

        {/* Info */}
        <div className={s.info}>
          <span className={s.cat}>{dish.cat}</span>

          <h1 className={s.title}>{dish.name}</h1>

          <div className={s.meta}>
            <span className={s.rating}>
              <Star size={14} fill="currentColor" /> {dish.rating}
            </span>
            <span className={s.metaItem}>
              <Clock size={13} className={s.metaIcon} /> {dish.mins} min
            </span>
            <span className={s.metaItem}>
              <Flame size={13} className={s.metaIcon} /> {dish.kcal} kcal
            </span>
          </div>

          <div className={s.priceRow}>
            <span className={s.price}>{money(dish.price)}</span>
            <span className={s.priceSub}>per serving</span>
          </div>

          <p className={s.desc}>{dish.desc}</p>

          <div className={s.tags}>
            {dish.tags.map(t => {
              const c = tagColors[t] ?? { bg: 'rgba(255,255,255,.06)', color: 'var(--c-text-3)' }
              return (
                <span key={t} className={s.tag} style={{ background: c.bg, color: c.color }}>
                  {tagLabel[t]}
                </span>
              )
            })}
          </div>

          <div className={s.buy}>
            <div className={s.qty}>
              <button className={s.qtyBtn} onClick={() => setN(Math.max(1, n - 1))} aria-label="Less">−</button>
              <span className={s.qtyVal}>{n}</span>
              <button className={s.qtyBtn} onClick={() => setN(n + 1)} aria-label="More">+</button>
            </div>
            <button
              className={s.addBtn}
              onClick={() => { change(dish.id, n); setN(1); setOpen(true) }}
            >
              <ShoppingCart size={17} />
              Add to Order · {money(dish.price * n)}
            </button>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className={s.related}>
          <h2 className={s.relatedTitle}>
            <span>More from</span> {dish.cat}
          </h2>
          <div className={s.relatedGrid}>
            {related.map(i => <DishCard key={i.id} i={i} />)}
          </div>
        </div>
      )}
    </main>
  )
}
