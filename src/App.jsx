import { useState, useEffect, useRef } from 'react'
import { IMG, SITE, COURSES, COURSE_INFO, T, LANGS } from './data.js'
import { TESTIMONIALS } from './testimonials.js'
import { EXTRA } from './extra.js'

const waNum = (n) => { const d = String(n).replace(/\D/g, ''); return d.startsWith('0') ? '250' + d.slice(1) : d }
const PHONE_RE = /^(?:\+?250|0)?7[2389]\d{7}$/
const WA = (text = '') => `https://wa.me/${waNum(SITE.whatsapp)}${text ? '?text=' + encodeURIComponent(text) : ''}`
const WAIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.2-1.4A9.9 9.9 0 1 0 12.04 2zm5.8 14c-.25.7-1.4 1.3-1.95 1.35-.5.05-1.1.2-3.6-.8-3-1.2-4.9-4.2-5.05-4.4-.15-.2-1.2-1.6-1.2-3s.75-2.1 1-2.4c.25-.3.55-.35.75-.35h.55c.2 0 .4 0 .6.5l.85 2.1c.1.2.1.4 0 .55l-.4.55c-.15.15-.3.3-.15.6.15.3.7 1.2 1.55 1.9 1.1.95 2 1.25 2.3 1.4.3.15.45.1.6-.1l.85-1c.2-.25.4-.2.65-.1l1.95.95c.3.15.5.2.55.35.05.1.05.65-.2 1.3z" /></svg>

function Reveal({ children, className = '' }) {
  const ref = useRef(null); const [on, setOn] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.12 })
    ref.current && io.observe(ref.current); return () => io.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${on ? 'in' : ''} ${className}`}>{children}</div>
}

function LangSwitch({ t, lang, setLang }) {
  const [open, setOpen] = useState(false); const ref = useRef(null)
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const k = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', h); document.addEventListener('keydown', k)
    return () => { document.removeEventListener('mousedown', h); document.removeEventListener('keydown', k) }
  }, [])
  const cur = LANGS.find((l) => l[0] === lang)
  return (
    <div className="ldd" ref={ref}>
      <button className="ldd-b" aria-haspopup="listbox" aria-expanded={open} aria-label={t.langLabel} onClick={() => setOpen(!open)}>🌐 {cur[1]} <i>▾</i></button>
      {open && <ul className="ldd-m" role="listbox" aria-label={t.langLabel}>{LANGS.map(([code, short, name]) => (
        <li key={code}><button role="option" aria-selected={code === lang} className={code === lang ? 'on' : ''} onClick={() => { setLang(code); setOpen(false) }}><b>{short}</b> {name}</button></li>))}</ul>}
    </div>
  )
}

function Nav({ t, lang, setLang }) {
  const [open, setOpen] = useState(false); const ids = ['top', 'courses', 'why', 'gallery', 'faq', 'apply', 'contact']
  return (
    <header className="nav"><div className="wrap nav-in">
      <a href="#top" className="brand"><img src={IMG.logo} alt="PASCAL logo" /><span><b>PASCAL</b><small>Practical Skills &amp; Hospitality Academy</small></span></a>
      <nav className={open ? 'open' : ''}>
        {ids.map((id, i) => <a key={id} href={`#${id}`} className={id === 'top' ? 'home' : ''} onClick={() => setOpen(false)}>{id === 'top' && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3 2 12h3v8h5v-5h4v5h5v-8h3L12 3z" /></svg>}{t.nav[i]}</a>)}
      </nav>
      <div className="nav-r">
        <LangSwitch t={t} lang={lang} setLang={setLang} />
        <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
      </div>
    </div></header>
  )
}

function Ticker({ t, lang }) {
  const items = [...t.ticker.slice(0, 3), ...COURSES.map((c) => c[lang]), t.ticker[3]]
  return (
    <div className="ribbon ticker" aria-label={t.ticker.join('. ')}><div className="tr">
      {[0, 1].map((k) => <div className="tr-set" key={k} aria-hidden="true">{items.map((x, i) => <span key={i}>{x}<em>✦</em></span>)}</div>)}
    </div></div>
  )
}

