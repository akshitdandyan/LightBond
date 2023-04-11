import express from "express";
import apiRouter from "./routes";
import io from "./socket";
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

app.listen(5000, () => {
    console.log("Listening on port 5000");
    setTimeout(() => {
        // clearRedis();
        // addNewUser("user-1", "socket-1");
        // getAllUsers();
    }, 2000);
});
