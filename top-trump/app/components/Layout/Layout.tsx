import type { LayoutProps } from "./interface"

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="container mx-auto border-2 border-red-400">
            {children}
        </div>
    )
}

export default Layout