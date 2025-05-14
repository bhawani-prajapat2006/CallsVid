import { Server } from "socket.io"


const connectToServer = (server) => {
    const io = new Server(server);
    return io;
}

export default connectToServer;