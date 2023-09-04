import { Hash, Menu } from "lucide-react";
import { MobileToggle } from "../mobile-toggle";

interface Props {
  imageurl?: string;
  serverId: string;
  name: string;
  type: "channel" | "conversation";
}
const ChatHeader = ({ name, serverId, type, imageurl }: Props) => {
  return (
    <div className="flex items-center text-md">
      <MobileToggle serverId={serverId} />
      {type === "channel" && <Hash className="mr-2 h-5 w-5" />}
      <p className="font-semibold">{name}</p>
    </div>
  );
};

export default ChatHeader;
