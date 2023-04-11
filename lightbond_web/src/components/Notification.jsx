import { User } from "react-feather";
import { formatTimestamp, getAppName } from "../config/helpers";

const Notification = (props) => {
    const notification = props.notification;
    return (
        <div className="max-w-md my-2 border-[1px] border-gray-300 rounded-md p-2">
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

export default Notification;
