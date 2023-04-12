import { config } from "dotenv";

config();

export const REDIS_PORT = process.env.REDIS_PORT;
export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
export const PORT = process.env.PORT || 5000;
