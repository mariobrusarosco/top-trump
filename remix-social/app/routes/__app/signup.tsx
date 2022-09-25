import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { UserForm } from "~/components/UserForm";
import { userSignup } from "~/services/user.services";

export const action: ActionFunction = async ({ request }) => {
  console.log("[UserForm] - Submission Start");
  const form = await request.formData();
  const rawEmail = form.get("email");
  const rawPassword = form.get("password");

  const user = await userSignup(rawEmail, rawPassword);

  return redirect("/login");
};

const SignUp = () => {
  return (
    <div>
      <h1 className="text-xl text-slate-800 mb-8">Sign Up</h1>
      <UserForm />
    </div>
  );
};

export default SignUp;
