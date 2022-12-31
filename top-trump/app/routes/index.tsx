import type { LinksFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
import Layout from "~/components/Layout/Layout";

import stylesUrl from "~/styles/app.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
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
          </ul>
        </header>
        <Outlet />
      </Layout>
    </div>
  );
}
