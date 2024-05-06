import React from "react";
import { cn } from "@/lib/utils";

const DashboardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute flex h-24 w-full pl-10 items-center", className)}
    {...props}
  />
));
DashboardHeader.displayName = "DashboardHeader";

export default DashboardHeader;
