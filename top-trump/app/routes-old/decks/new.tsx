import type { ActionArgs } from "@remix-run/node";
import { LoaderArgs, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import Card from "~/components/Card";
import Layout from "~/components/Layout/Layout";
import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";

export function ErrorBoundary() {
  return <div className="error-container">Error on Decks New route!</div>;
}

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();

  console.log({ form });

  const label = form.get("label") as string;

  const fieldErrors = {
    label: simpleFieldValidation(label),
  };
  const fields = { label, image: "" };

  const formHasError = Object.values(fieldErrors).some(Boolean);

  if (formHasError) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  // This is the example of a Mutation: Post
  const newDeck = await db.deck.create({
    data: fields,
  });

  return redirect(`/decks/${newDeck?.id}`);
};

function simpleFieldValidation(content: string) {
  if (content?.length > 20) {
    return "label is too long. Try less than 20 chars";
  }

  return null;
}

export default function NewDeck(props) {
  const actionData = useActionData<typeof action>();
  console.log({ actionData });

  return (
    <Layout>
      <h1 className="bg-red text-3xl font-bold  variant-test:text-teal-300">
        New Deck
      </h1>

      <form method="post">
        <div>
          <label>
            Name:{" "}
            <input
              type="text"
              name="label"
              defaultValue={actionData?.fields?.label}
              aria-invalid={
                Boolean(actionData?.fieldErrors?.label) || undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.label ? "label-error" : undefined
              }
            />
          </label>
          {actionData?.fieldErrors?.label ? (
            <p className="form-validation-error" role="alert" id="name-error">
              {actionData.fieldErrors.label}
            </p>
          ) : null}
        </div>

        <div>
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
    </Layout>
  );
}
