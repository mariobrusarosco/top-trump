import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import { ServerSearch } from "./server-search";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "../ui/separator";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";

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
        <Separator className="my-2 bg-white rounded-md" />

        {!!textChannels?.length && (
          <div className="bt-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
            />
            {textChannels.map((channel) => {
              return (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                />
              );
            })}
          </div>
        )}

        <Separator className="bg-white" />

        {!!videoChannels?.length && (
          <div className="bt-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role}
              label="Video Channels"
            />
            {videoChannels.map((channel) => {
              return (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                />
              );
            })}
          </div>
        )}

        {!!audioChannels?.length && (
          <div className="bt-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role}
              label="Audio Channels"
            />
            {audioChannels.map((channel) => {
              return (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                />
              );
            })}
          </div>
        )}

        {!!members?.length && (
          <div className="bt-2">
            <ServerSection
              sectionType="members"
              channelType={ChannelType.TEXT}
              role={role}
              label="Members"
              server={server}
            />
            {members.map((member) => {
              return (
                <ServerMember key={member.id} member={member} server={server} />
              );
            })}
          </div>
        )}
      </ScrollArea>
    </aside>
  );
};
