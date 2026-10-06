# CraftUI B2B Design System & Typography Rules

A minimal, quiet, high-density design system engineered for enterprise operators and ERP/POS environments.

---

## 1. Color Palette Philosophy

Enterprise software should be neutral and calm. Color is an exception used to direct attention, not decoration.

### The Quiet Slate Palette (Dark Mode Base)
```css
/* Backgrounds */
--bg-app:        #090d16;  /* Ultra-dark calm canvas */
--bg-surface:    #0f172a;  /* Elevated surface (cards, sidebar, modals) */
--bg-muted:      #1e293b;  /* Input fields, table header, hover states */
--bg-subtle:     #334155;  /* Active tabs, borders in focus */

/* Text Hierarchy */
--text-primary:   #f8fafc;  /* 98% white for primary headings and values */
--text-secondary: #94a3b8;  /* Muted slate for labels, metadata, units */
--text-muted:     #64748b;  /* 40% contrast for disabled, placeholders */

/* Functional Accents (Strictly Functional) */
--accent-action:  #3b82f6;  /* Blue 500: Primary actions, links, selections */
--accent-success: #10b981;  /* Emerald 500: Paid, active, stock available */
--accent-danger:  #ef4444;  /* Red 500: Debt, refund, delete, alert */
--accent-warning: #f59e0b;  /* Amber 500: Partial payment, due backup */
```

### Contrast & Shadow Rules
- **No Decorative Box Shadows**: Strip `shadow-lg`, `shadow-2xl`, and colored dropshadows (`shadow-blue-500/50`).
- **Use Micro-Borders**: Rely on `border border-slate-800` to define spatial boundaries instead of heavy shadows.
- **Modals Only**: If elevation is needed for modals/dropdowns, use an achromatic blur: `box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5)`.

---

## 2. Spacing & Density Tokens

Business screens must maximize information density while preserving legibility:

| Element | AI Default Spacing | CraftUI B2B Density | CSS / Tailwind Equivalent |
| :--- | :--- | :--- | :--- |
| **Table Rows** | `py-4 px-6` (64px row height) | `py-2.5 px-3` (38-42px row height) | `table-compact` |
| **Form Inputs** | `h-12 text-lg px-4` | `h-9 text-sm px-3` | `input-compact` |
| **Buttons** | `py-3 px-6 text-base` | `h-9 px-3.5 text-xs font-medium` | `btn-compact` |
| **Card Padding** | `p-6 md:p-8` | `p-3.5 sm:p-4` | `card-compact` |
| **Section Gap** | `gap-8` (32px) | `gap-3.5` (14-16px) | `gap-3` to `gap-4` |

---

## 3. Typography & Monospace Rules

1. **Monospaced Numbers**:
   - Financial figures, invoice codes, phone numbers, chassis numbers, and dates must always use monospaced figures (`font-mono` or `font-variant-numeric: tabular-nums`).
   - This prevents jumping alignments in tables and calculations.

2. **RTL & Arabic Typefaces**:
   - For Arabic interfaces, prefer clean geometric or modern Naskh typefaces: `Cairo`, `IBM Plex Sans Arabic`, or system `Segoe UI, Tahoma`.
   - Avoid archaic decorative fonts or calligraphy styles that degrade readability at small font sizes (11px - 13px).

3. **Size Scale**:
   - Page Titles: `16px - 18px` (`font-semibold`)
   - Section Titles / Modal Headers: `14px - 15px` (`font-medium`)
   - Table Cell Data & Body: `12px - 13px` (`font-normal`)
   - Secondary Labels & Meta: `11px` (`text-slate-400 font-medium`)
