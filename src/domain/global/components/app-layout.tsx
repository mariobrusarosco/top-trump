import { Outlet, Link } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <header>
        <ul>
          <li>
            {" "}
            <Link to={`dashboard`}>Dashboard</Link>
          </li>
        </ul>
      </header>
      <Outlet />
    </>
  );
};

export default AppLayout;
