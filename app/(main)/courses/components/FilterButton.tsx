"use client";

import Image from "next/image";

interface FilterButtonProps {
  isOpen: boolean;
  activeCount: number;
  onClick: () => void;
}

export function FilterButton({ isOpen, activeCount, onClick }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-between gap-2 border font-medium rounded-lg text-sm px-4 py-2.5 w-1/6 transition-colors ${isOpen
        ? "bg-blue-50 border-primary text-primary"
        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
    >
      <div className="flex items-center gap-2">
        <Image src="/icons/filter.svg" alt="Filter" width={18} height={18} unoptimized />
        Filter
      </div>
      {activeCount > 0 && (
        <span className="inline-flex items-center justify-center w-5 h-5 ml-2 text-[11px] font-semibold text-blue-600 bg-blue-100 rounded">
          {activeCount}
        </span>
      )}
    </button>
  );
}
