import { Check } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

type InputProps = {
  helperText?: string;
  invalid?: boolean;
};

type CheckboxInputProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
} & Omit<React.ComponentProps<"input">, "type" | "checked" | "onChange">;

function Input({
  className,
  type,
  helperText,
  invalid,
  ...props
}: React.ComponentProps<"input"> & InputProps) {
  return (
    <>
      <input
        type={type}
        data-slot="input"
        className={cn(
          "border-disabled file:text-foreground placeholder:text-disabled selection:bg-primary selection:text-primary-foreground flex h-12 w-full min-w-0 rounded-md border border-[#919EAB52] bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50",
          "aria-invalid:border-red-500 aria-invalid:ring-red-500/20",
          className,
          invalid && "border-error-main/80",
        )}
        aria-invalid={!!invalid}
        {...props}
      />
      {helperText && (
        <p className="text-disabled text-xs font-light">{helperText}</p>
      )}
    </>
  );
}

function CheckboxInput({
  checked = false,
  onChange,
  className,
  ...props
}: CheckboxInputProps) {
  return (
    <div
      className={cn(
        "relative inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded border-1 transition-all duration-200",
        checked
          ? "border-[#BF2F1F] bg-[#BF2F1F]"
          : "border-[#919EAB] bg-white hover:border-[#BF2F1F]",
        className,
      )}
      onClick={() => onChange?.(!checked)}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="absolute inset-0 cursor-pointer opacity-0"
        {...props}
      />
      {checked && <Check className="h-3 w-3 stroke-[3] text-white" />}
    </div>
  );
}

export { Input, CheckboxInput };
