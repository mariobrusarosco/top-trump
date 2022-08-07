import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getDeckList } from "~/models/decks.server";

type DecksLoaderData = {
  decks: Awaited<ReturnType<typeof getDeckList>>;
};

export const loader: LoaderFunction = async () => {
  const decks = await getDeckList();

  return json<DecksLoaderData>({ decks });
};

const DecksScreen = () => {
  console.log(useLoaderData());
  const { decks } = useLoaderData() as DecksLoaderData;

  return (
    <main>
      <h1>Decks</h1>

      <ul>
        {decks.map((deck) => (
          <li key={deck.slug}>
            Deck name: {deck.slug}
            <h2>Cards:</h2>
            <ul>
              {deck.cards.map((card: any) => (
                <li key={card.title}>{card.title}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <hr />

      <Link to="edit" className="text-blue-500 underline">
        Edit Decks
      </Link>
      <Link to="new" className="text-blue-500 underline">
        Add a new deck
      </Link>
      <hr />
      <Outlet />
    </main>
  );
};

export default DecksScreen;
