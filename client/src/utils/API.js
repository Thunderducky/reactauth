import axios from "axios";

export default {
    signin: (email, password) => {
        return axios.post("/api/auth/signin", {email, password});
    },
    signout: () => {
        return axios.get("/api/auth/signout");
    },
    signup: (email, password) => {
        return axios.post("/api/auth/signup", {email, password});
    }
}