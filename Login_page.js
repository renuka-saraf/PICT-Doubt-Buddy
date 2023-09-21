import React, { useState, useEffect, createContext } from 'react'
import './Login_page.css';
import Navbar from './Navbar';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';

// const history = useHistory();

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import QnA_page from './QnA_page';
import { Usercontext } from '../Context/Usercontext';

const Login_page = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginerrors, setloginErrors] = useState({});
  const [errorExist, seterrorExist] = useState(true);
  const [status, setStatus] = useState({});
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const {v1, v2} = useContext(Usercontext);

  const [v1value,setV1value] = v1;
  const [v2value, setV2value] = v2;

  const url = 'http://localhost:5000/signin';
  const history = useHistory();

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required...";
    }
    else if (!regex.test(values.email)) {
      errors.email = "Invalid email address entered...";
    }

    if (!values.password) {
      errors.password = "Password is required...";
    }

    return errors;
  }

  useEffect(() => {
    console.log(loginerrors);
    if (Object.keys(loginerrors).length === 0) {
      seterrorExist(false);
      console.log({ email, password });
    }
  }, [loginerrors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setloginErrors(validate({ email, password }));
    const login_details = { email, password };
    if (!errorExist) {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(login_details)
      }).then((res) => {
        return res.json()
      }).then((feedback) => {
        setStatus(feedback)
        if (feedback.error) {
          console.log(feedback.error)
          alert(feedback.error)
        }
        else {
          if (!errorExist) {
            setisLoggedIn(true)
            // setLogin(true)
            console.log(feedback.message)
            alert(feedback.message)
            setV1value(true)
            setV2value(email)
            console.log(v1value)
            history.push("/")
          }
        }
      }).catch((error) => { console.log(error) })
    }
  };

  return (
    <>
      {/* <Navbar loginstate={login} email={"hello"} /> */}
      <Navbar loginstate={v1value} email={v2value}/>
      {/* {isLoggedIn && <QnA_page loginstate={isLoggedIn} email={email}/>} */}
      <body>
        x
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <form>
          <h3>Login Here</h3>
          {status.error && <div>{status.error}</div>}
          {!status.error && <div>{status.message}</div>}
          <label for="username">Username</label>
          <input type="text" placeholder="Email or Phone" id="username" value={email} onChange={(e) => setEmail(e.target.value)}></input>

          <label for="password">Password</label>
          <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>

          <button id='login-btn' className='log_in_btn' onClick={handleSubmit}>Log In</button>
          <a className="msg">Don't have an account ? </a>
          <a className='link'>
            <Link to="/signin">SIGN UP</Link>
          </a>

          <div className="social">
            <div className="go"><i className="fab fa-google" style={{ color: "	#0F9D58" }}></i>  Google</div>
            <div className="fb"><i className="fab fa-facebook" style={{ color: "#4267B2" }}></i>  Facebook</div>
          </div>
        </form>

        {/* {isLoggedIn && <App loginstate={isLoggedIn} em={email}/>} */}

      </body>
    </>
  )

}

export default Login_page;


