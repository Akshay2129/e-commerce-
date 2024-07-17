import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    },)
    const handleLogin = async () => {
        try {
            console.warn("email: ", email, "password: ", password);
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result);

            if (result.name) {
                localStorage.setItem("user", JSON.stringify(result));
                navigate('/');
            } else {
                alert("Please enter correct details");
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Failed to login. Please try again later.');
        }
    };

    return (
        <div className="login">
            <input
                type="text"
                className="inputBox"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                className="inputBox"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="button"
                className="appButton"
                onClick={handleLogin}
            >
                Login
            </button>
        </div>
    );
};

export default Login;
