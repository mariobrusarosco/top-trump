import type { ActionArgs } from "@remix-run/node";
import { LoaderArgs, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Card from "~/components/Card";
import Layout from "~/components/Layout/Layout";
import { db } from "~/utils/db.server";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();

  const label = form.get("label") as string;

  if (!label) {
    throw new Error("label input field is null or invalid");
  }

  const fields = { label, image: "" };

  const newDeck = await db.deck.create({
    data: fields,
  });
  console.warn(newDeck);

  return redirect(`/decks`);
};

export default function NewDeck(props) {
  return (
    <Layout>
      <h1 className="bg-red text-3xl font-bold  variant-test:text-teal-300">
        New Deck
      </h1>

      <form action="post">
        <div>
          <label htmlFor="label">label</label>
          <input id="label" type="text" />
        </div>

        <button type="submit">create new deck</button>
      </form>
    </Layout>
  );
}
