"use client";

import { ServerWithMembersWithProfile } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { ActionTooltip } from "../action-tooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface Props {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfile;
}

export const ServerSection = ({
  label,
  sectionType,
  channelType,
  role,
  server,
}: Props) => {
  const { onOpen } = useModal();

  return (
    <div className="flex flex-items justify-between py-2">
      <p className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-100">
        {label}
      </p>

      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label="Create Channel" side="right">
          <button onClick={() => onOpen("createChannel", { channelType })}>
            <Plus className="w-4 h-4" />
          </button>
        </ActionTooltip>
      )}

      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip label="Create Channel" side="right">
          <button onClick={() => onOpen("manageMembers", { server })}>
            <Settings className="w-4 h-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};
