import axios from "axios";

const appAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/api",
});

export default appAxios;
