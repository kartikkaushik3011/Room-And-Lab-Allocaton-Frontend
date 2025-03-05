import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import formImage from "./assets/abes-logo.png";

function Login({setUser}) {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await login(form);
        setUser(user);
        navigate('/');
    };

    return (
        // <form className="card card-body" onSubmit={handleSubmit}>
        //     <h2>Login</h2>
        //     <input className="form-control mb-2" placeholder="Username" name="username" onChange={handleChange} required />
        //     <input className="form-control mb-2" type="password" placeholder="Password" name="password" onChange={handleChange} required />
        //     <button className="btn btn-primary">Login</button>
        // </form>
        
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
        
                        <button className="btn btn-outline-dark btn-lg btn-rounded px-5 mb-2" type="submit">Login</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    );
};

export default Login

