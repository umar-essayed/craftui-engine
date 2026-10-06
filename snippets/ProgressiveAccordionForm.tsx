import React, { useState } from 'react';

/**
 * CraftUI Progressive Disclosure Form Component
 * 
 * Enforces the "4-Vital-Field Rule":
 * Only displays the essential 3-4 fields upfront.
 * Secondary metadata, attachments, and optional notes are collapsed
 * inside an ergonomic accordion to eliminate visual fatigue.
 */

export interface FormProps {
  onSubmit: (data: Record<string, any>) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export const ProgressiveAccordionForm: React.FC<FormProps> = ({
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const [isOpenSpecs, setIsOpenSpecs] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    costPrice: '',
    salePrice: '',
    // Secondary fields
    serialNumber: '',
    category: '',
    warrantyMonths: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} dir="rtl" className="bg-[#0f172a] text-slate-100 p-4 rounded-lg border border-slate-800 space-y-3.5">
      <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
        <h3 className="text-sm font-semibold text-slate-100">إضافة صنف جديد</h3>
        <span className="text-[11px] text-slate-400">الحقول الأساسية (*)</span>
      </div>

      {/* Vital 4 Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            كود الصنف / الباركود *
          </label>
          <input
            autoFocus
            type="text"
            name="code"
            required
            value={formData.code}
            onChange={handleChange}
            placeholder="مثال: PRD-9021"
            className="w-full h-8 px-2.5 text-xs bg-[#1e293b] border border-slate-700 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            اسم الصنف / البيان *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="مثال: فلتر زيت أصلي"
            className="w-full h-8 px-2.5 text-xs bg-[#1e293b] border border-slate-700 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            سعر التكلفة *
          </label>
          <input
            type="number"
            name="costPrice"
            required
            step="0.01"
            value={formData.costPrice}
            onChange={handleChange}
            placeholder="0.00"
            className="w-full h-8 px-2.5 text-xs bg-[#1e293b] border border-slate-700 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono tabular-nums"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            سعر البيع للجمهور *
          </label>
          <input
            type="number"
            name="salePrice"
            required
            step="0.01"
            value={formData.salePrice}
            onChange={handleChange}
            placeholder="0.00"
            className="w-full h-8 px-2.5 text-xs bg-[#1e293b] border border-slate-700 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono tabular-nums"
          />
        </div>
      </div>

      {/* Secondary Progressive Disclosure Accordion */}
      <div className="border border-slate-800 rounded bg-[#162032] overflow-hidden">
        <button
          type="button"
          onClick={() => setIsOpenSpecs(!isOpenSpecs)}
          className="w-full flex justify-between items-center px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800/40 transition-colors"
        >
          <span>المواصفات والبيانات الإضافية (اختياري)</span>
          <span className="text-slate-500">{isOpenSpecs ? '▲ طي' : '▼ توسيع'}</span>
        </button>

        {isOpenSpecs && (
          <div className="p-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#0f172a]/60">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">الرقم التسلسلي (Serial No)</label>
              <input
                type="text"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                placeholder="SN-XXXX"
                className="w-full h-8 px-2.5 text-xs bg-[#1e293b] border border-slate-700 rounded text-slate-100 font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">التصنيف / القسم</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="مثال: قطع غيار المحرك"
                className="w-full h-8 px-2.5 text-xs bg-[#1e293b] border border-slate-700 rounded text-slate-100"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">فترة الضمان (بالشهور)</label>
              <input
                type="number"
                name="warrantyMonths"
                value={formData.warrantyMonths}
                onChange={handleChange}
                placeholder="6"
                className="w-full h-8 px-2.5 text-xs bg-[#1e293b] border border-slate-700 rounded text-slate-100 font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">ملاحظات داخلية</label>
              <input
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="ملاحظات تظهر للمشرف فقط"
                className="w-full h-8 px-2.5 text-xs bg-[#1e293b] border border-slate-700 rounded text-slate-100"
              />
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex justify-end items-center gap-2 pt-2 border-t border-slate-800">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="h-8 px-3 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            إلغاء (Esc)
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-8 px-4 text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'جاري الحفظ...' : 'حفظ الصنف (Enter)'}
        </button>
      </div>
    </form>
  );
};
