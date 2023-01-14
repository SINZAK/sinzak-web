import { cva, VariantProps } from "class-variance-authority";
import React from "react";

export const button = cva(
  [
    "button",
    "hover:bg-opacity-80",
    "rounded-full",
    "flex",
    "justify-center",
    "items-center",
    "font-bold",
    "whitespace-nowrap",
  ],
  {
    variants: {
      intent: {
        primary: [],
        base: [],
      },
      outline: {
        true: ["ring-1 ring-inset"],
        false: [],
      },
      size: {
        small: ["text-sm", "py-1", "px-2"],
        medium: ["text-base", "py-1.5", "px-4"],
        large: ["text-lg", "py-2", "px-5"],
      },
    },
    compoundVariants: [
      {
        intent: "primary",
        outline: false,
        className: ["bg-red", "text-white"],
      },
      {
        intent: "primary",
        outline: true,
        className: ["ring-red", "text-red"],
      },
      {
        intent: "base",
        outline: false,
        className: ["bg-gray-100"],
      },
      {
        intent: "base",
        outline: true,
        className: ["ring-gray-600 text-gray-600"],
      },
    ],
    defaultVariants: {
      intent: "base",
      outline: false,
      size: "medium",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, outline, intent, size, type, ...props }, ref) => (
    <button
      ref={ref}
      type={type || "button"}
      className={button({ intent, size, className, outline })}
      {...props}
    />
  )
);
Button.displayName = "Button";
