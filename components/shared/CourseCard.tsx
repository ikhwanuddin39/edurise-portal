import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { DownloadCertificateButton } from "./DownloadCertificateButton";
import { CourseCategory } from "@/types/course";

export type CourseCardVariant = "enrolled" | "recommendation";

export interface CourseCardProps {
  variant: CourseCardVariant;
  courseName: string;
  moduleName: string;
  progress?: number;
  imageUrl?: string;
  category?: CourseCategory;
  onContinue?: () => void;
  onDownload?: () => void;
  onDetail?: () => void;
  onAdd?: () => void;
}

export function CourseCard({
  variant,
  courseName,
  moduleName,
  progress = 0,
  imageUrl = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600",
  category = "Desain",
  onContinue,
  onDownload,
  onDetail,
  onAdd,
}: CourseCardProps) {
  const isEnrolled = variant === "enrolled";
  const isCompleted = progress === 100;

  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100/50 shadow hover:shadow-lg transition-shadow duration-300 w-full max-w-[340px]">
      {/* Image Section */}
      <div className="relative h-44 w-full bg-gray-100">
        <Image
          src={imageUrl}
          alt={courseName}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1">
        {/* RECOMMENDATION VARIANT: Category Badge */}
        {!isEnrolled && (
          <span
            className=
            "self-start text-sm font-medium px-2 py-0.5 rounded-full mb-3 inline-flex items-center justify-center bg-primitive text-primary"
          >
            {category}
          </span>
        )}

        {/* Titles */}
        <h4 className={cn("text-[13px] font-medium text-gray-500 leading-tight", !isEnrolled && "mt-0")}>
          {isEnrolled ? courseName : courseName}
        </h4>
        <h3 className="text-[15px] font-medium text-gray-800 mt-1.5 leading-snug">
          {moduleName}
        </h3>

        {/* ENROLLED VARIANT: Progress Bar */}
        {isEnrolled && (
          <div className="flex items-center gap-3 mt-5">
            <div className="relative flex-1 h-1.5 bg-[#dbeafe] rounded-full overflow-hidden">
              <div
                className={cn(
                  "absolute top-0 left-0 h-full rounded-full",
                  isCompleted ? "bg-[#22c55e]" : "bg-primary"
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span
              className={cn(
                "text-[13px] font-medium min-w-[32px] text-right",
                isCompleted ? "text-[#22c55e]" : "text-primary"
              )}
            >
              {progress}%
            </span>
          </div>
        )}

        <div className="flex-1" />

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mt-5">
          {isEnrolled ? (
            <>
              <button
                onClick={onContinue}
                className="w-full py-2.5 bg-primary hover:bg-blue-600 active:bg-blue-700 text-white text-[13px] font-medium rounded-lg transition-colors cursor-pointer"
              >
                {progress === 0 ? "Mulai Kursus" : "Lanjutkan Kursus"}
              </button>

              <DownloadCertificateButton isCompleted={isCompleted} />
            </>
          ) : (
            <>
              <button
                onClick={onDetail}
                className="w-full py-2.5 bg-primary hover:bg-blue-600 active:bg-blue-700 text-white text-[13px] font-medium rounded-lg transition-colors"
              >
                Lihat Detail Kursus
              </button>

              <button
                onClick={onAdd}
                className="w-full py-2 border border-gray-300 hover:bg-gray-50 active:bg-gray-100 text-gray-700 text-[13px] font-medium rounded-lg transition-colors"
              >
                Tambah Kursus
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
