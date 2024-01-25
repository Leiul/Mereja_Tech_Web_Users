import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/main.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const LoginAfterRegistration = ({ props, onLogin }) => {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleUserChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitUserForm = (e) => {
    e.preventDefault();

    const sendUserData = {
      email: user.email,
      password: user.password,
    };

    // Send login data to PHP backend using axios
    axios
      .post('http://localhost/reactExample/login.php', sendUserData)
      .then((response) => {
        // Handle the response from the server...
        if (response.data.success) {
          const { email, name } = response.data.user;
          window.localStorage.setItem('email', email);
          window.localStorage.setItem('name', name);
          if (typeof onLogin === 'function') {
            onLogin(true); // Update the loggedIn state in the Navbar component
          }
          navigate('/Navbar');
        } else {
          alert(response.data.error);
        }
      })
      .catch((error) => {
        console.log(error);
        alert('An error occurred during login.' + error.message);
      });
  };

  return (
    <div>
    { onLogin && <Navbar onLogin = {onLogin} /> }
      
     
      <div className='log'>
        {
          showslog?
          <div className="registration-container">
                  <h2>Login</h2>
                  <form onSubmit={submitUserForm}>
                    <div>
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleUserChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="password">Password:</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleUserChange}
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <button type="submit">Login</button>
                  </form>
                  <button onClick={()=> setShowslog(false)}>register</button>
                </div>:null
                
        }
          
      </div>
      
    </div>
  );
};

export default LoginAfterRegistration;
