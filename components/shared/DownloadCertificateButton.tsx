"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface DownloadCertificateButtonProps {
  isCompleted: boolean;
}

export function DownloadCertificateButton({ isCompleted }: DownloadCertificateButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isCompleted || isDownloading) return;

    setIsDownloading(true);

    // Simulate network delay for animation (1.5s)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Create an invisible anchor to trigger actual download
    const link = document.createElement("a");
    link.href = "/documents/edurise-sertificate.pdf";
    link.download = "Sertifikat EduRise.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsDownloading(false);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={!isCompleted || isDownloading}
      className={cn(
        "w-full py-2.5 text-[13px] font-medium rounded-lg transition-colors flex items-center justify-center gap-2",
        isCompleted
          ? "bg-[#dbeafe] hover:bg-blue-200 text-primary cursor-pointer"
          : "bg-[#9ca3af] text-white cursor-not-allowed",
        isDownloading && "opacity-70 cursor-wait"
      )}
    >
      {isDownloading ? (
        <>
          <SpinnerIcon />
          Mengunduh...
        </>
      ) : (
        <>
          <DownloadIcon />
          Download Sertifikat
        </>
      )}
    </button>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
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
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
