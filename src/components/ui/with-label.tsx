import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
import { Label } from "./label";

export function WithLabel({
  label,
  id,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  id: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <Label htmlFor={id} className="text-sm">
        {label}
      </Label>
      {children}
    </div>
  );
}
