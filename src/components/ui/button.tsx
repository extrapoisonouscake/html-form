"use client";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg r text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-lg px-8",
        icon: "h-10 w-10",
        smallIcon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
type IntrinsicButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
export interface ButtonProps
  extends Omit<IntrinsicButtonProps, "onClick">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  shouldShowChildrenOnLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: (
    ...props: Parameters<Exclude<IntrinsicButtonProps["onClick"], undefined>>
  ) => void | Promise<void>;
}
export const Spinner = ({ className }: { className?: string }) => (
  <svg
    className={cn("animate-spin", className)}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
//* to-do: convert to client component only if willShowSpinner is true
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      onClick,
      variant,
      size,
      asChild = false,
      isLoading: externalIsLoading = false,
      shouldShowChildrenOnLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const [isLoading, setIsLoading] = React.useState(externalIsLoading);
    const hasExternalIsLoading = typeof externalIsLoading === "boolean";
    const derivedIsLoading = hasExternalIsLoading
      ? externalIsLoading
      : isLoading;
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || derivedIsLoading}
        {...props}
        onClick={
          hasExternalIsLoading
            ? onClick
            : onClick
            ? async (e) => {
                setIsLoading(true);
                try {
                  await onClick(e);
                } catch {}
                setIsLoading(false);
              }
            : undefined
        }
      >
        <>
          {derivedIsLoading ? <Spinner /> : leftIcon}
          {(!derivedIsLoading || shouldShowChildrenOnLoading) && children}
          {rightIcon}
        </>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
