import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData, useParams } from "@remix-run/react";
import Card from "~/components/Card";
import Layout from "~/components/Layout/Layout";
import { db } from "~/utils/db.server";

export function ErrorBoundary() {
  const { id } = useParams();
  return (
    <div className="error-container">
      There was an error loading deck by the id "${id}". Sorry.
    </div>
  );
}

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
        Deck: {data?.deck?.label}
      </h1>
      <Outlet />
    </Layout>
  );
}
