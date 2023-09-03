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
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";

export const InviteModal = () => {
  const { isOpen, onClose, type, data: modalData, onOpen } = useModal();
  const origin = useOrigin();
  const inviteurl = `${origin}/invite/${modalData.server?.inviteCode}`;

  const isModalOpen = isOpen && type === "invite";
  const handleModalClose = () => {
    onClose();
  };

  const [copied, setisCopied] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(inviteurl);
    setisCopied(true);

    setTimeout(() => {
      setisCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setisLoading(true);
      const response = await axios.patch(
        `/api/servers/${modalData.server?.id}/invite-code`
      );
      onOpen("invite", { server: response.data });
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite a friend
          </DialogTitle>
          <DialogDescription>
            Give your board a name and an image. Don&apos;t worry, you can
            change them later on.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server invite link
          </Label>
          <div className="flex item-center mt-2 gap-x-2">
            <Input
              disabled={isLoading}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteurl}
            />
            <Button size="icon" onClick={onCopy} disabled={isLoading}>
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Button
            onClick={onNew}
            disabled={isLoading}
            variant="link"
            size="sm"
            className="text-xs text-zinc-500"
          >
            Genereate a link
            <RefreshCcw className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
