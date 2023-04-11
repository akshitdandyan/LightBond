import Redis from "ioredis";
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "./envs";

const redis = new Redis({
    port: REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_PASSWORD,
});

redis.on("connect", () => {
    console.log("Redis connected");
});

const REDIS_KEYS = {
    USERS: "users",
};

export const addNewUser = async (userId, socketId) => {
    try {
        await redis.lpush(
            REDIS_KEYS.USERS,
            JSON.stringify({
                userId,
                socketId,
            })
        );
        console.log("User added", userId);
    } catch (error) {
        console.log("[ERROR] addNewUser", error);
    }
};

export const getAllUsers = async () => {
    try {
        const startTimestamp = Date.now();
        const users = await redis.lrange(REDIS_KEYS.USERS, 0, -1);
        console.log("Time taken", Date.now() - startTimestamp);
        console.log("Users", users);
        return users;
    } catch (error) {
        console.log("[ERROR] getUser", error);
    }
};

export const clearRedis = async () => {
    try {
        await redis.flushdb();
        console.log("Redis cleared");
    } catch (error) {
        console.log("[ERROR] clearRedis", error);
    }
};