function Promo({ t }) {
  const S = t.promo; const imgs = [IMG.team, IMG.hero, IMG.careers, IMG.classroom]
  const [i, setI] = useState(0); const [pause, setPause] = useState(false); const x0 = useRef(null)
  const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  useEffect(() => { if (pause || reduce) return; const id = setTimeout(() => setI((v) => (v + 1) % S.length), 5500); return () => clearTimeout(id) }, [i, pause, reduce, S.length])
  const go = (d) => setI((v) => (v + d + S.length) % S.length)
  return (
    <section className="promo" aria-roledescription="carousel" aria-label="PASCAL">
      <div className="wrap">
        <div className="pr" onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)} onFocus={() => setPause(true)} onBlur={() => setPause(false)}
          onTouchStart={(e) => { x0.current = e.touches[0].clientX }} onTouchEnd={(e) => { if (x0.current !== null) { const dx = e.changedTouches[0].clientX - x0.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); x0.current = null } }}>
          {S.map((sl, n) => (
            <div key={n} className={`ps ${n === i ? 'on' : ''}`} aria-hidden={n !== i} style={{ backgroundImage: `linear-gradient(95deg,rgba(7,26,66,.92) 35%,rgba(7,26,66,.2)),url(${imgs[n]})` }}>
              <div className="pt"><span className="ptag">{sl.tag}</span><h3>{sl.title}</h3><p>{sl.text}</p>
                <a className="btn gold" tabIndex={n === i ? 0 : -1} href={sl.wa ? WA(t.hello) : sl.href} {...(sl.wa ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{sl.wa && <WAIcon />} {sl.cta}</a></div>
            </div>))}
          <button className="pn l" aria-label={t.prev} onClick={() => go(-1)}>‹</button>
          <button className="pn r" aria-label={t.next} onClick={() => go(1)}>›</button>
          <div className="pd">{S.map((_, n) => <button key={n} className={n === i ? 'on' : ''} aria-label={`${t.slide} ${n + 1}`} onClick={() => setI(n)} />)}</div>
          {!reduce && <span key={i + (pause ? 'p' : '')} className="pbar" style={{ animationPlayState: pause ? 'paused' : 'running' }} />}
        </div>
      </div>
    </section>
  )
}

function Hero({ t, lang }) {
  return (
    <section id="top" className="hero" style={{ backgroundImage: `linear-gradient(105deg,rgba(7,26,66,.95) 30%,rgba(7,26,66,.55)),url(${IMG.hero})` }}>
      <div className="wrap hero-in">
        <div>
          <span className="badge">🔥 {t.badge}</span>
          <h1>{t.h1a}<em> {t.h1b}</em></h1>
          <p>{t.sub}</p>
          <div className="row"><a className="btn gold" href="#apply"><WAIcon /> {t.cta1}</a><a className="btn ghost" href="#courses">{t.cta2}</a></div>
          <div className="stats"><div><b>10</b><span>{t.stats[0]}</span></div><div><b>{SITE.seats}</b><span>{t.stats[1]}</span></div><div><b>EN·FR·RW·SW</b><span>{t.stats[2]}</span></div></div>
        </div>
        <div className="hero-card"><img src={IMG.team} alt="PASCAL students in training" /><div className="chip">📍 {SITE.places.map((p) => p.short).join(' · ')}</div></div>
      </div>
      <Ticker t={t} lang={lang} />
    </section>
  )
}

function Courses({ t, lang, onPick }) {
  return (
    <section id="courses" className="sec"><div className="wrap">
      <Reveal><h2>{t.coursesT}</h2><p className="lead">{t.coursesS}</p></Reveal>
      <div className="grid">{COURSES.map((c, i) => (
        <Reveal key={c.id}><article className="card">
          <div className="ph"><img src={c.img} alt={c.en} loading="lazy" /><span className="num">{String(i + 1).padStart(2, '0')}</span></div>
          <div className="cb"><h3>{c[lang]}</h3>{(COURSE_INFO[c.id]?.duration || COURSE_INFO[c.id]?.fee) && <div className="meta">{COURSE_INFO[c.id].duration && <span>⏱ {t.dur}: <b>{COURSE_INFO[c.id].duration}</b></span>}{COURSE_INFO[c.id].fee && <span>💰 {t.fee}: <b>{COURSE_INFO[c.id].fee}</b></span>}</div>}<ul>{c.pts[lang].map((p) => <li key={p}>{p}</li>)}</ul>
            <button className="link" onClick={() => onPick(c.id)}>{t.pick} →</button></div>
        </article></Reveal>))}</div>
      <Reveal><div className="feenote"><p>💬 {t.feeNote}</p><a className="btn gold" href={WA(t.feeAsk)} target="_blank" rel="noopener noreferrer"><WAIcon /> {t.feeBtn}</a></div></Reveal>
    </div></section>
  )
}

