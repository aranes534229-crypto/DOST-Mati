// components/dashboard/EmptyState.tsx
import type { ReactNode } from "react";

interface EmptyStateProps {
  message: string;
  icon?: ReactNode;
  action?: ReactNode;
}

/** Consistent zero-data state for tables, feeds and charts. */
export default function EmptyState({ message, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
      {icon && (
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-400 dark:bg-white/[0.06] dark:text-gray-500">
          {icon}
        </span>
      )}
      <p className="text-theme-sm text-gray-400 dark:text-gray-500">{message}</p>
      {action}
    </div>
  );
}
