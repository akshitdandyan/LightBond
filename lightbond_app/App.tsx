/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import RNAndroidNotificationListener from "react-native-android-notification-listener";

import { APP_COLORS } from "./config/constants";
import { useEffect, useState } from "react";
import {
    getUserIdALS,
    removeUserIdALS,
    setUserIdALS,
} from "./config/asyncLocalStorage";
import { connectToDesktop, pollingFromMobile } from "./config/api";

function App(): JSX.Element {
    const [userId, setUserId] = useState("");
    const [connectedToDesktop, setConnectedToDesktop] = useState(false);

    const saveUserId = async () => {
        await removeUserIdALS();
        const { error, message } = await connectToDesktop(userId);
        if (error) {
            //handle
        }
        await setUserIdALS(userId);
        setConnectedToDesktop(true);
        setupMobilePolling();
    };

    const setupMobilePolling = async () => {
        let interval = setInterval(async () => {
            try {
                const res = await pollingFromMobile(userId);
            } catch (error) {
                console.log("[setupMobilePolling] error", error);
            }
        }, 3000);
    };

    const disconnectDesktop = async () => {
        await removeUserIdALS();
        setConnectedToDesktop(false);
    };

    useEffect(() => {
        if (connectedToDesktop) {
            return;
        }
        (async () => {
            const userId = await getUserIdALS();
            console.log("userId", userId);
            if (userId) {
                saveUserId();
                setUserId(userId);
            }
        })();
    }, []);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <StatusBar backgroundColor={APP_COLORS.purple1} />
            <View style={styles.wrapper}>
                <View style={styles.upperSection}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: APP_COLORS.purple2,
                            textAlign: "center",
                        }}
                    >
                        Open
                    </Text>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            color: APP_COLORS.purple2,
                            textAlign: "center",
                        }}
                    >
                        LightBond.app
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: APP_COLORS.purple2,
                            textAlign: "center",
                        }}
                    >
                        in your desktop browser to get started
                    </Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: APP_COLORS.purple4,
                            borderRadius: 100,
                            marginTop: 20,
                            padding: 10,
                        }}
                        onPress={() => {
                            RNAndroidNotificationListener.requestPermission();
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 12,
                                textAlign: "center",
                            }}
                        >
                            Allow Notifications
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.lowerSection}>
                    <View style={styles.centerBox}>
                        <View style={styles.lowerSectionHolder}></View>
                        {!connectedToDesktop && (
                            <>
                                <TextInput
                                    style={{
                                        width: 200,
                                        backgroundColor: "white",
                                        opacity: 0.8,
                                        borderRadius: 100,
                                        marginTop: 20,
                                        color: APP_COLORS.purple1,
                                        fontSize: 24,
                                        padding: 18,
                                        textAlign: "center",
                                    }}
                                    placeholder="Enter Code"
                                    placeholderTextColor={"gray"}
                                    onChangeText={(text) => {
                                        setUserId(text);
                                    }}
                                    value={userId}
                                />
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: "white",
                                        borderRadius: 100,
                                        marginTop: 20,
                                        padding: 10,
                                    }}
                                    onPress={saveUserId}
                                >
                                    <Text
                                        style={{
                                            color: APP_COLORS.purple1,
                                            fontSize: 16,
                                            textAlign: "center",
                                        }}
                                    >
                                        Connect
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                        {connectedToDesktop && (
                            <>
                                <Text
                                    style={{
                                        color: "white",
                                        fontSize: 24,
                                        textAlign: "center",
                                        marginTop: 20,
                                    }}
                                >
                                    Connected
                                </Text>

                                <Text
                                    style={{
                                        color: "gray",
                                        fontSize: 18,
                                        textAlign: "center",
                                        marginTop: 14,
                                    }}
                                >
                                    Notifications from this device are now being
                                    sent to your desktop
                                </Text>

                                <TouchableOpacity
                                    style={{
                                        backgroundColor: "white",
                                        borderRadius: 100,
                                        marginTop: 20,
                                        padding: 10,
                                    }}
                                    onPress={disconnectDesktop}
                                >
                                    <Text
                                        style={{
                                            color: "red",
                                            fontSize: 16,
                                            textAlign: "center",
                                        }}
                                    >
                                        Disconnect
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: "white",
    },
    wrapper: {
        flex: 1,
    },
    upperSection: {
        height: 200,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    lowerSection: {
        flex: 1,
        backgroundColor: APP_COLORS.purple1,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 20,
    },
    lowerSectionHolder: {
        width: 50,
        height: 6,
        borderRadius: 40,
        backgroundColor: "white",
        opacity: 0.9,
    },
    centerBox: {
        justifyContent: "center",
        alignItems: "center",
    },
});

export default App;
