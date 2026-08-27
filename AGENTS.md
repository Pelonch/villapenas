# Villa Peñas Landing — Agent Instructions

## 1. Project

This repository contains the public-facing landing page for **Villa Peñas**, an event venue located in Santa Cruz, Guanacaste, Costa Rica.

This project is separate from the existing Villa Peñas administration application.

Before making product, UX, architectural, internationalization, or significant implementation decisions, read:

`docs/villa-penas-brief.md`

That document is the product and functional source of truth for this landing page.

---

## 2. Technology Stack

Frontend:

* React
* TypeScript
* Vite
* Tailwind CSS

Existing backend:

* NestJS
* PostgreSQL
* Hosted on Railway

Backend API documentation:

`https://villa-penas-production.up.railway.app/api/docs`

Do not replace the existing stack unless explicitly instructed.

Do not introduce additional frameworks, state-management libraries, animation libraries, UI kits, API clients, internationalization libraries, or other dependencies without a concrete need.

Prefer platform APIs, React, TypeScript, and Tailwind when they are sufficient.

---

## 3. Supported Languages

The public website must support:

* Spanish (`es`)
* English (`en`)

Spanish is the primary/default language.

The implementation must be designed as bilingual from the beginning.

Do not build the Spanish version first and duplicate the application later for English.

Both languages must use the same components, layouts, business logic, API integration, and quote logic.

---

## 4. Internationalization Architecture

User-facing interface strings must not be scattered or hardcoded throughout presentation components.

Centralize translatable UI content.

Conceptual structure:

```text
src/
└── i18n/
    ├── es.ts
    ├── en.ts
    ├── types.ts
    └── ...
```

The final implementation may use a different structure if justified.

Prefer a lightweight internal translation solution unless the project becomes complex enough to justify an i18n dependency.

Do not install an internationalization library without first evaluating whether it is necessary.

All translatable keys must remain strongly typed when practical.

Example concept:

```ts
translations[locale].navigation.quote
translations[locale].quote.total
translations[locale].location.openMaps
```

Do not use deeply duplicated arbitrary strings in components.

---

## 5. Localized URLs

The landing should use language-aware URLs.

Preferred structure:

```text
/es
/en
```

Additional pages should follow the same model:

```text
/es/politicas
/en/policies

/es/contacto
/en/contact
```

The language switcher should navigate between localized routes while preserving the visitor's current context when practical.

Spanish should remain the primary experience.

The root `/` may redirect or resolve to `/es` unless another SEO/localization strategy is explicitly selected.

---

## 6. Language Switcher

The website must include an accessible language selector.

Conceptually:

```text
ES | EN
```

Desktop may place it inside the navbar.

Mobile may place it inside or near the navigation menu.

The control must:

* Be keyboard accessible.
* Clearly indicate the current language.
* Avoid relying only on flags.
* Preserve the current page/section when practical.
* Update user-facing content immediately or navigate to the equivalent localized route.

---

## 7. Technical vs. User-Facing Language

Technical documentation, identifiers, type names, code comments when required, and agent instructions should be written in English.

Visible website content must respect the selected locale.

Spanish content should be natural Costa Rican/neutral Spanish appropriate for Villa Peñas.

English content should be natural English, not literal machine-style translation.

Do not translate:

* Villa Peñas.
* Brand names.
* Product model names.
* Backend identifiers.
* Proper names unless explicitly required.

---

## 8. Backend-Provided Content and Localization

The current backend primarily stores business content in Spanish.

Examples include:

* Package names.
* Package descriptions.
* Service names.
* Service descriptions.
* Additional-product names.
* Additional-product options.

Backend prices, IDs, relations, active states, and ordering remain the source of truth.

The frontend may provide an explicit translation layer for known backend business entities when rendering the English version.

Translations should rely on stable backend IDs whenever possible, not fragile string matching.

Preferred concept:

```text
Backend service id: 3
ES → Piscina
EN → Swimming Pool
```

Do not use Spanish display names as the primary identity if a stable ID is available.

Do not modify the existing backend solely for internationalization unless explicitly requested.

If backend-managed bilingual content becomes a business requirement later, reconsider the data model at that time.

