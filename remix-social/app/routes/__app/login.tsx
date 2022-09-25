import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { UserForm } from "~/components/UserForm";

export const action: ActionFunction = async ({ request }) => {
  console.log("[UserForm] - Submission Start");
  const form = await request.formData();

  return redirect("/login");
};

const SignIn = () => {
  return (
    <div>
      <h1 className="text-xl text-slate-800 mb-8">Sign In</h1>
      <UserForm />
    </div>
  );
};

export default SignIn;
