import React from "react";
import { cn } from "@/lib/utils";

interface DiscordEmbedPropps extends React.HTMLAttributes<HTMLDivElement> {
  sideRuleColor: string;
}

export const DiscordEmbed = React.forwardRef<
  HTMLDivElement,
  DiscordEmbedPropps
>(({ className, sideRuleColor, ...props }, ref) => (
  <div ref={ref} className={cn("max-w-[520px] flex", className)} {...props}>
    <div
      className={`w-[4px] rounded`}
      style={{ backgroundColor: sideRuleColor }}
    ></div>
    <div
      className="rounded border px-2 py-2 flex flex-col text-[14px]"
      style={{
        background: "rgba(46, 48, 54, 0.3)",
        borderColor: "rgba(46, 48, 54, 0.6)",
        color: "rgba(255, 255, 255, 0.6)",
      }}
    >
      {props.children}
    </div>
  </div>
));
DiscordEmbed.displayName = "DiscordEmbed";

export const DiscordEmbedTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-[#fff]", className)} {...props}>
    {props.children}
  </p>
));
DiscordEmbedTitle.displayName = "DiscordEmbedTitle";

export const DiscordEmbedDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn(className)} {...props}>
    {props.children}
  </p>
));
DiscordEmbedDescription.displayName = "DiscordEmbedDescription";

export {};