---

## 9. Missing Backend Translations

If the English version encounters backend content without an existing translation:

* Do not silently invent complex commercial meaning.
* Preserve the original backend content when necessary.
* Keep the translation mechanism easy to extend.
* Report missing translations during development.

For well-defined stable concepts, a maintained frontend translation map is acceptable.

---

## 10. Core Architecture

The frontend is responsible for:

* Rendering the public landing experience.
* Spanish and English UI.
* Responsive UI.
* Client-side interaction.
* Quote selection state.
* Dynamically displaying backend-provided prices.
* Calculating the informational quote from backend-provided values.
* Building the visual quote summary.
* Generating the localized WhatsApp message.
* Static visual/media content.
* Language-aware SEO metadata.

The backend is responsible for:

* Packages.
* Package prices.
* Services.
* Package-service relationships.
* Additional products.
* Additional-product options.
* Prices and business data already managed by the administration system.

Do not duplicate backend-owned prices as frontend constants.

---

## 11. Critical Business Restrictions

The landing MUST NOT:

* Create reservations.
* Expose reservation records.
* Query or display occupied dates.
* Display an availability calendar.
* Claim that a selected date is available.
* Process payments.
* Confirm an event.
* Hardcode package prices.
* Hardcode additional-product prices.
* Duplicate backend-managed package/service relationships.
* Invent business rules.

The selected event date is contextual information for the quote only.

Final availability and booking confirmation happen through Villa Peñas staff via WhatsApp.

---

## 12. Backend Consumption

Prefer existing backend endpoints when they already provide the required nested information.

For example, `GET /paquetes` already includes its `paquetesServicios` and nested `servicio` information.

Do not create unnecessary frontend requests to reconstruct relationships that are already provided.

Use backend IDs as identifiers.

Filter inactive records when appropriate.

Respect backend-provided ordering such as `orden`.

Keep API access separate from presentation components.

Do not place raw fetch logic directly inside visual components.

---

## 13. Quote Calculator

The quote calculator may perform calculations client-side because it creates an informational quote rather than a reservation or payment.

All variable commercial prices must originate from backend data.

Conceptually:

```text
total =
selected package
+ selected extras
+ additional guests
+ additional time
```

Do not recreate backend prices as TypeScript constants.

Keep quote calculation logic separate from visual components.

Calculations must be deterministic and testable.

The UI should update immediately when selections change.

---

## 14. Localized Quote Experience

Every quote-related interface element must respect the selected language.

Example:

Spanish:

```text
Cotiza tu evento
Paquete
Personas adicionales
Horas adicionales
Total estimado
Cotizar por WhatsApp
```

English:

```text
Get a Quote
Package
Additional guests
Additional hours
Estimated total
Get a Quote on WhatsApp
```

Backend prices remain unchanged.

Currency remains Costa Rican colones.

---

## 15. WhatsApp Localization

The generated WhatsApp message should use the visitor's selected language.

Spanish visitors receive a Spanish quote summary.

English visitors receive an English quote summary.

The business data and amounts must remain identical across languages.

The current Villa Peñas WhatsApp contact is:

`+506 8850-7212`

Keep the number centralized in configuration.

---

## 16. Design Direction

The visual direction is:

* Refined.
* Rustic.
* Natural.
* Warm.
* Modern.
* Spacious.
* Cinematic.
* Minimal.

Primary experience reference:

`https://exonimbu.com/`

Use it only as inspiration for composition, pacing, whitespace, photography, video usage, and progressive navigation.

Do not copy proprietary assets, code, text, or exact implementation.

---

## 17. Branding

Villa Peñas must retain its existing identity.

Primary visual themes:

* Wood/brown tones.
* Cream.
* Sand/gold.
* Warm neutrals.
* Subtle natural greens.

Avoid generic SaaS aesthetics.

Avoid turning the identity into a generic eco-resort aesthetic.

---

## 18. Responsive Design

Responsive design is a first-class requirement.

Do not treat mobile as a scaled-down desktop layout.

Desktop and mobile may use different:

* Media crops.
* Layout composition.
* Element ordering.
* Navigation patterns.
* Quote-summary presentation.

