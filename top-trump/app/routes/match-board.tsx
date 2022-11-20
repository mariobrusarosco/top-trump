import Card from "~/components/Card"
import Layout from "~/components/Layout/Layout"

const MatchBoard = () => {
    return <section className="match-board">
        <Layout>
            <h1>Turn | Liz</h1>
            <div className="border-2 border-red-600"></div>
            <Card />
        </Layout>
    </section>
}

export default MatchBoard