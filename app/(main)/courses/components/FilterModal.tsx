"use client";

import { useState } from "react";
import type { CourseCategory } from "@/types/course";

interface FilterSubcategory {
  label: CourseCategory;
  count: number;
}

interface CategoryGroup {
  label: string;
  icon: React.ReactNode;
  subcategories?: FilterSubcategory[];
}

interface FilterModalProps {
  selected: Set<CourseCategory>;
  onToggle: (value: CourseCategory) => void;
  onClear: () => void;
  categoryCounts: Record<string, number>;
}

const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    label: "Teknologi & Data",
    icon: <CpuIcon />,
    subcategories: [
      { label: "Pemrograman", count: 1 },
      { label: "IT", count: 1 },
      { label: "Visualisasi data", count: 1 },
    ],
  },
  {
    label: "Bisnis & Keuangan",
    icon: <BriefcaseIcon />,
    subcategories: [
      { label: "Bisnis", count: 1 },
      { label: "Keuangan", count: 2 },
    ],
  },
  {
    label: "Seni & Desain",
    icon: <PenToolIcon />,
    subcategories: [{ label: "Desain", count: 6 }],
  },
];

export function FilterModal({ selected, onToggle, onClear, categoryCounts }: FilterModalProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    "Teknologi & Data": true,
    "Bisnis & Keuangan": true,
    "Seni & Desain": true,
  });

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="w-75 shrink-0 bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden font-sans">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
        <span className="text-lg font-medium text-gray-800 tracking-wide">
          Category
        </span>
        <div className="flex items-center gap-3">
          <button type="button" className="text-gray-700">
            <ChevronIcon isOpen={!isCollapsed} className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category list */}
      {!isCollapsed && (
        <div className="divide-y divide-gray-50 flex flex-col pt-1">
          {CATEGORY_GROUPS.map((group) => {
            const isOpen = openGroups[group.label];
            const hasSelection = group.subcategories?.some((sub) =>
              selected.has(sub.label),
            );

            return (
              <div key={group.label} className="flex flex-col">
                {/* Accordion Header */}
                <button
                  onClick={() => toggleGroup(group.label)}
                  type="button"
                  className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        hasSelection
                          ? "text-primary"
                          : "text-gray-400 group-hover:text-dark-grey"
                      }
                    >
                      {group.icon}
                    </span>
                    <span
                      className={`text-sm font-semibold tracking-wide ${isOpen || hasSelection ? "text-gray-900" : "text-gray-700"}`}
                    >
                      {group.label}
                    </span>
                  </div>
                  <ChevronIcon
                    isOpen={isOpen}
                    className={`w-4 h-4 transition-colors ${isOpen || hasSelection ? "text-primary" : "text-gray-400 group-hover:text-dark-grey"}`}
                  />
                </button>

                {/* Subcategories */}
                {isOpen && group.subcategories && (
                  <div className="flex flex-col px-5 pb-3">
                    {group.subcategories.map((sub) => {
                      const checked = selected.has(sub.label);
                      return (
                        <label
                          key={sub.label}
                          className="flex items-center justify-between py-2 cursor-pointer group"
                        >
                          <div className="flex items-center gap-3">
                            {/* Custom Checkbox */}
                            <div className="relative flex items-center justify-center">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => onToggle(sub.label)}
                                className="peer appearance-none w-4 h-4 border border-disabled rounded-sm bg-white checked:bg-primary checked:border-primary cursor-pointer transition-colors"
                              />
                              <svg
                                className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>

                            {/* Subcategory Label */}
                            <span
                              className={`text-sm leading-none ${
                                checked ? "text-primary" : "text-dark-grey"
                              }`}
                            >
                              {sub.label}
                            </span>
                          </div>

                          {/* Count */}
                          <span className="text-sm text-disabled font-medium">
                            {categoryCounts[sub.label] || 0}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// --- Icons ---

function CpuIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  );
}

function PenToolIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}

function ChevronIcon({
  className,
  isOpen,
}: {
  className?: string;
  isOpen: boolean;
}) {
  return (
    <svg
      className={`${className} transition-transform duration-200 ${isOpen ? "" : "rotate-180"}`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}
