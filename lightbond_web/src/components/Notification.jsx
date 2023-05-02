import { ChevronUp, User } from "react-feather";
import { formatTimestamp, getAppName } from "../config/helpers";
import { useId, useState } from "react";
import Bell from "./Icons/Bell";
import Broom from "./Icons/Broom";

const NotificationEach = (props) => {
    const notification = props.notification;
    return (
        <div
            className={
                "max-w-md my-2 border-[1px] relative border-gray-300 rounded-md p-2 hover:scale-95 duration-200 " +
                props.notification.title
            }
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    {!notification.iconLarge ? (
                        <User />
                    ) : (
                        <img
                            src={notification.iconLarge}
                            alt="Icon Large"
                            className="w-8 h-8 rounded-full"
                        />
                    )}
                    <div>
                        <div className="text-sm opacity-60">
                            {getAppName(notification.app)}
                        </div>
                        <div>{notification.title}</div>
                    </div>
                </div>
                <div>{formatTimestamp(notification.time)}</div>
            </div>
            <div>{notification.text}</div>
        </div>
    );
};

const Notification = (props) => {
    const title = props.title;
    const notifications = props.notifications;

    const id = useId();

    const [collapsed, setCollapsed] = useState(true);

    const clearNotifications = async () => {
        const notificationItems = document.getElementsByClassName(title);
        console.log(notificationItems);
        // in array form
        const notificationItemsArray = Array.from(notificationItems);
        for (let i = 0; i < notificationItemsArray.length; i++) {
            notificationItemsArray[i].style.border = "none";
            notificationItemsArray[i].style.marginLeft = "-300px";
            await new Promise((resolve) => setTimeout(resolve, 200));
            notificationItemsArray[i].remove();
        }
        props.removeNotificationByTitle(title);
    };

    return (
        <div
            id={id}
            className={`max-w-md p-2 rounded-md my-2 ${
                collapsed
                    ? ""
                    : "border-[1px] border-gray-300 bg-gradient-to-tr from-indigo-600 to-purple-500"
            }`}
        >
            <div
                className="flex  cursor-pointer rounded-md p-2 hover:bg-white hover:bg-opacity-25 active:bg-opacity-10"
                onClick={() => setCollapsed(!collapsed)}
            >
                <div className="">{title}</div>
                {collapsed ? (
                    <div className="flex mx-2 items-center text-sm">
                        <Bell />
                        {notifications.length + " "}
                        Notifications
                    </div>
                ) : (
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            clearNotifications();
                        }}
                        className="flex mx-2 gap-1 text-black bg-white rounded-full px-2 items-center text-sm"
                    >
                        <Broom />
                        Clear Notifications
                    </div>
                )}
                <div
                    className="cursor-pointer ml-auto"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <ChevronUp
                        className={`duration-200 ease-in-out transform ${
                            collapsed ? "rotate-180" : "rotate-0"
                        }`}
                    />
                </div>
            </div>
            <div
                className="duration-300 ease-in-out cursor-pointer"
                onClick={() => setCollapsed(!collapsed)}
                style={
                    collapsed
                        ? {
                              height: "0px",
                              opacity: "0",
                              overflow: "hidden",
                          }
                        : {
                              height: "auto",
                              opacity: "1",
                              overflow: "visible",
                          }
                }
            >
                {notifications.map((notification, i) => (
                    <NotificationEach
                        key={i}
                        notification={notification}
                    ></NotificationEach>
                ))}
            </div>
        </div>
    );
};

export default Notification;
