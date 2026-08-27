# Villa Peñas Landing Page

## Product & Functional Brief

**Status:** Initial development specification
**Project:** Public Villa Peñas landing page
**Location:** Santa Cruz, Guanacaste, Costa Rica
**Languages:** Spanish and English

---

# 1. Product Goal

Build a bilingual public landing page for **Villa Peñas**, separate from the existing administration application.

The landing has two primary goals:

1. Present Villa Peñas through a highly visual, premium experience.
2. Allow visitors to build an informational event quote dynamically and send it to Villa Peñas through WhatsApp.

The landing is NOT a reservation system.

Expected commercial journey:

**Instagram → Landing Page → Quote → WhatsApp → Human confirmation**

The administration application remains responsible for reservation management.

---

# 2. Languages

The website must support:

* Spanish.
* English.

Spanish is the primary/default language.

The website must be bilingual from the beginning rather than adding English as a later duplicated version.

Both languages share:

* Components.
* Layout.
* API data.
* Quote state.
* Quote calculations.
* Media.
* Business logic.

Only localized content changes.

---

# 3. Localized Routing

Preferred URL strategy:

```text
/es
/en
```

Additional pages:

```text
/es/politicas
/en/policies

/es/contacto
/en/contact
```

The website root may resolve or redirect to `/es`.

The language selector should preserve the equivalent page and, when practical, the current section.

---

# 4. Language Selector

Use a discreet selector such as:

```text
ES | EN
```

Do not rely only on flags.

Desktop:

Integrate it into the navigation.

Mobile:

Place it in or near the compact navigation menu.

The current language must be visually identifiable.

---

# 5. Localization Strategy

Interface copy must be centralized.

Do not place translatable strings arbitrarily across React components.

Conceptual structure:

```text
src/
└── i18n/
    ├── es.ts
    ├── en.ts
    └── types.ts
```

A lightweight custom solution is preferred initially unless project complexity justifies an internationalization library.

---

# 6. Backend Business Content and English

The existing backend currently returns Spanish business content.

This includes concepts such as:

* Packages.
* Package descriptions.
* Services.
* Service descriptions.
* Additional products.
* Additional-product options.

Backend IDs, pricing, availability state, relationships, and ordering remain authoritative.

For the English experience, the frontend may maintain translation maps for known backend business entities.

Use backend IDs as stable translation keys whenever possible.

Example:

```text
serviceId: 3

ES:
Piscina

EN:
Swimming Pool
```

Do not modify the backend solely to support the initial English version.

A backend-native localization model may be considered later if administrators need to manage multilingual content directly.

---

# 7. Experience Principles

The experience should feel:

* Visual.
* Refined.
* Rustic.
* Natural.
* Warm.
* Modern.
* Cinematic.
* Simple.
* Accessible.
* Spacious.

Avoid overwhelming visitors.

Core principle:

> Show the experience first. Explain the price afterward.

Spanish conceptual principle:

> Primero mostramos la experiencia. Después mostramos cuánto cuesta.

---

# 8. Visual Reference

Primary experience reference:

`https://exonimbu.com/`

Nimbu is a reference for:

* Cinematic introduction.
* Fullscreen video.
* Photography.
* Whitespace.
* Editorial layouts.
* Subtle animation.
* Progressive navigation.
* Amenity presentation.

Villa Peñas must maintain its own identity.

---

# 9. Branding

Preserve the existing Villa Peñas branding.

Primary direction:

* Dark/warm browns.
* Wood.
* Cream.
* Sand.
* Gold.
* Warm neutrals.

Secondary natural accents may use:

* Olive.
* Forest green.

Communicate:

**Nature + wood + warmth + privacy + celebration**

Avoid generic resort, hotel, eco-lodge, or SaaS aesthetics.

---

# 10. Technology

Frontend:

* React
* TypeScript
* Vite
* Tailwind CSS

Backend:

* NestJS
* PostgreSQL
* Railway

API documentation:

`https://villa-penas-production.up.railway.app/api/docs`

The frontend is a separate project from the administration application.

---

# 11. Home Journey

The Home page follows:

1. Animated Loader
2. Cinematic Hero
3. Location / Map
4. Amenities
5. Packages
6. Instagram
7. Quote Calculator
8. Minimal Footer

Policies and extended contact information live outside the main Home experience.

