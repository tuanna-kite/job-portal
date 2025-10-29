import { Category2 } from "iconsax-react";
import { useRouter } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface DropdownTabsProps {
  type?: "default" | "custom";
}

const listChallenge = [
  {
    title: "Câu hỏi vui",
    route: "/",
  },
  {
    title: "Sắp xếp",
    route: "/",
  },
  {
    title: "Ghép hình",
    route: "/",
  },
  {
    title: "Điền từ",
    route: "/",
  },
];

const DropdownTabs = ({ type = "default" }: DropdownTabsProps) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-none">
        <div
          className={cn(
            "flex cursor-pointer items-center rounded-md",
            type === "custom" && "p-2",
          )}
        >
          <div className="p-1">
            <Category2 size="18" color="#27272A" />
          </div>
          <p
            className={cn(
              "rounded-md px-1.5 py-0.5 text-sm font-semibold",
              type === "custom" ? "text-[#212B36]" : "text-[#212B36]",
            )}
          >
            Thử thách
          </p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={20}
        alignOffset={-10}
        className="grid grid-cols-1 grid-rows-1 border-none bg-white"
      >
        {listChallenge.map((item) => (
          <DropdownMenuItem key={item.title} className="block">
            <Button
              variant="ghost"
              className="text-normal text-text-primary hover:text-text-primary block w-full text-left font-normal"
              onClick={() => router.push(item.route)}
            >
              {item.title}
            </Button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownTabs;
