import { useEffect, useRef, useState, useCallback } from 'react'
import './App.css'

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

/* ── Animated counter ── */
function Counter({ end, suffix = '', duration = 2000 }) {
  const [ref, visible] = useReveal(0.3)
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!visible) return
    let start = 0
    const step = end / (duration / 16)
    const id = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(id) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(id)
  }, [visible, end, duration])
  return <span ref={ref}>{count}{suffix}</span>
}

/* ── FAQ Accordion item ── */
function FaqItem({ q, a, open, onClick }) {
  const bodyRef = useRef(null)
  return (
    <div className={`faq__item ${open ? 'faq__item--open' : ''}`}>
      <button className="faq__q" onClick={onClick} aria-expanded={open}>
        <span>{q}</span>
        <svg className="faq__chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
      </button>
      <div className="faq__a-wrap" style={{ maxHeight: open ? bodyRef.current?.scrollHeight + 'px' : '0px' }}>
        <div className="faq__a" ref={bodyRef}>{a}</div>
      </div>
    </div>
  )
}

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
)
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
)
const StarIcon = ({ size = 16, className = '' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
)
const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="heart-icon"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
)
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/></svg>
)
const TikTokIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.75 2.9 2.9 0 1 1 2.31-4.64 2.88 2.88 0 0 0 5.07.52V9.56a8.03 8.03 0 0 1-4.33 1.48c-4.57 0-8.29-3.72-8.29-8.3S3.71 2.04 8.29 2.04c4.16 0 7.61 3.07 8.3 7.65h0z"/></svg>
)
const AmazonIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v2H6V6zm0 4h12v2H6v-2zm0 4h8v2H6v-2zm-2 6h1v2H2v-2h2zm4 0h8v2h-8v-2zm9 0h1v2h-2v-2h1zm2 0h1v2h-2v-2h1z"/><path d="M2 2v20h20V2H2zm2 2h16v16H4V4z"/></svg>
)

