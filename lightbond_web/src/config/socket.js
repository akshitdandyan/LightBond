import { io } from "socket.io-client";

export function connectSocket() {
    return new Promise((resolve) => {
        if (window.lightbondSocket) {
            return console.log("Socket already connected");
        }
        const id = localStorage.getItem("id");

        if (!id) {
            window.location.href = "/";
        }

        const socket = io("ws://localhost:5001", {
            auth: {
                id,
            },
        });
        socket.on("connect", () => {
            console.log("Connected to server");
            window.lightbondSocket = socket;

            socket.on("SHOW_NOTIFICATION_SCREEN", () => {
                window.postMessage(
                    {
                        type: "SHOW_NOTIFICATION_SCREEN",
                    },
                    "*"
                );
            });

            socket.on("MOBILE_NOT_PINGED_RECENTLY", () => {
                alert("Mobile not pinged recently");
                // window.location.href = "/";
            });

            socket.on("notification", (data) => {
                window.postMessage(
                    {
                        type: "NOTIFICATION",
                        notification: data,
                    },
                    "*"
                );
            });

            resolve(socket);
        });
    });
}
