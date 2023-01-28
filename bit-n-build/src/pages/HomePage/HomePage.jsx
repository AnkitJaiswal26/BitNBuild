import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate();

    return (
        <div>
            This is Home Page
            <button onClick={() => {
                navigate("/register");
            }}>Register as User</button>
            <button onClick={() => {
                navigate("/registerCompany");
            }}>Register as Company</button>
        </div>
    );
}

export default HomePage;