/* ── Cloud SVG decoration ── */
const Cloud = ({ className }) => (
  <svg className={`cloud ${className}`} viewBox="0 0 120 60" fill="currentColor" aria-hidden="true">
    <ellipse cx="60" cy="42" rx="50" ry="18" />
    <ellipse cx="35" cy="32" rx="22" ry="20" />
    <ellipse cx="70" cy="28" rx="28" ry="24" />
    <ellipse cx="50" cy="22" rx="20" ry="18" />
  </svg>
)

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      setShowTop(window.scrollY > 600)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const [heroRef, heroVis] = useReveal(0.1)
  const [pressRef, pressVis] = useReveal(0.2)
  const [aboutRef, aboutVis] = useReveal()
  const [givesRef, givesVis] = useReveal()
  const [flavorRef, flavorVis] = useReveal()
  const [processRef, processVis] = useReveal()
  const [statsRef, statsVis] = useReveal(0.3)
  const [featRef, featVis] = useReveal()
  const [ingredRef, ingredVis] = useReveal()
  const [notRef, notVis] = useReveal()
  const [testRef, testVis] = useReveal()
  const [trustRef, trustVis] = useReveal(0.2)
  const [faqRef, faqVis] = useReveal()
  const [ctaRef, ctaVis] = useReveal()

  const faqs = [
    { q: 'What makes ZeeVeez different from other gummy snacks?', a: 'Every ZeeVeez pouch is made with organic tapioca syrup, organic cane sugar, water, pectin, and natural flavors — that\'s it. No gelatin, no artificial flavors, no synthetic dyes. We spent two years perfecting a gummy snack that actually tastes like the real thing.' },
    { q: 'Are ZeeVeez vegan and gluten-free?', a: 'Yes! ZeeVeez are 100% plant-based (we use pectin instead of gelatin), gluten-free, and made in a peanut-free facility. They\'re a snack the whole family can enjoy.' },
    { q: 'Where are ZeeVeez made?', a: 'ZeeVeez was born in Houston, Texas and every pouch is manufactured by Bridge Industrial Group in Fort Worth, TX. We\'re a Texas company through and through.' },
    { q: 'When will ZeeVeez be available to purchase?', a: 'We\'re launching very soon! Sign up for our email list to be the first to know when White Honey Apple drops. Early subscribers get access to exclusive launch-day pricing.' },
    { q: 'How many calories are in a pouch?', a: 'Each 1oz pouch of ZeeVeez is just 80 calories with 0g fat, 0g protein, 20g carbs, and 14g total sugars. A guilt-free snack that\'s actually delicious.' },
    { q: 'Will there be other flavors?', a: 'White Honey Apple is our signature flagship — and we have more flavors in development. Join our list to be the first to taste-test new releases.' },
    { q: 'Does ZeeVeez give back to charity?', a: 'Absolutely. A portion of every sale goes to selected charities benefiting animals and children. When you snack on ZeeVeez, you\'re helping make a difference.' },
  ]

  return (
    <div className="site">
      <a href="#about" className="skip-link">Skip to content</a>

      {/* ── Nav ── */}
      <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <a href="#" className="nav__logo">
            <img src="/logo.png" alt="ZeeVeez™ Gummy Snacks" className="nav__logo-img" />
          </a>
          <button className={`nav__burger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
          {menuOpen && <div className="nav__overlay" onClick={closeMenu} />}
          <div className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
            <a href="#about" onClick={closeMenu}>Our Story</a>
            <a href="#flavor" onClick={closeMenu}>White Honey Apple</a>
            <a href="#ingredients" onClick={closeMenu}>Ingredients</a>
            <a href="#faq" onClick={closeMenu}>FAQ</a>
            <a href="#cta" className="nav__cta" onClick={closeMenu}>Get Notified</a>
          </div>
          <div className="nav__socials">
            <a href="https://www.instagram.com/thefeelgoodgummy?igsh=dXRwdXNuc3NxdzJ5" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="nav__social-link">
              <InstagramIcon size={20} />
            </a>
            <a href="https://www.tiktok.com/@zeeveez" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="nav__social-link">
              <TikTokIcon size={20} />
            </a>
            <a href="https://www.amazon.com/" target="_blank" rel="noopener noreferrer" aria-label="Amazon" className="nav__social-link">
              <AmazonIcon size={20} />
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header ref={heroRef} className={`hero ${heroVis ? 'reveal' : ''}`} id="hero">
        <div className="hero__floaters" aria-hidden="true">
          <Cloud className="cloud--hero-1" />
          <Cloud className="cloud--hero-2" />
          <div className="floater floater--1" />
          <div className="floater floater--2" />
          <div className="floater floater--3" />
          <div className="floater floater--4" />
          <div className="floater floater--5" />
          <div className="floater floater--6" />
        </div>
        <div className="hero__content">
          <div className="hero__text">
            <div className="hero__badge">
              <span className="hero__badge-dot" />
              One Flavor Says It All
            </div>
            <img src="/logo.png" alt="ZeeVeez™ Gummy Snacks" className="hero__logo-img" />
            <p className="hero__sub">
              ZeeVeez White Honey Apple signature gummy snack is so delish
              we bet you can't have just one. All natural, proudly made in
              Texas, and a portion of profits gives back to charity.
            </p>
            <div className="hero__actions">
              <a href="#cta" className="btn btn--primary">
                <span>Get Early Access</span>
                <ArrowIcon />
              </a>
              <a href="#about" className="btn btn--ghost">Our Story</a>
            </div>
            <div className="hero__trust">
              <div className="hero__trust-badge"><CheckIcon /><span>All Natural</span></div>
              <div className="hero__trust-badge"><CheckIcon /><span>Plant-Based</span></div>
              <div className="hero__trust-badge"><CheckIcon /><span>Made in Texas</span></div>
              <div className="hero__trust-badge hero__trust-badge--heart"><HeartIcon /><span>Gives Back</span></div>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__gummy-scene">
              <div className="hero__glow" aria-hidden="true" />
              <div className="gummy-lg gummy-lg--green">
                <div className="gummy-lg__shine" />
                <div className="gummy-lg__face">
                  <div className="gummy-lg__eye" /><div className="gummy-lg__eye" />
                  <div className="gummy-lg__mouth" />
                </div>
              </div>
              <div className="gummy-lg gummy-lg--green gummy-lg--center">
                <div className="gummy-lg__shine" />
                <div className="gummy-lg__face">
                  <div className="gummy-lg__eye" /><div className="gummy-lg__eye" />
                  <div className="gummy-lg__mouth gummy-lg__mouth--big" />
                </div>
                <div className="gummy-lg__crown">&#9733;</div>
              </div>
              <div className="gummy-lg gummy-lg--green">
                <div className="gummy-lg__shine" />
                <div className="gummy-lg__face">
                  <div className="gummy-lg__eye" /><div className="gummy-lg__eye" />
                  <div className="gummy-lg__mouth" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="wave wave--hero" aria-hidden="true">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,40 C360,100 1080,0 1440,60 L1440,100 L0,100 Z" fill="#ffffff" />
          </svg>
        </div>
      </header>

      {/* ── Ticker ── */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {Array.from({ length: 3 }).map((_, i) => (
            <div className="ticker__content" key={i}>
              <span>One Flavor Says It All</span><span className="ticker__dot" />
              <span>White Honey Apple</span><span className="ticker__dot" />
              <span>All Natural</span><span className="ticker__dot" />
              <span>Made in Texas</span><span className="ticker__dot ticker__dot--star"><StarIcon size={10} /></span>
              <span>Gives Back to Charity</span><span className="ticker__dot" />
              <span>80 Calories</span><span className="ticker__dot" />
              <span>Peanut Free Facility</span><span className="ticker__dot" />
              <span>Plant-Based</span><span className="ticker__dot" />
            </div>
          ))}
        </div>
      </div>

      {/* ── As Featured In ── */}
      <section ref={pressRef} className={`press ${pressVis ? 'reveal' : ''}`}>
        <div className="press__inner">
          <p className="press__label">As Featured In</p>
          <div className="press__logos">
            {['Food & Wine', 'Bon App\u00e9tit', 'Texas Monthly', 'Fort Worth Star', 'Well+Good', 'The Kitchn'].map(name => (
              <div className="press__logo" key={name}>{name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section ref={aboutRef} className={`about ${aboutVis ? 'reveal' : ''}`} id="about">
        <div className="about__inner">
          <div className="about__media">
            <div className="about__img-wrap">
              <div className="about__pattern" aria-hidden="true" />
              <div className="about__illustration">
                <div className="about__tree" aria-hidden="true">
                  <div className="tree__trunk" />
                  <div className="tree__canopy" />
                  <div className="tree__apple tree__apple--1" />
                  <div className="tree__apple tree__apple--2" />
                  <div className="tree__apple tree__apple--3" />
                </div>
                <div className="about__bee" aria-hidden="true">
                  <div className="bee__body" />
                  <div className="bee__wing" />
                </div>
              </div>
            </div>
          </div>
          <div className="about__text">
            <span className="section-tag">Our Story</span>
            <h2>Born in Houston, Texas: <em>one flavor says it all.</em></h2>
            <p>
              ZeeVeez was born in Houston, Texas with a belief that gummy snacks
              could be better. Better ingredients, better taste, better impact.
              Made by ZV3, LLC and manufactured in Fort Worth, every pouch is crafted with organic
              ingredients, real pectin, and natural flavors &mdash; no gelatin,
              no synthetic dyes, no compromises.
            </p>
            <p>
              We taste every batch. If it doesn't make us say "just one more,"
              it doesn't leave the facility.
            </p>
            <div className="about__highlights">
              <div className="about__hl">
                <div className="about__hl-icon">&#127807;</div>
                <div><strong>Plant-Based</strong><span>Pectin, not gelatin</span></div>
              </div>
              <div className="about__hl">
                <div className="about__hl-icon">&#127855;</div>
                <div><strong>All Natural</strong><span>Organic ingredients</span></div>
              </div>
              <div className="about__hl">
                <div className="about__hl-icon"><StarIcon size={24} className="texas-star-icon" /></div>
                <div><strong>Made in Texas</strong><span>Born in Houston, TX</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gives Back ── */}
      <section ref={givesRef} className={`gives ${givesVis ? 'reveal' : ''}`}>
        <div className="gives__inner">
          <div className="gives__icon"><HeartIcon /></div>
          <div className="gives__text">
            <h2>A gummy snack that gives back</h2>
            <p>
              Savor the taste knowing a portion of our profits go to selected
              charities benefiting animals and children. Every pouch you enjoy
              helps make a real difference. Learn more at zeeveez.com.
            </p>
          </div>
        </div>
      </section>

      {/* ── Flagship Flavor ── */}
      <section ref={flavorRef} className={`flavor ${flavorVis ? 'reveal' : ''}`} id="flavor">
        <div className="flavor__bg" aria-hidden="true">
          <Cloud className="cloud--flavor-1" />
          <Cloud className="cloud--flavor-2" />
        </div>
        <div className="flavor__inner">
          <div className="flavor__text">
            <span className="section-tag section-tag--light">Signature Flavor</span>
            <h2>White Honey Apple</h2>
            <p className="flavor__lead">
              Our signature gummy snack is so delish we bet you can't have
              just one. Where light, floral honey meets crisp orchard apple
              for a flavor that's two years in the making.
            </p>
            <div className="flavor__details">
              <div className="flavor__detail">
                <div className="flavor__detail-icon">&#127822;</div>
                <div>
                  <strong>Natural Apple Flavor</strong>
                  <p>Bright, crisp apple taste from real natural flavors — not synthetic concentrates.</p>
                </div>
              </div>
              <div className="flavor__detail">
                <div className="flavor__detail-icon">&#127855;</div>
                <div>
                  <strong>White Honey Sweetness</strong>
                  <p>A delicate, floral honey note that balances perfectly with the apple brightness.</p>
                </div>
              </div>
              <div className="flavor__detail">
                <div className="flavor__detail-icon">&#10024;</div>
                <div>
                  <strong>Only 80 Calories</strong>
                  <p>A full 1oz pouch for just 80 calories. 0g fat, made in a peanut-free facility.</p>
                </div>
              </div>
            </div>
            <div className="flavor__nutrition">
              <div className="flavor__nut-item"><strong>80</strong><span>Calories</span></div>
              <div className="flavor__nut-item"><strong>0g</strong><span>Fat</span></div>
              <div className="flavor__nut-item"><strong>20g</strong><span>Carbs</span></div>
              <div className="flavor__nut-item"><strong>14g</strong><span>Sugars</span></div>
              <div className="flavor__nut-item"><strong>1oz</strong><span>Pouch</span></div>
            </div>
          </div>
          <div className="flavor__visual">
            <div className="flavor__gummy-wrap">
              <div className="flavor__ring flavor__ring--1" aria-hidden="true" />
              <div className="flavor__ring flavor__ring--2" aria-hidden="true" />
              <div className="flavor__ring flavor__ring--3" aria-hidden="true" />
              <div className="gummy-xl gummy-xl--green">
                <div className="gummy-xl__shine" />
                <div className="gummy-xl__face">
                  <div className="gummy-xl__eye" /><div className="gummy-xl__eye" />
                  <div className="gummy-xl__mouth" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How We Make It ── */}
      <section ref={processRef} className={`process ${processVis ? 'reveal' : ''}`}>
        <div className="process__inner">
          <div className="process__header">
            <span className="section-tag">Our Process</span>
            <h2>Born in Houston, manufactured in Fort Worth</h2>
            <p>Every pouch goes through a careful process — no shortcuts.</p>
          </div>
          <div className="process__timeline">
            {[
              { step: '01', title: 'Source', desc: 'We start with organic tapioca syrup and organic cane sugar. Every ingredient is carefully selected and traceable.', icon: '&#127806;' },
              { step: '02', title: 'Blend', desc: 'Natural flavors are blended with water and our organic base. No concentrates, no high-fructose corn syrup, no shortcuts.', icon: '&#129514;' },
              { step: '03', title: 'Craft', desc: 'Plant-based pectin gives the perfect chew. Each batch is cooked slowly in our peanut-free Fort Worth facility.', icon: '&#128293;' },
              { step: '04', title: 'Taste', desc: 'Our team tastes every batch. If it doesn\'t meet the ZeeVeez standard, it doesn\'t ship. Period.', icon: '&#11088;' },
            ].map(({ step, title, desc, icon }) => (
              <div className="process__step" key={step}>
                <div className="process__step-num">{step}</div>
                <div className="process__step-icon" dangerouslySetInnerHTML={{ __html: icon }} />
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section ref={statsRef} className={`stats ${statsVis ? 'reveal' : ''}`}>
        <div className="stats__inner">
          <div className="stat">
            <div className="stat__number"><Counter end={80} /></div>
            <div className="stat__label">Calories Per Pouch</div>
          </div>
          <div className="stat__divider" />
          <div className="stat">
            <div className="stat__number"><Counter end={0} /></div>
            <div className="stat__label">Artificial Additives</div>
          </div>
          <div className="stat__divider" />
          <div className="stat">
            <div className="stat__number"><Counter end={100} suffix="%" /></div>
            <div className="stat__label">Plant-Based</div>
          </div>
          <div className="stat__divider" />
          <div className="stat">
            <div className="stat__number"><Counter end={0} suffix="g" /></div>
            <div className="stat__label">Fat Per Serving</div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section ref={featRef} className={`features ${featVis ? 'reveal' : ''}`} id="why">
        <div className="features__inner">
          <div className="features__header">
            <span className="section-tag">Why ZeeVeez</span>
            <h2>Not your average gummy snack</h2>
            <p>Every detail matters when you're making snacks the right way.</p>
          </div>
          <div className="features__grid">
            {[
              { icon: '&#127807;', title: 'Organic Ingredients', desc: 'Organic tapioca syrup and organic cane sugar form our base. We put everything on the label because we have nothing to hide.' },
              { icon: '&#127858;', title: 'So Delish', desc: 'Two years of recipe testing to nail a flavor so good we bet you can\'t have just one. One flavor truly says it all.' },
              { icon: '&#127793;', title: 'Plant-Based Pectin', desc: 'No gelatin here. Our gummies get their perfect chew from real pectin, making them friendly for more diets.' },
              { icon: '&#129656;', title: 'No Synthetic Dyes', desc: 'Our colors come from nature — not a lab. What you see is what you get: clean, honest ingredients.' },
              { icon: '&#128155;', title: 'Gives Back', desc: 'A portion of every sale goes to charities benefiting animals and children. Snacking with purpose.' },
              { icon: '&#11088;', title: 'Made in Texas', desc: 'Born in Houston, manufactured in our peanut-free Fort Worth, TX facility by ZV3, LLC. Texas quality, Texas pride.' },
            ].map(({ icon, title, desc }) => (
              <div className="feature-card" key={title}>
                <div className="feature-card__icon" dangerouslySetInnerHTML={{ __html: icon }} />
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ingredients ── */}
      <section ref={ingredRef} className={`ingr ${ingredVis ? 'reveal' : ''}`} id="ingredients">
        <div className="ingr__inner">
          <div className="ingr__header">
            <span className="section-tag">What's Inside</span>
            <h2>Simple ingredients. Incredible flavor.</h2>
            <p>Everything in a ZeeVeez pouch — nothing to hide.</p>
          </div>
          <div className="ingr__grid">
            {[
              { emoji: '&#127846;', name: 'Organic Tapioca Syrup', note: 'Clean, natural sweetener base' },
              { emoji: '&#127854;', name: 'Organic Cane Sugar', note: 'Just enough sweetness' },
              { emoji: '&#128167;', name: 'Water', note: 'Pure and simple' },
              { emoji: '&#129389;', name: 'Pectin', note: 'Plant-based, perfect chew' },
              { emoji: '&#127811;', name: 'Natural Flavors', note: 'Less than 2% — real taste' },
              { emoji: '&#127819;', name: 'Citric Acid', note: 'Natural tartness' },
              { emoji: '&#129387;', name: 'Sodium Citrate', note: 'Natural acidity balance' },
            ].map(({ emoji, name, note }) => (
              <div className="ingr-card" key={name}>
                <div className="ingr-card__emoji" dangerouslySetInnerHTML={{ __html: emoji }} />
                <div className="ingr-card__name">{name}</div>
                <div className="ingr-card__note">{note}</div>
              </div>
            ))}
          </div>
          <p className="ingr__footnote">Made in a peanut-free facility. That's the full list — no fine print.</p>
        </div>
      </section>

      {/* ── What's NOT inside ── */}
      <section ref={notRef} className={`not ${notVis ? 'reveal' : ''}`}>
        <div className="not__inner">
          <h2>What you'll <em>never</em> find in a ZeeVeez</h2>
          <div className="not__grid">
            {['Artificial Flavors','Synthetic Dyes','High-Fructose Corn Syrup','Gelatin','Peanuts','GMOs'].map(item => (
              <div className="not__item" key={item}>
                <svg className="not__x" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section ref={testRef} className={`testimonials ${testVis ? 'reveal' : ''}`}>
        <div className="testimonials__inner">
          <div className="testimonials__header">
            <span className="section-tag">Early Tasters</span>
            <h2>What people are saying</h2>
          </div>
          <div className="testimonials__grid">
            {[
              { name: 'Sarah M.', loc: 'Houston, TX', text: 'These are genuinely the best gummy snacks I\'ve ever had. The white honey apple flavor is addictive — my kids won\'t eat any other gummy now.', stars: 5 },
              { name: 'James R.', loc: 'Dallas, TX', text: 'As someone who reads every label, ZeeVeez check every box. Organic ingredients, no junk, peanut free, AND they taste incredible. Finally.', stars: 5 },
              { name: 'Maria L.', loc: 'Austin, TX', text: 'Love that they give back to charity too. A gummy snack I can feel good about buying. And honestly — so delish. Can\'t have just one is RIGHT.', stars: 5 },
            ].map(({ name, loc, text, stars }) => (
              <div className="test-card" key={name}>
                <div className="test-card__stars">
                  {Array.from({ length: stars }).map((_, i) => <StarIcon key={i} size={16} className="test-card__star" />)}
                </div>
                <p className="test-card__text">&ldquo;{text}&rdquo;</p>
                <div className="test-card__author">
                  <div className="test-card__avatar">{name.charAt(0)}</div>
                  <div>
                    <div className="test-card__name">{name}</div>
                    <div className="test-card__loc">{loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <section ref={trustRef} className={`trust ${trustVis ? 'reveal' : ''}`}>
        <div className="trust__inner">
          {[
            { icon: '&#127807;', label: 'Plant\nBased' },
            { icon: '&#127806;', label: 'Organic\nIngredients' },
            { icon: '&#127834;', label: 'Gluten\nFree' },
            { icon: '&#129372;', label: 'Peanut\nFree' },
            { icon: '&#128155;', label: 'No Artificial\nAnything' },
            { icon: '&#129389;', label: 'Gelatin\nFree' },
            { icon: '&#10084;&#65039;', label: 'Gives Back\nto Charity' },
          ].map(({ icon, label }) => (
            <div className="trust__badge" key={label}>
              <div className="trust__badge-icon" dangerouslySetInnerHTML={{ __html: icon }} />
              <div className="trust__badge-label">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section ref={faqRef} className={`faq ${faqVis ? 'reveal' : ''}`} id="faq">
        <div className="faq__inner">
          <div className="faq__header">
            <span className="section-tag">FAQ</span>
            <h2>Got questions? We've got answers.</h2>
          </div>
          <div className="faq__list">
            {faqs.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} open={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} className={`cta ${ctaVis ? 'reveal' : ''}`} id="cta">
        <div className="cta__particles" aria-hidden="true">
          <Cloud className="cloud--cta-1" />
          <Cloud className="cloud--cta-2" />
          <div className="cta__p cta__p--1" />
          <div className="cta__p cta__p--2" />
          <div className="cta__p cta__p--3" />
        </div>
        <div className="cta__inner">
          <h2>Ready to taste the difference?</h2>
          <p>
            ZeeVeez White Honey Apple gummy snacks are launching soon. Sign up
            and be the first to get a pouch.
          </p>
          <div className="cta__form">
            <input type="email" className="cta__input" placeholder="your@email.com" aria-label="Email address" />
            <button className="btn btn--primary btn--cta">
              <span>Notify Me</span>
              <ArrowIcon />
            </button>
          </div>
          <p className="cta__note">No spam, ever. Just a heads-up when we launch.</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="foot">
        <div className="foot__inner">
          <div className="foot__top">
            <div className="foot__brand">
              <a href="#" className="foot__logo">
                <img src="/logo.png" alt="ZeeVeez™ Gummy Snacks" className="foot__logo-img" />
              </a>
              <p>One flavor says it all.</p>
              <div className="foot__texas">
                <StarIcon size={14} className="foot__texas-star" />
                <span>Born in Houston, TX &middot; Manufactured in Fort Worth, TX</span>
              </div>
              <div className="foot__company">
                ZV3, LLC &middot; Bridge Industrial Group<br />
                2615 Ludelle Street, Fort Worth, TX 76105
              </div>
            </div>
            <div className="foot__cols">
              <div className="foot__col">
                <h4>Product</h4>
                <a href="#flavor">White Honey Apple</a>
                <a href="#ingredients">Ingredients</a>
                <a href="#why">Why ZeeVeez</a>
              </div>
              <div className="foot__col">
                <h4>Company</h4>
                <a href="#about">Our Story</a>
                <a href="#">Giving Back</a>
                <a href="#">Press</a>
              </div>
              <div className="foot__col">
                <h4>Connect</h4>
                <a href="https://www.instagram.com/thefeelgoodgummy?igsh=dXRwdXNuc3NxdzJ5" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://www.tiktok.com/@zeeveez" target="_blank" rel="noopener noreferrer">TikTok</a>
                <a href="https://www.amazon.com/" target="_blank" rel="noopener noreferrer">Amazon</a>
              </div>
            </div>
          </div>
          <div className="foot__bottom">
            <p>&copy; {new Date().getFullYear()} ZV3, LLC. All rights reserved. ZeeVeez&trade; is a trademark of ZV3, LLC.</p>
            <div className="foot__legal">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Back to top ── */}
      <button className={`btt ${showTop ? 'btt--visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
      </button>
    </div>
  )
}

export default App
