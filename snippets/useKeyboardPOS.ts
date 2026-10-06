import { useEffect, useCallback } from 'react';

/**
 * CraftUI Keyboard & Scanner Hook for POS / ERP
 * 
 * Binds:
 * - Enter: Trigger submit or barcode search
 * - Escape: Close modal / cancel action
 * - F2 / Key shortcuts: Quick 1-click cash checkout
 */

export interface KeyboardPOSOptions {
  onEnter?: () => void;
  onEscape?: () => void;
  onQuickCash?: () => void;
  enabled?: boolean;
}

export function useKeyboardPOS({
  onEnter,
  onEscape,
  onQuickCash,
  enabled = true,
}: KeyboardPOSOptions) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;

      // Escape: Close active modal or clear selection
      if (e.key === 'Escape') {
        if (onEscape) {
          e.preventDefault();
          onEscape();
        }
      }

      // F2 or Alt+C: 1-Click Instant Cash Payment
      if (e.key === 'F2' || (e.altKey && e.key.toLowerCase() === 'c')) {
        if (onQuickCash) {
          e.preventDefault();
          onQuickCash();
        }
      }

      // Enter: if triggered on non-form elements
      if (e.key === 'Enter' && e.ctrlKey) {
        if (onEnter) {
          e.preventDefault();
          onEnter();
        }
      }
    },
    [enabled, onEnter, onEscape, onQuickCash]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
