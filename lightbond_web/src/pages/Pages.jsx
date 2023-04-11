import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Listening from "./Listening";

const Pages = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/listening" element={<Listening />} />
            </Routes>
        </>
    );
};

export default Pages;
