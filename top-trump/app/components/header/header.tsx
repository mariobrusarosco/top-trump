// import type { User } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
// import type { getUser } from "~/utils/session.sever";

// type User = Awaited<ReturnType<typeof getUser>>;

export const Header = ({ user }: { user: User }) => {
  return (
    <header>
      <ul>
        <li>
          <Link
            to="/"
            className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
          >
            Home!
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

        {user && (
          <>
            <li>{user.username}</li>
            <li>
              <form action="/logout" method="post">
                <button type="submit" className="button">
                  Logout
                </button>
              </form>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};
