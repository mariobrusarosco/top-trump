import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { getDeckList } from "~/models/decks.server";

type EditDecksLoaderData = {
  decks: Awaited<ReturnType<typeof getDeckList>>;
};

export const loader: LoaderFunction = async () => {
  const decks = await getDeckList();

  return json<EditDecksLoaderData>({ decks });
};

const EditDecksScreen = () => {
  const { decks } = useLoaderData() as EditDecksLoaderData;

  return (
    <main>
      <h1>Decks - Edit Mode</h1>

      <ul>
        {decks.map((deck) => (
          <li key={deck.slug}>
            <Link to="/deck/edit" className="text-blue-500 underline">
              {deck.slug}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default EditDecksScreen;
