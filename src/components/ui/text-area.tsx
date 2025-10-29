import * as React from "react";

import { cn } from "@/lib/utils";

interface TextAreaProps extends React.ComponentProps<"textarea"> {
  helperText?: string;
  invalid?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, invalid, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[120px] w-full rounded-md border border-[#919EAB52] bg-transparent px-3 py-2 text-base shadow-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
          invalid && "border-error-main/80",
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
