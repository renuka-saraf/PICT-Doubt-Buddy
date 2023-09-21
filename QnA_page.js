import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { Usercontext } from '../Context/Usercontext';
import './QnA_page.css';
import Navbar from './Navbar';
import videobg from './Images/videoplayback.mp4';


export default function QnA_page(props) {
  const [isActive, setIsActive] = useState(false);
  const [show, setshow] = useState(false);
  const [question, setQuestion] = useState();
  const [category, setCategory] = useState();
  const [status, setStatus] = useState("Unanswered");
  const [answer, setAnswer] = useState("");
  const [recentclick, setrecentclick] = useState(false);
  const [selectstate,setselectstate] = useState();
  const [q,setq] = useState();
  // const [email, setEmail] = useState();
  const history = useHistory();

  const { v1, v2 } = useContext(Usercontext);

  const [v1value, setV1value] = v1;
  const [v2value, setV2value] = v2;

  const url = 'http://localhost:5000/questions';
  const url2 = 'http://localhost:5000/recentquestions';

  const handleSubmit = (e) => {
    e.preventDefault();
    setshow(true);
    const details = { question, category, status, answer, v2value };
    console.log(category);
    if ((category === "events" || category === "technical" || category === "non-technical") && v1value) {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
      }).then((res) => {
        return res.json()
      }).then((data) => {
        console.log(data.posted)
      })
    }
    else {
      if (!v1value) {
        alert(`Login is required...`)
        history.push("/login")
      }
    }
  }

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   if (!recentclick) {
  //     setrecentclick(true)
  //     const cat = { category };
  //     console.log("clicked")
  //     fetch(url2,{
  //       method: 'POST',
  //       headers: { 'Content-Type' : 'application/json' },
  //       body: JSON.stringify(cat)
  //     }).then((res) => {
  //       return res.json()
  //     }).then((data) => {
  //       console.log(data)
  //       setq(data)
  //     })
  //   }
  //   else {
  //     setrecentclick(false)
  //   }
  // }

  return (
    <>
      <video autoPlay loop muted>
        <source src={videobg} type="video/mp4" />
      </video>
      <Navbar loginstate={v1value} email={v2value} />
      <div className="sidebar">
        <a>
          <div className="dropdown">
            <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
              <a className='dropdownfortag'>Tags <span className="fas fa-angle-down"></span></a>
            </div>

            {isActive && (
              <div className="dropdown-content">
                <a className="dropdown-item" href="#Technical" onClick={(e) => setCategory("technical")}>
                  Technical
                </a>
                <a className="dropdown-item" href="#Non-Technical" onClick={(e) => setCategory("non-technical")}>
                  Non-Technical
                </a>
                <a className="dropdown-item" href="#Event" onClick={(e) => setCategory("events")}>
                  Event
                </a>
              </div>
            )}
          </div>

        </a>
        <br></br>
        {/* <div>
          {recentclick && <select className='recentquestions' onChange={(e) => setselectstate(e.target.value)}>
            <option>events</option>
            <option>technical</option>
            <option>non-technical</option>
          </select>}
        </div> */}

        {/* <a href="#unanswered">Unanswered</a> */}
      </div>
      <div>
        {show ?
          <div className='alert_msg alert show' id='alert'>

            <span className='fas fa-exclamation-circle '>
              {!category && <span className='msg'>Please Select a category</span>}
              {(category === "events" || category === "technical" || category === "non-technical") && <span className='msg'>
                Your question has been posted
              </span>}
              <span className="close-btn" onClick={() => { setshow(false) }}>
                <span className='fas fa-times'></span>
              </span>
            </span>
          </div> : null}

      </div>
      <div>
        <div>
          {/* {recentclick && <select style={{ color: "white", zIndex: "999"}}>
            <option>Select1</option>
            <option>Select2</option>
          </select>} */}

        </div>
        <textarea className='text_area' placeholder="Ask your question here..."
          value={question} onChange={(e) => setQuestion(e.target.value)}></textarea>
      </div>
      <button className='post_button' onClick={handleSubmit}>Post
        {recentclick && <span>&nbsp;Question</span>}
      </button>
    </>
  )
}
