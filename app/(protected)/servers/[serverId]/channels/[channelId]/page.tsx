import ChatHeader from "@/components/chat/chat-header";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface Props {
  params: {
    channelId: string;
    serverId: string;
  };
}

const ChannelIdScreen = async ({ params }: Props) => {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: { profileId: profile.id, serverId: params.serverId },
  });

  if (!channel || !member) {
    redirect("/");
  }

  return (
    <div className="bg-white dark:bg-red-800 flex flex-col h-full">
      <ChatHeader
        name="a"
        serverId={params.serverId}
        type="channel"
        imageurl=""
      />
    </div>
  );
};

export default ChannelIdScreen;
