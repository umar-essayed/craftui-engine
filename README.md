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
├── SKILL.md                 # Core skill instructions with YAML frontmatter
├── references/
│   ├── anti-patterns.md     # Comprehensive catalog of AI UI/UX anti-patterns & fixes
│   ├── b2b-design-system.md # Quiet slate palette, spacing tokens & typography rules
│   └── operational-flows.md # POS ergonomics, dual print (80mm vs A4), BOM, & local DB
├── templates/
│   ├── audit-report.md      # Ready-to-use application diagnostic template
│   └── de-ai-checklist.md   # Step-by-step refactoring execution checklist
├── tests/
│   └── validate-skill.js    # Automated compliance test suite
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

## 🧪 Testing & Verification

CraftUI Engine comes with an automated specification and integrity test suite:

```bash
npm test
```
Verifies:
- Frontmatter specification and required fields.
- Reference and template integrity.
- Critical domain rules (BOM `\uFEFF`, 80mm print standards, IndexedDB binary isolation).

---

## 📜 License

MIT License. Free for personal, commercial, and open-source use.
