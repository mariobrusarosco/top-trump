import type { ActionFunction } from "@remix-run/server-runtime";
import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/server-runtime";
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import type { Deck } from "~/models/decks.server";
import { getDeckList } from "~/models/decks.server";

type LoaderData = {
  slug: string | undefined;
  deck: Deck | undefined;
};

export const loader: LoaderFunction = async ({ params }) => {
  const slug = params?.slug;
  const decks = await getDeckList();
  const deck = decks.find((deck) => deck.slug === slug);

  return json<LoaderData>({ slug, deck });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const deckName = formData.get("deck-name");

  const errors = {
    deckName: deckName ? null : "Deck name is mandatory",
  };
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);

  if (hasErrors) {
    return json(errors);
  }

  return redirect("/");
};

export default function EditDeckScreen() {
  const { slug, deck } = useLoaderData() as LoaderData;
  const errors = useActionData();
  const transition = useTransition();

  const isCreating = Boolean(transition.submission);

  console.log({ slug, errors, isCreating });

  return (
    <main>
      <h1>Edit Deck</h1>

      <Form method="post" key="oba">
        <div>
          <label htmlFor="deck-name">Deck name</label>
          <input
            type="text"
            id="deck-name"
            name="deck-name"
            defaultValue={deck?.slug}
          />
          {errors?.deckName && <span>{errors?.deckName}</span>}
        </div>

        <button type="submit" disabled={isCreating as unknown as boolean}>
          {isCreating ? "Saving..." : "Save"}
        </button>
      </Form>
    </main>
  );
}
