const Bell = () => {
    return (
        <div className="">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 47.5 47.5"
                viewBox="0 0 47.5 47.5"
                id="bell"
                height={20}
                width={20}
            >
                <defs>
                    <clipPath id="a">
                        <path d="M0 38h38V0H0v38Z"></path>
                    </clipPath>
                </defs>
                <g
                    clip-path="url(#a)"
                    transform="matrix(1.25 0 0 -1.25 0 47.5)"
                >
                    <path
                        fill="#ffac33"
                        d="M0 0c0-11 5-10 5-15 0 0 0-2-2-2h-26c-2 0-2 2-2 2 0 5 5 4 5 15 0 5.522 4.478 10 10 10S0 5.522 0 0"
                        transform="translate(29 24)"
                    ></path>
                    <path
                        fill="#ffac33"
                        d="M0 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
                        transform="translate(22 34)"
                    ></path>
                    <path
                        fill="#ffac33"
                        d="M0 0a4 4 0 0 1 4 4h-8a4 4 0 0 1 4-4"
                        transform="translate(19 1)"
                    ></path>
                </g>
            </svg>
        </div>
    );
};

export default Bell;
