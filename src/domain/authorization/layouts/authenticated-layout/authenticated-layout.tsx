import { Outlet } from "react-router-dom";

export function AuthenticatedLayout() {
    return <div className="container mx-auto" data-test="authenticated-layout">
            <Outlet />
    </div>
}