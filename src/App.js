import React, {useEffect, useState} from "react";
import './App.css';


function App() {
    const url = 'http://localhost:4000';


    const [loggedIn, setLoggedIn] = useState(false);
    const [myName, setMyName] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const initLogInStatus = () => {
            fetch('http://localhost:4000/check-login-status')
                .then(res=>res.json())
                .then(response=> {
                    if (Object.keys(response).length === 0) {
                        setLoggedIn(false);
                    } else {
                        setLoggedIn(true);
                        setMyName(response.name);
                    }
        })
    }


    const changeNameHandler = (e) => {
        setName(e.target.value);
    }
    const changeEmailHandler = (e) => {
        setEmail(e.target.value);
    }

    const changePasswordHandler = (e) => {
        setPassword(e.target.value);
    }

    const clickLoginHandler = () => {
        fetch(`${url}/login/${email}/${password}`)
            .then(res=>res.json())
            .then(response=>{
                if (JSON.stringify(response)!=='{}') {
                    setMyName(response.name);
                    setLoggedIn(true);
                }
                setEmail('');
                setPassword('');
            })
    }

    const logoutHandler = () => {
        fetch(`${url}/logout`)
            .then(res=>{
                setLoggedIn(false);
                setMyName('');
            });
    }

    const signupHandler = () => {
        fetch(`${url}/signup/${email}/${password}/${name}`)
            .then(res=>res.json())
            .then(profile=>{
                setLoggedIn(true);
                setMyName(profile.name);
                setName('');
                setEmail('');
                setPassword('');
            })
    }

    useEffect(initLogInStatus, []);

    return (
        <div className="min-height-100vh test-container py-5">

            <h3 className={"mb-5"}>My name: <span className={"text-danger"}>{myName}</span></h3>
            <h3 className={"mb-5"}> I'm {loggedIn === false && <span className="text-danger">NOT</span>} logged in.</h3>


            <div className={"mb-3"}>
                <h6>name</h6>
                <div className={"d-flex"}>
                    <input type="text" className={"form-control me-2"} value={name} onChange = {changeNameHandler}/>
                    <button className={"btn btn-danger text-nowrap"} onClick={signupHandler}>Sign Up</button>
                </div>
            </div>

            <div className={"mb-3"}>
                <h6>email</h6>
                <input type="email" className={"form-control"} value={email} onChange={changeEmailHandler}/>
            </div>

            <div className={"mb-3"}>
                <h6>password</h6>
                <input type="text" className={"form-control"} value={password} onChange={changePasswordHandler}/>
            </div>


            {loggedIn ? (<button className={"btn btn-secondary"} onClick={logoutHandler}>Log Out</button>) : (
                <div className={"d-flex"}>
                    <button className={"btn btn-primary me-3"} onClick={clickLoginHandler}>Log In</button>
                    <button className={"btn btn-light"}>Sign Up</button>
                </div>
            )}
        </div>
    );
}

export default App;


