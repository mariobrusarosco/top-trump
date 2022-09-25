import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useActionData, useTransition } from "@remix-run/react";
import { Button } from "~/components/Button";
import { UserForm } from "~/components/UserForm";
import { checkIfUserExists, userSignup } from "~/services/auth.services";
import { CreateSignup } from "~/services/validation";

export function badRequest<TActionData>(data: TActionData, status = 400) {
  return json<TActionData>(data, { status });
}

type ActionData = {
  error?: {
    formError?: string[];
    fieldErrors?: {
      email?: string[];
      password?: string[];
    };
  };
  fields?: {
    email?: string;
    password?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  console.log("[UserForm] - Submission Start");
  const form = await request.formData();
  const rawEmail = form.get("email");
  const rawPassword = form.get("password");

  if (typeof rawEmail !== "string" || typeof rawPassword !== "string") {
    return badRequest<ActionData>({
      error: { formError: ["Form not submitted correctly"] },
    });
  }

  const fields = { email: rawEmail, password: rawPassword };

  const result = CreateSignup.safeParse({
    email: rawEmail,
    password: rawPassword,
  });

  if (!result.success) {
    console.warn("[UserForm] - Submission result", result);
    const error = result.error.flatten();

    return badRequest<ActionData>({ fields, error });
  }

  const userExists = await checkIfUserExists(fields.email);

  if (userExists) {
    return badRequest<ActionData>({
      error: { formError: ["user exists"] },
    });
  }

  const newUser = await userSignup(rawEmail, rawPassword);

  if (newUser) {
    return redirect("/login");
  } else {
    return badRequest<ActionData>({
      error: { formError: ["Ops! User not created!"] },
    });
  }
};

const SignUpPage = () => {
  const { error, fields } = useActionData<ActionData>() ?? {};
  const transition = useTransition();

  console.log("[SignUpPage]", { transition });

  return (
    <div>
      <h1 className="text-xl text-slate-800 mb-8">Sign Up</h1>
      <UserForm error={error} fields={fields}>
        <Button type="submit" dissabled={transition.state !== "idle"}>
          {transition.state === "idle" ? "Login" : "Logging in..."}
        </Button>
      </UserForm>
    </div>
  );
};

export default SignUpPage;
