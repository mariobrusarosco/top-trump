import { createContext } from "react";
import type { Socket } from "socket.io-client";

export interface ISocketContextState {
    socket: Socket | undefined;
    uid: string;
    users: string[]
}

export const defaultSocketContextState: ISocketContextState = {
    socket: undefined,
    uid: '',
    users: []
}

export type TSocketContextActions = 'update_socket' | 'update_uid' | 'update_users' | 'remove_user';
export type TSocketContextPayload = string | string[] | Socket;

export interface ISocketContextActions {
    type: TSocketContextActions;
    payload: TSocketContextPayload;
}


export const SocketReducer = (state: ISocketContextState, action: ISocketContextActions) => {
    console.log('Message recieved - Action: ' + action.type + ' - Payload: ', action.payload);

    switch (action.type) {
        case 'update_socket':
            console.log('---- update_socket ---',  action.payload )
            return { ...state, socket: action.payload as Socket };
        case 'update_uid':
            console.log('---- update_uid ---',  action.payload )
            return { ...state, uid: action.payload as string };
        case 'update_users':
            console.log('---- update_users ---',  action.payload )
            return { ...state, users: action.payload as string[] };
        case 'remove_user':
            const newState= { ...state, users: state.users.filter((uid) => uid !== (action.payload as string)) };
            alert("user: " + action?.payload + "has been removed")
            return newState
        default:
            return state;
    }
};

export interface ISocketContextProps {
    SocketState: ISocketContextState;
    SocketDispatch: React.Dispatch<ISocketContextActions>;
}

const SocketContext = createContext<ISocketContextProps>({
    SocketState: defaultSocketContextState,
    SocketDispatch: () => {}
});

export const SocketContextConsumer = SocketContext.Consumer;
export const SocketContextProvider = SocketContext.Provider;

export default SocketContext;