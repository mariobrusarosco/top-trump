import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Card from "~/components/Card";
import Layout from "~/components/Layout/Layout";
import { db } from "~/utils/db.server";

export const loader = async () => {
  return json({
    decks: await db.deck.findMany({
      select: { id: true, image: true, label: true },
    }),
  });
};

export default function Decks() {
  const { decks } = useLoaderData<typeof loader>();

  console.log({ decks });

  return (
    <Layout>
      <h1 className="bg-red text-3xl font-bold  variant-test:text-teal-300">
        Decks
      </h1>

      {decks.map((deck) => (
        <li key={deck.id}>
          <Link to={deck.id}>{deck.label}</Link>
        </li>
      ))}

      <Link
        to="/decks/edit"
        className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
      >
        Edit
      </Link>

      <Link
        to="/decks/new"
        className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
      >
        New
      </Link>
    </Layout>
  );
}
