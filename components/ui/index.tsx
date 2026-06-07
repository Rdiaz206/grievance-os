import React from "react";

type Props = React.HTMLAttributes<HTMLElement> & { className?: string };

export const Label = ({ children, className = "", ...props }: any) => (
  <label className={`block text-sm font-medium text-slate-700 ${className}`} {...props}>
    {children}
  </label>
);

export const Input = React.forwardRef<HTMLInputElement, any>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`mt-1 w-full rounded-md border px-3 py-2 text-slate-900 ${className}`}
      {...props}
    />
  )
);

Input.displayName = "Input";

export const Button = ({ children, className = "", ...props }: any) => (
  <button
    className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-500 disabled:opacity-60 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const FormField = ({ label, children }: { label?: React.ReactNode; children: React.ReactNode }) => (
  <div>
    {label ? <Label>{label}</Label> : null}
    {children}
  </div>
);

export default {
  Label,
  Input,
  Button,
  FormField,
};
