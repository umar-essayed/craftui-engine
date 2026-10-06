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

---

## ⚡ 1-Line Universal Installers (تثبيت بأمر واحد)

Run **one single command** in your terminal. You can choose either:
- **Local (`--local`)**: Installs directly into your current project workspace (`.agents/skills/craftui-engine`).
- **Global (`--global`)**: Installs machine-wide (`~/.gemini/config/skills/craftui-engine`), making it instantly available in **every project** on your system.

### 🐧 Linux & 🍎 macOS (Terminal / Bash / Zsh)

#### Option 1: Local (Current Project Workspace)
```bash
curl -fsSL https://raw.githubusercontent.com/umar-essayed/craftui-engine/main/install.sh | bash
```

#### Option 2: Global (Machine-Wide / All Projects)
```bash
curl -fsSL https://raw.githubusercontent.com/umar-essayed/craftui-engine/main/install.sh | bash -s -- --global
```

---

### 🪟 Windows (PowerShell)

#### Option 1: Local (Current Project Workspace)
```powershell
irm https://raw.githubusercontent.com/umar-essayed/craftui-engine/main/install.ps1 | iex
```

#### Option 2: Global (Machine-Wide / All Projects)
```powershell
& ([scriptblock]::Create((irm https://raw.githubusercontent.com/umar-essayed/craftui-engine/main/install.ps1))) -Global
```

---

### 🌐 Cross-Platform via NPX (Any OS with Node.js)

#### Option 1: Local
```bash
npx github:umar-essayed/craftui-engine install --local
```

#### Option 2: Global
```bash
npx github:umar-essayed/craftui-engine install --global
```

---

## 🎮 How to Trigger & Use CraftUI Engine Inside Each AI Tool

### 1. Google Antigravity (CLI & Antigravity IDE)

#### How It Works Under the Hood:
Antigravity discovers skills via **Progressive Disclosure**:
- If installed **Locally**, it loads from `.agents/skills/craftui-engine/SKILL.md`.
- If installed **Globally**, it loads from `~/.gemini/config/skills/craftui-engine/SKILL.md` (`%USERPROFILE%\.gemini\...` on Windows).
- You don't need to configure anything else; the agent automatically indexes the skill's name and description.

#### Exact Prompts to Use in Chat / Terminal:

* **شامل: فحص وتدقيق المشروع بالكامل (Full Audit):**
  > *"حلل واجهات هذا المشروع باستخدام سكيل craftui-engine واكتب لي تقرير audit كامل يوضح عيوب الـ AI Slop وخطة المعالجة."*

* **تطهير واجهة كاشير ونقاط بيع (POS Refactoring):**
  > *"استخدم craftui-engine لإعادة بناء شاشة الدفع في `src/pages/Checkout.tsx`: طبق قاعدة الـ 1-Click Cash، اختصارات الكيبورد (Enter/Esc/F2)، وهيئ الميديا للطباعة الحرارية 80mm."*

* **تبسيط الفورمات الطويلة (Form De-bloat):**
  > *"طبق قاعدة الـ 4 حقول الأساسية من سكيل craftui-engine على فورم إضافة الصنف `src/components/ProductForm.tsx`، وضع باقي الحقول في أكورديون قابل للطي."*

* **حل مشاكل الإكسل والعربي (Arabic Excel Export):**
  > *"استخدم كود `snippets/arabicCsvExport.ts` من السكيل عشان تعالج مشكلة تشفير الحروف العربية في ملفات الإكسل بإضافة \uFEFF BOM."*

---

### 2. Cursor & Windsurf

When installed locally, the installer automatically creates `.cursor/rules/craftui-engine.mdc` (or you can use `.cursorrules`).

#### In Cursor Composer (`Ctrl+I` / `Cmd+I`) or Chat (`Ctrl+L` / `Cmd+L`):
Simply tag or mention the skill in your prompt:
> *"@craftui-engine Refactor `src/components/DataTable.tsx` to high-density B2B standards. Remove all shadows, make row heights 38px, and use tabular-nums for numeric figures."*

> *"@craftui-engine Clean up this form using the 4-Vital-Field rule."*

---

### 3. Claude Code (`claude` CLI)

Add a reference to your project's `CLAUDE.md`:
```markdown
## UI/UX Engineering Protocol
Strictly adhere to `craftui-engine` rules (in `.agents/skills/craftui-engine/SKILL.md`):
- Strip glows, neons, and marketing filler text.
- Enforce compact tabular density and 80mm thermal receipt styles.
- Always include UTF-8 BOM (\uFEFF) in CSV exports.
```

#### In the CLI:
```bash
claude "Review src/views using craftui-engine guidelines and eradicate visual fluff"
```

---

### 4. Custom GPTs & Web LLMs (ChatGPT / Claude Projects)
You can directly paste the raw markdown from [SKILL.md](./SKILL.md) into the **System Prompt** or **Project Knowledge** of Claude or ChatGPT.

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
