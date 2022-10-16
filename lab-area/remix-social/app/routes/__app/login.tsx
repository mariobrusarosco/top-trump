import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData, useTransition } from "@remix-run/react";
import { Button } from "~/components/Button";
import { UserForm } from "~/components/UserForm";
import { authenticator, USER_LOGIN_STRATEGY } from "~/services/auth.server";
import { getSession, destroySession } from "~/services/session.service";

export const action: ActionFunction = async ({ request }) => {
  return authenticator.authenticate(USER_LOGIN_STRATEGY, request, {
    successRedirect: "/",
    throwOnError: true,
    failureRedirect: "/login",
  });
};

type LoaderData = {
  error?: {
    formError: string[];
  };
};

export let loader: LoaderFunction = async ({ request }) => {
  console.log("[SIGN IN] -loader", request);
  await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });

  let session = await getSession(request.headers.get("cookie"));
  let error = session.get(authenticator.sessionErrorKey) as Error[] | Error;

  console.log("[SIGN IN] -session", session);

  if (error) {
    session.unset(authenticator.sessionErrorKey);
    return json({
      error: {
        formError: [
          "Unable to login with those credentials, please try again!",
        ],
      },
    });
  } else {
    return json({
      error: {
        formError: [],
      },
    });
  }
};

const SignIn = () => {
  const { error } = useLoaderData<LoaderData>();
  const transition = useTransition();

  // console.log({ transition,  });

  return (
    <div>
      <h1 className="text-xl text-slate-800 mb-8">Sign In</h1>
      <UserForm error={error}>
        <Button type="submit" dissabled={transition.state !== "idle"}>
          {transition.state === "idle" ? "Login" : "Logging in..."}
        </Button>
      </UserForm>
    </div>
  );
};

export default SignIn;
