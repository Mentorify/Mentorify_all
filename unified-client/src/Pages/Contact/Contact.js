import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Header } from "../../components/Header/Header";
import "./Contact.css";

const Contact = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Header />
      <section id='contact'>
        <div className='basic-info'>
          <div
            className='get-in-touch'
            data-aos='fade-right'
            data-aos-delay='0'>
            <h2>Get in touch with us</h2>
            <p>
              If you want to know how we can help you in discovering your
              passsion and your best skills ,reach us
            </p>
          </div>
          <div
            className='contact-info'
            data-aos='fade-right'
            data-aos-delay='200'>
            <ul>
              <li>
                <i id='location' className='fa-solid fa-location-dot fa-lg'></i>
                &nbsp;&nbsp; Office Address PIC DDU Gorakhpur
              </li>
              <li>
                <i id='msg' className='fa-solid fa-envelope fa-lg'></i>
                &nbsp;&nbsp; Info@CareerClarify.com
              </li>
              <li>
                <i id='phone' className='fa-solid fa-phone fa-lg'></i>
                &nbsp;&nbsp; Call Us +916394506912
              </li>
            </ul>
          </div>
          <div className='social-media'>
            {/* <!-- instagram --> */}
            <a href='https://www.instagram.com/careerclarify/'>
              <img alt='img' src='./img/images/vectors/ig.png' />
            </a>
            {/* <!-- facebook --> */}
            <a href='https://www.facebook.com/careerclarify'>
              <img alt='img' src='./img/images/vectors/fb.png' />
            </a>
            {/* <!--youtube--> */}
            <a href='https://www.youtube.com/@careerclarify'>
              <img
                alt='img'
                src='./img/images/vectors/yt.png'
                style={{ width: "55px" }}
              />
            </a>
            {/* <!-- linkedin --> */}
            <a href='https://www.linkedin.com/company/careerclarify/'>
              <img alt='img' src='./img/images/vectors/Ln.png' />
            </a>
            {/* <!-- twitter -->  */}
            <a href='https://twitter.com/careerclarify'>
              <img alt='img' src='./img/images/vectors/tw.png' />
            </a>
          </div>
          <p className='copy-right'>
            Copyright@ 2022 Mentorify Technologies Private Limited
          </p>
        </div>
        {/* temperoary replacement */}
        <div className='contact-us'>
          <img src='./img/images/contact/contactImage.png'></img>
        </div>
        {/* <div className='contact-us' data-aos='fade-left'>
          <div className='circle'>
            <h2>Contact Us</h2>
            <div className='contact-form'>
              <input type='text' name='name' id='name' placeholder='Name' />
              <input
                type='text'
                name='message'
                id='message'
                placeholder='Message'
              />
              <input
                type='text'
                name='number'
                id='number'
                placeholder='Phone'
              />
              <input type='email' name='email' id='email' placeholder='Email' />
            </div>
            <button>Reach us</button>
          </div>
        </div> */}
      </section>
    </>
  );
};

export default Contact;
