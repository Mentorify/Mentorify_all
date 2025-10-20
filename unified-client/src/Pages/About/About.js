import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Header } from "../../components/Header/Header";
import "./About.css";
const About = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Header />
      {/* <!-- about page section  --> */}
      <section className='about-section'>
        <div className='aboutus'>
          <div className='aboutus-inner'>
            <h2 id='about-heading' data-aos='fade-up' data-aos-delay='0'>
              About Us
            </h2>
          </div>
          <div
            id='rectangle-divider'
            data-aos='fade-up'
            data-aos-delay='0'></div>
        </div>

        {/* <!-- about company image --> */}
        <div
          className='about-main-image'
          data-aos='fade-up'
          data-aos-delay='500'>
          <img alt='img' src='./img/images/about/main-pic2.png' />
        </div>

        {/* <!-- about career clarify text  --> */}
        <div id='about-company-text-frame'>
          <h3 id='about-company-text' data-aos='fade-up' data-aos-delay='0'>
            About Our Mentorify
          </h3>
          <div
            id='rectangel-about-divider'
            data-aos='fade-up'
            data-aos-delay='0'></div>
        </div>

        {/* <!-- paragraph --> */}
        <div className='paragraph-frame'>
          <p className='paragraph' data-aos='fade-up' data-aos-delay='0'>
            <span>Mentorify</span> is an edtech startup based on psychology
            ,<span> AI & ML technology</span> that provides solutions to the
            growing problem of lack of direction in the life of today’s youth
            like choosing the right stream , career , specialization and many
            more through advanced and innovative career guidance process that
            helps students discover themselves and their ideal career.
          </p>
        </div>
      </section>
      {/* <!-- testimonial --> */}
      <section id='banner-footer'>
        <div className='banner-footer-box'>
          <h2>1000+</h2>
          <p>Students Guided On Career Selection</p>
        </div>
        <div className='banner-footer-box'>
          <h2>200+</h2>
          <p>Students Career Selection Aided Sucessfully</p>
        </div>
        <div className='banner-footer-box'>
          <h2>500+</h2>
          <p>Individuals Happy About Being Able To Be Themselves</p>
        </div>
        <div className='banner-footer-box'>
          <h2>100</h2>
          <p>
            Post Graduate Happy With Our Help in Selecting Their Right Choice Of
            Course
          </p>
        </div>
        <div className='banner-footer-box'>
          <h2>200</h2>
          <p>Seminars Organised on Careers</p>
        </div>
      </section>
      {/* <!-- bio --> */}
      <section id='bio'>
        <div className='bio-circle' data-aos='zoom-out' data-aos-delay='200'>
          <p>
            Worryless About picking the right course ,Finding your interest area
            And Career Guidance.
          </p>
        </div>
        <p className='bio-desc' data-aos='fade-up' data-aos-delay='0'>
          <span>Mentorify</span> Is an Edtech Start up Base on psychology ,
          AI & M.A Technology thats Provides Solutions to The growings problems
          of Lack Of Directional In Life Of todays Youth like choosing right
          career specialization And Many More
        </p>

        <div className='socials' data-aos='fade-up' data-aos-delay='0'>
          <div className='logos'>
            <a href='https://www.instagram.com/careerclarify/'>
              <img alt='img' src='./img/images/vectors/ig.png' />
            </a>
            {/* <!-- instagram --> */}
            <a href='https://www.facebook.com/careerclarify'>
              <img alt='img' src='./img/images/vectors/fb.png' />
            </a>
            {/* <!-- facebook --> */}
            <a href='https://www.youtube.com/@careerclarify'>
              <img
                alt='img'
                src='./img/images/vectors/yt.png'
                style={{ width: "55px" }}
              />
            </a>
            {/* <!--youtube--> */}
            <a href='https://www.linkedin.com/company/careerclarify/'>
              <img alt='img' src='./img/images/vectors/Ln.png' />
            </a>
            {/* <!-- linkedin --> */}
            <a href='https://twitter.com/careerclarify'>
              <img alt='img' src='./img/images/vectors/tw.png' />
            </a>
            {/* <!-- twitter --> */}
          </div>
        </div>
        <div className='copyright'>
          Copyright@ 2022 Mentorify Technologies Private Limited
        </div>
      </section>
    </>
  );
};

export default About;
