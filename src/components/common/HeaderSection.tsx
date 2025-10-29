import { ArrowRight2 } from "iconsax-react";
import React from "react";

interface HeaderSectionProps {
  title: string;
  label: string;
  subLabel: string;
}

export function HeaderSection({ title, subLabel, label }: HeaderSectionProps) {
  return (
    <div className="from-primary-main/16 to-secondary-main/16 h-[300px] bg-gradient-to-tr">
      <div className="mx-auto flex h-full w-full max-w-sm flex-col items-center justify-center px-6 md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
        <div className="text-3xl font-bold text-[#212B36] lg:text-5xl lg:leading-16">
          {title}
        </div>
        <div className="mt-2 flex items-center justify-between gap-2 text-sm">
          <span className="text-[#212B36]">{label}</span>
          <ArrowRight2 size="14" color="#212B36" />
          <span className="text-secondary">{subLabel}</span>
        </div>
      </div>
    </div>
  );
}
