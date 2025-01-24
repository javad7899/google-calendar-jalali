import React from "react";

interface InputProps {
  value: string | number;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  label: string;
  type: "text-input" | "number-input" | "textarea";
  children?: React.ReactNode;
  onBlur?: () => void;
  placeholder?: string;
  maxLength?: number;
  min?: number;
  disabled?: boolean;
}

export const TextField: React.FC<InputProps> = ({
  value,
  onChange,
  onBlur,
  label,
  type,
  placeholder,
  maxLength,
  children,
  min,
  disabled,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-2">{label}</label>
      {type === "text-input" || type === "number-input" ? (
        <input
          type={type === "text-input" ? "text" : "number"}
          className="w-full border rounded p-2 focus:border-blue-500"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          min={type === "number-input" ? min : undefined}
          disabled={disabled}
        />
      ) : (
        <textarea
          className="w-full border rounded p-2 focus:border-blue-500"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
        ></textarea>
      )}
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
};
