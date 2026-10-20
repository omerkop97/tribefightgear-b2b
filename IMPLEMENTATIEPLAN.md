# Implementatieplan — Tribe Gear B2B website

> Status: 11 oktober 2026 · ISPO Amsterdam is **3–5 november 2026** → de site moet uiterlijk **±27 oktober** live staan (≈ 2,5 week bouwtijd + 1 week buffer).

---

## 1. Doel & positionering

- **Geen webshop**: een premium B2B-showcase voor een fight-gear fabriek (OEM / ODM / Private Label).
- **Primaire conversie**: *Book a meeting* (Google Calendar, ISPO-stand 2E30).
- **Secundaire conversie**: *Direct contact* via WhatsApp (nieuw ISPO-nummer).
- **Toon**: zakelijk, strak, zelfverzekerd. Scroll-animaties die "wow" zijn maar nooit afleiden van de inhoud.

## 2. Tech stack (advies)

| Onderdeel | Keuze | Waarom |
|---|---|---|
| Framework | **Astro 5** (statische multi-page site) | Razendsnel, perfect voor SEO, losse pagina's per categorie, geen overbodige JavaScript |
| Styling | Eigen CSS met design tokens (CSS-variabelen) | Light/dark mode met één set tokens, geen extra framework nodig |
| Animaties | **GSAP + ScrollTrigger** (sinds 2025 volledig gratis) + **Lenis** smooth scroll | Industrie-standaard voor "world class" scroll-animaties |
| Afbeeldingen | Astro `<Image>` → **AVIF/WebP**, responsive formaten | Huidige foto's zijn 3–9 MB PNG's; moeten naar ±100–300 KB |
| Formulieren | Geen backend nodig: Google Calendar-link + WhatsApp `wa.me`-link (+ evt. Formspree/Web3Forms voor een offerteformulier) | Simpel en onderhoudsvrij |
| Hosting | **Vercel** of **Netlify** (gratis tier), eigen domein | Automatische HTTPS, CDN, preview-links per wijziging |
| Analytics | Plausible of GA4 (met cookie-banner bij GA4) | Meten hoeveel meetings via de site geboekt worden |

## 3. Huisstijl & thema

- **Kleuren** (besloten 11 okt): **army green** als accent i.p.v. rood. Army green `#4B5320` (knoppen/vlakken), lichtere olijf `#A3B06C` voor tekstaccenten in dark mode, crème `#F3EFE4`, zwart `#0A0B08`.
- **Alleen dark mode** (besloten 16 okt door de klant): zwarte achtergrond, crème tekst, army green accenten. Geen lichte modus en geen wisselknop.
- **Typografie**: *Barlow Condensed* (koppen, uppercase) + *Inter* (tekst), zelf gehost.
- **Design-taal**: veel witruimte, harde rechte hoeken, dunne lijnen, grote productfotografie, rode accentlijnen.

## 4. Sitemap

```
/                         Landingspagina (alle secties in het kort)
/products                 Overzicht 4 categorieën
/products/gloves          Essential · Performance · Elite
/products/protective      Essential · Performance · Elite
/products/coaching        Essential · Performance · Elite
/products/fightwear       Essential · Performance · Elite
/oem-odm                  OEM · ODM · Private Label + proces
/factory                  Skilled people / capacity (+ video later)
/about                    Bart & Jan — verhaal
/ispo-2026                ISPO-pagina (ook doel van de QR-code)
/contact                  Meeting boeken, WhatsApp, e-mail
/privacy                  Privacyverklaring (verplicht i.v.m. AVG)
```

## 5. Landingspagina — secties & animaties

