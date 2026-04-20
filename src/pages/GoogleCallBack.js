import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../slices/authSlice";

const GoogleCallback = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const user = params.get("user");
        if (token) {
            localStorage.setItem("token", token);
            dispatch(setToken(token));
            if (user) {
                localStorage.setItem("user", user);
            }
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    }, []);

    return <h3>Logging in...</h3>;
};

export default GoogleCallback;