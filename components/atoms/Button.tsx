import { cva, VariantProps } from "class-variance-authority";

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
        primary: ["bg-red", "text-white"],
        base: ["bg-gray-100"],
      },
      size: {
        small: ["text-sm", "py-1", "px-2"],
        medium: ["text-base", "py-1.5", "px-4"],
        large: ["text-lg", "py-2", "px-5"],
      },
    },
    defaultVariants: {
      intent: "base",
      size: "medium",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  intent,
  size,
  type,
  ...props
}) => (
  <button
    type={type || "button"}
    className={button({ intent, size, className })}
    {...props}
  />
);
