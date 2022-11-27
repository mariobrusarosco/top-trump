import { useContext } from "react";
import SocketContext from "~/contexts/Socket/Context";

const Board = () => {
    const { SocketState } = useContext(SocketContext)
    

    return (
        <div>
            <h2>Socket IO Information:</h2>
            <p>
                Your user ID: <strong>{SocketState?.uid}</strong>
                <br />
                Users online: <strong>{SocketState?.users.length}</strong>
                <br />
                Socket ID: <strong>{SocketState?.socket?.id}</strong>
                <br />
            </p>
        </div>
    );
}

export default Board