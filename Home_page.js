import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home_page.css';
import { useContext } from 'react';
import { Usercontext } from '../Context/Usercontext';
import Navbar from './Navbar.js';
import i1 from './Images/icon1.png';
import i2 from './Images/icon2.png';
import i3 from './Images/icon3.png';
import i4 from './Images/icon4.png';
import i5 from './Images/pictTeam.jpeg';

import i6 from './Images/pict_logo.jpeg';
import i7 from './Images/renuka.jpeg';
import i8 from './Images/ruturaj.jpeg';
import i9 from './Images/shivakumar.jpg';
import i10 from './Images/shrushti.jpg';
import i11 from './Images/Sir.jpeg';


export default function Home_page() {

  const { v1, v2 } = useContext(Usercontext);

  const [v1value, setV1value] = v1;
  const [v2value, setV2value] = v2;

  return (
    <body>
      <header>

        {/* <Navbar/> */}
        <Navbar loginstate={v1value} email={v2value} />
        <section class="h-text">
          <i className="fa fa-institution" aria-hidden="true"></i>
          <h1>Get all your doubts solved!</h1>
        </section>

      </header>



      <div>
        <section className="member">
          <div className="member-info">
            <h1>Our <span>Information</span></h1>
            <p>What Our Team Says</p>
          </div>
          <div className="member-card">
            <img src={i5} width={600} />
            <p>
              Pune Institute of Computer Technology, is a private unaided engineering college located in Dhankawadi, Pune, India. Established by the Society for Computer Technology and Research, SCTR in 1983. It offers degrees in Information Technology, Computer Engineering and Electronics and Telecommunication Engineering.
            </p>
            <h2>Pune Institute of Computer Technology</h2>
            <img src={i1} width={100} />
            <img src={i2} width={100} />
            <img src={i3} width={100} />
            <img src={i4} width={100} />
          </div>
          <div className="m-images">


            <img
              src={i7}
              alt="A"
              className="image"
            />
            {/* <div className="middle">
                <div className="text">Renuka</div>
              </div> */}
            <img
              src={i8}
              alt="A"
              className="image"
            />
            {/* <div class="middle">
                <div class="text">Ruturaj</div>
              </div> */}
            <img
              src={i9}
              alt="A"
              className="image"
            />
            {/* <div class="middle">
                <div class="text">Shivakumar</div>
            </div> */}
            <img
              src={i10}
              alt="A"
              className="image"
            />
            {/* <div class="middle">
                <div class="text">Shrushti</div>
              </div>             */}
          </div>
        </section>
        <footer>
          <div className="news">
            <div>
              <h2>Hope that all your doubts are solved!</h2>
              <p>We are a team which aims to ensure that all the doubts about academics as well as technical domain gets solved here. Where there is right choice , there is right result. All the best for your journey!</p>
            </div>
          </div>
          <div className="f-contact">
            <div>
              {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p> */}
              <i className="fa fa-whatsapp" aria-hidden="true" />
              <i className="fa fa-telegram" aria-hidden="true" />
              <i className="fa fa-twitter" aria-hidden="true" />
              <i className="fa fa-instagram" aria-hidden="true" />
            </div>

            <h2>Our Details - </h2><br></br><br></br><br></br>

            <div className='aboutus'>
              <div>
                Shivakumar Ranade
              </div>
              <div>
                <div>
                  Email Id: shivakumar.ranade@gmail.com
                </div>
                <div>
                  Phone No: &emsp;&emsp;&emsp;+918530011069
                </div>
              </div>
            </div>


            <div className='aboutus'>
              <div>
                Shrushti Thorat
              </div>
              <div>
                <div>
                  Email-Id: thoratshrushti@gmail.com
                </div>
                <div>
                  Phone-No:&emsp; +917620014605
                </div>
              </div>
            </div>

            <div className='aboutus'>
              <div>
                Renuka Saraf
              </div>
              <div>
                <div>
                  Email-Id: renukaus30@gmail.com
                </div>
                <div>
                  Phone-No:&emsp; +919834973409
                </div>
              </div>
            </div>

            <div className='aboutus'>
              <div>
                Ruturaj Panditrao
              </div>
              <div>
                <div>
                  Email-Id: ruturajpanditrao777@gmail.com
                </div>
                <div>
                  Phone-No:&emsp;&emsp;&emsp;&emsp;+919529040494
                </div>
              </div>
            </div>
          </div>


        </footer>
      </div>

    </body>
  )
}
