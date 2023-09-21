import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar'
import './Signup_page.css'

export default function Signup_page() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cpassword, setCpassword] = useState();
  const [formerrors, setFormerrors] = useState({});
  const [submit, setisSubmit] = useState(false);
  const [errorExist, seterrorExist] = useState(true);
  const [signupError, setsignupError] = useState();
  const url = 'http://localhost:5000/signup';
  const history = useHistory();

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required...";
    } else if (!regex.test(values.email)) {
      errors.email = "Email is not valid...";
    }
    if (!values.password) {
      errors.password = "Password is required...";
    } else if (values.password.length < 5) {
      errors.password = "Password Length should be minimum 5 characters...";
    } else if (!values.cpassword) {
      errors.cpassword = "Confirm your password...";
    } else if (values.cpassword != values.password) {
      errors.cpassword = "Passwords don't match...";
    }


    return errors;
  }

  useEffect(() => {
    console.log(formerrors);
    if (Object.keys(formerrors).length === 0) {
      seterrorExist(false);
      console.log({ email, password });
    }
  }, [formerrors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormerrors(validate({ email, password, cpassword }));
    setisSubmit(true);
    // console.log(formerrors.length);
    const details = { email, password };
    // console.log('No errors...');
    if (!errorExist) {
      console.log('No errors found...');
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
      }).then((res) => {
        return res.json();
      }).then((data) => {
        if(data.error){
          setsignupError(data.error)
        }else{
          if(!errorExist){
            alert(`Registration succesful...`)
            history.push("/login")
          }
        }
      }).catch((error) => {
        console.log(error);
      });

    }

  }

  return (
    <body>
      <Navbar />
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form method='POST'>
        <h3>Sign Up</h3>
        <br></br>
        {signupError && <div>{signupError}</div>}
        {/* <label for="firstname">First Name</label>
        <input type="text" placeholder="First Name" id="firstname"></input> */}

        {/* <label for="lastname">Last Name</label>
        <input type="text" placeholder="Last Name" id="lastname"></input> */}

        <label htmlFor='email'>E-mail ID</label>
        <input type="email" placeholder='E-mail' id='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <div>{formerrors.email}</div>

        <label htmlFor='password'>Password</label>
        <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <div>{formerrors.password}</div>

        <label htmlFor='password'>Confirm Password</label>
        <input type="password" placeholder="Password" id="confirm-password" value={cpassword} onChange={(e) => setCpassword(e.target.value)}></input>
        <div>{formerrors.cpassword}</div>
        {/* {cpassword != password && 
            <p>
              Passwords don't match...
            </p>
        } */}
        <button onClick={handleSubmit}>Sign Up</button>
        <div className="social">
          <div className="go"><i className="fab fa-google" style={{ color: "	#0F9D58" }}></i>  Google</div>
          <div className="fb"><i className="fab fa-facebook" style={{ color: "#4267B2" }}></i>  Facebook</div>
        </div>
      </form>
    </body>
  )
}
