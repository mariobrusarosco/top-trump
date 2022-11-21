import Card from "~/components/Card"
import Layout from "~/components/Layout/Layout"
import { io } from 'socket.io-client'
 
const URL = 'http://localhost:8000'
const socket = io(URL, {
    path: '/socket.io',
    reconnection: false
})

const MatchBoard = () => {
    console.log({ socket})
    return <section className="match-board">
        <Layout>
            <h1>Turn | Liz</h1>
            <div className="border-2 border-red-600"></div>
            <Card />
        </Layout>
    </section>
}

export default MatchBoard