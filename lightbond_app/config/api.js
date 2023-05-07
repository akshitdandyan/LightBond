import { getUserIdALS } from "./asyncLocalStorage";

const API_URL = "http://192.168.1.2:5000/api";
// const API_URL = "https://lightbond.fly.dev/api";

export async function connectToDesktop(id) {
    try {
        console.log("[connectToDesktop] id", id);
        const res = await fetch(`${API_URL}/verify-id-and-connect`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
            }),
        });
        const data = await res.json();
        console.log("[connectToDesktop] data", data);
        return {
            message: data.message,
            error: data.error,
        };
    } catch (error) {
        console.log("[connectToDesktop] error", error);
        return {
            error: error.message,
        };
    }
}

export async function pollingFromMobile(id) {
    try {
        const res = await fetch(`${API_URL}/polling-from-mobile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
            }),
        });
        const data = await res.json();
        console.log("[pollingFromMobile] data", data);
        return {
            message: data.message,
            error: data.error,
        };
    } catch (error) {
        console.log("[pollingFromMobile] error", error);
        return {
            error: error.message,
        };
    }
}

export async function sendNotificationDetailsToServer(details) {
    try {
        const id = await getUserIdALS();
        if (!id) {
            return console.log(
                "[sendNotificationDetailsToServer] id not found in async storage"
            );
        }
        const res = await fetch(`${API_URL}/notification`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                notification: details,
                id,
            }),
        });
        const data = await res.json();
        console.log("[sendNotificationDetailsToServer] data", data);
    } catch (error) {
        console.log("[sendNotificationDetailsToServer] error", error);
    }
}
