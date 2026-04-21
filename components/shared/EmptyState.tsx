import React from "react";

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
      {icon && (
        <div className="text-gray-300 mb-2">{icon}</div>
      )}
      <p className="text-4xl font-semibold font-heading">{title}</p>
      {description && (
        <p className="text-lg">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
