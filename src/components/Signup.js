import React, { useState } from 'react';
import { signup } from '../api';
import { useNavigate } from 'react-router-dom';
import formImage from "./assets/abes-logo.png";

const Signup = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(form);
        alert("Signup successful! Please login.");
        navigate('/login');
    };

    return (
        <div className="row justify-content-center" style={{ width: "100%", marginTop: "4vh" }}>
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card" style={{ borderRadius: "1rem" }}>
                    <div className="card-body p-3 text-center" style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.8)', borderRadius: "10px" }}>
                        <div className="md-5 pb-2">
                            <form onSubmit={handleSubmit}>
                                <img className='pb-2' src={formImage} alt="ABES" />
                                <h1 className="fw-bold mb-3">Enter Credentials:</h1>
                                <div className="form-outline mb-4 mt-5">
                                    <input type="text"
                                        placeholder="Username"
                                        name="username"
                                        value={form.username}
                                        onChange={handleChange}
                                        className="form-control form-control-lg"
                                    />
                                </div>

                                <div className="form-outline mb-5">
                                    <input type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        className="form-control form-control-lg"
                                    />
                                </div>

                                <button className="btn btn-outline-dark btn-lg btn-rounded px-5 mb-2" type="submit">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;