| # | Sectie | Inhoud | Scroll-animatie |
|---|---|---|---|
| 0 | **ISPO-banner** (sticky boven header) | "Meet Tribe at ISPO 2026 — RAI Amsterdam — 3–5 Nov — Stand 2E30 — **Book a meeting now**" (klikbaar → Google Calendar) | Subtiele marquee/ticker op mobiel; verdwijnt automatisch na 5 nov |
| 1 | **Header** | Logo · Products ▾ · OEM & ODM · Factory · About · Contact · thema-toggle · CTA "Book a meeting" | Header krimpt + krijgt blur-achtergrond bij scrollen |
| 2 | **Hero** | "Premium fight gear factory." · subtekst ("Built for brands that refuse to compromise…") · 2 CTA's: **Book a meeting now** (Calendar) en **Direct contact** (WhatsApp) · grote foto (Apex-handschoen, aan te leveren) | Koptekst onthult per regel (mask reveal), handschoen schaalt/roteert licht mee op scroll (parallax) |
| 3 | **Trust badges** | 20+ customized products · European market served (EU-icoon) · 20+ years experience · 20+ years manufacturing | Getallen tellen op (count-up) zodra in beeld |
| 4 | **Meet us at ISPO 2026** | Uitleg, RAI · 3–5 Nov · Stand 2E30, QR-code (→ WhatsApp/booking), foto/visual van de stand, "Test our equipment with our European boxing team" | Kaarten schuiven gestaffeld in; QR-blok "pint" vast terwijl tekst scrolt |
| 5 | **Explore our Fight Equipment** | 4 categoriekaarten → eigen pagina | Horizontale scroll-sectie (gepind) of gestaffelde kaarten met foto-zoom op hover |
| 6 | **Three ways to build with us** | OEM · ODM · Private Label + procesbalk *Concept → Material → Design → Sample → Production → QC → Delivery* | Procesbalk tekent zich stap voor stap (rode lijn groeit mee met scroll) |
| 7 | **Skilled people. Serious capacity. + About us** (samengevoegd) | Links fabriek/capaciteit (Cutting, Moulding, Stitching, Branding, Assembly, QC, Packing, Warehouse), rechts Bart & Jan · "One passion. Two areas of expertise. One team." | Split-screen: fabriek-placeholder → later video die afspeelt bij in beeld; portretten met clip-path reveal |
| 8 | **Laatste CTA** | "From the gym to the factory. Together we rise." + Book a meeting + WhatsApp | Grote typografie die op scroll in beeld schuift, rode achtergrond-wipe |
| 9 | **Footer** | Logo, navigatie, contact (zakelijke mail, WhatsApp), adres/KvK, ISPO-info, socials, privacy | Statisch |

**Animatie-regels (zakelijk blijven):**
- Maximaal één "statement"-animatie per sectie; de rest is subtiele fade/slide.
- Duur 0,6–1,0 s, easing `power3.out` — nooit stuiterend of speels.
- `prefers-reduced-motion` respecteren: dan alleen simpele fades.
- Op mobiel: geen gepinde/horizontale secties, wel reveals.

## 6. Productcategorie-pagina's

Elke categoriepagina krijgt dezelfde template:

1. Hero met categorienaam + korte intro.
2. **Tier-switcher**: *Essential* · *Performance* · *Elite* (tabs of drie verticale blokken, elk met eigen kleuraccent: grijs / rood / zwart-goud).
3. Per tier: modellen met foto-galerij (6 hoeken per product → 360°-achtige draaiviewer of slider), materiaal (PU / leder / microfiber), korte specs.
4. CTA: "Develop this product for your brand" → meeting/WhatsApp.

**Inhoud volgens het document (handschoenen):**

| Tier | Modellen | Materiaal |
|---|---|---|
| Essential | Aiba-model, AD-model, RDX-model, (MMA — Jan denkt na) | PU |
| Performance | Topking pro model, Twins model, Venum Rajadamnern | Leder / micro |
| Elite | Apex, Glory, Fly | Leder / micro |

> Let op: modelnamen als *Venum, RDX, Twins, Topking* zijn merken van derden. Op de site beter noemen als *"T-01 Pro-style"* o.i.d. of "inspired by" weglaten — juridisch veiliger. Zie open vragen.

## 7. Beschikbaar fotomateriaal (uit WeTransfer-zip, 68 foto's, ±330 MB)

| Map | Inhoud |
|---|---|
| Essential / Gloves | AD, Aiba, RDX — elk 6 foto's |
| Essential / Protective Gear | AD, Aiba, RDX — shinpads + head guards, elk 6 foto's |
| Essential / Coaching Equipment | Aiba focus pads (6), RDX focus pads (2) |
| MMA Gloves | Venum — 6 foto's |

**Ontbreekt nog:** Performance- en Elite-foto's, Fightwear & Accessories, hero-foto (Apex), portretten Bart & Jan, fabrieksfoto's/-video, logo in vector (SVG), standvisual ISPO.

**Aanpak:** zip uitpakken naar `src/assets/products/…`, automatisch converteren naar AVIF/WebP in meerdere formaten, achtergronden waar nodig uniform maken.

## 8. Integraties

- **Google Calendar**: in Google Workspace een *Appointment schedule* ("ISPO 2026 — Stand 2E30", slots 3–5 nov) aanmaken → publieke boekingslink in alle "Book a meeting"-knoppen.
- **WhatsApp**: `https://wa.me/<nieuw-ISPO-nummer>?text=Hi%20Tribe%2C%20I'd%20like%20to%20discuss…` (vooringevuld bericht).
- **QR-code**: SVG genereren die naar `/ispo-2026` of direct naar WhatsApp wijst (in tribe-rood, met logo in het midden) — ook bruikbaar voor de stand zelf.
- **Zakelijke mail**: Google Workspace op het gekochte domein (bijv. `info@` en `bart@`), MX/SPF/DKIM instellen.

