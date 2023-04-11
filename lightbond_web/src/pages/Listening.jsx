import { useEffect, useState } from "react";
import HeaderUser from "../components/HeaderUser";
import { connectSocket } from "../config/socket";
import { formatTimestamp } from "../config/helpers";
import Notification from "../components/Notification";

const Listening = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        (async () => {
            if (!window.lightbondSocket) {
                await connectSocket();
            }
            window.addEventListener("message", (event) => {
                if (event.data.type === "NOTIFICATION") {
                    setNotifications((prev) => [
                        typeof event.data.notification === "string"
                            ? JSON.parse(event.data.notification)
                            : event.data.notification,
                        ...prev,
                    ]);
                }
            });
        })();
    }, []);
    return (
        <div className="">
            <HeaderUser username={"Kiana"} />
            <div className="p-4">
                {notifications.map((notification, i) => (
                    <Notification key={i} notification={notification} />
                ))}
            </div>
        </div>
    );
};

export default Listening;
