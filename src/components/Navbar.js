import React from 'react';
import { Link } from "react-router-dom"

function Navbar() {
    return (
        <>
            <nav className="navbar navbar-dark sticky-top navbar-expand-lg border-bottom border-black" style={{ backgroundColor: "rgb(73 75 77 / 68%)", }}>
                <div className="container-fluid" >
                    <Link to="/"><img src="https://abes.ac.in/assets/frontend/img/logo-9.png" alt="" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse m-2" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/" aria-current="page">Home</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">About</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Blocks
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item " to="/rooms/kc">Kalpana Chawla</Link></li>
                                    <li><Link className="dropdown-item " to="/rooms/ab">Aryabhatta</Link></li>
                                    <li><Link className="dropdown-item " to="/rooms/bb">Bhabha</Link></li>
                                    <li><Link className="dropdown-item " to="/rooms/rj">Ramanujan</Link></li>
                                    <li><Link className="dropdown-item " to="/rooms/rm">Raman</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <div>
                            <a className="nav-link text-light" href="https://abes.ac.in/"><i class="fa-solid fa-circle-info"></i> Know More About Us!</a>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
