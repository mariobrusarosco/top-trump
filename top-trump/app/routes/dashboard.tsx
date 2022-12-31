import type { LinksFunction } from "@remix-run/node";
import Card from "~/components/Card";
import Layout from "~/components/Layout/Layout";

import stylesUrl from "~/styles/dashboard.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Dashboard() {
  return (
    <Layout>
      <h1 className="bg-red text-3xl font-bold  variant-test:text-teal-300">
        dashboard
      </h1>

      <div className="grid grid-cols-2">
        <div className="my-3">
          <Card />
        </div>

        <div>Results</div>
      </div>
    </Layout>
  );
}
