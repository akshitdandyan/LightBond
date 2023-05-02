const Broom = () => {
    return (
        <div className="">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                id="broom"
                height={20}
                width={20}
            >
                <path
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                    d="M28 29H13c1.083-3.432 2-7.125 2-11v-2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2c0 3.083.269 6.524-1 11zM22 14V3M15 18h14"
                ></path>
                <path
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                    d="M25 24c0 1.583-.572 3.409-1.583 5M19 24c0 1.583-.572 3.409-1.583 5M5 21v4M3 23h4M9 13v4M7 15h4"
                ></path>
            </svg>
        </div>
    );
};

export default Broom;
