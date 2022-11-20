import { Outlet } from "@remix-run/react";

export default function Jokes() {
    return (
        <main className="jokes">
            <h1>Jokes!!</h1>

            <Outlet />
        </main>
    )
}