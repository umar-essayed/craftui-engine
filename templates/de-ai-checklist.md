# CraftUI De-AI Implementation & Refactoring Checklist

Follow this checklist sequentially during any UI/UX refactoring sprint.

---

## Step 1: Pre-Refactoring Diagnostic
- [ ] Run the project locally (`npm run dev` or equivalent) and capture current screenshots or view structures.
- [ ] Fill out the [Audit Report](./audit-report.md) with defects across Visuals, Copy, Workflows, and Data.
- [ ] Identify all data-entry forms with more than 4 inputs.

---

## Step 2: Visual & Copy Hygiene
- [ ] Remove all glowing `box-shadow` styles (`shadow-[0_0_...px]`).
- [ ] Replace all bright or clash-colored backgrounds with neutral slate/gray:
  - App Canvas: `#090d16` (Dark) / `#f8fafc` (Light)
  - Card/Modal Surface: `#0f172a` (Dark) / `#ffffff` (Light)
  - Table Headers & Inputs: `#1e293b` (Dark) / `#f1f5f9` (Light)
- [ ] Reduce button and card corner radius from `rounded-2xl`/`rounded-3xl` to `rounded-lg` / `rounded-md`.
- [ ] Strip marketing fluff, welcome messages, and wordy explanations from headers and forms.
- [ ] Delete fake pre-populated inputs and replace with clean placeholders.

---

## Step 3: Information Density & Layout
- [ ] Convert loose card grids (for lists > 10 items) into compact table views.
- [ ] Enforce compact cell padding (`py-2.5 px-3`) with horizontal dividing lines.
- [ ] Apply `font-mono` / `tabular-nums` to all prices, codes, phone numbers, and balances.
- [ ] Group secondary form fields into a collapsible `<details>` or accordion component, keeping only 3-4 primary fields visible upfront.

---

## Step 4: Ergonomics & Operational Flow
- [ ] Implement 1-click primary action for cashier / POS checkouts ("كاش فوري").
- [ ] Bind keyboard shortcuts:
  - `Enter` submits focused form or modal.
  - `Escape` closes active modal.
  - Numeric keyboard triggers PIN / amount input.
- [ ] Add `autoFocus` on the primary search or barcode input upon view load.
- [ ] Provide clear empty states with a single primary CTA (no decorative filler illustrations).

---

## Step 5: Hardware & Data Safety
- [ ] Isolate heavy binary images into client-side IndexedDB; exclude image data from remote cloud document sync.
- [ ] Implement 7-day interval check for full backup with 1-click JSON export.
- [ ] Add `@media print` 80mm continuous thermal styling for cash register receipts.
- [ ] Add `\uFEFF` UTF-8 BOM to all CSV exports to ensure Excel compatibility with Arabic/RTL text.

---

## Step 6: Verification & Final Polish
- [ ] Run linter and typecheck: verify 0 TypeScript/build errors.
- [ ] Test keyboard navigation throughout without mouse.
- [ ] Test print preview (verify 80mm receipt renders cleanly in black and white).
- [ ] Export CSV and open in Excel to verify character encoding.
