"use client";

import { useRouter } from "next/navigation";
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
import { useEffect, useState } from "react";
import FileUpload from "@/components/file-upload";
import { useModal } from "@/hooks/use-modal-store";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Board name is required. Use at least 1 char.",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image url is required",
  }),
});

const ManageServerModal = () => {
  const { isOpen, onClose, type, data: modalData } = useModal();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const formIsLoading = form.formState.isSubmitting;

  const isManageModalOpen = isOpen && type === "manageServer";
  const handleModalClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(
        `/api/servers/${modalData.server?.id}`,
        values
      );

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    form.setValue("name", modalData.server?.name ?? "");
    form.setValue("imageUrl", modalData.server?.imageUrl ?? "");
  }, [modalData.server, form]);

  return (
    <Dialog open={isManageModalOpen} onOpenChange={handleModalClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Customize Your Board
          </DialogTitle>
          <DialogDescription>
            Give your board a name and an image. Don&apos;t worry, you can
            change them later on.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-8 px-6">
              <div className="flex justify-center text-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-red-500 dark:text-black">
                        Image Upload
                      </FormLabel>
                      <FormControl>
                        <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-red-500 dark:text-black">
                      Board Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={formIsLoading}
                        placeholder="Enter Board name"
                        className="border-0 bg-red-800/20 focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="primary" disabled={formIsLoading}>
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ManageServerModal;
