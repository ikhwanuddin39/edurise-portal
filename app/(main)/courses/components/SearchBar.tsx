// "use client";

import Image from "next/image";

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative w-full max-w-[480px]">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Image src="/icons/search.png" alt="Search" width={18} height={18} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="UI/UX"
        className="w-full bg-white border border-gray-300 text-gray-900 text-[14px] rounded-lg focus:ring-primary focus:border-primary block pl-11 p-2.5 outline-none transition-colors"
      />
    </div>
  );
}
