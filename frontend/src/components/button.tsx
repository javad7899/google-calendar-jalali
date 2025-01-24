"use client";

import { useRouter } from "next/navigation";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  customClasses?: string;
  bgColor?: string;
  textColor?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  href?: string;
}

export const Button = ({
  label,
  onClick,
  customClasses = "",
  bgColor = "bg-blue-500",
  textColor = "text-white",
  icon,
  iconPosition = "right",
  href,
}: ButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    onClick?.();
    if (href) {
      router.push(href);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-3 py-2 ${bgColor} ${textColor} rounded-md hover:cursor-pointer ${customClasses} flex items-center justify-center gap-x-2`}
    >
      {iconPosition === "right" && icon && <span>{icon}</span>}
      <span>{label}</span>
      {iconPosition === "left" && icon && <span>{icon}</span>}
    </button>
  );
};
