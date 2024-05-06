import React from "react";
import { cn } from "@/lib/utils";

const DashboardContent = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <main
    ref={ref}
    className={cn("absolute w-full top-24 bottom-0", className)}
    {...props}
  />
));
DashboardContent.displayName = "DashboardContent";

export default DashboardContent;
