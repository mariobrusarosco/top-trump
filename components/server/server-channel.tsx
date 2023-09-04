"use client";

import { ServerWithMembersWithProfile } from "@/types";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { ActionTooltip } from "../action-tooltip";
import { Edit, Hash, Mic, Lock, Trash, Video } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";

interface Props {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

export const mapper = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

export const ServerChannel = ({ channel, role, server }: Props) => {
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();

  const Icon = mapper[channel.type];
  const onClick = () => {
    router.push(`/servers/${params?.serverId}/channels/${channel.id}`);
  };

  return (
    <button
      // onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded:md flex items-center gap-x-2 w-full mb-2 transition hover:bg-slate-700/10 dark:hover:bg-rose-700/50",
        ""
      )}
    >
      <Icon className="flex-shrink-0 h-5 h-5 text-rose-900 dark:text-rose-800" />
      <p
        className={cn(
          "line-clamp-1 text-sm text-red-700 dark:text-rose-100",
          params.channeId === channel.id && "text-emerald-800"
        )}
      >
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit">
            <Edit
              onClick={() => onOpen("editChannel", { channel, server })}
              className="hidden group-hover:block w-4 h-4 text-zinc-100 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash
              onClick={(e) => onOpen("deleteChannel", { channel, server })}
              className="hidden group-hover:block w-4 h-4 text-zinc-100 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
        </div>
      )}
      {channel.name === "general" && (
        <Lock className="ml-auto w-4 h-4 text-zinc-100 dark:text-zinc-100" />
      )}
    </button>
  );
};
