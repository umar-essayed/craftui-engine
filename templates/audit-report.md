# CraftUI De-AI & UI/UX Audit Report Template

Use this template when auditing an existing application to diagnose AI Slop and formulate an actionable refactoring plan.

---

# Application Audit Report: [Application Name]
- **Auditor**: [Agent / Engineer Name]
- **Target Tech Stack**: [e.g. React 18, Vite, Tailwind CSS, TypeScript, IndexedDB]
- **Date**: [YYYY-MM-DD]
- **Current Aesthetic Rating**: [ ] AI Slop (Gaudy / Verbose)  |  [ ] Mixed  |  [ ] Professional B2B

---

## 1. Visual & Aesthetic Flaws (AI Slop Detection)
- [ ] **Glows & Neons**: (List specific components using neon shadows, gradient rings, or harsh glows)
- [ ] **Low Information Density**: (List views wasting screen real estate with oversized cards, huge paddings)
- [ ] **Color Clashes**: (Count distinct accent colors; note where warning/success/primary semantics are confused)
- [ ] **Excessive Radii**: (Note buttons or cards using `rounded-2xl` or `rounded-3xl` inappropriately)

## 2. Copy & Content Bloat
- [ ] **Marketing Greetings**: (Quote unnecessary filler greetings or descriptive headers)
- [ ] **Over-explained Inputs**: (List forms with excessive helper texts under basic inputs)
- [ ] **Fake Pre-filled Values**: (List forms populated with hardcoded fake names or placeholder values)

## 3. Workflow & Ergonomic Deficiencies
- [ ] **Input Overload**: (List forms with > 5 visible required fields lacking progressive disclosure)
- [ ] **Checkout / POS Bottlenecks**: (Count clicks needed to execute a standard transaction)
- [ ] **Missing Keyboard Shortcuts**: (Check if `Enter`, `Escape`, `0-9` keypad, and `autoFocus` work)

## 4. Hardware, Data & Offline Architecture
- [ ] **Binary Storage Vulnerability**: (Are images/PDFs saved into cloud document stores instead of local IndexedDB?)
- [ ] **Receipt Printing**: (Is there an 80mm thermal receipt CSS mode, or only default screen/A4 print?)
- [ ] **Export Integrity**: (Does CSV export include UTF-8 BOM `\uFEFF` for Excel Arabic compatibility?)
- [ ] **Backup Regularity**: (Is there an automated prompt and one-click JSON dump for local offline data?)

---

## 5. Prioritized Action Plan

| Priority | Component / Module | Identified Defect | Refactored Solution |
| :---: | :--- | :--- | :--- |
| **P0** | e.g. LoginView | Garish glow, mouse-only PIN, filler text | Neutral dark slate, numeric keypad listeners, Enter to login |
| **P0** | e.g. PointOfSale | 5-step checkout process | 1-click "كاش فوري" button + autofocus barcode search |
| **P1** | e.g. EngineForm | 14 mandatory fields | 4 vital fields + collapsible accordion for specs & docs |
| **P1** | e.g. ReceiptPrint | Messy A4 print on POS printers | Dedicated `@media print` 80mm continuous roll styling |
| **P2** | e.g. CloudSync | Images synced to Firestore | Isolate images in IndexedDB; add 7-day full backup prompt |
