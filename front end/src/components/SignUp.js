import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    },);

    const collectData = async () => {
        console.warn(name, email, password);
        try {
            let result = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            });
            result = await result.json();
            console.log(result);
            localStorage.setItem("user", JSON.stringify(result));

            navigate('/');
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="register">
            <h1>Register</h1>
            <input
                className="inputBox"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
            />
            <input
                className="inputBox"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
            />
            <input
                className="inputBox"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
            />
            <button type="button" className="appButton" onClick={collectData}>
                Sign Up
            </button>
        </div>
    );
};

export default SignUp;
