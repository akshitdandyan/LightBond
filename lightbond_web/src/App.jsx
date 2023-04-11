import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { io } from "socket.io-client";
import Home from "./pages/Home";
import Pages from "./pages/Pages";

function App() {
    useEffect(() => {
        // const socket = io("ws://localhost:5001");
        // socket.on("connect", () => {
        //     console.log("Connected to server");
        //     socket.on("notification", (data) => {
        //         console.log(data);
        //     });
        // });
    }, []);
    return (
        <BrowserRouter>
            <Pages />
        </BrowserRouter>
    );
}

export default App;
