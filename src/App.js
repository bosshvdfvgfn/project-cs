import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

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
      <h1 stype="color: green">Login ด้วยรหัส account </h1>
    </div>
  );
}

export default App;
