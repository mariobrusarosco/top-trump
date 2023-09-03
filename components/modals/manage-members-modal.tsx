"use client";

import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import qs from "query-string";
import { useModal } from "@/hooks/use-modal-store";
import {
  Check,
  Gavel,
  Loader,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { useState } from "react";
import { ServerWithMembersWithProfile } from "@/types";
import UserAvatar from "../user-avatar";
import { MemberRole } from "@prisma/client";
import { useRouter } from "next/navigation";

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-emerald-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
};
export const ManageMembersModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type, data: modalData, onOpen } = useModal();
  const { server } = modalData as { server: ServerWithMembersWithProfile };

  const isModalOpen = isOpen && type === "manageMembers";
  const handleModalClose = () => {
    onClose();
  };

  const [isLoadingId, setIsLoadingId] = useState("");

  const onKickMember = async (memberId: string) => {
    try {
      setIsLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server.id,
        },
      });

      const response = await axios.delete(url);

      onOpen("manageMembers", { server: response.data });
      router.refresh();
    } catch (error) {
      console.error("[KICK MEMBER]:", error);
    } finally {
      setIsLoadingId("");
    }
  };

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setIsLoadingId(memberId);

      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server.id,
        },
      });

      const response = await axios.patch(url, { role });

      router.refresh();
      onOpen("manageMembers", { server: response.data });
    } catch (error) {
      console.error("[CHANGE ROLE]:", error);
    } finally {
      setIsLoadingId("");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
      <DialogContent className="bg-white text-black overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[420px] mt-8 pr-6">
          {server?.members?.map((member) => {
            const memberHasActions =
              server.profileId !== member.profileId &&
              isLoadingId !== member.id;

            return (
              <div className="flex items-center gap-x-2 mb-6" key={member.id}>
                <UserAvatar src={member.profile.imageUrl} />
                <div className="flex flex-col gap-y-1">
                  <div className="text-xs font-semibold flex items-center gap-x-1">
                    {member.profile.name}
                    {roleIconMap[member?.role]}
                  </div>
                  <p className="text-xs text-zinc-500">
                    {member.profile.email}
                  </p>
                </div>
                {memberHasActions && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="h-4 w-4 text-zinc-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <ShieldQuestion className="w-4 h-4 mr-2" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() =>
                                  onRoleChange(member.id, MemberRole.GUEST)
                                }
                              >
                                <Shield className="w-4 h-4 mr-2" />
                                Guest
                                {member.role === "GUEST" && (
                                  <Check className="h-4 w-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  onRoleChange(member.id, MemberRole.MODERATOR)
                                }
                              >
                                <Shield className="w-4 h-4 mr-2" />
                                Moderator
                                {member.role === "MODERATOR" && (
                                  <Check className="h-4 w-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onKickMember(member.id)}
                        >
                          <Gavel className="h-4 w-4 mr-2" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}

                {isLoadingId === member.id && (
                  <Loader className="animate-spin w-4 h-4 ml-auto text-zinc-500" />
                )}
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
