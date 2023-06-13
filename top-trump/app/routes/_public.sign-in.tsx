import type { ActionArgs } from "@remix-run/node";
import Layout from "~/components/Layout/Layout";
import { badRequest } from "~/utils/request.server";

import { db } from "~/utils/db.server";
import { createUserSession, login } from "~/utils/session.server";
import { useActionData } from "@remix-run/react";

export const nullableValidation = (content: string) => {
  return content?.length <= 0 && "field must exists";
};

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const email = form.get("email") as string;
  const password = form.get("password") as string;

  const fields = { email, password };
  const fieldErrors = {
    email: nullableValidation(email),
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

  const user = await login({ email, password });
  if (!user) {
    return badRequest({
      fieldErrors: null,
      fields,
      formError: "email/Password combination is incorrect",
    });
  }

  return createUserSession(user.id, "/dashboard");
};

export default function SignIn() {
  const actionData = useActionData<typeof action>();

  return (
    <Layout>
      <h1 className="bg-red text-3xl font-bold  variant-test:text-teal-300">
        sign in
      </h1>

      <form method="post">
        {/* <input
              type="hidden"
              name="redirectTo"
              value={searchParams.get("redirectTo") ?? undefined}
            /> */}

        <div>
          <label htmlFor="email-input">email</label>
          <input
            type="text"
            id="email-input"
            name="email"
            defaultValue={actionData?.fields?.email}
            aria-invalid={Boolean(actionData?.fieldErrors?.email)}
            aria-errormessage={
              actionData?.fieldErrors?.email ? "email-error" : undefined
            }
          />
          {actionData?.fieldErrors?.email ? (
            <p className="form-validation-error" role="alert" id="email-error">
              {actionData.fieldErrors.email}
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
              actionData?.fieldErrors?.password ? "password-error" : undefined
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
    </Layout>
  );
}
