"use client";

import { UploadButton } from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

interface UploadThingComponentProps {
  onUploadComplete?: (url: string, key: string) => void;
  onUploadError?: (error: Error) => void;
  onUploadBegin?: (name: string) => void;
  value?: string;
  placeholder?: string;
  className?: string;
}

export function UploadThingComponent({
  onUploadComplete,
  onUploadError,
  onUploadBegin,
  value,
  placeholder = "Tài liệu đính kèm",
  className = "",
}: UploadThingComponentProps) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        readOnly
        className="border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-md border bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
      <UploadButton<OurFileRouter, "documents">
        endpoint="documents"
        onClientUploadComplete={(res) => {
          if (res && res[0]) {
            onUploadComplete?.(res[0].url, res[0].key);
          }
        }}
        onUploadError={(error: Error) => {
          onUploadError?.(error);
        }}
        onUploadBegin={(name: string) => {
          onUploadBegin?.(name);
        }}
        content={{
          button: "Chọn",
          allowedContent: "Chọn tài liệu",
        }}
        appearance={{
          button:
            "h-12 text-white bg-gray-800 hover:bg-gray-900 focus-visible:ring-ring border border-gray-800 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        }}
      />
    </div>
  );
}
