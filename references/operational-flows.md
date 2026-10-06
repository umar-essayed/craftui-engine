# Operational Flows, Hardware & Physical Integration

Enterprise business applications do not live in an abstract web bubble. They interact with cash drawers, receipt printers, barcode scanners, offline periods, and local accounting spreadsheets.

---

## 1. Cashier & Point of Sale (POS) Ergonomics

### The 1-Click Cash Rule
In automotive and retail shops, 70%+ of transactions are immediate cash settlements. Never force an operator through:
1. "Select payment method dropdown"
2. "Enter received amount"
3. "Click calculate change"
4. "Click submit invoice"

**CraftUI Standard**:
- Include a high-visibility, primary action button: `كاش فوري (سداد كامل وطباعة)`.
- When clicked, it automatically:
  1. Sets `paidAmount = totalAmount`.
  2. Sets `paymentType = 'cash'`.
  3. Records invoice in local database.
  4. Deducts inventory & creates a treasury revenue entry.
  5. Opens print receipt preview.

### Keyboard & Scanner Workflow
- **Search Autofocus**: On view mount, immediately focus the search/barcode input:
  ```tsx
  useEffect(() => { searchInputRef.current?.focus(); }, []);
  ```
- **Barcode Scanner Emulation**: Barcode scanners send keystrokes followed by `Enter` (KeyCode 13). Listen for `Enter` on the search input to instantly add the matching single item to the cart or open its detail modal.

---

## 2. Dual Printing Architectures: 80mm Thermal vs A4

Never mix standard screen styles with print styles.

### 80mm Continuous Thermal Receipt (POS Cashier)
```css
@media print {
  @page {
    size: 80mm auto;
    margin: 0;
  }
  body {
    width: 80mm;
    margin: 0;
    padding: 4mm;
    background: #fff !important;
    color: #000 !important;
    font-size: 11px;
    font-family: monospace, sans-serif;
  }
  .no-print {
    display: none !important;
  }
}
```
**Receipt Content Hierarchy**:
1. Store Name + Phone (Centered, bold).
2. Receipt # and Date / Cashier name.
3. Dashed line separator: `--------------------------------`.
4. High-density item list: `[Qty] [Item Name] [Total]`.
5. Totals block: Net, Tax (if any), Paid, Due.
6. Return policy / Warranty note (Max 2 concise lines).
7. Barcode or QR code at bottom.

### A4 Formal Invoice / Tax Document
- For wholesale and customs transactions, provide a dedicated "طباعة فاتورة رسمية A4" switch.
- Uses grid table layout with official header, signature stamps, customer tax ID, and terms.

---

## 3. Data Architecture: Local Binary Isolation

### The Problem
AI-generated apps frequently store base64-encoded file uploads directly in document databases (e.g. Firebase Firestore), which blows through:
1. The 1MB document size limit (causing immediate crashes).
2. Database bandwidth and billing quotas.

### The CraftUI Solution: Hybrid Storage
1. **Local-First Binaries**: Heavy binary data (e.g., photo of vehicle clearance doc, engine stamped plate) is saved **strictly in IndexedDB** (via Dexie or raw IDB).
2. **Metadata Sync Only**: Only JSON metadata (ID, code, specs, timestamps, flags) is synchronized to cloud servers.
3. **Weekly Complete Backup Utility**:
   - Check `lastBackupDate` against `Date.now()`.
   - If `(now - lastBackup) > 7 days`, display a calm top banner notification: `نسخة أسبوعية مطلوبة`.
   - Clicking triggers a complete offline JSON dump including all IndexedDB tables and local base64 images.

---

## 4. Arabic & RTL Excel / CSV Export Protocol

Microsoft Excel does not parse UTF-8 CSV files correctly by default on Windows unless an explicit **Byte Order Mark (BOM)** is present. Without it, Arabic letters appear as corrupted gibberish.

### Implementation Standard:
```typescript
export function exportToCsv<T>(filename: string, headers: string[], rows: (string | number)[][]) {
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(val => `"${String(val ?? '').replace(/"/g, '""')}"`).join(','))
  ].join('\r\n');

  // \uFEFF is the UTF-8 Byte Order Mark
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
```
