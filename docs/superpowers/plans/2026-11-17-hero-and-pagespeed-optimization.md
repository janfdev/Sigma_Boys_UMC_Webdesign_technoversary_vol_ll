# Hero Carousel & PageSpeed 90+ Performance Optimization Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Constrain Hero photo carousel to display maximum 5 photos (max-w-4xl) and fix PageSpeed performance bottleneck (raising mobile score from 68 towards 90+) by resolving the 9.5s LCP, reducing 2.7MB image payloads, and eliminating render delays.

**Architecture:** 
1. Constrain hero carousel rail within `max-w-4xl` with `overflow-hidden` so only the 5 curated cards remain visible.
2. Losslessly/visually-losslessly compress and modernize public images (`Gunung Ciremai.jpg`, hero cards, insight images, gallery heavyweights) via Node/sharp, reducing network payload by ~1.5 - 2.0 MB.
3. Update Next.js config and Hero image delivery with modern WebP/AVIF formats and zero-delay priority loading.

**Tech Stack:** Next.js 15 App Router, React 19, Tailwind CSS, Sharp (Node.js image processing), Vitest.

---

## Global Constraints
- Do not remove or break existing unit tests in `src/**/__tests__`.
- Keep image visual quality high (quality >= 80, sharp Lanczos3 scaling).
- Responsive on mobile, tablet, and desktop without horizontal scrollbar.

---

## Tasks

- [x] **Task 1: Hero Carousel Viewport & 5-Card Constraint**
  - [x] Modify `src/components/HeroSection.tsx` to wrap `CarouselCards` inside `mx-auto max-w-4xl overflow-hidden`
  - [x] Verify card scaling and overlap so that exactly 5 cards (1 active center + 2 left + 2 right) fit gracefully
  - [x] Run vitest on `HeroSection` and `CarouselCards`

- [x] **Task 2: Compress Heavy Image Assets via Sharp Script**
  - [x] Create a Node optimization script using `sharp` to process:
    - `Gunung Ciremai.jpg` -> `Gunung Ciremai.webp` (resize to max 1600px width, quality 80)
    - `bibit-pupuk-kasgot.webp` (resize to 640px, quality 80)
    - `Kolase Daur Ulang Plastik Menjadi Paving.webp` (resize to 640px, quality 80)
    - `pemasangan-paving.webp` (resize to 640px, quality 80)
    - `Organizer Alat Tulis Botol Daur Ulang.webp` (resize to 640px, quality 80)
    - `Lentera Bunga PET di Senja Hari.webp` (resize to 640px, quality 80)
    - `mesin-press-paving.webp` (resize to 640px, quality 80)
    - `kreasi-daur-ulang.webp` (resize to 640px, quality 80)
    - `tumpukan-botol-plastik.webp` (resize to 640px, quality 80)
    - `kasgot-harvest.jpg` (compress quality 80)
    - `maggot-bio.jpg` & `maggot-biokonversi.jpg` (compress quality 80)
  - [x] Execute optimization and verify size reductions (record byte savings)

- [x] **Task 3: HeroSection & Next.js Image Delivery Tuning**
  - [x] In `src/components/HeroSection.tsx`, update hero background image to use `/image-lomba/Gunung%20Ciremai.webp`
  - [x] Ensure `fetchPriority="high"` and proper decoding attributes on LCP image
  - [x] In `next.config.ts`, add image format optimization config (`formats: ['image/avif', 'image/webp']`)

- [x] **Task 4: Verification & Build Check**
  - [x] Run full test suite (`npm run test -- --run`)
  - [x] Run production build (`npm run build`)
  - [x] Verify zero regressions and check payload weights
