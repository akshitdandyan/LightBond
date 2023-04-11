export function formatTimestamp(ts) {
    const date = new Date(typeof ts === "string" ? Number(ts) : ts);
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${hour}:${minute}`;
}

export function getAppName(packageName) {
    const appName = packageName.split(".")[1];
    return appName.charAt(0).toUpperCase() + appName.slice(1);
}
