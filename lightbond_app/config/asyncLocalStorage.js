import AsyncStorage from "@react-native-async-storage/async-storage";

const ASYNC_STORAGE_KEYS = {
    USER_ID: "userId",
};

export const getUserIdALS = async () => {
    try {
        const userId = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.USER_ID);
        return userId;
    } catch (error) {
        console.log("[ERROR] getUserId", error);
    }
};

export const setUserIdALS = async (userId) => {
    try {
        await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.USER_ID, userId);
        console.log("User id set", userId);
    } catch (error) {
        console.log("[ERROR] setUserId", error);
    }
};

export const removeUserIdALS = async () => {
    try {
        await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.USER_ID);
        console.log("User id removed");
    } catch (error) {
        console.log("[ERROR] removeUserId", error);
    }
};
