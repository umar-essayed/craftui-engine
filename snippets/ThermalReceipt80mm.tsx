import React from 'react';

/**
 * CraftUI 80mm Continuous Thermal Receipt Component
 * 
 * Engineered for standard 80mm ESC/POS thermal cash register printers.
 * Strips colors, background styling, and box-shadows when printed.
 */

export interface ReceiptItem {
  id: string | number;
  name: string;
  qty: number;
  unitPrice: number;
  totalPrice: number;
}

export interface ThermalReceiptProps {
  storeName: string;
  storePhone?: string;
  receiptNumber: string;
  cashierName?: string;
  date?: string;
  items: ReceiptItem[];
  subtotal: number;
  tax?: number;
  discount?: number;
  grandTotal: number;
  paidAmount: number;
  changeDue: number;
  notes?: string;
}

export const ThermalReceipt80mm: React.FC<ThermalReceiptProps> = ({
  storeName,
  storePhone,
  receiptNumber,
  cashierName,
  date = new Date().toLocaleString('ar-EG'),
  items,
  subtotal,
  tax = 0,
  discount = 0,
  grandTotal,
  paidAmount,
  changeDue,
  notes = 'البضاعة المباعة ترد وتستبدل خلال 14 يوماً بالفاتورة',
}) => {
  return (
    <>
      {/* 80mm Thermal Receipt Print CSS */}
      <style>{`
        @media print {
          @page {
            size: 80mm auto;
            margin: 0;
          }
          body {
            width: 80mm;
            margin: 0;
            padding: 4mm 3mm;
            background: #ffffff !important;
            color: #000000 !important;
            font-family: 'Courier New', Courier, monospace, sans-serif;
            font-size: 11px;
            line-height: 1.25;
            -webkit-print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
          .thermal-receipt-container {
            width: 74mm !important;
            margin: 0 auto !important;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}</style>

      <div
        dir="rtl"
        className="thermal-receipt-container max-w-[320px] mx-auto bg-white text-black p-3 font-mono text-xs border border-dashed border-gray-300"
      >
        {/* Header */}
        <div className="text-center border-b border-black pb-2 mb-2">
          <h1 className="font-bold text-base tracking-tight">{storeName}</h1>
          {storePhone && <p className="text-[11px]">هاتف: {storePhone}</p>}
          <div className="flex justify-between text-[10px] mt-1 text-gray-700">
            <span>فاتورة: #{receiptNumber}</span>
            <span>{date}</span>
          </div>
          {cashierName && (
            <p className="text-[10px] text-right mt-0.5">الكاشير: {cashierName}</p>
          )}
        </div>

        {/* Separator */}
        <div className="text-center text-[10px] my-1">
          -----------------------------------------
        </div>

        {/* Items Table */}
        <table className="w-full text-right text-[11px] mb-2">
          <thead>
            <tr className="border-b border-black font-semibold">
              <th className="py-1">الصنف</th>
              <th className="py-1 text-center">الكمية</th>
              <th className="py-1 text-left">الإجمالي</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-dotted border-gray-400">
                <td className="py-1 pr-0.5 font-medium">{item.name}</td>
                <td className="py-1 text-center tabular-nums">{item.qty}</td>
                <td className="py-1 text-left tabular-nums">
                  {item.totalPrice.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="border-t border-black pt-1 space-y-0.5 text-[11px]">
          <div className="flex justify-between">
            <span>المجموع:</span>
            <span className="tabular-nums">{subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between">
              <span>الخصم:</span>
              <span className="tabular-nums">-{discount.toFixed(2)}</span>
            </div>
          )}
          {tax > 0 && (
            <div className="flex justify-between">
              <span>ضريبة القيمة المضافة:</span>
              <span className="tabular-nums">{tax.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-sm border-t border-b border-black py-0.5 my-1">
            <span>الصافي المطلوب:</span>
            <span className="tabular-nums">{grandTotal.toFixed(2)} ج.م</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span>المدفوع:</span>
            <span className="tabular-nums">{paidAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span>المتبقي:</span>
            <span className="tabular-nums">{changeDue.toFixed(2)}</span>
          </div>
        </div>

        {/* Footer */}
        {notes && (
          <div className="mt-3 text-center text-[9px] border-t border-dotted border-black pt-1 text-gray-800">
            <p>{notes}</p>
            <p className="mt-0.5 font-sans font-bold">شكراً لزيارتكم</p>
          </div>
        )}
      </div>
    </>
  );
};
