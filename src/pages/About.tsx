import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import s from '../styles/About.module.css'

const hours = [
  ['Sat – Thu', '10:00 – 00:00'],
  ['Friday',    '12:00 – 00:00'],
]

const team = [
  { name: 'Chef Nasser Al-Khalidi', role: 'Head Chef · 18 years', img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80' },
  { name: 'Lina Haddad',           role: 'Pastry Chef',           img: 'https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?w=400&q=80' },
  { name: 'Rami Oweis',            role: 'Head Barista',          img: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=400&q=80' },
]

const foodImgs = [
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',  // hero large
  'https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80',  // hero small 1
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', // hero small 2
  'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80', // kept for fallback
]

// Story section — restaurant kitchen/chef atmosphere image
const storyImg = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80'

const sectionCards = [
  { icon: '📚', name: 'Study Zone',   desc: 'Quiet, fast WiFi, power outlets. Perfect for solo work or duo sessions.',   color: 'rgba(10,132,255,.12)' },
  { icon: '💼', name: 'Meeting Area', desc: 'Semi-private rectangle tables for groups of 4–6. Whiteboard on request.',   color: 'rgba(255,159,10,.12)'  },
  { icon: '👑', name: 'VIP Lounge',   desc: 'Curtained private area for premium occasions. Up to 10 guests per table.',  color: 'rgba(191,90,242,.12)' },
]

export default function About() {
  return (
    <>
      {/* ─ Hero */}
      <header className={s.hero}>
        <div className={s.heroInner}>
          <div className={`rv`}>
            <span className={s.heroEyebrow}>Est. 2018 · Amman, Jordan</span>
            <h1 className={s.heroTitle}>
              A Kitchen Built
              <em className={s.heroTitleAccent}>With Passion</em>
            </h1>
            <p className={s.heroDesc}>
              Zafran started with a single mission — create a restaurant where food is exceptional,
              the atmosphere is welcoming, and every guest feels at home.
            </p>
            <div className={s.heroStats}>
              {[['36+','Menu Items'],['14','Tables'],['4.8★','Rating'],['8+','Years']].map(([v,l]) => (
                <div key={l} className={s.heroStat}>
                  <span className={s.heroStatVal}>{v}</span>
                  <span className={s.heroStatLabel}>{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`${s.heroVisual} rv`}>
            <div className={s.heroImgGrid}>
              <div className={`${s.heroImg} ${s.heroImgLarge}`}>
                <img src={foodImgs[0]} alt="Our food"
                  onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80' }}
                />
              </div>
              <div className={s.heroImg}>
                <img src={foodImgs[1]} alt="Grills"
                  onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=70' }}
                />
              </div>
              <div className={s.heroImg}>
                <img src={foodImgs[2]} alt="Burgers"
                  onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=70' }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ─ Story */}
      <section className={`${s.section} rv`}>
        <div className={s.story}>
          <div className={s.storyImg}>
            <img src={storyImg} alt="Zafran kitchen and dining atmosphere"
              onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80' }}
            />
          </div>
          <div className={s.storyText}>
            <h2 className={s.sectionTitle}>Our Story</h2>
            <p>
              Zafran opened in 2018 with a short menu and a big dream. We source ingredients fresh every morning
              from local markets, and our chefs blend Middle Eastern heritage with modern technique.
            </p>
            <div className={s.storyQuote}>
              <p className={s.storyQuoteText}>
                "We don't just cook food — we craft experiences that people carry with them long after the last bite."
              </p>
              <cite className={s.storyQuoteAuthor}>— Chef Nasser, Head Chef &amp; Founder</cite>
            </div>
            <p>
              From our charcoal grill to our cold brew station, every detail is thought through.
              The three dining zones — Study, Meeting, and VIP — let every guest find their perfect atmosphere.
            </p>
          </div>
        </div>
      </section>

      {/* ─ Team */}
      <section className={`${s.section} rv`} style={{ paddingTop: 0 }}>
        <h2 className={s.sectionTitle}>Meet the Team</h2>
        <p className={s.sectionSub}>The people behind every great plate</p>
        <div className={s.teamGrid}>
          {team.map(m => (
            <div key={m.name} className={s.teamCard}>
              <div className={s.teamImgWrap}>
                <img src={m.img} alt={m.name} className={s.teamImg}
                  onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=70' }}
                />
                <div className={s.teamOverlay} />
              </div>
              <div className={s.teamBody}>
                <div className={s.teamName}>{m.name}</div>
                <div className={s.teamRole}>{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─ Info */}
      <section className={`${s.section} rv`} style={{ paddingTop: 0 }}>
        <h2 className={s.sectionTitle}>Find Us</h2>
        <p className={s.sectionSub}>Hours, contact and our three dining zones</p>
        <div className={s.infoGrid}>
          <div className={s.infoCard}>
            <div className={s.infoCardIcon}>⏰</div>
            <h3 className={s.infoCardTitle}>Opening Hours</h3>
            <div className={s.infoCardContent}>
              {hours.map(([d, t]) => (
                <div key={d} className={s.infoRow}>
                  <span className={s.infoRowLabel}>{d}</span>
                  <span className={s.infoRowVal}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={s.infoCard}>
            <div className={s.infoCardIcon}>📍</div>
            <h3 className={s.infoCardTitle}>Contact</h3>
            <div className={s.infoCardContent}>
              {[
                ['📍','12 Al-Sham Street, Jabal Amman'],
                ['📞','+962 6 555 0100'],
                ['✉️','hello@zafran.example'],
              ].map(([icon, val]) => (
                <div key={val} className={s.infoLine}>
                  <span className={s.infoLineIcon}>{icon}</span>
                  <span>{val}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={s.infoCard}>
            <div className={s.infoCardIcon}>🪑</div>
            <h3 className={s.infoCardTitle}>Dining Sections</h3>
            <div className={s.infoCardContent}>
              {sectionCards.map(sc => (
                <div key={sc.name} className={s.sectionCard}>
                  <div className={s.sectionCardIcon} style={{ background: sc.color }}>{sc.icon}</div>
                  <div>
                    <div className={s.sectionCardName}>{sc.name}</div>
                    <div className={s.sectionCardDesc}>{sc.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─ CTA */}
      <section className={`${s.section} rv`} style={{ paddingTop: 0, paddingBottom: 80 }}>
        <div className={s.ctaBand}>
          <div>
            <h2 className={s.ctaBandTitle}>Ready to join us?</h2>
            <p className={s.ctaBandSub}>Pick your spot and book ahead in seconds on our interactive floor map.</p>
          </div>
          <div className={s.ctaBandActions}>
            <Link className={s.btnCta} to="/tables">Reserve a Table <ArrowRight size={16} /></Link>
            <Link className={s.btnCtaOutline} to="/menu">Browse Menu</Link>
          </div>
        </div>
      </section>
    </>
  )
}
