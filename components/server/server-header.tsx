"use client";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ServerWithMembersWithProfile } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { channel } from "diagnostics_channel";
import { redirect } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import { useEffect, useState } from "react";

interface Props {
  server: ServerWithMembersWithProfile;
  role?: MemberRole;
}

export const ServerHeader = ({ server, role }: Props) => {
  const { onOpen } = useModal();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/100 dark:hover:bg-zinc-700/50 transition">
          {server.name}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-sm font-medium text-black dard:text-neutral-400 space-y-[2px]">
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("invite", { server })}
            className="flex items-center text-white dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
          >
            Invite Friends
            <UserPlus className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("manageServer", { server })}
            className="flex items-center text-cyan-300 px-3 py-2 text-sm cursor-pointer"
          >
            Server Settings
            <Settings className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("manageMembers", { server })}
            className="flex items-center text-rose-500 px-3 py-2 text-sm cursor-pointer"
          >
            Manager Member
            <Users className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("createChannel", {})}
            className="flex items-center text-fuchsia-500 px-3 py-2 text-sm cursor-pointer"
          >
            Create Channel
            <PlusCircle className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}

        {isAdmin && (
          <DropdownMenuItem className="flex items-center text-rose-500 px-3 py-2 text-sm cursor-pointer">
            Delete Server
            <Trash className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {!isAdmin && (
          <DropdownMenuItem className="flex items-center text-emerald-500 px-3 py-2 text-sm cursor-pointer">
            Leave Server
            <LogOut className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
