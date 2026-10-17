import { useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { categories, items, tagLabel, type Tag } from '../data'
import DishCard from '../components/DishCard'
import CustomSelect from '../components/CustomSelect'
import s from '../styles/Menu.module.css'

const allTags: Tag[] = ['veg', 'vegan', 'spicy', 'gf', 'new', 'signature']

const SORT_OPTIONS = [
  { value: 'popular', label: 'Popular first',       icon: '⭐' },
  { value: 'rating',  label: 'Top rated',            icon: '★' },
  { value: 'low',     label: 'Price: low → high',    icon: '↑' },
  { value: 'high',    label: 'Price: high → low',    icon: '↓' },
]

export default function Menu() {
  const [sp, setSp]           = useSearchParams()
  const cat                   = sp.get('cat') ?? 'All'
  const [q, setQ]             = useState('')
  const [sort, setSort]       = useState('popular')
  const [filters, setFilters] = useState<Tag[]>([])

  const shown = useMemo(() => {
    let list = items.filter(i =>
      (cat === 'All' || i.cat === cat) &&
      (q === '' || (i.name + i.desc).toLowerCase().includes(q.toLowerCase())) &&
      filters.every(f => i.tags.includes(f))
    )
    if (sort === 'low')     list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'high')    list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'rating')  list = [...list].sort((a, b) => b.rating - a.rating)
    if (sort === 'popular') list = [...list].sort((a, b) => Number(!!b.popular) - Number(!!a.popular))
    return list
  }, [cat, q, filters, sort])

  const gridRef = useRef<HTMLElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  const toggle = (t: Tag) => setFilters(f => f.includes(t) ? f.filter(x => x !== t) : [...f, t])
  const setCat = (c: string) => {
    setSp(c === 'All' ? {} : { cat: c })
    setQ('')
    // Scroll to the top of the grid, right below the sticky bar
    setTimeout(() => {
      const NAV_H = 68                 // --nav-h
      const barH  = barRef.current?.offsetHeight ?? 0
      const gridY = gridRef.current?.getBoundingClientRect().top ?? 0
      const y    = window.scrollY + gridY - NAV_H - barH - 8
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
    }, 0)
  }

  return (
    <>
      {/* Page header */}
      <header className={s.pageHead}>
        <div className={s.pageHeadInner}>
          <span className={s.pageHeadEyebrow}>🍽 Explore our kitchen</span>
          <h1 className={s.pageHeadTitle}>Our Menu</h1>
          <p className={s.pageHeadSub}>{items.length} dishes crafted fresh every day</p>
        </div>
      </header>

      {/* Sticky filter bar */}
      <div className={s.bar} ref={barRef}>
        <nav className={s.tabs} aria-label="Menu categories">
          {['All', ...categories].map(c => (
            <button
              key={c}
              className={c === cat ? `${s.tab} ${s.tabOn}` : s.tab}
              onClick={() => setCat(c)}
            >
              {c}
              <em className={s.tabCount}>
                {c === 'All' ? items.length : items.filter(i => i.cat === c).length}
              </em>
            </button>
          ))}
        </nav>

        <div className={s.tools}>
          <div className={s.searchWrap}>
            <Search size={14} className={s.searchIcon} />
            <input
              type="search"
              className={s.search}
              placeholder="Search dishes…"
              value={q}
              onChange={e => setQ(e.target.value)}
              aria-label="Search dishes"
            />
          </div>
          <CustomSelect
            value={sort}
            onChange={setSort}
            options={SORT_OPTIONS}
            className={s.sortSelect}
          />
        </div>

        <div className={s.chips}>
          {allTags.map(t => (
            <button
              key={t}
              className={filters.includes(t) ? `${s.chip} ${s.chipOn}` : s.chip}
              onClick={() => toggle(t)}
              aria-pressed={filters.includes(t)}
            >
              {tagLabel[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <main className={s.grid} ref={gridRef}>
        {shown.length === 0 && (
          <div className={s.empty}>
            <div className={s.emptyIcon}>🍽</div>
            <p className={s.emptyText}>No dishes match. Try clearing a filter.</p>
            <button className={s.emptyBtn} onClick={() => { setFilters([]); setQ(''); setCat('All') }}>
              Clear all filters
            </button>
          </div>
        )}
        {shown.map(i => <DishCard key={i.id} i={i} />)}
      </main>
    </>
  )
}