---

# 12. Initial Loader

Display a fullscreen animated loading experience when the visitor enters.

Do not use:

* Generic spinner.
* Generic progress bar.
* Static splash screen.

Primary brand:

**VILLA PEÑAS**

Initial localized tagline:

Spanish:

**Tu momento comienza aquí**

English:

**Your moment starts here**

Both must be easy to change.

Potential animation:

* Progressive title reveal.
* Thin gold/sand line.
* Fade.
* Subtle movement.
* Very subtle texture/grain.

---

# 13. Loader Behavior

The loader helps prepare the Hero video but must not wait indefinitely.

Target behavior:

1. Display immediately.
2. Begin preparing Hero media.
3. Maintain a short intentional minimum duration.
4. If Hero media can play, transition.
5. Use a reasonable maximum wait.
6. If connection is slow, reveal the Hero poster.
7. Start video when sufficient media becomes available.

Use a smooth transition rather than a hard cut.

Respect reduced-motion preferences.

---

# 14. Cinematic Hero

Use a slow cinematic walkthrough video of Villa Peñas.

It should feel like physically moving through the property.

Potential route:

* Entrance.
* Rancho.
* Pool.
* Social areas.
* BBQ.
* Gardens.
* Playground.

Avoid fast advertising-style cuts.

## Desktop

Use optimized horizontal media, ideally around 16:9.

Hero fills the viewport.

## Mobile

Use vertical/adapted material where possible, ideally around 9:16.

Do not rely solely on cropping the desktop video.

---

# 15. Hero Content

Keep the Hero visually clean.

Do NOT overlay:

* Large headlines.
* Package prices.
* Promotional cards.
* Large descriptions.

The property is the protagonist.

Functional floating UI is allowed when discreet.

---

# 16. Aerial Drone Video

Display a secondary floating video containing an aerial drone view.

## Desktop

Place it near the lower-right area but above/away from the floating quote CTA.

Potential localized label:

Spanish:

**Vista aérea ↗**

English:

**Aerial view ↗**

## Interaction

Selecting it should allow an expanded viewing experience without leaving the Home page.

The visitor must be able to close it naturally.

## Mobile

Use a substantially smaller presentation.

Do not consume excessive screen space.

---

# 17. Floating Quote CTA

Primary CTA:

Spanish:

**Cotizar**

English:

**Get a Quote**

It floats near the lower-right corner.

Selecting it:

* Does not navigate to another page.
* Smooth-scrolls to `#cotizador`.

Mobile should use a compact variant.

---

# 18. Navigation

Navbar remains hidden during:

* Loader.
* Beginning of Hero.

It appears smoothly once the visitor begins leaving the Hero.

It may hide again when returning completely to the Hero.

## Desktop — Spanish

```text
VILLA PEÑAS | Ubicación | Amenidades | Paquetes | Cotizar | ES / EN
```

## Desktop — English

```text
VILLA PEÑAS | Location | Amenities | Packages | Get a Quote | ES / EN
```

## Mobile

Compact brand + menu + accessible language selector.

---

# 19. Location Section

Appears after the Hero.

Avoid an unstyled embedded Google Maps block.

Use an editorial two-area composition.

## Left

Show:

* Exact/public location.
* Written directions.
* Useful landmarks.
* Distances.
* Google Maps action.

Current public reference:

Spanish:

**1 km sur de la entrada a Moya, Chirco, Santa Cruz, Guanacaste**

English:

**1 km south of the entrance to Moya, Chirco, Santa Cruz, Guanacaste**

Google Maps:

`https://maps.app.goo.gl/HP9MBJkZyfovstMv9`

## Right

Show a real map containing:

* Santa Cruz.
* Route.
* Relevant references.
* Real roads.
* Villa Peñas destination marker.

The destination marker must open Google Maps.

AI-generated maps are visual references only, not geographic truth.

---

# 20. Map Actions

Spanish:

**Abrir en Google Maps**

English:

**Open in Google Maps**

Both point to the same real location.

The location pin must also be interactive.

---

# 21. Amenities

Use an editorial image/text composition inspired by Nimbu.

Use substantial photography and concise text.

## Amenity 1

Spanish:

**Piscina & Rancho**

English:

**Pool & Rancho**

Desktop:

**Image left / text right**

