export function TabNav() {
  return (
    <nav className="mb-10">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex space-x-8">
          <a
            href="dashboard"
            className="border-b-2 border-blue-500 py-4 text-sm font-medium text-blue-600"
          >
            Dashboard
          </a>
          <a
            href="courses"
            className="py-4 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            Courses
          </a>
          <a
            href="profile"
            className="py-4 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            Profile
          </a>
        </div>
      </div>
    </nav>
  );
}
