# Hero Detail Modal Portal & Mobile Image-Only Reflow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the modal dialog overlap issue by portalling `<HeroDetailModal />` to `document.body` with `z-[100]`, and update the layout so on small screens (< `md`) it renders strictly the image lightbox viewer without explanation text, while maintaining the full 2-column layout on desktop (`md:`+).

**Architecture:** 
1. Use React's `createPortal(..., document.body)` with a `mounted` state safeguard in `HeroDetailModal.tsx` to break out of `<HeroSection>`'s `isolation: isolate` stacking context.
2. Apply responsive reflow using Tailwind (`hidden md:flex`) on the explanation column and adapt modal container sizing (`max-w-md sm:max-w-lg md:max-w-4xl`) so mobile screens showcase an uncluttered image viewer.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide React, Vitest.

---

## Global Constraints

- Anti-Slop R-02 Compliance: Zero em-dash (`—`) characters in source files or comments.
- Zero layout regressions: Carousel interactions, looping navigation, keyboard controls (`Esc`, `ArrowLeft`, `ArrowRight`), and touch targets must remain 100% functional.
- Hydration Safety: Ensure `createPortal` only executes on the client after component mount.

## Review Focus

1. **Stacking Context & Portalling:** Modal must not be obscured by `<MotionGrafisVideo>` or any subsequent DOM sibling on any viewport size.
2. **Mobile Layout (< `md`):** Only image viewer, slide navigation, counter pill, and close button visible. No explanation text, badge, or impact callout box visible on mobile.
3. **Desktop Layout (`md:`+):** Full 2-column view (Image viewer on left, educational info on right) remains intact.
4. **Counter & Navigation:** Slide navigation (buttons & keyboard) correctly updates active image and counter pill (`01 / 09` to `09 / 09`) with infinite looping.
5. **Backdrop & Accessibility:** ESC key, backdrop click, and close button properly close the modal and unlock body scroll.

---

### Task 1: Refactor `HeroDetailModal.tsx` with React Portal & Mobile Image-Only Reflow

**Files:**
- Modify: `src/components/HeroDetailModal.tsx`

**Steps:**
- [ ] Add `import { createPortal } from "react-dom"` and client-side `mounted` check via `useState(false)` + `useEffect`.
- [ ] Wrap modal output in `createPortal(modalJSX, document.body)`.
- [ ] Set root backdrop to `fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6`.
- [ ] Update modal container width: `w-full max-w-sm sm:max-w-lg md:max-w-4xl bg-[#0D2118] border-2 border-[#4ADE80] rounded-2xl sm:rounded-3xl p-3 sm:p-5 md:p-8 shadow-2xl overflow-hidden`.
- [ ] Update grid layout: `grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8 items-center`.
- [ ] Set left image viewer column: `w-full md:col-span-6`. Aspect ratio: `aspect-[4/3] sm:aspect-square md:aspect-square`.
- [ ] Hide explanation column on small screens: `className="hidden md:flex md:col-span-6 flex-col justify-center"`.
- [ ] Position close button `X` cleanly: `absolute top-3 right-3 sm:top-4 sm:right-4 md:top-5 md:right-5 z-30`.

---

### Task 2: Update and Expand Unit Tests in `HeroDetailModal.test.tsx`

**Files:**
- Modify: `src/components/__tests__/HeroDetailModal.test.tsx`

**Steps:**
- [ ] Verify modal is portalled to `document.body` when open.
- [ ] Verify that explanation container has `hidden md:flex` class to ensure mobile hides text.
- [ ] Verify all existing tests pass: initial render, counter pill `01 / 09`, looping forward/backward, keyboard navigation, and close button.
- [ ] Run test: `npm.cmd test -- src/components/__tests__/HeroDetailModal.test.tsx`.

---

### Task 3: Comprehensive Verification & Build

**Files:**
- Verification only

**Steps:**
- [ ] Run full test suite: `npm.cmd test -- --run`.
- [ ] Run Next.js production build: `npm.cmd run build`.
- [ ] Run anti-slop audit: `npm.cmd test -- src/lib/__tests__/antislopAudit.test.ts`.
- [ ] Commit changes with descriptive commit message and push to `origin main`.
