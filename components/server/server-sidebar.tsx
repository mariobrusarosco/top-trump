import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { channel } from "diagnostics_channel";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";

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