function Why({ t }) {
  return (
    <section id="why" className="sec alt"><div className="wrap">
      <Reveal><h2>{t.whyT}</h2></Reveal>
      <div className="why">{t.why.map(([i, h, p]) => <Reveal key={h}><div className="wcard"><span>{i}</span><h3>{h}</h3><p>{p}</p></div></Reveal>)}</div>
      <Reveal><div className="gain"><h3>{t.gain}</h3><div>{t.gains.map((g) => <span key={g}>✓ {g}</span>)}</div></div></Reveal>
    </div></section>
  )
}

function Lightbox({ items, index, setIndex, t }) {
  const n = items.length
  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape') setIndex(null); if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % n); if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + n) % n) }
    window.addEventListener('keydown', k); document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [n, setIndex])
  return (
    <div className="lb" role="dialog" aria-modal="true" onClick={() => setIndex(null)}>
      <button className="lb-x" aria-label={t.close} onClick={() => setIndex(null)}>✕</button>
      <button className="lb-n l" aria-label={t.prev} onClick={(e) => { e.stopPropagation(); setIndex((index - 1 + n) % n) }}>‹</button>
      <img src={items[index]} alt="PASCAL Academy" onClick={(e) => e.stopPropagation()} />
      <button className="lb-n r" aria-label={t.next} onClick={(e) => { e.stopPropagation(); setIndex((index + 1) % n) }}>›</button>
      <span className="lb-c">{index + 1} / {n}</span>
    </div>
  )
}

function Gallery({ t }) {
  const g = [IMG.hero, IMG.office, IMG.classroom, IMG.careers, IMG.team]; const [open, setOpen] = useState(null)
  return (
    <section id="gallery" className="sec"><div className="wrap">
      <Reveal><h2>{t.galT}</h2><p className="lead">{t.tap}</p></Reveal>
      <div className="gal">{g.map((s, i) => <button key={i} className={`gi ${i === 0 ? 'big' : ''}`} onClick={() => setOpen(i)} aria-label={`${t.tap} ${i + 1}`}><img src={s} alt="PASCAL Academy" loading="lazy" /></button>)}</div>
      {open !== null && <Lightbox items={g} index={open} setIndex={setOpen} t={t} />}
    </div></section>
  )
}

function Stories({ t, lang }) {
  if (!TESTIMONIALS.length) return null
  return (
    <section id="stories" className="sec alt stories">
      <div className="wrap"><Reveal><h2>{t.storiesT}</h2><p className="lead">{t.storiesS}</p></Reveal></div>
      <div className="marq" tabIndex={0} aria-label={t.storiesT}><div className="mt">
        {[0, 1].map((k) => (
          <div className="ms" key={k} aria-hidden={k === 1 ? 'true' : undefined}>
            {TESTIMONIALS.map((p) => {
              const c = COURSES.find((x) => x.id === p.course); const ini = p.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
              return (
                <figure className="story" key={p.name}>
                  <span className="qm" aria-hidden="true">“</span>
                  <blockquote>{p.quote[lang] || p.quote.en}</blockquote>
                  <figcaption>{p.photo ? <img src={p.photo} alt={k === 0 ? p.name : ''} loading="lazy" /> : <span className="av">{ini}</span>}
                    <div><b>{p.name}</b>{c && <small>{c[lang]}</small>}{p.sample && <em className="smp">{t.sample}</em>}</div></figcaption>
                </figure>)
            })}
          </div>))}
      </div></div>
    </section>
  )
}

function TopBtn({ t }) {
  const [v, setV] = useState(false)
  useEffect(() => { const h = () => setV(window.scrollY > 700); h(); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h) }, [])
  return v ? <button className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label={t.top} title={t.top}>↑</button> : null
}

const SOC = {
  Instagram: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" /></svg>,
  Facebook: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5Z" /></svg>,
  TikTok: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.5 3c.3 2.4 1.7 4 4 4.2v3.2c-1.5 0-2.9-.4-4-1.2v6.3a6.2 6.2 0 1 1-6.2-6.2c.3 0 .6 0 .9.1v3.3a3 3 0 1 0 2.1 2.8V3h3.2Z" /></svg>,
}

function FAQ({ t }) {
  const [o, setO] = useState(0)
  return (
    <section id="faq" className="sec alt"><div className="wrap narrow">
      <Reveal><h2>{t.faqT}</h2><p className="lead">{t.faqS}</p></Reveal>
      <div className="faq">{t.faqs.map(([q, a], i) => (
        <div key={q} className={`qa ${o === i ? 'open' : ''}`}>
          <button aria-expanded={o === i} onClick={() => setO(o === i ? -1 : i)}><span>{q}</span><i>{o === i ? '−' : '+'}</i></button>
          {o === i && <p>{a}</p>}
        </div>))}</div>
    </div></section>
  )
}

