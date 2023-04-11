import { LOGO_URL } from "../config/constants";

const HeaderUser = ({ username }) => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex p-4 items-center">
                <img src={LOGO_URL} alt="logo" className="w-10 h-10" />
                <div className="text-white">
                    <h1 className="text-lg font-bold ml-2">Lightbond</h1>
                </div>
            </div>
            <div className="pr-4">
                <div>Hello, {username}</div>
            </div>
        </div>
    );
};

export default HeaderUser;
