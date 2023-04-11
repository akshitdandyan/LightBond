let CONNECTIONS = []; // {id:string, socket:string, mobileLastPing:number}

function randomId() {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let id = "";
    for (let i = 0; i < 4; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }
    // check if id already exists
    if (CONNECTIONS.find((connection) => connection.id === id)) {
        return randomId();
    }
    return id;
}

export function getNewUniqueConnectionId() {
    let id = randomId();
    while (CONNECTIONS.includes(id)) {
        id = randomId();
    }
    return id;
}

export function validateNewConnectionId(id) {
    // already exists
    if (CONNECTIONS.find((connection) => connection.id === id)) {
        return { valid: false, reason: "id already exists" };
    }
    // is alphanumeric
    if (!/^[0-9a-zA-Z]+$/.test(id)) {
        return { valid: false, reason: "id must be alphanumeric" };
    }
    // is 4 characters long
    if (id.length !== 4) {
        return { valid: false, reason: "id must be 4 characters long" };
    }
    return { valid: true };
}

export function acknowledgeDesktopIfNotPingedRecentlyByMobile(id) {
    let interval = setInterval(() => {
        const connection = CONNECTIONS.find(
            (connection) => connection.id === id
        );
        if (connection) {
            if (connection.mobileLastPing) {
                const timeSinceLastPing =
                    Date.now() - connection.mobileLastPing;
                if (timeSinceLastPing > 10000) {
                    connection.socket.emit("MOBILE_NOT_PINGED_RECENTLY");
                    connection.mobileLastPing = null;
                    clearInterval(interval);
                } else {
                    console.log("Mobile pinged recently: ", timeSinceLastPing);
                }
            }
        }
    }, 5000);
}

function addConnection(socket, id) {
    const validation = validateNewConnectionId(id);
    if (!validation.valid) {
        console.log("[ERROR] addConnection", validation.reason);
        if (validation.reason === "id already exists") {
            updateSocket(id, socket);
        }
        return;
    }
    CONNECTIONS.push({ id, socket, mobileLastPing: null });
    // console.log("CONNECTIONS", CONNECTIONS);
}

function updateSocket(id, socket) {
    const index = CONNECTIONS.findIndex((connection) => connection.id === id);
    if (index > -1) {
        // remove old socket
        CONNECTIONS.splice(index, 1);
        // add new socket
        CONNECTIONS.push({ id, socket, mobileLastPing: null });
        console.log("Socket updated for id", id);
    }
    // console.log("CONNECTIONS", CONNECTIONS);
}

function updateMobileLastPing(id) {
    const index = CONNECTIONS.findIndex((connection) => connection.id === id);
    if (index > -1) {
        CONNECTIONS[index].mobileLastPing = Date.now();
    } else {
        console.log("updateMobileLastPing: connection not found with id", id);
    }
}

function removeConnection(id) {
    const index = CONNECTIONS.findIndex((connection) => connection.id === id);
    if (index > -1) {
        CONNECTIONS.splice(index, 1);
    }
    // console.log("CONNECTIONS", CONNECTIONS);
}

function getConnection(id) {
    const connection = CONNECTIONS.find((connection) => connection.id === id);
    if (connection) {
        return connection;
    }
    return null;
}

const CONNECTION = {
    addConnection,
    removeConnection,
    getConnection,
    updateMobileLastPing,
};

export default CONNECTION;
