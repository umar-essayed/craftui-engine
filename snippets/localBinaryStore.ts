/**
 * CraftUI Local Binary Isolation Store (IndexedDB)
 * 
 * Safely keeps heavy photos, inspection documents, and attachments
 * inside browser IndexedDB, preventing cloud database quota overflow (e.g. Firebase 1MB limit).
 */

const DB_NAME = 'craftui_local_binaries';
const DB_VERSION = 1;
const STORE_NAME = 'files';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveLocalBinary(
  id: string,
  base64OrBlob: string | Blob,
  meta?: { filename?: string; mimeType?: string }
): Promise<string> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const record = {
      id,
      data: base64OrBlob,
      filename: meta?.filename || id,
      mimeType: meta?.mimeType || 'image/jpeg',
      updatedAt: Date.now(),
    };

    const req = store.put(record);
    req.onsuccess = () => resolve(id);
    req.onerror = () => reject(req.error);
  });
}

export async function getLocalBinary(id: string): Promise<{ id: string; data: string | Blob; filename: string } | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(id);

    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

export async function deleteLocalBinary(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(id);

    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

/**
 * Weekly Backup Check
 * Returns true if backup is needed (e.g. > 7 days since last export)
 */
export function checkBackupDue(lastBackupTimestamp: number, intervalDays = 7): boolean {
  if (!lastBackupTimestamp) return true;
  const daysDiff = (Date.now() - lastBackupTimestamp) / (1000 * 60 * 60 * 24);
  return daysDiff >= intervalDays;
}
