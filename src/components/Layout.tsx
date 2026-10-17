import { useEffect } from 'react'
import { NavLink, Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCart, MapPin, Phone, Mail, Clock, X, ChefHat, Timer } from 'lucide-react'
import { useCart, money } from '../store'
import { useReservation } from '../reservationStore'
import { Qty } from './DishCard'
import s from '../styles/Layout.module.css'

export default function Layout() {
  const { count, total, lines, open, setOpen, toast } = useCart()
  const { state: resState, reopenModal, formattedTime } = useReservation()
  const { pathname } = useLocation()
  const nav = useNavigate()

  // Show pill when there's a pending reservation and the modal is hidden
  const showPill = resState.reservation?.status === 'pending' && !resState.showPaymentModal

  useEffect(() => {
    window.scrollTo(0, 0)
    setOpen(false)
    const io = new IntersectionObserver(
      es => es.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.rv').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  return (
    <div className={s.page}>
      {/* ── Nav ─────────────────────────── */}
      <nav className={s.nav}>
        <Link to="/" className={s.navLogo}>
          <div className={s.navLogoIcon}>🍽</div>
          <div className={s.navLogoText}>
            <span className={s.navLogoName}>Zafran</span>
            <span className={s.navLogoSub}>Restaurant</span>
          </div>
        </Link>

        <div className={s.navLinks}>
          <NavLink to="/" end className={({ isActive }) => `${s.navLink} ${isActive ? s.navLinkActive : ''}`}>Home</NavLink>
          <NavLink to="/menu"   className={({ isActive }) => `${s.navLink} ${isActive ? s.navLinkActive : ''}`}>Menu</NavLink>
          <NavLink to="/tables" className={({ isActive }) => `${s.navLink} ${isActive ? s.navLinkActive : ''}`}>Tables</NavLink>
          <NavLink to="/about"  className={({ isActive }) => `${s.navLink} ${isActive ? s.navLinkActive : ''}`}>About</NavLink>
        </div>

        <button className={s.navCart} onClick={() => setOpen(true)} aria-label="Open order">
          <ShoppingCart size={17} />
          <span>Order</span>
          {count > 0 && <span className={s.navCartBadge}>{count}</span>}
        </button>
      </nav>

      {/* ── Content ─────────────────────── */}
      <Outlet />

      {/* ── Footer ──────────────────────── */}
      <footer className={s.footer}>
        <div className={s.footerInner}>
          <div className={s.footerBrand}>
            <div className={s.footerLogo}>
              <div className={s.footerLogoIcon}>🍽</div>
              <span className={s.footerLogoName}>Zafran</span>
            </div>
            <span className={s.footerTagline}>Est. 2018 · Amman, Jordan</span>
            <p className={s.footerDesc}>
              A place where every meal tells a story. Open daily for dine-in, takeaway and reservations.
            </p>
            <div className={s.footerDivider} />
          </div>

          <div className={s.footerCol}>
            <span className={s.footerColTitle}>Quick Links</span>
            <Link to="/"       className={s.footerLink}>Home</Link>
            <Link to="/menu"   className={s.footerLink}>Menu</Link>
            <Link to="/tables" className={s.footerLink}>Reserve a Table</Link>
            <Link to="/about"  className={s.footerLink}>About Us</Link>
          </div>

          <div className={s.footerCol}>
            <span className={s.footerColTitle}>Contact</span>
            <div className={s.footerInfo}><MapPin size={14} className={s.footerInfoIcon} /><span>12 Al-Sham Street, Jabal Amman</span></div>
            <div className={s.footerInfo}><Phone size={14} className={s.footerInfoIcon} /><span>+962 6 555 0100</span></div>
            <div className={s.footerInfo}><Mail size={14} className={s.footerInfoIcon} /><span>hello@zafran.example</span></div>
            <div className={s.footerInfo}><Clock size={14} className={s.footerInfoIcon} /><span>Daily 10:00 – 00:00</span></div>
          </div>

          <div className={s.footerCol}>
            <span className={s.footerColTitle}>Sections</span>
            <div className={s.footerInfo}><span className={s.footerInfoIcon}>📚</span><span>Study Zone — Fast WiFi</span></div>
            <div className={s.footerInfo}><span className={s.footerInfoIcon}>💼</span><span>Meeting Area — Semi-private</span></div>
            <div className={s.footerInfo}><span className={s.footerInfoIcon}>👑</span><span>VIP Lounge — Premium</span></div>
          </div>
        </div>

        <div className={s.footerBottom}>
          <span className={s.footerCopy}>© 2026 Zafran Restaurant · All rights reserved</span>
        </div>
      </footer>

      {/* ── FAB ─────────────────────────── */}
      {count > 0 && !open && pathname !== '/checkout' && (
        <button className={s.fab} onClick={() => setOpen(true)}>
          <span className={s.fabLeft}>
            <ShoppingCart size={18} />
            {count} {count === 1 ? 'item' : 'items'}
          </span>
          <span className={s.fabPrice}>{money(total)}</span>
        </button>
      )}

      {/* ── Reservation pending pill ─────── */}
      {showPill && (
        <button className={s.resPill} onClick={reopenModal} aria-label="Open payment modal">
          <span className={s.resPillDot} />
          <Timer size={14} className={s.resPillIcon} />
          <span className={s.resPillText}>
            Payment pending · <strong>{formattedTime}</strong>
          </span>
          <span className={s.resPillArrow}>↗</span>
        </button>
      )}

      {/* ── Toast ───────────────────────── */}
      <div className={toast ? `${s.toast} ${s.toastShow}` : s.toast} role="status">
        {toast}
      </div>

      {/* ── Cart sheet ──────────────────── */}
      <div className={open ? `${s.scrim} ${s.scrimShow}` : s.scrim} onClick={() => setOpen(false)} />

      <aside className={open ? `${s.sheet} ${s.sheetShow}` : s.sheet} aria-hidden={!open}>
        <div className={s.sheetHandle} />
        <div className={s.sheetHead}>
          <h2 className={s.sheetTitle}>Your Order</h2>
          <button className={s.sheetClose} onClick={() => setOpen(false)} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <ul className={s.sheetList}>
          {lines.map(i => (
            <li key={i.id} className={s.sheetItem}>
              <img
                src={i.img} alt={i.name} className={s.sheetItemImg}
                onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&q=60' }}
              />
              <div className={s.sheetItemInfo}>
                <span className={s.sheetItemName}>{i.name}</span>
                <span className={s.sheetItemPrice}>{money(i.price)} each</span>
              </div>
              <Qty id={i.id} />
            </li>
          ))}
          {lines.length === 0 && (
            <li className={s.sheetEmpty}>
              Your order is empty.<br />Add a dish to get started.
            </li>
          )}
        </ul>

        {lines.length > 0 && (
          <>
            <div className={s.sheetTotal}>
              <span className={s.sheetTotalLabel}>Total</span>
              <span className={s.sheetTotalAmount}>{money(total)}</span>
            </div>
            <button
              className={s.btnPrimary}
              onClick={() => { nav('/checkout'); setOpen(false) }}
            >
              <ChefHat size={18} /> Go to Checkout
            </button>
          </>
        )}
      </aside>
    </div>
  )
}
