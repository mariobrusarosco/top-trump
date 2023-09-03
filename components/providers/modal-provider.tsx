"use client";

import { CreateServerModal } from "@/components/modals/create-server-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { useEffect, useState } from "react";
import ManageServerModal from "../modals/manage-server";
import { ManageMembersModal } from "../modals/manage-members-modal";

export const ModalProvider = () => {
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <ManageMembersModal />
      <CreateServerModal />
      <ManageServerModal />
      <InviteModal />
    </>
  );
};
