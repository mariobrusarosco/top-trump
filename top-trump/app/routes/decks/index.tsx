import { Link } from "@remix-run/react";
import Card from "~/components/Card";
import Layout from "~/components/Layout/Layout";

export default function Decks() {
  return (
    <Layout>
      <h1 className="bg-red text-3xl font-bold  variant-test:text-teal-300">
        Decks
      </h1>

      <Link
        to="/decks/edit"
        className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
      >
        Edit
      </Link>
    </Layout>
  );
}
