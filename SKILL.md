---
name: craftui-engine
description: >-
  Standard protocol and methodology for diagnosing and refactoring AI-generated UI/UX slop
  into high-density, professional, friction-free B2B and operational interfaces. Use when
  auditing an application, redesigning gaudy/noisy interfaces, removing AI filler copy,
  or optimizing ERP/POS keyboard and data density flows.
---

# CraftUI Engine: B2B Operational UI/UX & De-AI Refactoring Protocol

CraftUI Engine provides an end-to-end framework to identify, dissect, and eradicate the hallmark defects of AI-generated user interfaces ("AI Slop"), transforming them into calm, ergonomic, high-density business applications that operators can use all day without cognitive fatigue.

---

## 1. When to Trigger CraftUI Engine

Trigger this skill whenever any of the following symptoms appear in a codebase:
- **Visual AI Hallmarks**: Garish glows, neon border gradients, excessive card wrapping, overly rounded buttons (`rounded-3xl` on data grids), low contrast or uncoordinated color clashes.
- **Copy & Content Bloat**: Marketing filler words, exaggerated AI praise, chatty explanatory labels on self-explanatory inputs.
- **Input & Workflow Friction**: 15+ required fields on a single screen without progressive disclosure; lack of 1-click workflows for primary operations; missing keyboard navigation (`Enter`, `Escape`, `Tab`, shortcuts).
- **Physical/B2B Disconnect**: Unformatted thermal receipts (missing 80mm cash register layouts), broken Arabic/RTL CSV exports (missing UTF-8 BOM `\uFEFF`), reckless cloud sync of massive binary images instead of local storage.

---

## 2. The 4-Phase Transformation Protocol

```
+------------------+     +-------------------+     +--------------------+     +-------------------+
|  1. AUDIT & SCAN | --> | 2. STRIP & QUIET  | --> | 3. COMPACT & DENSE | --> | 4. HARDWARE/FLOWS |
| Heuristic check  |     | Kill glows & copy |     | Tables & Accordion |     | POS, Print, Keys  |
+------------------+     +-------------------+     +--------------------+     +-------------------+
```

### Phase 1: Heuristic Audit (The "AI Slop" Diagnostic)
Before touching any code, run a comprehensive inventory using [references/anti-patterns.md](./references/anti-patterns.md):
1. **Catalog unnecessary fields**: Mark all inputs that operators rarely fill out during peak hours.
2. **Flag copy bloat**: Identify placeholder text, subtitles, and welcome messages that provide zero operational value.
3. **Audit color hierarchy**: Count distinct accent colors. If there are more than two primary functional colors (e.g. Action vs Alert), consolidate them.
4. **Inspect hardware/data safety**: Identify any raw binary uploads pushing straight to Firebase/Supabase without local caching or quotas.

### Phase 2: Strip & Quiet (Visual Hygiene)
Implement the calm design system outlined in [references/b2b-design-system.md](./references/b2b-design-system.md):
1. **Neutral Base**: Standardize backgrounds to neutral slates/grays (`#0f172a`, `#1e293b`, or clean `#ffffff`/`#f8fafc`).
2. **Eradicate Neon**: Remove `box-shadow: 0 0 25px rgba(...)`, neon border rings, and rainbow badges.
3. **Muted Borders**: Replace harsh borders with subtle, low-contrast separators (`border-slate-800` / `border-gray-200`).
4. **Purge AI Filler**:
   - Change *"مرحباً بك في نظام إدارة المحركات المتطور والذكي"* to *"إدارة المحركات"*.
   - Replace long descriptive helper text with concise standard placeholders (e.g., `أدخل الكود أو الباركود...`).

### Phase 3: High-Density Layout & Progressive Disclosure
Operators look at business screens 8-10 hours a day; they need dense, scannable data:
1. **Cards to Grids**: Replace bulky grid cards with compact data tables featuring sticky headers and row hover highlights.
2. **4-Field Form Rule**: On creation modals, show only the 3-4 vital fields on top. Hide secondary specifications, notes, and attachments inside a collapsible progressive accordion.
3. **Stat Card Hygiene**: Ensure top dashboard metrics show actionable numbers, units, and small delta indicators—not gigantic decorative graphics.

### Phase 4: Operational Flows & Physical Integration
Implement the guidelines from [references/operational-flows.md](./references/operational-flows.md):
1. **1-Click Cashier Actions**: In POS/Checkout interfaces, provide single-tap instant payment ("كاش فوري") that fills exact amount and completes transaction in 1 click.
2. **Full Keyboard Ergonomics**:
   - Support `0-9` digit entry, `Backspace`, `Enter` to submit, `Escape` to close modal without touching the mouse.
   - Autofocus primary search inputs immediately on screen load.
3. **Printers & Dual Layouts**:
   - Implement `@media print` with 80mm thermal receipt styling for POS (`@page { size: 80mm auto; margin: 0; }`).
   - Retain crisp A4 table formatting for official tax and warranty invoices.
4. **Safe Local Storage & Backups**:
   - Retain heavy attachments (e.g., clearance papers, photos) strictly in local IndexedDB.
   - Provide periodic full backup notifications with 1-click JSON export including base64 images.
5. **Excel/CSV Export with Arabic BOM**:
   - Always prefix CSV file blobs with `\uFEFF` (UTF-8 BOM) so Arabic text renders natively in Microsoft Excel without character corruption.

---

## 3. Verification & Acceptance Checklist

Before declaring any refactor complete, verify against:
- [ ] **No Unused Visual Drama**: Are all shadows functional rather than decorative?
- [ ] **No Wordy Filler**: Has every label been reduced to its minimal informative phrasing?
- [ ] **Keyboard Tested**: Can a cashier perform a full checkout cycle without a mouse?
- [ ] **High Density**: Does the screen display at least 8-12 records per fold on desktop?
- [ ] **Safe Data**: Are heavy images isolated locally and not exceeding cloud document quotas?
- [ ] **BOM on Exports**: Does exported CSV open in Excel with perfect Arabic typography?

---

## 4. Supporting Resources, Snippets & Tooling

- [Anti-Patterns Diagnostic Catalog](./references/anti-patterns.md)
- [B2B Design System & Typography Rules](./references/b2b-design-system.md)
- [Operational Flows, Cashier & Printing Guide](./references/operational-flows.md)
- [Audit Report Template](./templates/audit-report.md)
- [De-AI Step-by-Step Checklist](./templates/de-ai-checklist.md)

### Ready-to-Use Code Snippets & Boilerplates
- [ThermalReceipt80mm.tsx](./snippets/ThermalReceipt80mm.tsx) - Continuous 80mm cash receipt with `@media print`.
- [CompactDataTable.tsx](./snippets/CompactDataTable.tsx) - High-density tabular grid with `tabular-nums`.
- [ProgressiveAccordionForm.tsx](./snippets/ProgressiveAccordionForm.tsx) - 4-Vital-Fields progressive form.
- [useKeyboardPOS.ts](./snippets/useKeyboardPOS.ts) - 1-Click cash shortcut and barcode scanner hook.
- [arabicCsvExport.ts](./snippets/arabicCsvExport.ts) - Arabic Excel UTF-8 BOM (`\uFEFF`) exporter.
- [localBinaryStore.ts](./snippets/localBinaryStore.ts) - IndexedDB local binary isolation and backup check.

### Automated Code Scanner (CLI)
Run `node bin/craftui.js scan <dir>` or `npx craftui scan <dir>` to audit source code for AI Slop anti-patterns.
