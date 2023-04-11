/**
 * @format
 */

import { AppRegistry } from "react-native";
import { RNAndroidNotificationListenerHeadlessJsName } from "react-native-android-notification-listener";
import App from "./App";
import { name as appName } from "./app.json";
import { sendNotificationDetailsToServer } from "./config/api";

const headlessNotificationListener = async ({ notification }) => {
    try {
        if (
            JSON.parse(notification).app.includes("netspeed") ||
            JSON.parse(notification).app.includes("systemui")
        ) {
            return;
        }
        console.log(
            "[RNAndroidNotificationListenerHeadlessJs] Notification: ",
            JSON.parse(notification).app,
            JSON.parse(notification).title,
            JSON.parse(notification).text
        );
        sendNotificationDetailsToServer(JSON.parse(notification));
    } catch (error) {
        console.log("[RNAndroidNotificationListenerHeadlessJs] Error: ", error);
    }
};

AppRegistry.registerHeadlessTask(
    RNAndroidNotificationListenerHeadlessJsName,
    () => headlessNotificationListener
);

AppRegistry.registerComponent(appName, () => App);
