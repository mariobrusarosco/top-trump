import { MemberQueries } from "@/domains/member/server-side/queries";
import Link from "next/link";

const RegisterScreen = async () => {
  const member = await MemberQueries.fetchMember();

  if (member !== null) {
    return (
      <div>
        You´ve aleady registed on our app. Go to <Link href={"/"}>home</Link>
      </div>
    );
  }

  await MemberQueries.createMember();

  return (
    <div>
      You are now registed on our app. Go to <Link href={"/"}>home</Link>
    </div>
  );
};

export default RegisterScreen;
