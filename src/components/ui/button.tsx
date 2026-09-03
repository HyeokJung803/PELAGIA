import * as React from "react";

const variants = {
  default:
    "border border-[#64f4ff] bg-[#64f4ff] text-[#03111b] hover:bg-transparent hover:text-[#a8f8ff]",
  outline:
    "border border-white/25 bg-transparent text-white hover:border-[#64f4ff] hover:text-[#8cf6ff]",
  ghost: "border border-transparent bg-transparent text-white/70 hover:text-white",
} as const;

const sizes = {
  default: "h-12 px-5 text-sm",
  sm: "h-9 px-3 text-xs",
  icon: "size-11 p-0",
} as const;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      type = "button",
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={`inline-flex shrink-0 items-center justify-center gap-2 font-medium tracking-[-0.02em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64f4ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020810] disabled:pointer-events-none disabled:opacity-40 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  ),
);

Button.displayName = "Button";
