import type { ActionArgs, LinksFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useActionData } from "@remix-run/react";
import Layout from "~/components/Layout/Layout";

// import stylesUrl from "~/styles/signin.css";
import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";
import { createUserSession, register } from "~/utils/session.server";

export const nullableValidation = (content: string) => {
  return content?.length <= 0 && "field must exists";
};

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const username = form.get("username") as string;
  const password = form.get("password") as string;

  const fields = { username, password };
  const fieldErrors = {
    username: nullableValidation(username),
    password: nullableValidation(password),
  };

  const formHasError = Object.values(fieldErrors).some(Boolean);
  if (formHasError) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  const userExists = await db.user.findFirst({ where: { username } });

  if (userExists) {
    return badRequest({
      fieldErrors: null,
      fields,
      formError: `User with username ${username} already exists`,
    });
  }

  const newUser = await register({ username, password });
  if (!newUser) {
    return badRequest({
      fieldErrors: null,
      fields,
      formError: "Something went wrong trying to create a new user.",
    });
  }

  return createUserSession(newUser.id, "/dashboard");
};
export default function SignUp() {
  const actionData = useActionData<typeof action>();

  return (
    <Layout>
      <div className="container">
        <div className="content" data-light="">
          <h1>Sign Up</h1>
          <form method="post">
            {/* <input
              type="hidden"
              name="redirectTo"
              value={searchParams.get("redirectTo") ?? undefined}
            /> */}

            <div>
              <label htmlFor="username-input">Username</label>
              <input
                type="text"
                id="username-input"
                name="username"
                defaultValue={actionData?.fields?.username}
                aria-invalid={Boolean(actionData?.fieldErrors?.username)}
                aria-errormessage={
                  actionData?.fieldErrors?.username
                    ? "username-error"
                    : undefined
                }
              />
              {actionData?.fieldErrors?.username ? (
                <p
                  className="form-validation-error"
                  role="alert"
                  id="username-error"
                >
                  {actionData.fieldErrors.username}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor="password-input">Password</label>
              <input
                id="password-input"
                name="password"
                type="password"
                defaultValue={actionData?.fields?.password}
                aria-invalid={Boolean(actionData?.fieldErrors?.password)}
                aria-errormessage={
                  actionData?.fieldErrors?.password
                    ? "password-error"
                    : undefined
                }
              />
              {actionData?.fieldErrors?.password ? (
                <p
                  className="form-validation-error"
                  role="alert"
                  id="password-error"
                >
                  {actionData.fieldErrors.password}
                </p>
              ) : null}
            </div>
            <div id="form-error-message">
              {actionData?.formError ? (
                <p className="form-validation-error" role="alert">
                  {actionData.formError}
                </p>
              ) : null}
            </div>
            <button type="submit" className="button">
              Submit
            </button>
          </form>
        </div>
        <div className="links">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/decks">Decks</Link>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
