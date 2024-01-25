import React, { useState } from 'react';
import axios from 'axios';
import "../Styles/main.css";
import { useNavigate } from 'react-router-dom';

const Registration=({ props, onLogin })=> {
  let history = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword:""
  })
  const [show, setShow] = useState(true)
  const [showslog, setShowslog] = useState(false)
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();

    const sendData = {
      name:data.name,
      email:data.email,
      password:data.password,
      confirmPassword:data.confirmPassword
    }

    // Basic client-side validation
      if (!data.name || !data.email || !data.password || !data.confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Send registration data to PHP backend using axios
    axios.post('http://localhost/reactExample/db.php',sendData )
      .then(response => {
        // Handle the response from the server...
        if (response.data.Status === "Invalid") {
          alert('Invalid Input');
          // Additional logic, such as redirecting to a login page
        } else {

          setShow(false);
          setShowslog(true);
          alert('Successfully Registered');

        }
      })
    
  };



  {
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
                  
                  <div className='reg'>
                    {
                        show?
                      
                        <div className="registration-container">
                                <h2>Registration</h2>
                                <form onSubmit={submitForm}>
                                  <div>
                                    <label htmlFor="name">Name:</label>
                                    <input
                                      type="text"
                                      id="name"
                                      name="name"
                                      value={data.name}
                                      onChange={handleChange}
                                      placeholder="Enter your name"
                                      required
                                    />
                                  </div>
                                  <div>
                                    <label htmlFor="email">Email:</label>
                                    <input
                                      type="email"
                                      id="email"
                                      name='email'
                                      value={data.email}
                                      onChange={handleChange}
                                      placeholder="Enter your email"
                                      required
                                    />
                                  </div>
                                  <div>
                                    <label htmlFor="password">Password:</label>
                                    <input
                                      type="password"
                                      id="password"
                                      name='password'
                                      value={data.password}
                                      onChange={handleChange}
                                      placeholder="Enter your password"
                                      required
                                    />
                                  </div>
                                  <div>
                                    <label htmlFor="confirmPassword">Confirm Password:</label>
                                    <input
                                      type="password"
                                      id="confirmPassword"
                                      name='confirmPassword'
                                      value={data.confirmPassword}
                                      onChange={handleChange}
                                      placeholder="Enter your password"
                                      required
                                    />
                                  </div>
                                  <button className='btn-register' type="submit">Register</button>

                                </form>
                                <laber>already have an account? </laber>
                                <button onClick={() => { setShowslog(true); setShow(false); }}>Login</button>
                              </div>:null
                      
                   }
                  </div>

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
                                        <button onClick={()=> {setShowslog(false); setShow(true)}}>register</button>
                                      </div>:null
                                      
                              }
                            
                        </div>
                        
                </div>
              
    
  );
                            }  
                          } 
export default Registration;
