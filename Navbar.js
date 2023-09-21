import React from "react";
import { Link } from "react-router-dom";
import "./Home_page.css";
export default function Navbar(props) {
  return (
    <div>
      <nav>
        <div className="logo">
          PICT <span>Doubt </span>
          Buddy
        </div>
        <div className="menu">
          <Link to="/">Home</Link>
          <Link to="/answer">Answer Question</Link>
          <Link to="/qna">Post Question</Link>
          <Link to="/myquestions">My Questions</Link>
        </div>
        <div className="icon">
          <i className="fa fa-user" aria-hidden="true"></i>&emsp;
          {!props.loginstate && <Link to="/login">Register</Link>}
          {props.loginstate && <span>{props.email}</span>}
        </div>
      </nav>
    </div>
  );
}
