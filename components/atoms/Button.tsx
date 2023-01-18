import { forwardRefWithPolymorphic } from "@lib/utils/forwardRefWithPolymorphic";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { twMerge } from "tailwind-merge";

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
        secondary: [],
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
        intent: "secondary",
        outline: false,
        className: ["bg-purple", "text-white"],
      },
      {
        intent: "secondary",
        outline: true,
        className: ["ring-purple", "text-purple"],
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

export type ButtonVariantProps = VariantProps<typeof button>;

const DEFAULT_TAG: React.ElementType = "button";

export const Button = forwardRefWithPolymorphic<
  typeof DEFAULT_TAG,
  ButtonVariantProps
>(
  (
    {
      as: Element = DEFAULT_TAG,
      // custom props
      outline,
      intent,
      size,
      // handled props
      className,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <Element
        ref={ref}
        type={type}
        className={twMerge(button({ intent, size, outline }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
