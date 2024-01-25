import React, { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../Styles/main.css";
import Registration from "./Registor";

function Navbar() {
  const navRef = useRef();
  const [showRegistration, setShowRegistration] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // New state variable

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const clickRegister = () => {
    setShowRegistration(true);
  };

  const closeRegistration = () => {
    setShowRegistration(false);
  };
  const onLogin =(isLoggedIn) => {
    setLoggedIn(isLoggedIn);
  }
  useEffect(() => {
    onLogin(false);
  }, []);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };
  const handleLogin = () =>{
    onLogin(true);
  }

 
  return (
    <header>
      <h3>LOGO</h3>
      <nav ref={navRef}>
        <a href="/#">Home</a>
        <a href="/#">About</a>
        <a href="/#">About Us</a>
        <a href="/#">Contact Us</a>
        
        {loggedIn && (
          <div className="dropdown">
            <button className="dropbtn" onClick={handleDropdownToggle}>
              Dropdown
            </button>
            {showDropdown && (
              <div className="dropdown-content">
                <a href="/#">Option 1</a>
                <a href="/#">Option 2</a>
                <a href="/#">Option 3</a>
              </div>
            )}
          </div>
        )}
        <button className="login">
          <a href="/#" onClick={clickRegister}>
            Register
          </a>
        </button>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
        
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
      {showRegistration && (
        <div className="registration-overlay ">
           <label
              className="close-registration-btn"
              onClick={closeRegistration}
            >
              <FaTimes />
            </label>
          <div className="registration-container">
            <Registration onLogin={handleLogin} />
           
          </div>
        </div>
      )}
        

    </header>
  );
}

export default Navbar;