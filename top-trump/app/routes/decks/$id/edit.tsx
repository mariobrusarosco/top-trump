import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Card from "~/components/Card";
import Layout from "~/components/Layout/Layout";
import { db } from "~/utils/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  const deck = await db.deck.findUnique({ where: { id: params?.id } });

  if (!deck) {
    throw new Error("Deck not found");
  }

  return json({ deck });
};

export default function Deck(props) {
  const data = useLoaderData<typeof loader>();

  console.log({ data, props });

  return (
    <Layout>
      <h1 className="bg-red text-3xl font-bold  variant-test:text-teal-300">
        Deck Edit: {data?.deck?.label}
      </h1>
    </Layout>
  );
}
