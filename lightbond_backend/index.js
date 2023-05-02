import express from "express";
import apiRouter from "./routes";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupSocketIo } from "./socket";
import { PORT } from "./config/envs";
// import { addNewUser, clearRedis, getAllUsers } from "./config/redis";

const app = express();

app.use(express.json());
// cors
app.use((req, res, next) => {
    console.log("🧩[req]", req.method, req.url);
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use("/api", apiRouter);

const server = createServer(app);

setupSocketIo(server);

server.listen(PORT, () => {
    console.log("Listening on port", PORT);
    setTimeout(() => {
        // clearRedis();
        // addNewUser("user-1", "socket-1");
        // getAllUsers();
    }, 2000);
});
