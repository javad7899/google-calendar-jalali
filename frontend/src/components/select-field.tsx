import React from "react";

interface SelectFieldProps<T extends string | number> {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  customClasses?: string;
}

export const SelectField = <T extends string | number>({
  label,
  options,
  value,
  onChange,
  placeholder = "گزینه‌ای را انتخاب کنید",
  customClasses = "",
}: SelectFieldProps<T>) => {
  return (
    <div className={`mb-4 ${customClasses}`}>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <select
        className="w-full border rounded p-2 focus:outline-none focus:border-2 focus:border-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
