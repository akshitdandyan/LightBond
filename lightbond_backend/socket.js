import { Server } from "socket.io";
import CONNECTION from "./connections";

const io = new Server(5001, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    // console.log("a user connected", socket.handshake.auth);
    if (socket.handshake.auth.id) {
        const id = socket.handshake.auth.id;
        CONNECTION.addConnection(socket, id);
    }
});

export function emitNotification(id, notification) {
    const connection = CONNECTION.getConnection(id);
    if (connection && connection.socket) {
        connection.socket.emit("notification", notification);
    } else {
        console.log("[ERROR] emitNotification: connection not found");
    }
}

export function askDesktopToShowNotificationScreen(id) {
    try {
        const connection = CONNECTION.getConnection(id);
        if (connection && connection.socket) {
            connection.socket.emit("SHOW_NOTIFICATION_SCREEN");
        } else {
            console.log(
                "[ERROR] askDesktopToShowNotificationScreen: connection not found"
            );
        }
    } catch (error) {
        console.log("[ERROR] askDesktopToShowNotificationScreen", error);
    }
}

export default io;
