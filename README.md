# CraftUI Engine 🚀
> **The Universal De-AI & High-Density B2B UI/UX Refactoring Skill for AI Coding Agents**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Antigravity Compatible](https://img.shields.io/badge/Antigravity-Ready-purple.svg)]()
[![Claude Code Compatible](https://img.shields.io/badge/Claude%20Code-Compatible-orange.svg)]()
[![Cursor Compatible](https://img.shields.io/badge/Cursor-Compatible-blue.svg)]()

**CraftUI Engine** is a battle-tested protocol and skill package designed to diagnose, audit, and refactor the hallmark defects of AI-generated frontends ("AI Slop") into calm, high-density, friction-free B2B enterprise interfaces (ERP, POS, inventory, and accounting systems).

---

## 🎯 What Problems Does It Solve?

When AI models build UI/UX from scratch, they almost always generate:
1. **Glows, Neons & Clashing Colors**: Excessive shadows and video-game style accents that cause cognitive fatigue.
2. **Wordy Marketing Copy & Filler**: Chatty instructions, unnecessary greetings, and verbose placeholders.
3. **Low Information Density**: Giant cards wasting screen space instead of compact, high-speed data tables.
4. **Form Friction**: 15+ mandatory inputs on a single screen without progressive disclosure.
5. **Hardware & Physical Disconnect**: Neglecting 80mm POS thermal printers, corrupting Arabic Excel CSV exports (missing `\uFEFF` UTF-8 BOM), and recklessly uploading heavy binary pictures to cloud databases.

CraftUI Engine provides the automated rules, checklists, and heuristics to completely eradicate these issues.

---

## 📂 Repository Structure

```text
craftui-engine/
├── bin/
│   └── craftui.js           # CLI Scanner tool for automated AI Slop audits
├── snippets/                # Ready-to-use production B2B components & hooks
│   ├── ThermalReceipt80mm.tsx   # 80mm ESC/POS cash register receipt
│   ├── CompactDataTable.tsx     # High-density data grid with tabular-nums
│   ├── ProgressiveAccordionForm.tsx # 4-Vital-Fields progressive form
│   ├── useKeyboardPOS.ts        # Keyboard shortcuts & barcode hook
│   ├── arabicCsvExport.ts       # UTF-8 BOM (\uFEFF) Arabic Excel exporter
│   └── localBinaryStore.ts      # IndexedDB binary isolation store
├── references/
│   ├── anti-patterns.md     # Comprehensive catalog of AI UI/UX anti-patterns & fixes
│   ├── b2b-design-system.md # Quiet slate palette, spacing tokens & typography rules
│   └── operational-flows.md # POS ergonomics, dual print (80mm vs A4), BOM, & local DB
├── templates/
│   ├── audit-report.md      # Ready-to-use application diagnostic template
│   └── de-ai-checklist.md   # Step-by-step refactoring execution checklist
├── tests/
│   └── validate-skill.js    # Automated compliance test suite
├── .github/workflows/
│   └── ci.yml               # Automated GitHub Actions test pipeline
├── SKILL.md                 # Core skill instructions with YAML frontmatter
└── README.md                # Comprehensive installation & usage guide
```

---

## 🛠️ Installation & Setup Across AI Coding Tools

### 1. Google Antigravity CLI (`agy`) & IDE

#### Option A: Workspace Skill (Project Specific)
Place the skill inside your project's `.agents/skills/` directory:
```bash
mkdir -p .agents/skills/craftui-engine
cp -r /path/to/craftui-engine/* .agents/skills/craftui-engine/
```
Antigravity automatically discovers it via **progressive disclosure**.

#### Option B: Global Machine Skill (Available Everywhere)
Install it in your user configuration directory:
```bash
mkdir -p ~/.gemini/config/skills/craftui-engine
cp -r /path/to/craftui-engine/* ~/.gemini/config/skills/craftui-engine/
```

**How to trigger in Antigravity:**
Simply prompt the agent:
> *"Audit this project's UI/UX using CraftUI Engine and convert it to high-density B2B standards."*
> or: *"Apply craftui-engine to refactor the cashier and engine forms."*

---

### 2. Claude Code (`claude`)

#### Option A: Global Slash Command / Memory
Add the contents or reference to your project's `CLAUDE.md`:
```markdown
## UI/UX Refactoring Protocol
When redesigning or reviewing UI components, adhere strictly to the rules in `craftui-engine/SKILL.md`:
- Eliminate glowing shadows and marketing filler.
- Enforce the 4-Vital-Field rule for forms.
- Ensure 80mm thermal receipt and UTF-8 BOM CSV exports.
```

#### Option B: Dedicated Prompt Trigger
```bash
claude "Review src/components using the CraftUI Engine protocol in craftui-engine/SKILL.md and eliminate all AI visual fluff."
```

---

### 3. Cursor & Windsurf

#### Project Rules (`.cursorrules` or `.windsurfrules`)
Add this block to your `.cursorrules`:
```markdown
# CraftUI Engine Protocol
For any frontend or UI/UX task:
1. Always follow the guidelines in `craftui-engine/SKILL.md` and `craftui-engine/references/anti-patterns.md`.
2. Do not use decorative box-shadows, neon colors, or more than 2 accent colors.
3. Keep data tables high-density with tabular numbers (`tabular-nums`).
4. Ensure primary actions (e.g. checkout) have 1-click workflows.
```

---

### 4. Custom GPTs / Claude Projects / Standalone LLMs
You can copy the raw markdown from [SKILL.md](./SKILL.md) and paste it directly into the System Prompt or Custom Instructions of any LLM.

---

---

## ⚡ Automated CLI Code Scanner

Audit any existing frontend project for AI Slop defects with a single command:

```bash
# Scan current project
node path/to/craftui-engine/bin/craftui.js scan ./src

# Or via npm script if installed locally
npm run scan ./src
```

### What does the scanner detect?
- **P0**: Decorative glowing box-shadows (`shadow-[0_0_...px]`, neon color dropshadows).
- **P0**: CSV blob exports missing `\uFEFF` UTF-8 Byte Order Mark for Arabic Excel.
- **P1**: Excessive corner rounding (`rounded-3xl` / `rounded-2xl`) on business grids.
- **P1**: Chatty AI marketing greetings and filler titles.
- **P2**: Overly loose padding (`py-8`, `py-10`) harming information density.

---

## 📦 Ready-to-Use Production Snippets

CraftUI Engine provides production-ready React & TypeScript templates inside [`snippets/`](./snippets/):
- **[ThermalReceipt80mm.tsx](./snippets/ThermalReceipt80mm.tsx)**: ESC/POS 80mm continuous thermal receipt layout with `@media print`.
- **[CompactDataTable.tsx](./snippets/CompactDataTable.tsx)**: High-density data table with monospaced tabular numbers and hover scanning.
- **[ProgressiveAccordionForm.tsx](./snippets/ProgressiveAccordionForm.tsx)**: 4-Vital-Fields progressive disclosure modal form.
- **[useKeyboardPOS.ts](./snippets/useKeyboardPOS.ts)**: Keyboard shortcut listener for F2 quick cash and Escape modal dismissal.
- **[arabicCsvExport.ts](./snippets/arabicCsvExport.ts)**: Bulletproof Arabic UTF-8 BOM CSV exporter.
- **[localBinaryStore.ts](./snippets/localBinaryStore.ts)**: Client-side IndexedDB store preventing cloud document quota overruns.

---

## 🧪 Testing & Verification

CraftUI Engine comes with an automated specification and integrity test suite:

```bash
npm test
```
Verifies:
- Frontmatter specification and required fields.
- Reference, template, and code snippet integrity.
- Critical domain rules (BOM `\uFEFF`, 80mm print standards, IndexedDB binary isolation).
- GitHub Actions CI and CLI scanner availability.

---

## 📜 License

MIT License. Free for personal, commercial, and open-source use.
