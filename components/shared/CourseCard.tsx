import Image from "next/image";
import React from "react";

export interface CourseCardProps {
  courseName?: string;
  moduleName?: string;
  progress?: number;
  imageUrl?: string;
  onContinue?: () => void;
  onDownload?: () => void;
}

export function CourseCard({
  courseName = "Membangun Restoran di Tahun 2025",
  moduleName = "2. Pembuatan business model",
  progress = 25,
  imageUrl = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600", // Default restaurant placeholder
  onContinue,
  onDownload,
}: CourseCardProps) {
  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden max-w-[340px] shadow-sm border border-gray-100">
      {/* Image Section */}
      <div className="relative h-48 w-full bg-gray-200">
        <Image
          src={imageUrl}
          alt={courseName}
          fill
          unoptimized // So external URLs work smoothly for placeholder
          className="object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col">
        {/* Titles */}
        <h4 className="text-[15px] font-medium text-gray-500 leading-tight">
          {courseName}
        </h4>
        <h3 className="text-lg font-medium text-gray-800 mt-2 leading-snug">
          {moduleName}
        </h3>

        {/* Progress Bar */}
        <div className="flex items-center gap-4 mt-6">
          <div className="relative flex-1 h-2 bg-[#dbeafe] rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-[#3b82f6] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[15px] font-medium text-[#3b82f6]">
            {progress}%
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={onContinue}
            className="w-full py-3 bg-[#3b82f6] hover:bg-blue-600 active:bg-blue-700 text-white font-medium rounded-xl transition-colors"
          >
            Lanjutkan Kursus
          </button>

          <button
            onClick={onDownload}
            className="w-full py-3 bg-[#9ca3af] hover:bg-gray-500 active:bg-gray-600 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
          >
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download Sertifikat
          </button>
        </div>
      </div>
    </div>
  );
}
