"use client";

import { ChannelType, MemberRole } from "@prisma/client";
import {
  Hash,
  Mic,
  Search,
  ShieldAlert,
  ShieldCheck,
  Video,
} from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandEmpty,
  CommandList,
  CommandGroup,
  CommandItem,
} from "../ui/command";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Props {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

export const IconMapper = {
  [ChannelType.TEXT]: <Hash className=" mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className=" mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className=" mr-2 h-4 w-4" />,
};

export const RoleMapper = {
  [MemberRole.GUEST]: null,
  [MemberRole.ADMIN]: <ShieldCheck className=" mr-2 h-4 w-4 text-indigo-500" />,
  [MemberRole.MODERATOR]: (
    <ShieldAlert className=" mr-2 h-4 w-4 text-rose-500" />
  ),
};

export const ServerSearch = ({ data }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleClick = ({
    id,
    type,
  }: {
    id: string;
    type: "channel" | "member";
  }) => {
    setOpen(false);

    if (type === "channel") {
      router.push(`/servers/${params?.serverId}/channels/${id}`);
    }

    if (type === "member") {
      router.push(`/servers/${params?.serverId}/conversations/${id}`);
    }
  };

  return (
    <div className="px-2">
      <button
        onClick={() => setOpen(true)}
        className="group px-2 py-2 rounded-md gap-x-2 flex w-full items-center hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
      >
        <Search className="w-4 h-4 text-zinc-500 dark:text-emerald-500 " />
        <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-300 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
          Search
        </p>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted p-2 ml-auto text-muted-foreground">
          <span className="text-xs">CMD</span>K
        </kbd>
      </button>
      <CommandDialog onOpenChange={setOpen} open={open}>
        <CommandInput placeholder="Search all channels and members" />
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          {data.map(({ data, label, type }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                {data.map(({ icon, id, name }) => {
                  return (
                    <CommandItem
                      key={id}
                      onSelect={() => handleClick({ id, type })}
                    >
                      {icon} <span>{name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </div>
  );
};
