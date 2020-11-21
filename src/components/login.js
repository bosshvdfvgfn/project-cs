import React, { useState } from 'react';
import auth from '../firebase';


// singInWithEmailAndPassword(username, password)f

const Login = ({ setSession }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async () => {
        try {
            // console.log('login', username, password);
            const response = await auth.signInWithEmailAndPassword(username, password);
            // auth.signInWithEmailAndPassword(username, password);
            const { user } = response;

            setSession({
                isLoggedIn: true,
                currentUser: user
            });
        } catch (error) {
            setSession({
                isLoggedIn: false,
                currentUser: null,
                errorMessage: error.essage
            })
        }

        // console.log('user' ,user);
    };

    const handleUsername = event => {
        // event.target.value
        setUsername(event.target.value)
    };

    const handlePassword = event => {
        setPassword(event.target.value);
    }
    return (
        <div>
            <input type="email" placeholder="Email" onChange={handleUsername} />
            <input type="password" placeholder="Password" onChange={handlePassword} />

            <button type="button" onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login;