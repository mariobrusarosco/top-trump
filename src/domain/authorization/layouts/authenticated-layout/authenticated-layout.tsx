import { Outlet } from "react-router-dom";
import { Header } from "../../../shared/components/header";

export function AuthenticatedLayout() {
    return <div className="h-screen">
        
        <div className="h-full container mx-auto flex" data-test="authenticated-layout">
            <Header />
            <Outlet />
        </div>
    </div>
}