Maintain the same visual quality on both.

---

## 19. Performance

This is a media-heavy landing page.

Prefer:

* Optimized WebP/AVIF images.
* Optimized MP4/WebM video.
* Video posters.
* Responsive media.
* Lazy loading below the fold.
* Minimal eager loading.
* CSS animations when sufficient.
* Minimal JavaScript for purely visual effects.

The loader must never trap the visitor indefinitely while waiting for video.

---

## 20. Accessibility

Accessibility must be implemented from the beginning.

Include:

* Semantic HTML.
* Keyboard accessibility.
* Visible focus behavior.
* Sufficient contrast.
* Meaningful alt text.
* Proper form labels.
* Appropriate ARIA only when native semantics are insufficient.
* Adequate touch targets.
* `prefers-reduced-motion`.

The language switcher must also be accessible.

Set the correct document language:

```html
<html lang="es">
```

or:

```html
<html lang="en">
```

according to the active locale.

---

## 21. SEO and International SEO

SEO and local SEO are important.

The implementation should support:

* Semantic heading structure.
* Localized page titles.
* Localized meta descriptions.
* Canonical URLs.
* Open Graph metadata.
* Sitemap.
* robots.txt.
* Structured data.
* Descriptive image alt text.
* Strong mobile performance.
* Search-engine-readable textual content.

International SEO must also support:

* `/es`
* `/en`
* `hreflang="es"`
* `hreflang="en"`
* appropriate canonical behavior
* localized metadata
* localized structured textual content

Do not let both languages appear as duplicate SEO content without language signals.

---

## 22. Local SEO

The website must clearly communicate that Villa Peñas is an event venue in:

**Santa Cruz, Guanacaste, Costa Rica**

Current public location reference:

**1 km south of the entrance to Moya, Chirco, Santa Cruz, Guanacaste**

Google Maps:

`https://maps.app.goo.gl/HP9MBJkZyfovstMv9`

Public business information should remain consistent across:

* Website.
* Google Maps/Business Profile.
* Instagram.
* WhatsApp.

---

## 23. Component Design

Prefer small, focused, reusable components.

Do not create a monolithic `App.tsx` or `Home.tsx`.

Keep concerns separated:

* Presentation.
* Localization.
* API access.
* Quote calculation.
* Configuration.
* Types.
* Media references.

Do not duplicate entire components just to support English.

---

## 24. TypeScript

Use meaningful TypeScript types.

Avoid:

* `any`.
* Unsafe assertions.
* Duplicated domain interfaces.
* Untyped translation dictionaries.
* Fragile string-based domain matching when IDs are available.

Backend response types and frontend UI models may be separated where transformation provides value.

---

## 25. Media

Stable marketing assets may live in:

```text
public/images/
public/videos/
```

Do not introduce a CMS, S3, Cloudinary, or another media platform unless explicitly requested.

The same visual media can normally be shared between Spanish and English.

---

## 26. Loader Configuration

The initial loader tagline is:

Spanish:

**Tu momento comienza aquí**

English:

**Your moment starts here**

Both must be stored in centralized localization/configuration and remain easy to change.

---

## 27. Development Workflow

Before implementing a substantial feature:

1. Read the relevant brief section.
2. Inspect existing code.
3. Inspect localization implications.
4. Reuse existing patterns.
5. Explain architecturally significant changes.
6. Make the smallest coherent change.
7. Run lint/type/build checks.
8. Verify Spanish and English behavior.
9. Report what changed and unresolved issues.

Do not rewrite unrelated code.

---

## 28. Dependencies

Before installing a dependency, determine whether the requirement can reasonably be solved using:

* Browser APIs.
* React.
* TypeScript.
* CSS/Tailwind.
* Existing dependencies.

For significant dependencies, explain why they are justified first.

---

## 29. Source of Truth Priority

When information conflicts, use:

1. Explicit current user instruction.
2. `docs/villa-penas-brief.md`.
3. Existing backend/API behavior.
4. Existing repository conventions.
5. Agent assumptions.

If a business rule is unclear, ask instead of inventing it.