## Amenity 2

Spanish:

**Rancho BBQ**

English:

**BBQ Rancho**

Highlight:

* BBQ area.
* Large gas grill.
* Social/cooking area.

Desktop:

**Text left / image right**

## Amenity 3

Spanish:

**Playground**

English:

**Playground**

Desktop:

**Image left / text right**

---

# 22. Amenity Motion

Use subtle effects:

* Fade.
* Small vertical motion.
* Very light parallax.
* Slow image scale when appropriate.

Avoid distracting animations.

Respect `prefers-reduced-motion`.

---

# 23. Amenities on Mobile

Use deliberate vertical compositions.

Do not force narrow desktop-style columns.

Example:

```text
Image
Title
Short description
Optional secondary image/detail
```

Photography remains dominant.

---

# 24. Packages

Package data comes from backend.

Current package names:

* Essencials
* Premium

The frontend must not assume exactly two packages.

Additional packages may be added later.

Package names should primarily render from backend data.

If a package requires a different English-facing commercial name later, use a stable ID-based localization map.

---

# 25. Current Package Concepts

## Essencials

Core Villa Peñas experience including items such as:

* Rancho.
* Pool.
* Equipped kitchen.
* Playground.
* Trampoline.
* Wi-Fi.
* Green areas.
* Parking.

Actual rendered services must come from backend.

## Premium

Includes the core experience plus services such as:

* JBL PartyBox 720.
* Wireless microphones.
* Premium gas grill.
* 75-inch Smart TV.

Actual content must come from backend.

---

# 26. Package Presentation

Use visual cards inspired by the supplied reference.

Avoid generic SaaS pricing cards.

Potential content:

* Photography.
* Name.
* Short description.
* Capacity.
* Duration.
* Price.
* Included services/details.

Potential Spanish actions:

**Ver qué incluye**

**Agregar a mi cotización**

Potential English actions:

**See what's included**

**Add to my quote**

---

# 27. Package API Model

`GET /paquetes` already contains nested package/service information.

Relevant package fields:

* `id`
* `nombre`
* `descripcion`
* `precioColones`
* `activo`
* `paquetesServicios`

Relevant package-service fields:

* `cantidad`
* `detalle`
* `orden`
* `servicio`

Relevant service fields:

* `id`
* `nombre`
* `descripcion`
* `unidadMedida`
* `activo`

Respect backend ordering and active state.

Avoid reconstructing nested relationships through unnecessary requests.

---

# 28. Additional Products

Additional products include concepts such as:

* Popcorn machine.
* Cotton-candy machine.
* Chocolate fountain.
* Combined machine package.

Each may have backend-defined variants.

Examples:

* 15 people.
* 30 people.
* Other quantities.

Each machine includes an operator provided by Villa Peñas.

Additional-product quantity is independent from total event attendance.

---

# 29. Additional Product Localization

Backend IDs and prices remain authoritative.

Spanish and English labels may be mapped by stable product/option IDs.

Example:

Spanish:

**Máquina de palomitas — 15 personas**

English:

**Popcorn machine — 15 people**

Never duplicate or alter the backend price during translation.

---

# 30. Instagram

Instagram is an important acquisition channel.

Expected funnel:

**Instagram → Landing → Quote → WhatsApp**

Initial version avoids Meta API integration.

Use a curated visual feed with frontend-managed images.

Spanish:

**Síguenos en Instagram**

**Momentos en Villa Peñas**

**Ver más en Instagram**

English:

**Follow us on Instagram**

**Moments at Villa Peñas**

**See more on Instagram**

Open the same official Instagram profile.

---

# 31. Quote Calculator

The calculator appears near the end of Home.

No login is required.

No personal information is required to calculate.

## Desktop

Two columns.

### Left

Allow configuration of:

* Package.
* Additional products.
* Product options.
* Additional guests.
* Additional time.
* Event date.
* Event type.

### Right

Display:

* Selected package.
* Price.
* Extras.
* Variants.
* Additional guests.
* Additional time.
* Subtotals.
* Total.
* Deposit information.
* WhatsApp CTA.

Summary may be sticky.

---

# 32. Quote Calculator — Mobile

Use a single-column flow.

Keep total accessible.

Spanish example:

```text
₡XXX.XXX | Ver cotización
```

English:

