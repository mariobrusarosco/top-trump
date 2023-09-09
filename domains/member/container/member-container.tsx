// This is a temporary experiment to check if performing
// a fetch of a member in RSC, passing to a Context is more performatic than
// via React Client Component

import { MemberQueries } from "@/domains/member/server-side/queries";
import { Member } from "@prisma/client";
import { ReactElement } from "react";

export const MemberContainer = async (props: {
  children(member: Member): ReactElement;
}) => {
  const member = await MemberQueries.fetchMember();

  if (member === null) return null;

  return <div className="member-container">{props.children(member)}</div>;
};
