import { useEffect, useRef, useState } from 'react'
import './App.css'
import logoZeeveez from './assets/redesign/logo-zeeveez.png'
import iconInstagram from './assets/redesign/icon-instagram.svg'
import iconTiktok from './assets/redesign/icon-tiktok.png'
import heroGummies from './assets/redesign/hero-gummies.jpg'
import flavorApple from './assets/redesign/flavor-apple.png'
import flavorHoney from './assets/redesign/flavor-honey.png'
import flavorSour from './assets/redesign/flavor-sour.png'
import logoEmancipet from './assets/redesign/logo-emancipet.png'
import logoMarbridge from './assets/redesign/logo-marbridge.jpg'
import logoMealsOnWheels from './assets/redesign/logo-mealsonwheels.png'
import logoPetsAlive from './assets/redesign/logo-petsalive.png'
import logoSpca from './assets/redesign/logo-spca.jpg'

/* ── Scroll reveal hook ── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
)
const AmazonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
)
const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
)

const HERO_LINES = [
  { line: 'Snacks,\nReimagined', sub: 'ZeeVeez White Honey Apple is so delish we bet you can’t have just one. All natural, proudly made in Texas, and a portion of profits gives back to charity.' },
  { line: 'Better\nIngredients.', sub: 'Organic tapioca syrup, real white honey, and plant-based pectin. No synthetic dyes. No compromises.' },
  { line: 'Nothing\nArtificial.', sub: 'No artificial anything — and one flavor that actually delivers. So delish we bet you can’t have just one.' },
]

const BADGES = [
  { icon: '🌱', label: 'Plant-Based' },
  { icon: '🌿', label: 'All Natural' },
  { icon: '🌾', label: 'Gluten Free' },
  { icon: '🥜', label: 'Peanut Free' },
  { icon: '🧪', label: 'No Synthetic Dyes' },
  { icon: '❤️', label: 'Gives Back' },
]

const FLAVORS = [
  { name: 'NATURAL\nAPPLE', notes: 'CRISP · ORCHARD-FRESH', desc: 'Bright, crisp apple taste from real natural flavors — not synthetic concentrates.', img: flavorApple, reverse: false },
  { name: 'WHITE HONEY\nSWEETNESS', notes: 'FLORAL · DELICATE', desc: 'A delicate, floral honey note that balances perfectly with the apple brightness.', img: flavorHoney, reverse: true },
  { name: 'THE SOUR\nSURPRISE', notes: 'TANGY · BRIGHT', desc: 'Citric acid gives every bite a bright, tangy finish you won’t see coming — and won’t forget. One flavor. That’s all it takes.', img: flavorSour, reverse: false },
]

const NUTRITION = [
  { value: '80', label: 'Calories' },
  { value: '0g', label: 'Fat' },
  { value: '20g', label: 'Carbs' },
  { value: '14g', label: 'Sugars' },
  { value: '1oz', label: 'Pouch', highlight: true },
]

const INGREDIENTS = [
  { emoji: '🍚', name: 'Organic Tapioca Syrup', note: 'Clean, natural sweetener base' },
  { emoji: '🍬', name: 'Organic Cane Sugar', note: 'Just enough sweetness' },
  { emoji: '🍯', name: 'White Honey', note: 'Delicate floral sweetness' },
  { emoji: '💧', name: 'Water', note: 'Pure and simple' },
  { emoji: '🥥', name: 'Pectin', note: 'Plant-based, perfect chew' },
  { emoji: '🍏', name: 'Natural Flavors', note: 'Less than 2% — real taste' },
  { emoji: '🍋', name: 'Citric Acid', note: 'Natural tartness' },
  { emoji: '🧂', name: 'Sodium Citrate', note: 'Natural acidity balance' },
]

const NEVERS = ['Artificial Flavors', 'Synthetic Dyes', 'High-Fructose Corn Syrup', 'Gelatin', 'Peanuts', 'GMOs']

const CHARITIES = [
  { logo: logoEmancipet, name: 'Emancipet', desc: 'Affordable spay and neuter services building a healthier, happier pet community across Central Texas.', url: 'https://www.emancipet.org/' },
  { logo: logoMarbridge, name: 'Marbridge', desc: 'Life-changing residential and day programs empowering adults with intellectual and developmental disabilities in Texas.', url: 'https://www.marbridge.org/' },
  { logo: logoMealsOnWheels, name: 'Meals on Wheels', desc: 'Hot meals and warm companionship delivered to seniors in need — because no one should go hungry or feel alone.', url: 'https://www.mealsonwheelsamerica.org/' },
  { logo: logoPetsAlive, name: 'Pets Alive', desc: 'A no-kill rescue giving animals in crisis a second chance — sanctuary, care, and a path to a forever home.', url: 'https://www.austinpetsalive.org/' },
  { logo: logoSpca, name: 'SPCA', desc: 'Fighting animal cruelty and championing the humane treatment of animals across the nation.', url: 'https://www.spca.org/' },
]

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [heroIdx, setHeroIdx] = useState(0)
  const [email, setEmail] = useState('')
  const [subLoading, setSubLoading] = useState(false)
  const [subMessage, setSubMessage] = useState('')
  const [subError, setSubError] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      setShowTop(window.scrollY > 600)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setHeroIdx((i) => (i + 1) % HERO_LINES.length), 4200)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return
    setSubLoading(true)
    setSubError('')
    setSubMessage('')
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to send email')
      setSubMessage('Check your email! We sent you a special welcome message.')
      setEmail('')
      setTimeout(() => setSubMessage(''), 5000)
    } catch (err) {
      console.error('Email submission error:', err)
      setSubError(err.message || 'Something went wrong. Please try again.')
      setTimeout(() => setSubError(''), 5000)
    } finally {
      setSubLoading(false)
    }
  }

  const [bandRef, bandVis] = useReveal()
  const [aboutRef, aboutVis] = useReveal()
  const [flavorRef, flavorVis] = useReveal()
  const [ingredRef, ingredVis] = useReveal()
  const [givingRef, givingVis] = useReveal()
  const [findusRef, findusVis] = useReveal()
  const [footRef, footVis] = useReveal()

  const hero = HERO_LINES[heroIdx]

  return (
    <div className="site">
      <a href="#top" className="skip-link">Skip to content</a>

      {/* ── Announcement bar ── */}
      <div className="announce">Free Shipping — No Minimums!</div>

      {/* ── Header ── */}
      <header className={`zheader ${scrolled ? 'zheader--scrolled' : ''}`}>
        <div className="zheader__top">
          <div className="zheader__socials">
            <a href="https://www.instagram.com/thefeelgoodgummy" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="zheader__social">
              <img src={iconInstagram} alt="Instagram" />
            </a>
            <a href="https://www.tiktok.com/@zeeveez" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="zheader__social zheader__social--tiktok">
              <img src={iconTiktok} alt="TikTok" />
            </a>
          </div>
          <a href="#top" className="zheader__logo">
            <img src={logoZeeveez} alt="ZeeVeez Gummy Snacks" />
          </a>
          <div className="zheader__actions">
            <a href="#flavor" className="zheader__icon-link" aria-label="Shop the flavor"><SearchIcon /></a>
            <a href="https://www.amazon.com/" target="_blank" rel="noopener noreferrer" className="zheader__amazon-btn">
              <AmazonIcon />
              <span>Shop on Amazon</span>
            </a>
            <button className={`zheader__burger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
        {menuOpen && <div className="zheader__overlay" onClick={closeMenu} />}
        <nav className={`zheader__nav ${menuOpen ? 'zheader__nav--open' : ''}`}>
          <a href="#top" onClick={closeMenu}>Home</a>
          <a href="#flavor" onClick={closeMenu}>Shop</a>
          <a href="#findus" onClick={closeMenu}>Find Us</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#wholesale" onClick={closeMenu}>Wholesale</a>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section id="top" className="zhero">
        <div className="zhero__glow" aria-hidden="true" />
        <img src={heroGummies} alt="" aria-hidden="true" className="zhero__img" />
        <div className="zhero__inner">
          <div className="zhero__text">
            <div className="zhero__headline-wrap">
              <h1 key={heroIdx} className="zhero__headline">{hero.line}</h1>
            </div>
            <p key={`sub-${heroIdx}`} className="zhero__sub">{hero.sub}</p>
            <div className="zhero__actions">
              <a href="#flavor" className="zbtn zbtn--dark">Shop Now</a>
              <a href="#findus" className="zbtn zbtn--light">Find Us In Store</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Full-bleed band 1 ── */}
      <section ref={bandRef} className={`zband ${bandVis ? 'zv-in' : ''}`}>
        <img src={heroGummies} alt="ZeeVeez gummies" className="zband__img" />
        <div className="zband__overlay" aria-hidden="true" />
        <div className="zband__text">
          <p className="zband__tag">Meet the Modern Gummy</p>
          <h2>Better ingredients.<br />Brighter bites.</h2>
        </div>
      </section>

      {/* ── Statement + badges ── */}
      <section id="about" ref={aboutRef} className={`zabout ${aboutVis ? 'zv-in' : ''}`}>
        <h2>THE ALL-NATURAL, PLANT-BASED &amp;<br />CLEAN-INGREDIENT GUMMY SNACK</h2>
        <p>
          ZeeVeez was born in Houston, Texas with a belief that gummy snacks could be better — better
          ingredients, better taste, better impact. Made by ZV3, LLC and manufactured in Fort Worth, every
          pouch is crafted with organic ingredients, real pectin, and natural flavors — no synthetic dyes,
          no compromises.
        </p>
        <div className="zbadges">
          {BADGES.map((b) => (
            <div className="zbadge" key={b.label}>
              <div className="zbadge__icon">{b.icon}</div>
              <div className="zbadge__label">{b.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Flavor ── */}
      <section id="flavor" ref={flavorRef} className={`zflavor ${flavorVis ? 'zv-in' : ''}`}>
        <div className="zflavor__header">
          <span className="ztag">Signature Flavor</span>
          <h2>White Honey Apple</h2>
          <p>
            Floral honey meets crisp orchard apple — with a bright sour surprise that&rsquo;ll keep you
            coming back for more. One flavor. That&rsquo;s all it takes.
          </p>
        </div>
        {FLAVORS.map((f) => (
          <div className={`zflavor-block ${f.reverse ? 'zflavor-block--reverse' : ''}`} key={f.name}>
            <div className="zflavor-block__media">
              <div className="zflavor-block__glow" aria-hidden="true" />
              <img src={f.img} alt="" className="zflavor-block__img" />
            </div>
            <div className="zflavor-block__text">
              <h3>{f.name}</h3>
              <div className="zflavor-block__notes">{f.notes}</div>
              <p>{f.desc}</p>
            </div>
          </div>
        ))}
        <div className="znutrition">
          {NUTRITION.map((n) => (
            <div className={`znutrition__item ${n.highlight ? 'znutrition__item--dark' : ''}`} key={n.label}>
              <div className="znutrition__value">{n.value}</div>
              <div className="znutrition__label">{n.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Ingredients ── */}
      <section id="ingredients" ref={ingredRef} className={`zingr ${ingredVis ? 'zv-in' : ''}`}>
        <div className="zingr__header">
          <span className="ztag">What&rsquo;s Inside</span>
          <h2>Simple ingredients. Incredible flavor.</h2>
          <p>Everything in a ZeeVeez pouch — nothing to hide.</p>
        </div>
        <div className="zingr__grid">
          {INGREDIENTS.map((i) => (
            <div className="zingr-card" key={i.name}>
              <div className="zingr-card__emoji">{i.emoji}</div>
              <div className="zingr-card__name">{i.name}</div>
              <div className="zingr-card__note">{i.note}</div>
            </div>
          ))}
        </div>
        <p className="zingr__footnote">Made in a peanut-free facility. That&rsquo;s the full list — no fine print.</p>
        <div className="znever">
          <h3>What you&rsquo;ll <em>never</em> find in a ZeeVeez</h3>
          <div className="znever__pills">
            {NEVERS.map((n) => (
              <span className="znever__pill" key={n}><XIcon /> {n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Charity partners ── */}
      <section id="giving" ref={givingRef} className={`zgiving ${givingVis ? 'zv-in' : ''}`}>
        <div className="zgiving__header">
          <span className="ztag">Giving Back</span>
          <h2>Our charity partners</h2>
          <p>
            Savor the taste knowing a portion of our profits go to selected charities benefiting animals
            and children. Every pouch you enjoy helps make a real difference.
          </p>
        </div>
        <div className="zgiving__grid">
          {CHARITIES.map((c) => (
            <a href={c.url} target="_blank" rel="noopener noreferrer" className="zcharity-card" key={c.name}>
              <div className="zcharity-card__logo-wrap">
                <img src={c.logo} alt={c.name} className="zcharity-card__logo" />
              </div>
              <h3>{c.name}</h3>
              <p>{c.desc}</p>
              <span className="zcharity-card__cta">Visit website →</span>
            </a>
          ))}
        </div>
        <p className="zgiving__footnote">
          Want your charity involved? Email <a href="mailto:howdy@zeeveez.com">howdy@zeeveez.com</a>
        </p>
      </section>

      {/* ── Find us band ── */}
      <section id="findus" ref={findusRef} className={`zfindus ${findusVis ? 'zv-in' : ''}`}>
        <img src={heroGummies} alt="" aria-hidden="true" className="zfindus__img" />
        <div className="zfindus__text">
          <p className="ztag ztag--light">Find Us</p>
          <h2>Now snacking<br />near you.</h2>
          <p className="zfindus__sub">
            Grab a pouch on Amazon with free nationwide shipping — more retailers landing soon.
          </p>
          <a href="https://www.amazon.com/" target="_blank" rel="noopener noreferrer" className="zbtn zbtn--honey">
            Shop on Amazon →
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer id="wholesale" ref={footRef} className={`zfoot ${footVis ? 'zv-in' : ''}`}>
        <div className="zfoot__newsletter">
          <h3>Subscribe to our emails</h3>
          <p>Be first to know about new drops, restocks, and giveaways.</p>
          <form onSubmit={handleSubscribe} className="zfoot__form">
            <input
              type="email"
              placeholder="Email"
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={subLoading}
            />
            <button type="submit" aria-label="Subscribe" disabled={subLoading}>
              {subLoading ? '…' : subMessage ? '✓' : '→'}
            </button>
          </form>
          {subMessage && <div className="zfoot__msg zfoot__msg--success">{subMessage}</div>}
          {subError && <div className="zfoot__msg zfoot__msg--error">{subError}</div>}
        </div>
        <div className="zfoot__row">
          <div className="zfoot__socials">
            <a href="https://www.instagram.com/thefeelgoodgummy" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src={iconInstagram} alt="Instagram" />
            </a>
            <a href="https://www.tiktok.com/@zeeveez" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <img src={iconTiktok} alt="TikTok" />
            </a>
          </div>
        </div>
        <div className="zfoot__legal">
          <span>© {new Date().getFullYear()} ZeeVeez · ZV3, LLC</span>
          <span>Born in Houston, TX · Made in Fort Worth, TX</span>
        </div>
      </footer>

      {/* ── Back to top ── */}
      <button className={`zbtt ${showTop ? 'zbtt--visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6" /></svg>
      </button>
    </div>
  )
}

export default App
