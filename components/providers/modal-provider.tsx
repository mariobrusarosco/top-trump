"use client";

import { CreateServerModal } from "@/components/modals/create-server-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { useEffect, useState } from "react";
import ManageServerModal from "../modals/manage-server";
import { ManageMembersModal } from "../modals/manage-members-modal";
import { CreateChannelModal } from "../modals/create-channel-modal";
import { LeaverServerModal } from "../modals/leave-server-modal";
import { DeleteServerModal } from "../modals/delete-server-modal";
import { DeleteChannelModal } from "../modals/delete-channel-modal";
import { EditChannelModal } from "../modals/edit-channel-modal";
import { MessageFileModal } from "../modals/message-file-modal";

export const ModalProvider = () => {
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <MessageFileModal />
      <EditChannelModal />
      <DeleteChannelModal />
      <DeleteServerModal />
      <LeaverServerModal />
      <CreateChannelModal />
      <ManageMembersModal />
      <CreateServerModal />
      <ManageServerModal />
      <InviteModal />
    </>
  );
};
