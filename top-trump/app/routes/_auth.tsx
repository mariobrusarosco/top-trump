import { Link, Outlet } from "@remix-run/react";

export default function AuthenticatedLayout() {
  return (
    <>
      <header>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
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
      <Outlet />
    </>
  );
}
