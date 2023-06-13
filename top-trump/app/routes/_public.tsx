import { Link, Outlet } from "@remix-run/react";

export default function PublicLayout() {
  return (
    <>
      <header>
        <ul>
          <li>
            <Link to="/sign-in">Sign In</Link>
          </li>
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
        </ul>
      </header>
      <Outlet />
    </>
  );
}
