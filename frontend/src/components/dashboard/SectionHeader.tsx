// components/dashboard/SectionHeader.tsx
import type { ReactNode } from "react";
import { CARD_DESC, CARD_TITLE } from "./styleMaps";

interface SectionHeaderProps {
  title: string;
  desc?: string;
  action?: ReactNode;
}

/** Title + subtitle + optional right-side action, used inside cards/tabs. */
export default function SectionHeader({ title, desc, action }: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className={CARD_TITLE}>{title}</h3>
        {desc && <p className={CARD_DESC}>{desc}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
