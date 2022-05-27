import React from 'react'
import {Link } from 'react-router-dom';


const Navbar = () => {
  
  
    return (
        
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
               
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link active align-middle" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active align-middle" aria-current="page" to="/office">BILL</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active align-middle" aria-current="page" to="/edit">ADD STOCK</Link>
                    </li>
                </ul>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                </div>
            </div>
        </nav>
    )
}

export default Navbar
