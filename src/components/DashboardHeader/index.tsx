import React from "react";
import { cn } from "@/lib/utils";

const DashboardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-24 pl-10 items-center border-b border-neutral-100",
      className,
    )}
    {...props}
  />
));
DashboardHeader.displayName = "DashboardHeader";

export default DashboardHeader;