```text
₡XXX.XXX | View quote
```

Selecting it exposes the complete summary and WhatsApp action.

---

# 33. Client-Side Quote Calculation

The informational quote is calculated in React.

Backend provides commercial data and prices.

Frontend calculates using those values.

Conceptually:

```text
total =
package
+ extras
+ additional guests
+ additional time
```

Do not hardcode backend-owned commercial prices.

This is acceptable because the landing:

* Does not charge.
* Does not create reservations.
* Does not guarantee availability.

---

# 34. Included Guests

Current package baseline:

**30 guests**

Spanish:

**Hasta 30 personas incluidas**

English:

**Up to 30 guests included**

Guests above the included amount incur an additional charge.

Final maximum capacity is pending.

Do not invent it.

---

# 35. Included Time

Current package baseline:

**8 hours**

Spanish:

**8 horas incluidas**

English:

**8 hours included**

Additional time can be quoted.

Maximum additional time remains pending.

---

# 36. Entry-Time Restriction

A minimum entry-time/business rule will exist.

Purpose:

Prevent undesirable schedules such as:

**10:00 p.m. → 6:00 a.m.**

The definitive rule remains pending.

Do not invent one.

---

# 37. Event Date

Visitor may select a date.

Spanish:

**Fecha del evento**

English:

**Event date**

The date:

* Does not check availability.
* Does not block dates.
* Does not query reservations.
* Does not guarantee availability.
* Does not create a reservation.

It is informational context for WhatsApp only.

---

# 38. Event Type

Potential Spanish options:

* Cumpleaños.
* Reunión familiar.
* Baby shower.
* Graduación.
* Actividad privada.
* Otro.

Potential English options:

* Birthday.
* Family gathering.
* Baby shower.
* Graduation.
* Private event.
* Other.

Unless future backend rules specify otherwise, event type does not affect price.

---

# 39. WhatsApp

Current contact:

**+506 8850-7212**

CTA:

Spanish:

**Cotizar por WhatsApp**

English:

**Get a Quote on WhatsApp**

The generated message should match the selected language.

---

# 40. Spanish WhatsApp Example

> Hola, quisiera consultar esta cotización de Villa Peñas:
>
> Tipo de evento: Cumpleaños
> Fecha: 18/10/2026
>
> Paquete Premium
> 35 personas
> 10 horas
>
> Extras:
>
> * Palomitas para 30 personas
> * Fuente de chocolate para 15 personas
>
> Total estimado: ₡XXX.XXX
>
> Entiendo que la fecha se confirma con un adelanto de ₡20.000.

---

# 41. English WhatsApp Example

> Hello, I would like to ask about this Villa Peñas quote:
>
> Event type: Birthday
> Date: 18/10/2026
>
> Premium package
> 35 guests
> 10 hours
>
> Extras:
>
> * Popcorn for 30 people
> * Chocolate fountain for 15 people
>
> Estimated total: ₡XXX.XXX
>
> I understand that the date is confirmed with a ₡20,000 deposit.

---

# 42. Deposit

Current deposit:

**₡20,000**

The deposit:

* Is later used to confirm a date with staff.
* Is deducted from the total.

The landing does NOT collect payment.

Spanish:

**El adelanto se descuenta del total.**

English:

**The deposit is deducted from the total.**

Keep this amount centralized and easy to change.

---

# 43. Reservation Restrictions

The landing MUST NOT:

* Create reservations.
* Display availability.
* Display occupied dates.
* Display reservation records.
* Process booking payments.
* Guarantee dates.

Booking remains human-assisted through WhatsApp.

---

# 44. Policies

Policies should have their own localized page.

## Deposit

₡20,000 confirms the date once coordinated with staff.

It is deducted from the total.

## Cancellation — 7 days or more

100% deposit refund.

## Cancellation — less than 7 days

Deposit is non-refundable.

## Date changes

One date change is allowed.

Subject to availability.

Must be requested at least 7 days in advance.

## No-show

Deposit is forfeited.

## Remaining payment

Remaining balance must be paid one day before the event.

## Damages

Customer is responsible for damage to:

* Facilities.
* Furniture.
* Equipment.

## Villa Peñas force majeure

Customer may choose:

* Full deposit refund.

or

* Free rescheduling.

Spanish and English policy pages must express equivalent rules.

