import {SocketClient} from "@cognigy/socket-client";

const client = new SocketClient(process.env.REACT_APP_SOCKET_URL as string, process.env.REACT_APP_SOCKET_TOKEN as string, {
    forceWebsockets: true,
    reconnectionLimit: 0
});

export {client};
