import { createMember } from "@/domains/member/server-side/member-creation";
import { SharedRoutes } from "@/domains/shared/typing/enums-interfaces";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const RegisterScreen = async () => {
  const memberAuthData = await currentUser();

  if (memberAuthData !== null) {
    await createMember(memberAuthData);

    return redirect(SharedRoutes.HOME);
  }

  // TODO [logging] add a logging layer here
  console.log(
    "[ERROR] - [MEMBER] - [RegisterScreen]",
    "member has acessed 'Register' screen with no auth"
  );

  return redirect(SharedRoutes.NOT_FOUND);
};

export default RegisterScreen;
