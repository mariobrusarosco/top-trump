import type { LinksFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
import Card from "~/components/Card";
import Layout from "~/components/Layout/Layout";

import stylesUrl from "~/styles/dashboard.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Dashboard() {
  return (
    <Layout>
      <header>
        <ul>
          <li>
            <Link
              to="/"
              className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/signin"
              className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
            >
              Sign in
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
            >
              Sign up
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
            >
              Dashboard
            </Link>
          </li>

          <li>
            <form action="/logout" method="post">
              <button type="submit" className="button">
                Logout
              </button>
            </form>
          </li>
        </ul>
      </header>
      <h1 className="bg-red text-3xl font-bold  variant-test:text-teal-300">
        dashboard
      </h1>

      <div className="grid grid-cols-2">
        <div className="my-3">
          <Card />
        </div>

        <div>Results</div>
      </div>

      <Outlet />
    </Layout>
  );
}