## 9. Kwaliteit & SEO

- Lighthouse ≥ 95 op performance, accessibility, SEO.
- Meta-titels/-omschrijvingen per pagina, Open Graph-afbeeldingen, `sitemap.xml`, structured data (`Organization`, `Event` voor ISPO).
- Taal: **Engels (root `/`) en Nederlands (`/nl/…`)**, wisselknop EN/NL in de header; alle teksten in `src/i18n/en.ts` en `nl.ts`.
- Toegankelijkheid: contrast, toetsenbordnavigatie, alt-teksten.
- AVG: privacyverklaring, cookie-banner alleen als er tracking-cookies gebruikt worden.

## 10. Planning (fasen)

| Fase | Wat | Wanneer |
|---|---|---|
| **1. Setup** | Astro-project, Tailwind, design tokens (light/dark), fonts, GSAP/Lenis, foto-pipeline | 12–13 okt |
| **2. Basis** | Header, ISPO-banner, footer, thema-toggle, pagina-routing | 13–14 okt |
| **3. Landingspagina** | Alle secties 0–9 met echte content en placeholders | 14–18 okt |
| **4. Productpagina's** | Template + 4 categorieën, tier-switcher, galerijen | 18–21 okt |
| **5. Overige pagina's** | OEM/ODM, Factory, About, ISPO, Contact, Privacy | 21–23 okt |
| **6. Animatie-polish** | Alle scroll-animaties finetunen, mobiel, reduced-motion | 23–25 okt |
| **7. Integraties & live** | Calendar-link, WhatsApp, QR, domein, Vercel, analytics, testen op devices | 25–27 okt |
| **8. Buffer** | Feedback Bart/Jan, laatste content, QR drukken voor stand | 27 okt – 2 nov |

Na ISPO: banner uitschakelen/ombouwen, fabrieksvideo toevoegen, Performance/Elite-foto's aanvullen.

## 11. Status (11 oktober 2026)

**Gebouwd** (Astro-project in deze map, `npm run dev` → http://localhost:4321):
- Alle pagina's in EN + NL: home, products, 4 categoriepagina's, OEM/ODM, factory, about, ISPO 2026, contact, privacy, 404.
- ISPO-banner (verdwijnt automatisch na 5 nov), header met dropdown, mobiel menu, altijd dark mode. QR-code alleen op desktop.
- Scroll-animaties: woord-voor-woord koppen, parallax hero-handschoen, tellers, horizontale categorie-rail (desktop), procesbalk die meegroeit, clip-reveals, CTA-wipe. `prefers-reduced-motion` wordt gerespecteerd.
- 68 productfoto's omgezet naar WebP (330 MB → 13 MB), galerij met 6 hoeken per model + "spin" door met de muis over categoriekaarten te bewegen.
- QR-code (WhatsApp, ISPO-bericht) automatisch gegenereerd.

- Productpagina's volgen de mappenstructuur: Essential → Gloves / Protective (Head guards, Shin pads) / Coaching (Focus pads); MMA Gloves als eigen collectie. Per model grote presentatie met alle hoeken, fullscreen viewer, fotostrook, "Make it yours"-sectie; Performance/Elite gebundeld als "Next levels — ISPO".

- Tweede fotolevering (17 okt, 140 foto's) verwerkt: Elite (Apex, Glory, Fly) in Gloves, Protective en Coaching; Accessories (Speedball, Shin In Step, Groin Guard, Boxing Shoes) onder Fightwear & Accessories; Venum MMA nu 9 foto's. Apex is de hero-foto.

**Nog te doen / aanleveren:**
1. Google Calendar *Appointment schedule* aanmaken → link in `src/data/site.ts` (`BOOKING_URL`). Nu opent een vooringevulde agenda-afspraak; die meldt de afspraak niet bij jullie.
2. ~~Logo~~ ✔ verwerkt (gevectoriseerd naar SVG: `src/assets/brand/`, losse bestanden in `public/brand/`, favicon).
3. Domein → `site` in `astro.config.mjs`; zakelijke e-mail → `EMAIL` in `src/data/site.ts`.
4. Portretten Bart & Jan → `public/images/team/`, pad invullen in `src/components/PeopleCards.astro`.
5. Foto's Performance-lijn, kledingstukken (fightwear), fabrieksvideo.
6. Productnamen: voorlopig de mapnamen van de klant (Aiba, AD, RDX, Venum). Let op: RDX en Venum zijn merknamen van derden — vóór livegang definitieve namen bevestigen.
7. Hosting (Vercel/Netlify) + livegang.
