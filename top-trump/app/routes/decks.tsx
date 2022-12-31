import { Outlet } from "@remix-run/react";
import Card from "~/components/Card";
import Layout from "~/components/Layout/Layout";

export default function Decks() {
  return (
    <Layout>
      <h1 className="bg-red text-3xl font-bold  variant-test:text-teal-300">
        Decks
      </h1>

      <Outlet />
    </Layout>
  );
}
