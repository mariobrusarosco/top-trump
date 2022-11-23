import { useContext } from "react"
import Board from "~/components/Board"
import Card from "~/components/Card"
import Layout from "~/components/Layout/Layout"
import SocketContextComponent from "~/contexts/Socket/Component"
import SocketContext from "~/contexts/Socket/Context"

const MatchBoard = () => {
    return (
        <SocketContextComponent>
            <Board />
        </SocketContextComponent>
    );
}

export default MatchBoard