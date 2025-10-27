import React, { useState } from 'react';
import { signup } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (ev) => {
        const { name, value } = ev.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(form);
            navigate('/dashboard');
        } catch (err) {
            console.log('Signup error :', err);
        }
    };

    const routeToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2 className="signup-title">Sign Up</h2>

                <input
                    value={form.username}
                    name="username"
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter Username"
                    className="signup-input"
                />

                <input
                    value={form.email}
                    name="email"
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter Email"
                    className="signup-input"
                />

                <input
                    value={form.password}
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Enter Password"
                    className="signup-input"
                />

                <button type="submit" className="signup-btn">Signup</button>
            </form>

            <div className="signup-footer">
                <p>Already have an account?</p>
                <button onClick={routeToLogin} className="login-btn">Login</button>
            </div>
        </div>
    );
};

export default Signup;
