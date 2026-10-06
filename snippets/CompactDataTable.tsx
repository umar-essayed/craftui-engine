import React from 'react';

/**
 * CraftUI High-Density B2B Data Table Component
 * 
 * Features:
 * - Ultra-compact row heights (36-40px)
 * - Monospaced numeric alignment (`tabular-nums font-mono`)
 * - Sticky headers with subtle contrast separator
 * - Row hover selection states for quick scanning
 */

export interface Column<T> {
  key: string;
  header: string;
  align?: 'left' | 'center' | 'right';
  isNumeric?: boolean;
  width?: string;
  render?: (row: T) => React.ReactNode;
}

export interface CompactDataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: keyof T;
  selectedId?: string | number | null;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

export function CompactDataTable<T extends Record<string, any>>({
  columns,
  data,
  keyField,
  selectedId,
  onRowClick,
  emptyMessage = 'لا توجد بيانات مسجلة حالياً',
}: CompactDataTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto border border-slate-800 rounded-md bg-[#0f172a]">
      <table className="w-full text-right text-xs border-collapse">
        {/* Sticky Table Header */}
        <thead>
          <tr className="bg-[#1e293b] text-slate-300 font-medium border-b border-slate-800 sticky top-0 z-10">
            {columns.map((col) => {
              const alignClass =
                col.align === 'center'
                  ? 'text-center'
                  : col.align === 'left'
                  ? 'text-left'
                  : 'text-right';
              return (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  className={`py-2 px-3 tracking-wide select-none ${alignClass}`}
                >
                  {col.header}
                </th>
              );
            })}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-slate-800/60">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-4 text-center text-slate-500 font-sans"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => {
              const rowId = row[keyField];
              const isSelected = selectedId === rowId;
              return (
                <tr
                  key={String(rowId)}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`transition-colors duration-75 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-950/40 border-l-2 border-l-blue-500'
                      : 'hover:bg-slate-800/40'
                  }`}
                >
                  {columns.map((col) => {
                    const alignClass =
                      col.align === 'center'
                        ? 'text-center'
                        : col.align === 'left'
                        ? 'text-left'
                        : 'text-right';
                    const fontClass = col.isNumeric
                      ? 'font-mono tabular-nums text-slate-100'
                      : 'text-slate-300';

                    return (
                      <td
                        key={col.key}
                        className={`py-2 px-3 whitespace-nowrap ${alignClass} ${fontClass}`}
                      >
                        {col.render ? col.render(row) : String(row[col.key] ?? '')}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
