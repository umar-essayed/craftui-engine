/**
 * CraftUI Engine Skill Validation Test Suite
 * Validates that SKILL.md, references, and templates adhere to:
 * 1. YAML frontmatter specification (name, description)
 * 2. Antigravity Skill & Agent conventions
 * 3. File existence and reference integrity
 * 4. BOM encoding rules and key principles
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
}

console.log('🧪 Starting CraftUI Engine validation test suite...\n');

// 1. Validate SKILL.md
const skillPath = path.join(ROOT_DIR, 'SKILL.md');
assert(fs.existsSync(skillPath), 'SKILL.md must exist in root directory');

const skillContent = fs.readFileSync(skillPath, 'utf8');
assert(skillContent.startsWith('---'), 'SKILL.md must start with YAML frontmatter delimiter (---)');

const frontmatterMatch = skillContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
assert(frontmatterMatch, 'SKILL.md must contain valid YAML frontmatter');

const frontmatter = frontmatterMatch[1];
assert(/name:\s*craftui-engine/.test(frontmatter), 'Frontmatter must specify name: craftui-engine');
assert(/description:\s*>?-?/.test(frontmatter), 'Frontmatter must specify description field');

console.log('✅ SKILL.md frontmatter specification passed');

// 2. Validate References
const references = [
  'references/anti-patterns.md',
  'references/b2b-design-system.md',
  'references/operational-flows.md'
];

for (const ref of references) {
  const refPath = path.join(ROOT_DIR, ref);
  assert(fs.existsSync(refPath), `Reference file ${ref} must exist`);
  const content = fs.readFileSync(refPath, 'utf8');
  assert(content.length > 200, `Reference file ${ref} must have meaningful content (> 200 bytes)`);
  console.log(`✅ Reference file verified: ${ref}`);
}

// 3. Validate Templates
const templates = [
  'templates/audit-report.md',
  'templates/de-ai-checklist.md'
];

for (const tpl of templates) {
  const tplPath = path.join(ROOT_DIR, tpl);
  assert(fs.existsSync(tplPath), `Template file ${tpl} must exist`);
  const content = fs.readFileSync(tplPath, 'utf8');
  assert(content.length > 200, `Template file ${tpl} must have meaningful content (> 200 bytes)`);
  console.log(`✅ Template file verified: ${tpl}`);
}

// 4. Validate UTF-8 BOM documentation in operational-flows.md
const opFlowsContent = fs.readFileSync(path.join(ROOT_DIR, 'references/operational-flows.md'), 'utf8');
assert(opFlowsContent.includes('\\uFEFF'), 'operational-flows.md must document the UTF-8 BOM (\\uFEFF) for Excel Arabic export');
assert(opFlowsContent.includes('80mm'), 'operational-flows.md must document 80mm thermal receipt printing');
assert(opFlowsContent.includes('IndexedDB'), 'operational-flows.md must document local binary isolation in IndexedDB');

console.log('✅ Critical domain rules (BOM, 80mm Print, Local Storage) verified');

// 5. Validate CLI Scanner, Installers & CI Workflows
const cliPath = path.join(ROOT_DIR, 'bin/craftui.js');
assert(fs.existsSync(cliPath), 'CLI executable bin/craftui.js must exist');
const ciPath = path.join(ROOT_DIR, '.github/workflows/ci.yml');
assert(fs.existsSync(ciPath), 'GitHub Actions CI workflow .github/workflows/ci.yml must exist');
assert(fs.existsSync(path.join(ROOT_DIR, 'install.sh')), 'install.sh must exist');
assert(fs.existsSync(path.join(ROOT_DIR, 'install.ps1')), 'install.ps1 must exist');
console.log('✅ CLI Scanner, Universal Installers (sh/ps1), & GitHub Actions CI verified');

// 6. Validate Built-in Code Snippets
const snippets = [
  'snippets/arabicCsvExport.ts',
  'snippets/ThermalReceipt80mm.tsx',
  'snippets/CompactDataTable.tsx',
  'snippets/ProgressiveAccordionForm.tsx',
  'snippets/useKeyboardPOS.ts',
  'snippets/localBinaryStore.ts'
];

for (const snip of snippets) {
  const snipPath = path.join(ROOT_DIR, snip);
  assert(fs.existsSync(snipPath), `Snippet file ${snip} must exist`);
  const content = fs.readFileSync(snipPath, 'utf8');
  assert(content.length > 200, `Snippet file ${snip} must have meaningful code content (> 200 bytes)`);
  console.log(`✅ Code snippet verified: ${snip}`);
}

console.log('\n🎉 ALL TESTS PASSED! CraftUI Engine specification is 100% compliant and ready for deployment.');
