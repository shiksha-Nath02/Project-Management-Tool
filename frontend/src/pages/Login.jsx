import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import './Login.css';

const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (ev) => {
        const propertyName = ev.target.name;
        const propertyValue = ev.target.value;

        setForm((prevState) => ({
            ...prevState,
            [propertyName]: propertyValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({
                email: form.email,
                password: form.password,
            });

            navigate('/dashboard');
        } catch (err) {
            console.log('Login error :', err);
        }
    };

    const routeToSignup = () => {
        navigate('/signup');
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-title">Login</h2>

                <input
                    className="login-input"
                    value={form.email}
                    name="email"
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter Email"
                />

                <input
                    className="login-input"
                    value={form.password}
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Enter Password"
                />

                <button type="submit" className="login-btn">Login</button>
            </form>

            <div className="signup-redirect">
                <p>Don't have an account?</p>
                <button onClick={routeToSignup} className="signup-btn">Signup</button>
            </div>
        </div>
    );
};

export default Login;
