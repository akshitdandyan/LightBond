import { Link } from "react-router-dom";
import { LOGO_URL } from "../config/constants";

const NAV_LINKS = [
    {
        name: "About",
        path: "/about",
    },
    {
        name: "Contact",
        path: "/contact",
    },
    {
        name: "Get App",
        path: "/apk",
    },
];

const Header = () => {
    return (
        <div className="flex justify-between">
            <div className="flex p-4 items-center">
                <img src={LOGO_URL} alt="logo" className="w-10 h-10" />
                <div className="text-white">
                    <h1 className="text-lg font-bold ml-2">Lightbond</h1>
                </div>
            </div>
            <div>
                <ul className="flex items-center gap-4 p-4 text-white">
                    {NAV_LINKS.map((link) => (
                        <li key={link.name}>
                            <Link
                                to={link.path}
                                className="duration-200 ease-in hover:opacity-60"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Header;
