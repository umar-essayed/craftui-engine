#!/usr/bin/env node

/**
 * CraftUI Engine CLI Scanner
 * 
 * Automatically audits source code directories for AI Slop anti-patterns,
 * excessive decorations, marketing copy bloat, and missing B2B physical requirements.
 * 
 * Usage:
 *   npx craftui scan <directory>
 *   node bin/craftui.js scan src/
 */

const fs = require('fs');
const path = require('path');

const ANSI = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

const RULES = [
  {
    id: 'AI-VIS-01',
    priority: 'P0',
    title: 'Neon Glow / Decorative Box-Shadow',
    description: 'Found decorative or glowing box-shadows causing visual fatigue.',
    regex: /(?:shadow-\[\s*0\s*0\s*\d+px|shadow-(?:cyan|purple|pink|violet|emerald|amber)-\d+|shadow-2xl)/g,
    remedy: 'Remove ambient glows. Use subtle micro-borders (border-slate-800) instead.',
  },
  {
    id: 'AI-VIS-02',
    priority: 'P1',
    title: 'Excessive Corner Radii on Business Grid/Form',
    description: 'Found rounded-3xl or rounded-2xl in UI components.',
    regex: /\brounded-(?:3xl|2xl)\b/g,
    remedy: 'Standardize on rounded-md (6px) or rounded-lg (8px) for enterprise density.',
  },
  {
    id: 'AI-COPY-01',
    priority: 'P1',
    title: 'Chatty AI Greeting / Marketing Filler',
    description: 'Found verbose AI welcome message or marketing fluff.',
    regex: /(?:مرحباً بك في (?:لوحة تحكم )?المنظومة|النظام الذكي المتطور|Welcome to the (?:all-in-one|smart|revolutionary))/gi,
    remedy: 'Replace with short, declarative titles (e.g. "إدارة المخزون" / "Point of Sale").',
  },
  {
    id: 'AI-DATA-01',
    priority: 'P0',
    title: 'CSV Export Missing Arabic UTF-8 BOM',
    description: 'Found CSV Blob construction without \\uFEFF prefix, corrupting Arabic text in Excel.',
    regex: /new Blob\(\s*\[(?!\s*['"`]\\uFEFF)[^\]]*\]\s*,\s*\{\s*type:\s*['"`]text\/csv/g,
    remedy: 'Prepend \\uFEFF (UTF-8 BOM) to the CSV content array: [\'\\uFEFF\' + csvContent].',
  },
  {
    id: 'AI-DENS-01',
    priority: 'P2',
    title: 'Low Information Density Spacing',
    description: 'Found oversized vertical padding (py-6, py-8, py-10) in table or card elements.',
    regex: /\bpy-(?:6|8|10|12)\b/g,
    remedy: 'Use compact B2B padding (py-2 or py-2.5) with monospaced tabular numbers.',
  },
];

const SCAN_EXTENSIONS = new Set(['.tsx', '.jsx', '.js', '.ts', '.vue', '.svelte', '.html', '.css']);
const IGNORED_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next', '.cache', 'coverage']);

function collectFiles(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    for (const item of list) {
      if (IGNORED_DIRS.has(item)) continue;
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        results = results.concat(collectFiles(fullPath));
      } else if (SCAN_EXTENSIONS.has(path.extname(fullPath))) {
        results.push(fullPath);
      }
    }
  } catch (err) {
    // ignore read errors on inaccessible files
  }
  return results;
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  const findings = [];

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    for (const rule of RULES) {
      rule.regex.lastIndex = 0;
      if (rule.regex.test(line)) {
        findings.push({
          rule,
          lineNum: lineIdx + 1,
          lineText: line.trim().slice(0, 100),
          file: filePath,
        });
      }
    }
  }

  return findings;
}

function runScanner(targetPath = '.') {
  console.log(`\n${ANSI.bold}${ANSI.cyan}⚡ CraftUI Engine - AI Slop Code Scanner${ANSI.reset}\n`);
  const resolved = path.resolve(process.cwd(), targetPath);

  if (!fs.existsSync(resolved)) {
    console.error(`${ANSI.red}❌ Error: Path "${targetPath}" does not exist.${ANSI.reset}`);
    process.exit(1);
  }

  console.log(`${ANSI.gray}Scanning directory:${ANSI.reset} ${resolved}`);
  const files = collectFiles(resolved);
  console.log(`${ANSI.gray}Scanned files:${ANSI.reset} ${files.length}\n`);

  let allFindings = [];
  for (const f of files) {
    const fileFindings = scanFile(f);
    allFindings = allFindings.concat(fileFindings);
  }

  if (allFindings.length === 0) {
    console.log(`${ANSI.green}🎉 Congratulations! 0 AI Slop defects found.${ANSI.reset}`);
    console.log(`${ANSI.green}Your codebase adheres to clean, high-density B2B standards.${ANSI.reset}\n`);
    return 0;
  }

  console.log(`${ANSI.yellow}${ANSI.bold}⚠️  Found ${allFindings.length} AI Slop defect(s) needing refactoring:${ANSI.reset}\n`);

  const priorityColor = {
    P0: ANSI.red,
    P1: ANSI.yellow,
    P2: ANSI.blue,
  };

  allFindings.forEach((finding, idx) => {
    const pCol = priorityColor[finding.rule.priority] || ANSI.gray;
    const relFile = path.relative(process.cwd(), finding.file);
    console.log(
      `${ANSI.bold}#${idx + 1} [${pCol}${finding.rule.priority}${ANSI.reset}${ANSI.bold}] ${finding.rule.title}${ANSI.reset} (${finding.rule.id})`
    );
    console.log(`   ${ANSI.gray}Location:${ANSI.reset} ${relFile}:${finding.lineNum}`);
    console.log(`   ${ANSI.gray}Line:${ANSI.reset}     ${finding.lineText}`);
    console.log(`   ${ANSI.cyan}Remedy:${ANSI.reset}   ${finding.rule.remedy}\n`);
  });

  console.log(`${ANSI.bold}Recommended Next Step:${ANSI.reset}`);
  console.log(`Run CraftUI Engine refactoring checklist: ${ANSI.magenta}templates/de-ai-checklist.md${ANSI.reset}\n`);
  return allFindings.length;
}

function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function runInstaller(options = {}) {
  const isGlobal = options.global === true;
  const os = require('os');
  const homeDir = os.homedir();
  const rootDir = path.resolve(__dirname, '..');

  console.log(`\n${ANSI.bold}${ANSI.cyan}🚀 CraftUI Engine - Universal Installer${ANSI.reset}\n`);

  let targetDir = '';
  if (isGlobal) {
    targetDir = path.join(homeDir, '.gemini', 'config', 'skills', 'craftui-engine');
  } else {
    targetDir = path.resolve(process.cwd(), '.agents', 'skills', 'craftui-engine');
  }

  fs.mkdirSync(targetDir, { recursive: true });

  const itemsToCopy = ['SKILL.md', 'references', 'templates', 'snippets'];
  for (const item of itemsToCopy) {
    const src = path.join(rootDir, item);
    const dest = path.join(targetDir, item);
    if (fs.existsSync(src)) {
      if (fs.statSync(src).isDirectory()) {
        copyDirRecursive(src, dest);
      } else {
        fs.copyFileSync(src, dest);
      }
    }
  }

  // If local, configure Cursor rule as well
  if (!isGlobal) {
    const cursorRulesDir = path.resolve(process.cwd(), '.cursor', 'rules');
    fs.mkdirSync(cursorRulesDir, { recursive: true });
    const ruleContent = `---
description: CraftUI Engine B2B High-Density & De-AI refactoring protocol
globs: *.{tsx,jsx,vue,svelte,html,css,ts,js}
alwaysApply: false
---
When reviewing or writing frontend UI/UX, follow craftui-engine protocol:
1. No glowing box-shadows or neon decorations.
2. High density: compact table rows (38px) and tabular-nums.
3. Form rule: 4 vital fields upfront, accordion for extras.
4. Support 80mm thermal receipts and UTF-8 BOM (\\uFEFF) on Arabic CSV.
`;
    fs.writeFileSync(path.join(cursorRulesDir, 'craftui-engine.mdc'), ruleContent, 'utf8');
  }

  console.log(`${ANSI.green}✅ Successfully installed CraftUI Engine in:${ANSI.reset} ${targetDir}`);
  if (isGlobal) {
    console.log(`${ANSI.cyan}⚡ Available machine-wide across ALL projects for Google Antigravity & AI agents!${ANSI.reset}\n`);
  } else {
    console.log(`${ANSI.cyan}⚡ Also configured .cursor/rules/craftui-engine.mdc for Cursor / Windsurf!${ANSI.reset}\n`);
  }
}

const args = process.argv.slice(2);
const command = args[0] || 'scan';

if (command === 'scan') {
  const target = args[1] || '.';
  const issues = runScanner(target);
  process.exit(issues > 0 ? 1 : 0);
} else if (command === 'install') {
  const isGlobal = args.includes('--global') || args.includes('-g');
  runInstaller({ global: isGlobal });
  process.exit(0);
} else {
  console.log(`${ANSI.bold}CraftUI Engine CLI${ANSI.reset}`);
  console.log(`Commands:`);
  console.log(`  craftui scan [dir]              Scan directory for AI Slop anti-patterns`);
  console.log(`  craftui install [--local]       Install skill into current project (.agents/skills/)`);
  console.log(`  craftui install --global        Install skill globally (~/.gemini/config/skills/)`);
  process.exit(0);
}
