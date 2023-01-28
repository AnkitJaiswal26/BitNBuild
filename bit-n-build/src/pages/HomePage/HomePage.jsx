import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate();

    return (
        <div>
            This is home page
            <button onClick={() => {
                navigate("/register");
            }}>Register</button>
        </div>
    );
}

export default HomePage;