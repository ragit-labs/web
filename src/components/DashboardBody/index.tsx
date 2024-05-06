import React from "react";
import { cn } from "@/lib/utils";

const DashboardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute left-[16.25rem] right-0 h-screen flex flex-1 flex-col m-0 right-0",
      className,
    )}
    {...props}
  />
));
DashboardBody.displayName = "DashboardBody";

export default DashboardBody;
