import { Hash, Menu } from "lucide-react";
import { MobileToggle } from "../mobile-toggle";
import UserAvatar from "../user-avatar";
import { SocketIndicator } from "../socket.indicator";

interface Props {
  imageurl?: string;
  serverId: string;
  name: string;
  type: "channel" | "conversation";
}
const ChatHeader = ({ name, serverId, type, imageurl }: Props) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />
      {type === "channel" && <Hash className="mr-2 h-5 w-5" />}
      {type === "conversation" && (
        <UserAvatar src={imageurl ?? ""} className="mr-2 h-8 w-8" />
      )}
      <p className="font-semibold">{name}</p>
      <div className="ml-auto flex items-center">
        <SocketIndicator />
      </div>
    </div>
  );
};

export default ChatHeader;
