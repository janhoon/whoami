# Portfolio Design Review & Modernization Analysis

**Author:** OpenClaw Design Review  
**Date:** February 5, 2026  
**Subject:** janhoon.com — Nuxt 3 Portfolio Site  
**Commit Base:** `1c30c5f` (feat: add Coolify deployment setup with Docker)

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Architecture Overview](#architecture-overview)
3. [Color Scheme Analysis](#color-scheme-analysis)
4. [Typography Evaluation](#typography-evaluation)
5. [Spacing & Visual Rhythm](#spacing--visual-rhythm)
6. [Layout Analysis](#layout-analysis)
7. [Navigation: Radial Menu & Scroll](#navigation-radial-menu--scroll)
8. [Content Presentation](#content-presentation)
9. [Component-Level Review](#component-level-review)
10. [Performance & Technical Concerns](#performance--technical-concerns)
11. [Accessibility Audit](#accessibility-audit)
12. [Mobile Responsiveness](#mobile-responsiveness)
13. [Strengths Summary](#strengths-summary)
14. [Weaknesses Summary](#weaknesses-summary)
15. [Improvement Recommendations](#improvement-recommendations)
16. [Creative Layout Alternatives](#creative-layout-alternatives)
17. [Priority Ranking](#priority-ranking)

---

## Executive Summary

The portfolio at janhoon.com is a clean, minimal Nuxt 3 site built with Tailwind CSS 4, featuring a dark theme with green accents, a two-column layout, radial navigation, and scroll-driven tab switching. It effectively communicates a professional identity as a Data & Platform Engineer, but several design and UX issues hold it back from being truly memorable or polished. The radial menu — while creative — has significant usability concerns. The content sections feel thin, the right column is underutilized, and the overall design leans more "developer side project" than "professional portfolio." This review provides actionable recommendations prioritized by impact.

---

## Architecture Overview

| Aspect | Details |
|--------|---------|
| **Framework** | Nuxt 3.17 (Vue 3.5) |
| **Styling** | Tailwind CSS 4 (Vite plugin) |
| **Fonts** | Roboto (body, via system/CDN?), JetBrains Mono (monospace, self-hosted woff2) |
| **Icons** | @nuxt/icon with Iconify (remote server bundle) |
| **Animations** | @vueuse/motion |
| **Content** | @nuxt/content v3 (Markdown blog posts) |
| **Analytics** | PostHog (proxied) |
| **Deployment** | Docker / Coolify |
| **Pages** | Homepage (tabs: about/blog/projects), Blog index, Blog post, 404 |

The tech stack is solid and modern. No unnecessary bloat.

---

## Color Scheme Analysis

### Current Palette

| Element | Color | Usage |
|---------|-------|-------|
| **Background** | `bg-gray-800` (#1f2937) | Main background via layouts |
| **Text** | `text-gray-100` (#f3f4f6) | Primary text |
| **Accent** | `green-600` (#16a34a) | Active states, links, author names, "Buy Me a Coffee" |
| **Accent Hover** | `green-500` (#22c55e) | Hover states |
| **Secondary BG** | `bg-gray-700` (#374151) | Hover states on blog items, author card |
| **Secondary BG** | `bg-gray-900` (#111827) | Skill badges |
| **Skill Bars** | `bg-green-700` (#15803d) | Filled skill bars |
| **Muted Text** | `text-gray-400` (#9ca3af) | Dates, descriptions |
| **Project Desc** | `text-gray-600` (#4b5563) | ⚠️ Very low contrast on dark bg |

### Strengths

- **High contrast core:** Light text on dark background is easy to read
- **Green accent is distinctive:** Sets a developer/terminal aesthetic that fits the Data & Platform Engineer identity
- **Consistent accent usage:** Green is used coherently for interactive elements across the site

### Weaknesses

- **`text-gray-600` on `bg-gray-800` is near-illegible:** In `ProjectShowcase.vue`, project descriptions use `text-gray-600` (#4b5563) against the dark background. This is a contrast ratio of roughly **1.9:1** — far below WCAG AA minimum of 4.5:1. This is a critical bug.
- **Monochromatic palette is flat:** The only color variation is gray + green. There's no secondary accent, no gradient, no depth. The site feels undifferentiated from thousands of dark-mode developer portfolios.
- **No light/dark toggle:** CSS variables for both light and dark modes are defined in `main.css` but **never used** — the site is hardcoded dark via layout classes. The entire shadcn/ui CSS variable system is dead code.
- **Green-on-gray lacks warmth:** Pure green (#16a34a) against cool grays feels clinical rather than inviting. A warmer green (emerald/teal) or a complementary warm accent would add personality.

### Recommendations

1. **Fix `text-gray-600` → `text-gray-400`** in ProjectShowcase immediately (accessibility fix)
2. **Introduce a secondary accent** — consider a warm complementary color (amber/orange) for non-interactive highlights, or use green at different saturations
3. **Add subtle depth:** Consider a gradient background (e.g., radial gradient from `gray-900` center to `gray-800` edges), or use varying gray tones to create visual hierarchy
4. **Either implement the light/dark toggle or remove the dead CSS variables** — currently it's confusing unused code
5. **Consider emerald-500 (#10b981) instead of green-600** — slightly more sophisticated and warmer

---

## Typography Evaluation

### Current Setup

- **Body font:** `'Roboto', Arial, Helvetica, sans-serif` (set in `main.css` on `body`)
- **Monospace:** `'JetBrains Mono', monospace` (self-hosted, 5 weights: 400–800)
- **Font loading:** `font-display: swap` (good)
- **Heading sizes:** `text-4xl` (name), `text-2xl` (subtitle, section heads), `text-lg` (sub-section heads)

### Strengths

- **JetBrains Mono is well-chosen:** It reinforces the developer identity and is a high-quality monospace font
- **Self-hosted fonts** avoid FOUT from Google Fonts CDN
- **Font-display: swap** prevents invisible text during load

### Weaknesses

- **Roboto is generic and dated:** It's the default Android font and the most overused Google Font. It communicates nothing about personality or brand. For a portfolio, this is a missed opportunity.
- **Roboto isn't self-hosted or explicitly loaded:** The `body` CSS references `'Roboto'` but there's no `@font-face` for it and it's not in the `assets/fonts/` directory. The browser likely falls back to Arial/Helvetica. This means the "font choice" is essentially random depending on the visitor's system.
- **JetBrains Mono is never visibly used:** The `.font-mono` utility is defined but no component applies it. All those 18 self-hosted font files (~1.7MB) are dead weight.
- **No typographic hierarchy:** All headings use the same font weight pattern (`font-bold`) with only size differentiation. There's no use of lighter weights, letter-spacing, or font-style variation to create visual rhythm.
- **Blog prose styling is basic:** The `.prose` classes in `[slug].vue` use raw `@apply` without much finesse — no custom line-heights, no drop caps, no pull quotes, no attention to reading experience.
- **Geist/GeistMono fonts exist in assets but are completely unused** — more dead weight (~134KB)

### Recommendations

1. **Replace Roboto with a distinctive sans-serif:** Consider Inter (clean, modern), Space Grotesk (techy, distinctive), or Outfit (geometric, friendly). Self-host it.
2. **Actually use JetBrains Mono** somewhere visible — code snippets, skill names, terminal-style elements, or as a display font for headings
3. **Remove unused font files** (Geist, GeistMono, unused JetBrains Mono weights like Thin, ExtraLight, Italic variants) — they bloat the build even if tree-shaken
4. **Create typographic hierarchy:** Use font-weight variation (300 for body, 600 for subheads, 800 for hero name), letter-spacing on uppercase labels, and italic for dates/metadata
5. **Improve blog reading experience:** Set `line-height: 1.75` on prose body, add `max-width: 65ch` for optimal line length, consider a serif font for long-form reading

---

## Spacing & Visual Rhythm

### Current State

- **Page padding:** `p-4` (16px) — consistent but tight
- **Profile section:** `mb-8` (32px) below image, `mb-2` between name and title, `mb-8` below title
- **Right column padding:** `pl-8` (32px)
- **Section headings:** `my-4` (16px top/bottom)
- **Skill bars gap:** `gap-2` (8px)
- **Other skills gap:** `gap-2` (8px)
- **Blog items:** `space-y-2` (8px) between items, `p-4` (16px) padding inside
- **Overall max-width:** `max-w-6xl` (72rem / 1152px)

### Weaknesses

- **Cramped right column:** `pl-8` left padding is the only breathing room. With `w-1/3` on large screens, the content area is roughly 350px — skills bars with percentage widths get crushed.
- **Insufficient vertical rhythm:** `my-4` for section headings creates equal spacing above and below, making it hard to associate headings with their content. Headings should have more space above than below.
- **No baseline grid or consistent spacing scale:** Spacing alternates between 8px, 16px, and 32px without a clear system. A 4-8-16-24-32-48 scale would create more harmony.
- **`pr-8` on left column, `pl-8` on right column:** Combined 64px gutter between columns is fine, but on the left column the `pr-8` creates asymmetry since the profile content is centered.
- **Blog post list is dense:** 8px between items with only a bottom border as separator makes items blend together.

### Recommendations

1. **Increase right column width** to `lg:w-2/5` or `lg:w-1/2` to give content more breathing room
2. **Use asymmetric heading margins:** `mt-8 mb-3` instead of `my-4` — creates clear content grouping
3. **Add more generous padding on blog list items:** Increase to `py-5 px-4` with more distinct separators
4. **Consider increasing base page padding** on mobile: `p-4` (16px) feels tight; `p-6` (24px) would be more comfortable
5. **Add a clear vertical spacing system:** Define spacing tokens and use consistently (e.g., section gaps = 48px, subsection gaps = 24px, element gaps = 12px)

---

## Layout Analysis

### Current: Two-Column Split

```
┌──────────────────────────────────────────────┐
│ [Blog link]                    [Social icons] │
│                                               │
│    ┌──────────────┐  ┌──────────────────────┐ │
│    │              │  │                      │ │
│    │   [Avatar]   │  │   Tab Content:       │ │
│    │   + Radial   │  │   About / Blog /     │ │
│    │     Menu     │  │   Projects           │ │
│    │              │  │                      │ │
│    │  "Jan Hoon"  │  │                      │ │
│    │  "Data &     │  │                      │ │
│    │   Platform   │  │                      │ │
│    │   Engineer"  │  │                      │ │
│    └──────────────┘  └──────────────────────┘ │
│                                               │
│              [Social Links]                   │
└──────────────────────────────────────────────┘
```

- **Left column:** `w-2/3` — Profile picture (290×290), radial menu overlay, name, title
- **Right column:** `w-1/3` — Tab content (About/Blog/Projects) with slide transitions
- **Mobile:** Stacks vertically (`flex-col` → `lg:flex-row`)
- **Centering:** `flex items-center justify-center`

### Strengths

- **Clear visual hierarchy:** Photo draws the eye first, then name, then content
- **Centered layout** feels intentional and focused
- **Mobile stack** is a sensible responsive approach
- **Tab transitions** (slide left/right) add polish

### Weaknesses

- **Extreme column imbalance:** The left column (`w-2/3`) contains only a photo and two lines of text. The right column (`w-1/3`) must contain all substantive content — skills, blog posts, projects. This ratio is backwards. The identity column has 2x the space but 1/10th the content.
- **Right column content overflow risk:** At 1/3 width, the skills section with percentage-based widths becomes nearly unusable on medium screens. A 40% skill at 1/3 of 1152px = ~153px — barely room for the icon and text.
- **No scroll within tabs:** If content exceeds viewport height, the entire page has no scroll (the wheel event is hijacked for tab switching). Long project lists or blog archives would be clipped.
- **Fixed-height feel:** The layout is vertically centered (`items-center justify-center`) which works for minimal content but fails when any section grows.
- **Profile photo dominates:** At 290×290px, the photo takes significant visual real estate. While this is a personal portfolio, the content should be the hero, not the headshot.

### Recommendations

1. **Flip the ratio:** Make the content column wider (`lg:w-3/5` or `lg:w-2/3`) and the profile column narrower (`lg:w-2/5` or `lg:w-1/3`). The profile is identity; the content is the value proposition.
2. **Consider a sticky left column:** On desktop, pin the profile column so it stays visible while the content column scrolls naturally
3. **Allow natural scrolling within tab content** — don't prevent default scroll behavior
4. **Reduce profile photo size** to 200×200px or consider a non-circular treatment
5. **Add visual anchoring:** A subtle card or panel behind the content area would create containment and focus

---

## Navigation: Radial Menu & Scroll

### Radial Menu (`RadialMenu.vue`)

The radial menu is the most distinctive UI element. Three circular buttons (About, Blog, Projects) arc from the profile photo in a semi-circular arrangement.

**Implementation Details:**
- Positioned absolutely over the profile image
- Uses trigonometric calculation: `angle = (index / items.length / 1.8) * π - π/2.6`
- Radius offset: 140px + 40px = 180px from center
- Animation: scale 0→1 with staggered delays (100ms each)
- Active state: `bg-green-600`, inactive: `bg-gray-700`
- Touch targets: 48×48px (good)

#### Strengths

- **Creative and memorable:** The radial menu is genuinely distinctive — most portfolios don't have one
- **Good animation:** Staggered entrance animation is smooth and delightful
- **Adequate touch targets:** 48px buttons meet minimum touch size requirements
- **Visual connection:** Anchoring navigation to the profile photo creates a cohesive identity element

#### Weaknesses

- **Non-standard = confusing:** Users don't expect navigation to radiate from a photo. There's no visual affordance that says "click here to navigate." First-time visitors will likely miss it entirely.
- **No labels visible:** The menu items are icon-only (user, file-text, briefcase). Without labels, users must guess what each icon means. The icons aren't universally recognizable for "about," "blog," and "projects."
- **Click target ambiguity:** Clicking the profile photo opens the menu, but the menu overlays the photo. The interaction model is: click photo → menu appears → click menu item → content changes. This is two clicks for a three-tab navigation that could be one click.
- **Menu starts open:** `isMenuOpen = ref(true)` — the menu is open by default, but there's no visual cue about what it is. The floating circles look decorative, not interactive.
- **No close affordance:** The menu opens on photo click but has no explicit close button. Users must click outside or understand the toggle behavior.
- **Scroll-driven tab switching is jarring:** The `handleWheel` event captures all scroll events on the page and converts them to tab switches with a 300-unit threshold and 500ms cooldown. This hijacks a fundamental browser behavior and will confuse users who try to scroll the page normally.
- **No keyboard navigation:** The radial menu cannot be navigated via keyboard (Tab + Enter). This is an accessibility failure.
- **Mobile friction:** On mobile (stacked layout), the radial menu sits above the content. The spatial metaphor (menu items arc to the right of the photo) doesn't translate well when the layout is vertical.

### Recommendations

1. **Add text labels to radial menu items** — either always-visible or on hover. Consider: `About | Blog | Projects` as small text below each icon.
2. **Add a conventional fallback navigation:** A simple horizontal tab bar above the content column (About | Blog | Projects) that works alongside the radial menu. Progressive enhancement: fancy radial for desktop, standard tabs for mobile.
3. **Remove or make scroll-tab-switching opt-in:** This is the single biggest UX issue. Users expect scroll to scroll. If keeping it, add a visible indicator (e.g., "scroll to navigate" hint with arrows) and allow Escape to disable it.
4. **Add keyboard accessibility:** Support Tab navigation to menu items, Enter/Space to activate, and arrow keys to cycle through tabs.
5. **Consider replacing the radial menu on mobile** with a bottom tab bar or simple segmented control. The radial metaphor doesn't work in stacked layout.

---

## Content Presentation

### Skills Section (About Tab)

**Primary Skills — Horizontal Bars:**

```
[Kubernetes icon]  Kubernetes        ████████████████████░░░░░░░ 70%
[Databricks icon]  Databricks        ████████████████████████░░░ 80%
[React icon]       React             ██████████████░░░░░░░░░░░░ 50%
[Grafana icon]     Observability     ████████████░░░░░░░░░░░░░░ 40%
[Code icon]        Software Eng.     ████████████████░░░░░░░░░░ 60%
```

- Bars animate from 0% to target width on mount (CSS transition, 700ms ease-out)
- Each bar is a `bg-green-700` div with icon and text inside
- Width is percentage-based (`width: value + '%'`)

#### Issues

- **Percentage skill bars are a known anti-pattern:** What does "70% Kubernetes" mean? 70% of what? It implies a knowable maximum that doesn't exist. It also invites unfavorable comparisons ("only 50% React?"). Industry consensus has shifted away from this pattern.
- **The bars contain the labels:** When a bar is at 40% width, the text "Observability" barely fits. At smaller screen widths, text will overflow or be clipped.
- **No context or evidence:** The skills are stated but not demonstrated. There's no link to projects, blog posts, or certifications that validate the claim.

**Other Skills — Badge Grid:**

```
[Docker] [Snowflake] [AWS] [Azure] [GCP] [Go] [Python] [TypeScript] [Terraform]
```

- Simple `bg-gray-900` rounded-full badges with icons
- No hierarchy or grouping

#### Issues

- **Flat list with no organization:** Cloud providers, programming languages, and IaC tools are mixed together. Grouping by category would be more scannable.
- **No indication of proficiency:** The primary skills have (problematic) percentage bars; the secondary skills have nothing. This creates an odd two-tier system with no explanation of the distinction.

### Blog Section (Blog Tab)

- Shows latest 3 posts from `blog_posts.json`
- Currently only 1 post exists ("CADAC")
- Each item: title + date + "Read more" link
- Staggered entrance animation (300ms + 100ms delay per item)

#### Issues

- **Hardcoded to JSON file, not content query:** Blog posts are listed from a static JSON file, not from the `@nuxt/content` collection. This means the blog list and the actual content can go out of sync.
- **Only 1 post exists:** The blog section feels empty and may signal abandonment rather than thought leadership.
- **No excerpt/description:** Only title and date. Adding a 1-2 sentence preview would significantly improve scannability and click-through.
- **"Read more" is redundant:** The entire list item is a link. The "Read more" text with arrow duplicates the affordance and clutters the UI.

### Projects Section (Projects Tab)

- Only 1 project: "CADAC SQL Visualizer"
- Title + description + external link
- Description text uses `text-gray-600` (contrast issue noted above)

#### Issues

- **Critically thin content:** One project in a "Featured Projects" section signals a lack of portfolio depth. Even listing 2-3 open-source contributions, side projects, or professional work would dramatically improve this.
- **No visual treatment:** No screenshots, no tech stack badges, no GitHub stars, no demo links. The project card is just text.
- **No call-to-action hierarchy:** "View project" vs "View source" vs "Read about it" — currently there's just a plain link.

### Recommendations

1. **Replace skill bars with a categorized grid or card layout:**
   ```
   ☁️ Cloud & Infrastructure    📊 Data Engineering       💻 Development
   ├── Kubernetes               ├── Databricks            ├── Go
   ├── Docker                   ├── Snowflake             ├── Python
   ├── Terraform                └── dbt                   ├── TypeScript
   ├── AWS / Azure / GCP                                  └── React
   ```
   Use icons with labels. No percentages. Group by domain. Optionally highlight "primary" skills with a subtle accent.

2. **Query blog posts from @nuxt/content** instead of the static JSON file. This ensures consistency and enables richer metadata (tags, reading time, etc.).

3. **Add project cards with visual richness:** Include a screenshot/thumbnail, tech stack badges, a short description, and clear CTAs (Live Demo / Source Code).

4. **Write more content:** The single blog post and single project are the biggest "weakness" of the portfolio, more impactful than any design change. Even 3-4 blog posts and 2-3 projects would transform the perceived quality.

---

## Component-Level Review

### `SocialLinks.vue`

- **Position:** Fixed top-right (`fixed top-4 right-4`), vertical stack
- **Icons:** LinkedIn, GitHub, X (Twitter)
- **Animation:** Slides in from right (opacity 0, x: 50 → 0)

**Issues:**
- Fixed positioning may overlap content on narrow screens
- Vertical layout is unusual for social links (horizontal is conventional)
- No labels or tooltips — icon-only with no accessibility text
- Duplicated in `BlogFooter.vue` (same links, different component)

### `BlogTitle.vue`

- Clean, functional component
- Author name links to homepage with green accent
- Good separation of concerns

### `BlogFooter.vue`

- Author card with photo, name, bio, social links
- "Back to blogs" navigation + "Buy Me a Coffee" CTA
- Well-structured but `bg-gray-700` card could use more visual distinction

### `BuyMeACoffee.vue`

- External image button from buymeacoffee.com API
- `loading="lazy"` is good
- The green button color (`16a349`) matches the site accent — nice touch

### `Badge.vue` (UI)

- Generic shadcn-style badge component with variants
- Uses CSS custom properties that are defined but not applied (dark mode not activated via class)
- The component supports `default`, `secondary`, `destructive`, `outline` variants, but only `default` is used in practice

---

## Performance & Technical Concerns

### Issues

1. **~1.7MB of self-hosted font files** (JetBrains Mono in 18 variants) — but the font is barely used. Only regular, medium, semibold, bold, and extrabold have `@font-face` rules; the italic variants and thin/extralight have files but no CSS rules. Even the used weights may not render anywhere since `.font-mono` isn't applied to visible elements.

2. **Geist and GeistMono fonts (134KB)** are completely unused — leftover from the Next.js migration.

3. **Dead CSS variables:** The entire shadcn/ui light/dark theme system in `main.css` (`:root` and `.dark` blocks) isn't connected to anything. The dark theme is achieved via hardcoded Tailwind classes (`bg-gray-800`, `text-gray-100`).

4. **Scroll event listener not debounced properly:** The `handleWheel` in `index.vue` uses a manual accumulator/cooldown pattern. This fires on every wheel event and could cause jank on low-powered devices. Should use `passive: true` at minimum.

5. **Remote icon loading:** `icon.serverBundle: 'remote'` means icons are fetched from Iconify CDN on first load. This adds latency and a dependency on an external service. Consider switching to `local` bundling for the ~15 icons used.

6. **No image optimization for profile photo:** The 290×290 `pfp.jpg` (165KB) is served as-is. @nuxt/image is installed but not used for this image (`<img>` instead of `<NuxtImg>`).

### Recommendations

1. **Audit and remove unused font files** — keep only the 2-3 weights actually used
2. **Delete GeistVF.woff and GeistMonoVF.woff**
3. **Clean up or use the CSS variable system** — either adopt it or remove it
4. **Add `{ passive: true }` to the wheel event listener**
5. **Switch to local icon bundling** or at minimum preload critical icons
6. **Use `<NuxtImg>` for the profile photo** with proper width/height/format optimization

---

## Accessibility Audit

### Critical Issues

| Issue | Severity | Location |
|-------|----------|----------|
| `text-gray-600` on dark background — contrast ratio ~1.9:1 | 🔴 Critical | `ProjectShowcase.vue` |
| No keyboard navigation for radial menu | 🔴 Critical | `RadialMenu.vue` |
| Social links have no accessible labels (`aria-label`) | 🟠 High | `SocialLinks.vue` |
| Radial menu buttons have no accessible labels | 🟠 High | `RadialMenu.vue` |
| Scroll hijacking prevents keyboard/screen-reader scroll | 🟠 High | `index.vue` |
| Profile photo alt text is generic ("Jan Hoon") | 🟡 Medium | `index.vue` |
| No skip-to-content link | 🟡 Medium | Layout |
| No focus indicators visible (outline removed by Tailwind reset) | 🟡 Medium | Global |
| Tab content changes not announced to screen readers | 🟡 Medium | `index.vue` |
| No `<main>` landmark around primary content | 🟡 Medium | Layouts |

### Recommendations

1. **Fix contrast:** Change `text-gray-600` to `text-gray-400` in ProjectShowcase
2. **Add `aria-label` to all icon-only buttons and links** throughout the site
3. **Add `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`** to the radial menu and tab content
4. **Add a skip-to-content link** in the layout
5. **Ensure visible focus indicators** — add `focus-visible:ring-2 focus-visible:ring-green-500` to interactive elements
6. **Use `aria-live="polite"` on the tab content container** so screen readers announce content changes

---

## Mobile Responsiveness

### Current Behavior

- Layout stacks vertically on mobile (`flex-col` → `lg:flex-row` at 1024px)
- Profile photo remains 290×290px on all screens
- Tab content gets full width on mobile
- Blog layout uses `sm:w-2/3` with `px-4` padding
- Radial menu maintains same absolute positioning

### Issues

1. **290px photo on a 375px screen** leaves only 85px total horizontal margin — the photo dominates the viewport
2. **Radial menu positioning breaks on mobile:** The trigonometric positioning doesn't account for screen width. Menu items may overflow viewport edges.
3. **No responsive text sizing:** `text-4xl` (36px) for the name is large on mobile. Consider `text-2xl md:text-4xl`.
4. **Scroll hijacking is especially problematic on mobile:** Touch scrolling is the primary navigation method. Intercepting it for tab switching will frustrate users.
5. **Fixed social links** (`fixed top-4 right-4`) may overlap with the "Blog" link on narrow screens.

### Recommendations

1. **Scale profile photo responsively:** `w-48 h-48 md:w-[290px] md:h-[290px]`
2. **Use a conventional mobile navigation** instead of the radial menu (bottom tabs or horizontal segmented control)
3. **Add responsive text sizes** throughout
4. **Disable scroll-driven tab switching on touch devices** (detect `'ontouchstart' in window`)
5. **Move social links to footer on mobile** or use a collapsible menu

---

## Strengths Summary

1. **Clean, modern tech stack** — Nuxt 3, Tailwind CSS 4, Vue 3, good dependency choices
2. **Distinctive radial menu concept** — creative, memorable, well-animated
3. **Consistent green accent** — creates a recognizable brand identity
4. **Good motion design** — staggered animations, tab transitions, skill bar animations add polish
5. **Self-hosted fonts** — performance-conscious approach
6. **Clean code structure** — well-organized components, composables, layouts
7. **PostHog integration** — analytics-aware, proxied to avoid ad-blockers
8. **Docker/Coolify deployment** — production-ready infrastructure
9. **SEO basics** — meta tags, sitemap, robots.txt
10. **Blog with Markdown** — @nuxt/content is a great choice for developer blogging

---

## Weaknesses Summary

1. **Scroll hijacking** — the #1 UX problem; breaks fundamental browser behavior
2. **Critical contrast accessibility failures** — `text-gray-600` on dark backgrounds
3. **Extreme column imbalance** — 2/3 for identity, 1/3 for content
4. **Thin content** — only 1 blog post and 1 project undermine credibility
5. **Skill percentage bars** — an anti-pattern that raises more questions than it answers
6. **Radial menu lacks affordance** — creative but non-intuitive; no labels, no keyboard support
7. **~1.9MB of unused font files** — performance cost for zero benefit
8. **Blog posts sourced from JSON** instead of @nuxt/content — potential sync issues
9. **No keyboard accessibility** across interactive elements
10. **Generic typography** — Roboto fallback, unused JetBrains Mono
11. **Mobile responsiveness issues** — oversized photo, broken radial menu positioning, scroll hijacking
12. **Dead code** — unused CSS variables, unused fonts, unused badge variants

---

## Improvement Recommendations

### Immediate Fixes (Do This Week)

1. **Fix `text-gray-600` → `text-gray-400`** in `ProjectShowcase.vue` — accessibility critical
2. **Add `{ passive: true }` to wheel event** or better: remove scroll hijacking entirely
3. **Add `aria-label` attributes** to all icon-only buttons and links
4. **Delete unused font files** (Geist, GeistMono, unused JetBrains Mono weights)

### Short-Term Improvements (Do This Month)

5. **Add a conventional tab bar** alongside the radial menu — horizontal text tabs above the content column: `About | Blog | Projects`
6. **Flip the column ratio** to `lg:w-2/5` (profile) and `lg:w-3/5` (content)
7. **Replace skill bars** with a categorized icon grid (no percentages)
8. **Replace Roboto** with a self-hosted distinctive sans-serif (Inter, Space Grotesk, or Outfit)
9. **Actually use JetBrains Mono** — apply it to skill names, code snippets, or section labels
10. **Source blog posts from @nuxt/content** instead of `blog_posts.json`
11. **Add responsive sizing** — photo, text, spacing should adapt to viewport

### Medium-Term Enhancements (Do This Quarter)

12. **Write more content** — aim for 3-5 blog posts and 2-4 projects
13. **Enrich project cards** with screenshots, tech badges, and dual CTAs (Demo / Source)
14. **Add a subtle background treatment** — gradient, noise texture, or geometric pattern
15. **Implement keyboard navigation** for the tab system (arrow keys, Tab, Enter)
16. **Add an "Experience" or "Timeline" section** — professional credibility beyond skills
17. **Clean up dead CSS variable system** or implement proper theme switching

### Long-Term Vision

18. **Add page transitions** between home and blog (Nuxt page transitions)
19. **Consider a dedicated /about page** for deeper content (philosophy, interests, longer bio)
20. **Add an RSS feed** for the blog
21. **Consider micro-interactions** — cursor effects, scroll-triggered reveals on a proper scrolling page
22. **Add testimonials or social proof** if available

---

## Creative Layout Alternatives

### Alternative A: "Terminal Portfolio"

Lean fully into the developer aesthetic. The entire site is styled as a terminal/code editor.

- **Background:** Near-black (`#0d1117` — GitHub Dark) with subtle scan-line effect
- **Layout:** Single column, full-width, monospace throughout
- **Navigation:** Command-line style — `> cd about`, `> cd projects`, `> ls blog/`
- **Hero:** ASCII art name or typing animation: `$ whoami → Jan Hoon`
- **Skills:** Rendered as a `package.json` or `requirements.txt`
- **Projects:** Git log style entries with commit-message descriptions
- **Blog:** File tree navigation, posts rendered as READMEs

**Pros:** Highly distinctive, reinforces technical identity, cohesive theme  
**Cons:** Alienating for non-technical visitors (recruiters, HR), accessibility challenges, limits creative expression

### Alternative B: "Bento Grid"

Modern, card-based layout inspired by Apple's bento box presentations and trending portfolio designs.

- **Layout:** CSS Grid with varied card sizes (1×1, 2×1, 1×2) creating an asymmetric mosaic
- **Hero card:** Large card (2×2) with name, title, and photo
- **Skills card:** Medium card (2×1) with categorized icon grid
- **Blog card:** Tall card (1×2) with latest 3 post previews
- **Projects card:** Large card (2×1) with project screenshots
- **Social card:** Small card (1×1) with social links
- **Location card:** Small card (1×1) with map or timezone
- **Fun fact card:** Small card (1×1) with rotating personal tidbits
- **Navigation:** Cards are the navigation — click to expand or navigate

**Pros:** Trendy, visually interesting, scannable, mobile-friendly (cards stack naturally), information-dense  
**Cons:** Common pattern (many portfolios use this now), requires careful responsive design, could feel cluttered

### Alternative C: "Scroll Story"

Full-page sections with scroll-triggered animations, telling a narrative.

- **Section 1 (Hero):** Full viewport — large name, animated subtitle, photo with parallax
- **Section 2 (About):** Text reveals on scroll, personal story in 2-3 paragraphs
- **Section 3 (Skills):** Icons animate in by category as you scroll past
- **Section 4 (Projects):** Horizontal scroll carousel within the vertical page
- **Section 5 (Blog):** Featured article cards with hover previews
- **Section 6 (Contact):** Clean contact form or social links
- **Navigation:** Dot indicators on the right edge (like fullPage.js)

**Pros:** Engaging, narrative-driven, each section gets full attention, impressive on desktop  
**Cons:** Mobile scroll performance concerns, longer time-to-content, can feel overwrought for a simple portfolio

### Alternative D: "Split Focus" (Evolved Current Design)

Keep the current two-column concept but fix the balance and add depth.

- **Left column (sticky, 35%):** Profile photo (smaller, 200px), name, title, conventional tab navigation, social links — all fixed while scrolling
- **Right column (scrollable, 65%):** Natural-scrolling content area with sections
- **Sections flow vertically** instead of tabbed — About → Skills → Projects → Blog → Contact
- **Navigation:** Left column has anchor links that highlight as you scroll past sections (intersection observer)
- **Visual depth:** Subtle card backgrounds for each section, green accent line on the left edge
- **Mobile:** Left column becomes a compact header (photo + name + hamburger menu), content scrolls naturally below

**Pros:** Keeps the established identity, fixes all major UX issues, professional and clean, best of both worlds  
**Cons:** Less distinctive than current radial menu approach, more conventional

### Recommendation

**Alternative D ("Split Focus")** is the strongest option. It preserves the two-column identity and green accent brand while fixing every major issue (scroll hijacking, column imbalance, mobile UX, accessibility). It's also the lowest-risk migration — most existing components can be reused with repositioning rather than rewriting. Alternative B ("Bento Grid") would be the boldest refresh if a more dramatic redesign is desired.

---

## Priority Ranking

| Priority | Item | Impact | Effort | Category |
|----------|------|--------|--------|----------|
| **P0** | Fix `text-gray-600` contrast in ProjectShowcase | 🔴 High | 🟢 Trivial | Accessibility |
| **P0** | Remove/fix scroll hijacking | 🔴 High | 🟢 Low | UX |
| **P0** | Add aria-labels to icon-only buttons/links | 🔴 High | 🟢 Low | Accessibility |
| **P1** | Add conventional tab navigation alongside radial menu | 🟠 High | 🟡 Medium | UX/Navigation |
| **P1** | Flip column ratio (content gets more space) | 🟠 High | 🟢 Low | Layout |
| **P1** | Replace skill percentage bars with categorized grid | 🟠 High | 🟡 Medium | Content |
| **P1** | Delete unused font files (~1.9MB savings) | 🟡 Medium | 🟢 Trivial | Performance |
| **P2** | Self-host and use a proper body font (replace Roboto) | 🟡 Medium | 🟡 Medium | Typography |
| **P2** | Source blog posts from @nuxt/content | 🟡 Medium | 🟡 Medium | Architecture |
| **P2** | Add responsive sizing (photo, text, spacing) | 🟡 Medium | 🟡 Medium | Responsiveness |
| **P2** | Write more blog posts and add more projects | 🟠 High | 🔴 High | Content |
| **P2** | Enrich project cards (screenshots, tech stack, CTAs) | 🟡 Medium | 🟡 Medium | Content |
| **P3** | Implement keyboard navigation for tabs | 🟡 Medium | 🟡 Medium | Accessibility |
| **P3** | Clean up dead CSS / unused code | 🟢 Low | 🟢 Low | Maintenance |
| **P3** | Add background treatment (gradient/texture) | 🟢 Low | 🟢 Low | Visual |
| **P3** | Use JetBrains Mono visibly somewhere | 🟢 Low | 🟢 Trivial | Typography |
| **P3** | Add page transitions | 🟢 Low | 🟡 Medium | Polish |
| **P3** | Add Experience/Timeline section | 🟡 Medium | 🟡 Medium | Content |
| **P4** | Implement light/dark theme toggle | 🟢 Low | 🟡 Medium | Feature |
| **P4** | Add RSS feed for blog | 🟢 Low | 🟢 Low | Feature |

---

## Conclusion

The portfolio has a solid technical foundation and a distinctive creative concept in the radial menu. However, three issues significantly undermine the user experience: **scroll hijacking, the inverted column ratio, and accessibility failures**. Fixing these P0/P1 items would transform the site from "interesting experiment" to "polished portfolio." The content gap (1 post, 1 project) is the highest-impact improvement overall but requires sustained effort rather than a quick fix.

The recommended path forward is the **"Split Focus" evolution** (Alternative D): keep the two-column identity, fix the proportions, restore natural scrolling, and add a conventional navigation alongside the radial menu. This preserves what makes the site unique while eliminating what makes it frustrating.
