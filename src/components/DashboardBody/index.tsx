import React from "react";
import { cn } from "@/lib/utils";

const DashboardBody = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <main
    ref={ref}
    className={cn("flex flex-1 flex-col m-0", className)}
    {...props}
  />
));
DashboardBody.displayName = "DashboardBody";

export default DashboardBody;