---

# 45. Contact

Contact should have localized pages/content outside the main Home.

Possible content:

* WhatsApp.
* Instagram.
* Google Maps.
* General information.

---

# 46. FAQ

Do not place a large FAQ section in Home.

It may live under Policies/Information.

FAQ must support Spanish and English.

Do not invent business answers that are not already defined.

---

# 47. Testimonials

No formal testimonial collection currently exists.

Do not invent testimonials.

The design may support future testimonials.

---

# 48. Footer

Keep Home footer minimal.

Potential elements:

* Villa Peñas.
* Instagram.
* WhatsApp.
* Google Maps.
* Policies.
* Contact.
* Copyright.
* Language switcher if appropriate.

All labels must respect locale.

---

# 49. Media Strategy

Stable photos and videos may live directly in frontend.

Use:

```text
public/images/
public/videos/
```

Do not initially introduce:

* CMS.
* Cloudinary.
* S3.
* PostgreSQL media management.

Prefer:

* WebP/AVIF.
* Responsive sizes.
* Lazy loading.
* Optimized video.
* Posters.
* Desktop/mobile media variants.

Media can normally be shared between languages.

---

# 50. Accessibility

Implement from the beginning:

* Semantic HTML.
* Sufficient contrast.
* Readable type.
* Adequate touch targets.
* Keyboard navigation.
* Meaningful alt text.
* Correct labels.
* Appropriate ARIA.
* `prefers-reduced-motion`.
* Accessible language selector.

Set correct document language for each route.

Animations must not be required for comprehension.

---

# 51. SEO & Local SEO

Villa Peñas should be understandable as an event venue in:

**Santa Cruz, Guanacaste, Costa Rica**

Potential Spanish title:

**Villa Peñas | Espacio para eventos en Santa Cruz, Guanacaste**

Potential English title:

**Villa Peñas | Event Venue in Santa Cruz, Guanacaste**

Potential Spanish description:

**Villa Peñas es un espacio privado para celebraciones y eventos en Santa Cruz, Guanacaste, con piscina, rancho, cocina equipada, área BBQ y más.**

Potential English description:

**Villa Peñas is a private event venue in Santa Cruz, Guanacaste, featuring a pool, rancho, equipped kitchen, BBQ area and more.**

Exact copy may be refined.

---

# 52. International SEO

Both language versions should be indexable and properly related.

Support:

```text
/es
/en
```

Add appropriate:

* Canonical URLs.
* `hreflang="es"`
* `hreflang="en"`
* Localized titles.
* Localized descriptions.
* Localized Open Graph metadata.
* Correct document `lang`.
* Search-readable translated content.

Avoid creating ambiguous duplicate pages.

---

# 53. Structured Data

Use appropriate structured data where beneficial.

Potential business information:

* Villa Peñas.
* Telephone: +506 8850-7212.
* Santa Cruz, Guanacaste, Costa Rica.
* Google Maps location.
* Website.
* Social profiles.

Structured data must contain factual business information only.

---

# 54. Performance

Performance is especially important because the experience is media-heavy.

Priorities:

* Compress videos.
* Avoid oversized assets.
* Preload only critical media.
* Lazy-load below-the-fold content.
* Use posters.
* Use responsive media.
* Avoid unnecessary dependencies.
* Prefer CSS for simple animations.
* Handle slow mobile connections gracefully.

---

# 55. Current Pending Information

These do not block initial development:

* Maximum guest capacity.
* Maximum additional hours.
* Final entry-time restriction.
* Final photography.
* Final videos.
* Final editorial copy.
* Final Instagram feed images.
* Future testimonials.
* Remaining backend additional-product details.

Do not invent missing business values.

---

# 56. Expected Product Result

The website should feel like discovering Villa Peñas, not opening a rental form.

The visitor:

1. Experiences Villa Peñas visually.
2. Understands its location.
3. Discovers the amenities.
4. Learns about packages.
5. Sees social content.
6. Builds a quote.
7. Starts a WhatsApp conversation.

This experience must work naturally in both Spanish and English.

In short:

**The landing sells the experience.**

**The backend supplies business data.**

**The frontend creates the informational quote.**

**Localization makes the same experience accessible in Spanish and English.**

**WhatsApp starts the sales conversation.**

**The administration system manages actual reservations.**
