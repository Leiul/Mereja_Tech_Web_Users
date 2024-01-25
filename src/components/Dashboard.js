import { useEffect, useState } from "react";
import  useRef from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../Styles/main.css";

import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";


const Dashboard = ()=> {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
      };

      
    const [auth, setAuth] = useState('');
    let navigate = useNavigate();
    useEffect(()=>{
        var auth = localStorage.getItem('email');
        setAuth(auth);
    },
    [])
    if(auth ===null){
        navigate(`/Login`)
    }
  return (
    <header>
      <h3>LOGO</h3>
      <nav ref={navRef}>
        <a href="/#">Home</a>
        <a href="/#">About</a>
        <a href="/#">About Us</a>
        <a href="/#">Contact Us</a>
          <a href="/#">
          service
        </a>

        
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
        
    </header>
  );
}

export default Dashboard;