function Apply({ t, lang, preset }) {
  const f = t.f
  const empty = { name: '', gender: '', dob: '', phone: '', email: '', loc: '', edu: '', courses: [], msg: '', consent: false }
  const [d, setD] = useState(() => { try { return { ...empty, ...JSON.parse(localStorage.getItem('pascal-draft-v2') || '{}') } } catch { return empty } })
  const [err, setErr] = useState({}); const [done, setDone] = useState(null)
  useEffect(() => { try { localStorage.setItem('pascal-draft-v2', JSON.stringify({ ...d, consent: false })) } catch {} }, [d])
  useEffect(() => { if (preset.id) setD((p) => p.courses.includes(preset.id) || p.courses.length >= 3 ? p : { ...p, courses: [...p.courses, preset.id] }) }, [preset])
  const set = (k, v) => setD((p) => ({ ...p, [k]: v }))
  const toggle = (id) => setD((p) => ({ ...p, courses: p.courses.includes(id) ? p.courses.filter((x) => x !== id) : p.courses.length < 3 ? [...p.courses, id] : p.courses }))

  const submit = (e) => {
    e.preventDefault(); const x = {}
    if (d.name.trim().length < 3) x.name = f.req
    if (!d.gender) x.gender = f.req
    if (!d.dob) x.dob = f.req
    if (!PHONE_RE.test(d.phone.replace(/[\s-]/g, ''))) x.phone = f.badPhone
    if (d.loc.trim().length < 2) x.loc = f.req
    if (!d.edu) x.edu = f.req
    if (!d.courses.length) x.courses = f.pickOne
    if (!d.consent) x.consent = f.req
    setErr(x); if (Object.keys(x).length) return
    const ref = 'PAS-' + new Date().toISOString().slice(2, 10).replace(/-/g, '') + '-' + Math.random().toString(36).slice(2, 6).toUpperCase()
    const names = d.courses.map((id, i) => `${i + 1}. ${COURSES.find((c) => c.id === id).en}`).join('\n')
    const text = `*NEW APPLICATION – PASCAL Academy*\nRef: ${ref}\n\n*Name:* ${d.name.trim()}\n*Gender:* ${d.gender}\n*Date of birth:* ${d.dob}\n*Phone/WhatsApp:* ${d.phone}\n*Email:* ${d.email || '-'}\n*District/Sector:* ${d.loc}\n*Education:* ${T.en.edus[Number(d.edu)]}\n\n*Courses:*\n${names}\n\n*Message:* ${d.msg || '-'}\n\n_Sent from the PASCAL website · applicant language: ${LANGS.find((l) => l[0] === lang)[2]}_`
    setDone({ ref, url: WA(text) }); window.open(WA(text), '_blank', 'noopener')
    try { localStorage.removeItem('pascal-draft-v2') } catch {}
  }
  const F = ({ k, label, children }) => <label className={`fld ${err[k] ? 'bad' : ''}`}><span>{label}</span>{children}{err[k] && <small>{err[k]}</small>}</label>

  return (
    <section id="apply" className="sec apply"><div className="wrap narrow">
      <Reveal><h2>{t.applyT}</h2><p className="lead">{t.applyS}</p></Reveal>
      {done ? (
        <div className="ok"><div className="tick">✓</div><h3>{f.ok}</h3><p>{f.okS}</p><p className="ref">{f.ref}: <b>{done.ref}</b></p>
          <div className="row c"><a className="btn gold" href={done.url} target="_blank" rel="noopener noreferrer"><WAIcon /> {f.again}</a><button className="btn ghost dark" onClick={() => { setDone(null); setD(empty) }}>{f.newApp}</button></div></div>
      ) : (
        <form onSubmit={submit} noValidate className="form">
          <F k="name" label={f.name}><input value={d.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" /></F>
          <F k="gender" label={f.gender}><select value={d.gender} onChange={(e) => set('gender', e.target.value)}><option value="" /><option value="Male">{f.m}</option><option value="Female">{f.fm}</option></select></F>
          <F k="dob" label={f.dob}><input type="date" value={d.dob} max={new Date().toISOString().slice(0, 10)} onChange={(e) => set('dob', e.target.value)} /></F>
          <F k="phone" label={f.phone}><input type="tel" inputMode="tel" placeholder="078X XXX XXX" value={d.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" /></F>
          <F k="email" label={f.email}><input type="email" value={d.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" /></F>
          <F k="loc" label={f.loc}><input value={d.loc} placeholder="Rulindo / Nyabyondo" onChange={(e) => set('loc', e.target.value)} /></F>
          <F k="edu" label={f.edu}><select value={d.edu} onChange={(e) => set('edu', e.target.value)}><option value="" />{t.edus.map((o, i) => <option key={i} value={i}>{o}</option>)}</select></F>
          <div className={`fld full ${err.courses ? 'bad' : ''}`}><span>{f.pickC} ({d.courses.length}/3)</span>
            <div className="chips">{COURSES.map((c) => <button type="button" key={c.id} className={d.courses.includes(c.id) ? 'on' : ''} onClick={() => toggle(c.id)}>{c[lang]}</button>)}</div>{err.courses && <small>{err.courses}</small>}</div>
          <label className="fld full"><span>{f.msg}</span><textarea rows="3" value={d.msg} onChange={(e) => set('msg', e.target.value)} /></label>
          <label className={`chk full ${err.consent ? 'bad' : ''}`}><input type="checkbox" checked={d.consent} onChange={(e) => set('consent', e.target.checked)} /> {f.consent}</label>
          <button className="btn gold full lg" type="submit"><WAIcon /> {f.send}</button>
        </form>)}
    </div></section>
  )
}

function Contact({ t }) {
  const [loc, setLoc] = useState(0)
  return (
    <section id="contact" className="sec"><div className="wrap contact">
      <Reveal><h2>{t.contactT}</h2><p className="lead">“{t.quote}”</p></Reveal>
      <div className="cc">
        <div><span>📍 {t.loc}</span>{SITE.places.map((p) => <p key={p.short} className="loc"><b>{p.short}</b><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.full)}`} target="_blank" rel="noopener noreferrer">{t.maps} →</a></p>)}</div>
        <div><span>📞 {t.call}</span>{SITE.phones.map(([a, b]) => <a key={b} href={`tel:${b}`}><b>{a}</b></a>)}</div>
        <div><span>💬 WhatsApp</span><a href={WA()} target="_blank" rel="noopener noreferrer"><b>{SITE.whatsapp.replace(/^250(\d{3})(\d{3})(\d{3})$/, '0$1 $2 $3')}</b></a></div>
      </div>
      <Reveal><h3 className="mapT">{t.mapT}</h3>
        <div className="mapTabs" role="tablist">{SITE.places.map((p, n) => <button key={p.short} role="tab" aria-selected={n === loc} className={n === loc ? 'on' : ''} onClick={() => setLoc(n)}>📍 {p.short}</button>)}</div>
        <div className="map"><iframe key={loc} title={`PASCAL Academy – ${SITE.places[loc].short}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.places[loc].full)}&output=embed`} /></div></Reveal>
    </div></section>
  )
}

export default function App() {
  const [lang, setLang] = useState(() => {
    try { const v = localStorage.getItem('pascal-lang'); if (v && T[v]) return v } catch {}
    const n = (navigator.languages || [navigator.language || 'en']).map((x) => String(x).slice(0, 2).toLowerCase()).find((x) => T[x])
    return n || 'en'
  })
  const [preset, setPreset] = useState({})
  const t = { ...T[lang], ...EXTRA[lang] }
  useEffect(() => { document.documentElement.lang = lang; try { localStorage.setItem('pascal-lang', lang) } catch {} }, [lang])
  const pick = (id) => { setPreset({ id, n: Date.now() }); document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' }) }
  return (
    <>
      <Nav t={t} lang={lang} setLang={setLang} /><Hero t={t} lang={lang} />
      <main><Promo t={t} /><Courses t={t} lang={lang} onPick={pick} /><Why t={t} /><Gallery t={t} /><Stories t={t} lang={lang} /><FAQ t={t} /><Apply t={t} lang={lang} preset={preset} /><Contact t={t} /></main>
      <footer className="foot"><div className="wrap">
        <a href="#top" className="flogo" aria-label={t.nav[0]}><img src={IMG.logoFull} alt="PASCAL – Practical Skills & Hospitality Academy" /></a>
        <p className="faddr">📍 {SITE.places.map((p) => p.short).join(' · ')}</p>
        <div className="soc">{SITE.social.map(([n, u]) => <a key={n} href={u} target="_blank" rel="noopener noreferrer" aria-label={n}>{SOC[n]}<span>{n}</span></a>)}</div>
        <p>© {new Date().getFullYear()} PASCAL Practical Skills &amp; Hospitality Academy · {t.rights}</p><small>{t.tagline}</small>
      </div></footer>
      <TopBtn t={t} />
      <a className="wa-fab" href={WA(t.hello)} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"><WAIcon /></a>
    </>
  )
}
