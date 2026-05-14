# yukiuix.com

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss&logoColor=white)
![Live](https://img.shields.io/badge/Live-yukiuix.com-2b6cb0)

> Design engineer portfolio — bilingual, motion-considered, built to think out loud.

![Preview](public/images/web-site-preview.png)

---

## Why this exists

Most portfolios list skills. This one tries to show how I think.

I studied architecture before I wrote code. That gave me a framework for understanding how people navigate systems — not just how they click, but why they stop, turn back, or give up. This site applies that lens to frontend: every layout decision, every animation, every piece of copy has a reason.

---

## What's inside

| Feature | Detail |
|---------|--------|
| **Infinite carousel** | Clone-based loop — auto-advance, hover-pause, silent `transitionEnd` jump |
| **Bilingual i18n** | `next-intl` with locale-aware routing and per-locale content |
| **Playground grid** | Status strip + animated reveal on hover (`translate-x` + background fill) |
| **OG image** | `ImageResponse`-generated, middleware-blocked from direct browser access |

---

## Design decisions

**Carousel on home, grid on playground — why?**
Home is a first impression. Motion creates energy and implies there's more to discover. Playground is for comparison — a static grid lets you scan everything at once without distraction.

**Clone-based loop instead of CSS `animation`**
Needed granular control: auto-pause on hover, arrow navigation that resets the timer, smooth looping without a flash. Clone + `transitionEnd` silent jump gives full behavioral control. CSS keyframes would fight every interaction.

**`translate-x` strip reveal for status indicators**
The colored strip is anchored to the `<li>`, not the card. The card slides right on hover, revealing more of the strip beneath. Gap between original position and card is always filled by color — so the reveal feels physical, like pulling a card from a sleeve.

**Middleware gating on `/opengraph-image`**
The OG route needs to exist for crawlers (`Accept: image/*`) but shouldn't be navigable in a browser (`Accept: text/html`). Middleware checks the header and redirects humans to `/` while letting bots through.

---

## Stack

```
Next.js 14 (App Router) · TypeScript · Tailwind CSS · next-intl
```

---

## Structure

```
app/[locale]/
  page.tsx          # Home — Hero, Projects carousel, About
  playground/       # Full project grid
components/
  Projects.tsx      # Infinite auto-carousel
  Playground.tsx    # 3-col grid with animated status strip
data/
  projects.ts       # Single source of truth for all project data
```

---

## Writing & contact

[yukiuix.com](https://yukiuix.com) · [掘金 (Juejin)](https://juejin.cn/user/3582625834347100) · [LinkedIn](https://linkedin.com/in/kunyu-xu) · [yuki.uix@gmail.com](mailto:yuki.uix@gmail.com)
