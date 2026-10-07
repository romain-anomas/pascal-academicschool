# PASCAL Practical Skills & Hospitality Academy – Website
Pure React + Vite (no UI libraries). Multilingual: English, Kinyarwanda, Français, Kiswahili.

    npm install
    npm run dev       # http://localhost:5173
    npm run build     # production build in /dist

## Change contact details
- WhatsApp number that receives applications: `src/data.js` → `SITE.whatsapp` (format 2507XXXXXXXX) or env var `VITE_WHATSAPP_NUMBER`.
- Courses, texts (EN/RW): `src/data.js`. Colours: `src/styles.css` (:root).

## Add real content (v1.1)
- **Student stories:** add real students (with permission) in `src/testimonials.js` and photos in `src/assets/testimonials/`. Section stays hidden until you add one.
- **Fees & duration:** fill `COURSE_INFO` in `src/data.js`, e.g. `juice: { duration: '3 months', fee: '50,000 RWF' }`. Empty = not shown.
- **FAQ text:** `faqs` in `src/data.js` (EN and RW).

## Languages (v1.2)
- Switcher in the top bar (🌐). The site auto-picks the visitor's browser language (en/fr/rw/sw) and remembers their choice.
- English + Kinyarwanda texts and course names: `src/data.js`. French + Kiswahili texts: `src/i18n-extra.js`.
- To add another language: add its code to `LANGS` in `src/data.js`, add a full translation object to `T`, and add `xx:` names + `pts.xx` to every course.
- Applications sent to WhatsApp always use English field labels so the admissions team reads them consistently; the message also notes the applicant's language.

## v1.3 – animations, Home button, student stories, social links
- Moving gold ticker under the hero and an auto-sliding promo banner (pauses on hover, swipe/arrows/dots): texts in `src/extra.js`, images chosen in `Promo` (`src/App.jsx`).
- Home button in the menu + "back to top" button. Animations respect "reduce motion" settings.
- **Student stories are SAMPLES.** Replace them in `src/testimonials.js` with real students (with permission) and real photos in `src/assets/testimonials/`. Entries without `sample: true` lose the "Sample" tag automatically.
- Social links (Instagram, Facebook, TikTok) are in `SITE.social` in `src/data.js` and shown in the footer.

## v1.4 – locations & footer logo
- Locations (Nyabyondo, Rulindo + Kacyiru, Kigali) are in `SITE.places` in `src/data.js`; add/edit there and the hero, contact cards, map tabs and footer update together.
- Footer uses the full-colour logo (`src/assets/img/logo-footer.png`) on a white card.
