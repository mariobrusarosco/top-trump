
import type { LinksFunction } from "@remix-run/node";

import stylesUrl from "~/styles/index.css";


export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Index() {
    console.log({stylesUrl})
    return (
        <section className="index">
            oba@
        </section>
    )
}