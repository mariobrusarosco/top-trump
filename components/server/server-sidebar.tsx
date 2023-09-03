import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import { ServerSearch } from "./server-search";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

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

interface Props {
  serverId: string;
}

export const ServerSidebar = async ({ serverId }: Props) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: { id: serverId },
    include: {
      channels: { orderBy: { createdAt: "asc" } },
      members: { include: { profile: true }, orderBy: { role: "asc" } },
    },
  });

  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  );

  if (!server) {
    redirect("/");
  }

  const role = server.members?.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <aside className="flex flex-col h-full text-primary w-full dark:bg-rose-500 bg-cyan-700">
      <ServerHeader server={server} role={role} />

      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                type: "channel",
                label: "Text Channels",
                data: textChannels?.map((channel) => ({
                  icon: IconMapper[channel.type],
                  name: channel.name,
                  id: channel.id,
                })),
              },
              {
                type: "member",
                label: "Member",
                data: members?.map((member) => ({
                  icon: RoleMapper[member.role],
                  name: member.profile.name,
                  id: member.id,
                })),
              },
            ]}
          />
        </div>
      </ScrollArea>

      <div>Server:{server?.name}</div>
      <div>
        channels:
        {server?.channels.map((channel) => {
          return (
            <div key={channel.id}>
              <span>{channel.name}</span>
              <span>{channel.type}</span>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
