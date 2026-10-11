// components/dashboard/DashboardCard.tsx
import clsx from "clsx";
import type { ReactNode } from "react";
import {
  CARD_BODY,
  CARD_BODY_WITH_HEADER,
  CARD_DESC,
  CARD_HEADER,
  CARD_SHELL,
  CARD_TITLE,
} from "./styleMaps";

interface DashboardCardProps {
  title?: string;
  desc?: string;
  headerRight?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  /** Remove the default body padding — used for flush tables/charts. */
  noBodyPadding?: boolean;
}

/**
 * The single card shell every dashboard widget should use. Replaces the
 * inline `rounded-2xl border ... p-5 sm:p-6` declarations that had drifted
 * between admin / receiver / super_admin components.
 */
export default function DashboardCard({
  title,
  desc,
  headerRight,
  children,
  className,
  bodyClassName,
  noBodyPadding = false,
}: DashboardCardProps) {
  const hasHeader = Boolean(title || desc || headerRight);
  const bodyPadding = noBodyPadding
    ? ""
    : hasHeader
      ? CARD_BODY_WITH_HEADER
      : CARD_BODY;

  return (
    <section className={clsx(CARD_SHELL, className)}>
      {hasHeader && (
        <div className={CARD_HEADER}>
          <div>
            {title && <h3 className={CARD_TITLE}>{title}</h3>}
            {desc && <p className={CARD_DESC}>{desc}</p>}
          </div>
          {headerRight && <div className="flex-shrink-0">{headerRight}</div>}
        </div>
      )}

      <div className={clsx(bodyPadding, bodyClassName)}>{children}</div>
    </section>
  );
}
