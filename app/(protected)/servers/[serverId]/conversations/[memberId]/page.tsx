import ChatHeader from "@/components/chat/chat-header";
import { getOrCreateConverstaion } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface Props {
  params: {
    memberId: string;
    serverId: string;
  };
}
const MemberIdScreen = async ({ params }: Props) => {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) return redirect("/");

  const conversation = await getOrCreateConverstaion(
    currentMember.id,
    params.memberId
  );

  if (!conversation) return redirect("/servers/" + params.serverId);

  const { memberOne, memberTwo } = conversation;

  const conversationPartner =
    profile.id !== memberOne.id ? memberTwo : memberOne;

  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        imageurl={conversationPartner.profile.imageUrl}
        serverId={params.serverId}
        name={conversationPartner.profile.name}
        type="conversation"
      />
    </div>
  );
};
export default MemberIdScreen;
