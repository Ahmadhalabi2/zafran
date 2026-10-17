import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Clock, UtensilsCrossed } from 'lucide-react'
import { categories, items } from '../data'
import { money } from '../store'
import DishCard from '../components/DishCard'
import s from '../styles/Home.module.css'

const catEmoji: Record<string, string> = {
  'Starters': '🥗', 'Burgers': '🍔', 'Grills': '🥩', 'Pasta & Rice': '🍝',
  'Sandwiches': '🥙', 'Salads': '🥗', 'Desserts': '🍰', 'Hot Drinks': '☕', 'Cold Drinks': '🥤'
}

const reviews = [
  { text: 'The mixed grill was absolutely incredible — tender, smoky, and perfectly seasoned. Best in Amman!', name: 'Ahmad K.', stars: 5 },
  { text: 'Loved the VIP lounge. So private and cozy with amazing cardamom latte. Will be back every week.', name: 'Sara M.', stars: 5 },
  { text: 'Crispy chicken burger is on another level. Study zone is perfect for working while eating great food.', name: 'Omar R.', stars: 5 },
]

export default function Home() {
  const tickerRef = useRef<HTMLDivElement>(null)
  const popular  = items.filter(i => i.popular).slice(0, 4)
  const featured = items.find(i => i.id === 12)!

  // Best hero background — real restaurant food image from Pexels (free license)
  const heroBg = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=1400&h=900&fit=crop'

  return (
    <>
      {/* ── Hero ───────────────────────────────── */}
      <header className={s.hero}>
        <div className={s.heroBg}>
          <img src={heroBg} alt="" className={s.heroBgImg} aria-hidden />
        </div>

        <div className={s.heroInner}>
          <div className={`${s.heroCopy} rv`}>
            <span className={s.heroEyebrow}>
              <Star size={12} fill="currentColor" /> Open daily 10:00 – 24:00
            </span>
            <h1 className={s.heroTitle}>
              Where Every
              <em className={s.heroTitleAccent}>Meal Matters</em>
            </h1>
            <p className={s.heroSub}>
              Fresh ingredients, bold flavors, and three distinct spaces — quiet study zones,
              collaborative meeting areas, and exclusive VIP lounges.
            </p>
            <div className={s.heroCta}>
              <Link className={s.btnHero} to="/menu">
                Explore Menu <ArrowRight size={16} />
              </Link>
              <Link className={s.btnHeroGhost} to="/tables">
                Reserve a Table
              </Link>
            </div>
            <div className={s.heroStats}>
              <div className={s.heroStat}>
                <span className={s.heroStatVal}>36+</span>
                <span className={s.heroStatLabel}>Menu Items</span>
              </div>
              <div className={s.heroStatSep} />
              <div className={s.heroStat}>
                <span className={s.heroStatVal}>4.8★</span>
                <span className={s.heroStatLabel}>Avg Rating</span>
              </div>
              <div className={s.heroStatSep} />
              <div className={s.heroStat}>
                <span className={s.heroStatVal}>14</span>
                <span className={s.heroStatLabel}>Tables</span>
              </div>
              <div className={s.heroStatSep} />
              <div className={s.heroStat}>
                <span className={s.heroStatVal}>2018</span>
                <span className={s.heroStatLabel}>Since</span>
              </div>
            </div>
          </div>

          
        </div>
      </header>

      {/* ── Ticker ─────────────────────────────── */}
      <div className={s.ticker} aria-hidden>
        <div className={s.tickerTrack} ref={tickerRef}>
          {[...categories, ...categories].map((c, i) => (
            <span key={i} className={s.tickerItem}>
              <span className={s.tickerDot} />
              {catEmoji[c]} {c}
            </span>
          ))}
        </div>
      </div>

      {/* ── Categories ─────────────────────────── */}
      <section className={`${s.section} rv`}>
        <div className={s.sectionHead}>
          <div>
            <h2 className={s.sectionTitle}>Browse by <span className={s.sectionTitleAccent}>Category</span></h2>
            <p className={s.sectionSub}>{categories.length} categories · {items.length} dishes</p>
          </div>
          <Link className={s.seeAll} to="/menu">View all <ArrowRight size={14} /></Link>
        </div>
        <div className={s.catsGrid}>
          {categories.map(c => {
            const first = items.find(i => i.cat === c)!
            const count = items.filter(i => i.cat === c).length
            return (
              <Link key={c} to={`/menu?cat=${encodeURIComponent(c)}`} className={s.catCard}>
                <img
                  src={first.img} alt={c}
                  className={s.catCardImg}
                  loading="lazy"
                  onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=70' }}
                />
                <div className={s.catCardOverlay}>
                  <span className={s.catCardEmoji}>{catEmoji[c] ?? '🍽'}</span>
                  <span className={s.catCardName}>{c}</span>
                  <span className={s.catCardCount}>{count} items</span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── Popular dishes ──────────────────────── */}
      <section className={`${s.section} rv`} style={{ paddingTop: 0 }}>
        <div className={s.sectionHead}>
          <div>
            <h2 className={s.sectionTitle}>Most <span className={s.sectionTitleAccent}>Ordered</span></h2>
            <p className={s.sectionSub}>Our guests' top picks this week</p>
          </div>
          <Link className={s.seeAll} to="/menu">Full menu <ArrowRight size={14} /></Link>
        </div>
        <div className={s.dishesGrid}>
          {popular.map(i => <DishCard key={i.id} i={i} />)}
        </div>
      </section>

      {/* ── Featured dish ───────────────────────── */}
      <section className={`${s.section} rv`} style={{ paddingTop: 0 }}>
        <div className={s.feature}>
          <div className={s.featureImgWrap}>
            <img
              src={featured.img} alt={featured.name}
              className={s.featureImg}
              onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&q=80' }}
            />
            <div className={s.featureImgOverlay} />
          </div>
          <div className={s.featureCopy}>
            <span className={s.featureEyebrow}><Star size={13} fill="currentColor" /> Chef's Signature Pick</span>
            <h2 className={s.featureTitle}>{featured.name}</h2>
            <p className={s.featureDesc}>{featured.desc}</p>
            <div className={s.featureFacts}>
              <span className={s.featureFact}><Star size={12} className={s.featureFactIcon} fill="currentColor" /> {featured.rating}</span>
              <span className={s.featureFact}><Clock size={12} className={s.featureFactIcon} /> {featured.mins} min</span>
              <span className={s.featureFact}><UtensilsCrossed size={12} className={s.featureFactIcon} /> {featured.kcal} kcal</span>
            </div>
            <div className={s.featureActions}>
              <Link className={s.btnFeature} to={`/dish/${featured.id}`}>
                Order Now · {money(featured.price)} <ArrowRight size={16} />
              </Link>
              <Link className={s.btnFeatureOutline} to="/menu">View Full Menu</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tables teaser ───────────────────────── */}
      <section className={`${s.section} rv`} style={{ paddingTop: 0 }}>
        <div className={s.tablesTeaser}>
          <div>
            <span className={s.tablesTeaserEyebrow}>🪑 Interactive Floor Map</span>
            <h2 className={s.tablesTeaserTitle}>Choose Your Perfect Spot</h2>
            <p className={s.tablesTeaserDesc}>
              Three distinct spaces designed for different moods. Pick your exact table
              on our live floor plan and reserve in seconds.
            </p>
            <div className={s.zones}>
              <div className={`${s.zone} ${s.zoneStudy}`}>
                <div className={s.zoneIcon}>📚</div>
                <div><div className={s.zoneName}>Study Zone</div><div className={s.zoneDesc}>Quiet · Fast WiFi · Power outlets</div></div>
              </div>
              <div className={`${s.zone} ${s.zoneMeeting}`}>
                <div className={s.zoneIcon}>💼</div>
                <div><div className={s.zoneName}>Meeting Area</div><div className={s.zoneDesc}>Semi-private · Whiteboard access</div></div>
              </div>
              <div className={`${s.zone} ${s.zoneVip}`}>
                <div className={s.zoneIcon}>👑</div>
                <div><div className={s.zoneName}>VIP Lounge</div><div className={s.zoneDesc}>Curtained · Premium service</div></div>
              </div>
            </div>
            <Link className={s.btnFeature} to="/tables">
              View Table Map <ArrowRight size={16} />
            </Link>
          </div>
          <div className={s.miniMap}>
            <div className={s.miniMapInner}>
              <div className={`${s.miniSection} ${s.miniSectionStudy}`}>
                <div className={s.miniSectionLabel}>📚 Study</div>
                {[0,1,2].map(n => <div key={n} className={`${s.miniTable} ${s.miniTableRound} ${n===1?s.miniTableOccupy:s.miniTableAvail}`} />)}
              </div>
              <div className={`${s.miniSection} ${s.miniSectionMeeting}`}>
                <div className={s.miniSectionLabel}>💼 Meeting</div>
                {[0,1].map(n => <div key={n} className={`${s.miniTable} ${n===0?s.miniTableOccupy:s.miniTableAvail}`} />)}
              </div>
              <div className={`${s.miniSection} ${s.miniSectionVip}`}>
                <div className={s.miniSectionLabel}>👑 VIP</div>
                {[0,1].map(n => <div key={n} className={`${s.miniTable} ${s.miniTableAvail}`} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews ─────────────────────────────── */}
      <section className={`${s.section} rv`} style={{ paddingTop: 0 }}>
        <div className={s.sectionHead}>
          <div>
            <h2 className={s.sectionTitle}>What Guests <span className={s.sectionTitleAccent}>Say</span></h2>
            <p className={s.sectionSub}>Real reviews from real diners</p>
          </div>
        </div>
        <div className={s.reviewsGrid}>
          {reviews.map((r, i) => (
            <blockquote key={i} className={s.reviewCard}>
              <div className={s.reviewStars}>
                {Array.from({ length: r.stars }).map((_, k) => <Star key={k} size={14} fill="currentColor" />)}
              </div>
              <p className={s.reviewText}>{r.text}</p>
              <cite className={s.reviewAuthor}>— {r.name}</cite>
            </blockquote>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────── */}
      <section className={`${s.section} rv`} style={{ paddingTop: 0, paddingBottom: 80 }}>
        <div className={s.ctaBand}>
          <div>
            <h2 className={s.ctaBandTitle}>Ready to dine with us?</h2>
            <p className={s.ctaBandSub}>Open every day 10 AM to midnight. Walk in or reserve ahead.</p>
          </div>
          <div className={s.ctaBandActions}>
            <Link className={s.btnCta} to="/menu">Order Now <ArrowRight size={16} /></Link>
            <Link className={s.btnCtaOutline} to="/tables">Book a Table</Link>
          </div>
        </div>
      </section>
    </>
  )
}
