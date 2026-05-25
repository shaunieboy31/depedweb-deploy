"use client";

import React from "react";
import { Search as LucideSearch, Volume2 as LucideVolume2 } from "lucide-react";

type IconProps = React.ComponentProps<typeof LucideSearch>;

export function ChevronDown(props: IconProps) {
  const { size = 16, className, ...rest } = props as any;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      <path d="M6 9l6 6 6-6"></path>
    </svg>
  );
}

export function Search(props: IconProps) {
  return <LucideSearch {...props} />;
}

export function Volume2(props: IconProps) {
  return <LucideVolume2 {...props} />;
}

// shadcn-style Icons object (lowercase keys) for consistent usage
export const Icons = {
  chevronDown: ChevronDown,
  search: Search,
  volume2: Volume2,
};

export default Icons;
