import type { LayoutProps } from "./interface"

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="container border-2 border-red-400">
            {children}
        </div>
    )
}

export default Layout