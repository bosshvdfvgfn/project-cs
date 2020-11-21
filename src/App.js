import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';

import Login from './components/login';
import auth from './firebase';


function App() {
  const [session, setSession] = useState({
    isLoggedIn: false,
    currentUser: null,
    errorMessage: null
  });

  useEffect(() => {
    const handleAuth = auth.onAuthStateChanged(user => {
      if (user) {
        setSession({
          isLoggedIn: true,
          currentUser: user,
          errorMessage: null
        });
      }
    });

    return () => {
      handleAuth();
    };
  }, []);
  const handleLogout = () => {
    auth.signOut().then(response => {
      setSession({
        isLoggedIn: false,
        currentUser: null
      });
    });
  };
  return (
    <div className="App">
      <Navbar />
      {/* <nav className="navbar">
          <ul class="menu">
            <li class="regis"><a href="./Booking.js">การจอง</a></li>
            <li class="regis"><a href="./Booking.js">สมัคร</a></li>
          </ul>
        </nav> */}
      {
        session.isLoggedIn ? (<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank" 
            rel="noopener noreferrer"
          >
          </a>
          <h1>{session.currentUser && session.currentUser.email}</h1>

          <button type="button" onClick={handleLogout}>
            Logout
      </button>
        </header>) : (<Login setSession={setSession} />)
      }
      <title>ระบบจองห้องเรียนภาควิชาวิทยาการคอมพิวเตอร์มหาวิทยาลัยเกษตรศาสตร์</title>
      <p>Login เพื่อจองห้อง</p>
      <div className="footer">
        <footer><a href="https://www.facebook.com/comsci.ku/">facebook fanpage</a></footer>

      </div>
    </div>
  );
}

export default App;
