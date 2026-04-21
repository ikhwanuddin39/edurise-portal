export function ProfileSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-10 pt-10 pb-20 animate-pulse">
      {/* Header Skeleton */}
      <div className="h-7 w-24 bg-gray-100 rounded mb-6" />

      {/* Account Section Skeleton */}
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-56 h-72 bg-gray-100 rounded-xl shrink-0" />
        <div className="flex-1 space-y-5 max-w-[550px]">
          <div className="flex gap-5">
            <div className="flex-1 h-12 bg-gray-100 rounded-md" />
            <div className="flex-1 h-12 bg-gray-100 rounded-md" />
          </div>
          <div className="h-12 bg-gray-100 rounded-md" />
          <div className="h-12 bg-gray-100 rounded-md" />
          <div className="h-12 bg-gray-100 rounded-md" />
          <div className="h-12 bg-gray-100 rounded-md" />
          <div className="h-10 w-32 bg-gray-100 rounded-lg mt-8" />
        </div>
      </div>

      <hr className="my-10 border-gray-100" />

      {/* Password Section Skeleton */}
      <div className="h-7 w-40 bg-gray-100 rounded mb-6" />
      <div className="space-y-5 max-w-[420px]">
        <div className="h-12 bg-gray-100 rounded-md" />
        <div className="h-12 bg-gray-100 rounded-md" />
        <div className="h-12 bg-gray-100 rounded-md" />
        <div className="h-10 w-40 bg-gray-100 rounded-lg mt-8" />
      </div>

      <hr className="my-10 border-gray-100" />

      {/* Notif Settings Skeleton */}
      <div className="flex flex-col md:flex-row gap-12 md:gap-24">
        <div className="flex-1 space-y-6">
          <div className="h-6 w-56 bg-gray-100 rounded" />
          <div className="h-6 w-48 bg-gray-100 rounded" />
          <div className="space-y-4">
            <div className="h-5 w-64 bg-gray-100 rounded" />
            <div className="h-5 w-64 bg-gray-100 rounded" />
            <div className="h-5 w-64 bg-gray-100 rounded" />
          </div>
        </div>
        <div className="flex-1 space-y-6">
          <div className="h-6 w-56 bg-gray-100 rounded" />
          <div className="h-6 w-48 bg-gray-100 rounded" />
          <div className="space-y-4">
            <div className="h-5 w-64 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
