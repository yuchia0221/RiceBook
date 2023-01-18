import { createContext, useEffect, useState } from "react";
import api from "../apis/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ isLoggedIn: false });

    const checkIfLogin = () => {
        api.get("isLoggedIn").then((response) => {
            if (response.status === 200) setAuth({ isLoggedIn: true });
        });
    };
    const handleAuthLogIn = (username, password) => {
        const isLoggedIn = api
            .post("login", { username, password })
            .then((response) => {
                setAuth({ isLoggedIn: true });
                return true;
            })
            .catch((error) => {
                return false;
            });

        return isLoggedIn;
    };
    const handleAuthLogout = () => {
        api.put("logout").then((response) => {
            if (response.status === 200) setAuth({ isLoggedIn: false });
        });
    };
    const stateValues = { auth, setAuth, handleAuthLogIn, handleAuthLogout };

    useEffect(() => {
        checkIfLogin();
    }, []);

    return <AuthContext.Provider value={stateValues}>{children}</AuthContext.Provider>;
};

export default AuthContext;
