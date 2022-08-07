import { Link, useLoaderData } from "@remix-run/react";

const DecksScreen = () => {
  useLoaderData();

  return (
    <main>
      <h1>Top Trump</h1>

      <nav>
        <ul>
          <li>
            <Link to="decks" className="text-blue-500 underline">
              decks
            </Link>
          </li>
          <li>
            <Link to="posts" className="text-blue-500 underline">
              posts
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
};

export default DecksScreen;
