import React from "react"
import { Link } from "react-router-dom"

export const Footer = () => {
  return (
    <>
      {/* <!-- footer section  --> */}
      <footer id='footer'>
        <div class='top-footer'>
          <div class='top-left-footer'>
            <ul>
              <li>
                <Link to='/'>Home </Link>
              </li>
              <li>
                <Link to='/services'>Our Services </Link>
              </li>
              <li>
                <Link to='/about'>About Us </Link>
              </li>
              <li>
                <Link to='/gallery'>Gallery </Link>
              </li>
              <li>
                <Link to='/contact'>Contact Us </Link>
              </li>
            </ul>
          </div>
          <div class='top-mid-footer'>
            <Link to='/'>
              <img
                alt='img'
                src='../img/images/logo-m.png'
                width='240px'
                border-radius='20px'
                border='2px solid black'
              />
            </Link>
          </div>
          <div class='top-right-footer'>
            <ul>
              <li>
                <i id='location' class='fa-solid fa-location-dot fa-lg'></i>
                &nbsp;&nbsp; Office Address : 2nd Floor, Purvancal Incubation Council, Gorakhpur University Road, Paidleganj, Gorakhpur, Uttar Pradesh 273009
              </li>
              <li>
                <i id='msg' class='fa-solid fa-envelope fa-lg'></i>&nbsp;&nbsp;
                Info@mentorify.com
              </li>
              <li>
                <i id='phone' class='fa-solid fa-phone fa-lg'></i>&nbsp;&nbsp;
                Call Us +916394506912
              </li>
            </ul>
          </div>
        </div>
        <div class='bottom-footer'>
          <div class='bottom-left-footer'>
            Copyright@ 2022 Mentorify Technologies Private Limited
          </div>
          <div class='bottom-mid-footer'>
            <div class='logos'>
              <a href='https://www.instagram.com/careerclarify/'>
                <img alt='img' src='../img/images/vectors/ig.png' />
              </a>
              <a href='https://www.facebook.com/careerclarify'>
                <img alt='img' src='../img/images/vectors/fb.png' />
              </a>
              <a href='https://www.youtube.com/@careerclarify'>
                <img alt='img' id='yt' src='../img/images/vectors/yt.png' />
              </a>
              <a href='https://www.linkedin.com/company/careerclarify/'>
                <img alt='img' src='../img/images/vectors/Ln.png' />
              </a>
              <a href='https://twitter.com/careerclarify'>
                <img alt='img' src='../img/images/vectors/tw.png' />
              </a>
            </div>
          </div>
          <div class='bottom-right-footer'>CIN U80903UP2022PTC164441</div>
        </div>
      </footer>
    </>
  )
}
