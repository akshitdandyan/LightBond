import { useEffect, useState } from "react";
import appAxios from "../config/axios";
import { ILLUSTRATION_A_URL, QR_CODE_URL } from "../config/constants";
import Header from "../components/Header";
import { connectSocket } from "../config/socket";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        (async () => {
            try {
                if (localStorage.getItem("id")) {
                    setId(localStorage.getItem("id"));
                    connectSocket(localStorage.getItem("id"));
                    console.log("Info: id already exists");
                    return;
                }
                console.log("Info: Requesting new id");
                const res = await appAxios.get("/new-id");
                if (
                    typeof res.data.id === "string" &&
                    res.data.id.length === 4
                ) {
                    localStorage.setItem("id", res.data.id);
                    setId(res.data.id);
                    connectSocket(res.data.id);
                } else {
                    setMessage("Something went wrong");
                }
            } catch (error) {
                console.log("[ERROR] Home.jsx: useEffect: ", error);
            }
        })();
    }, []);

    function navigateToNotificationsScreen(event) {
        if (event.data.type === "SHOW_NOTIFICATION_SCREEN") {
            navigate("/listening");
        }
    }

    useEffect(() => {
        window.addEventListener("message", navigateToNotificationsScreen);
        () => {
            window.removeEventListener(
                "message",
                navigateToNotificationsScreen
            );
        };
    }, []);

    return (
        <div className="">
            <Header />
            <div className="grid grid-cols-2">
                <div className="flex flex-col z-10 p-4">
                    <h1 className="text-4xl font-bold text-white">
                        Make lightweight, stable and long lasting bond across
                        your devices.
                    </h1>
                    <div className="my-4 bg-white text-indigo-600 text-xs font-bold px-4 py-2 rounded-full w-max shadow-lg">
                        STEP 1: GET THE APP
                    </div>
                    <div className="flex items-center">
                        <img
                            src={QR_CODE_URL}
                            alt="qr code"
                            className="h-[220px]"
                        />
                        <div>
                            <div className="ml-1">OR</div>
                            <div className="text-lg">
                                Type{" "}
                                <span className="text-blue-800 bg-white rounded-full px-3 py-2 text-sm hover:shadow-lg shadow-black cursor-pointer">
                                    lightbond.link/apk
                                </span>{" "}
                                in your mobile browser
                            </div>
                        </div>
                    </div>
                    <div className="my-4 bg-white text-indigo-600 text-xs font-bold px-4 py-2 rounded-full w-max shadow-lg">
                        STEP 2: QUICK CONNECT
                    </div>
                    {id && (
                        <div className="flex items-center">
                            <div>Open app, and enter your unique code:</div>
                            <div className="bg-white ml-2 text-indigo-600 text-xs font-bold px-4 py-2 rounded-full w-max">
                                {id}
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <div className="fixed bottom-0 right-0 h-[500px]">
                        <img
                            className="h-full"
                            src={ILLUSTRATION_A_URL}
                            alt="illustration"
                        />
                        <div className="absolute bottom-0 right-0 h-full w-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
