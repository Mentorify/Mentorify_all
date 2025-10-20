import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Services.css";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";

const Services = () => {
  useEffect(() => {
    AOS.init();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Header />
      <section className='section-body  container-fluid'>
        <h1 id='heading' data-aos='fade-up'>
          What We Offer, Thats makes us stand out
        </h1>
        <div id='heading-text-box-top'>
          <div id='heading-container'>
            <div id='rect' data-aos='fade-up'></div>
            {/* <!-- <div id="frame1"> </div> --> */}
            <h3 id='para' data-aos='fade-up'>
              Realizing Many students Just Pick Their Course of study Because
              they are not well enlightened on different courses available and
              different courses they can grow passsion or talented in ,Mentorify
               Is here to provide the solution to millions of students
              who finds themselves in such situation
            </h3>
          </div>
        </div>
        <div id='frame2'>
          <h4 id='para2' data-aos='fade-up' data-aos-delay='400'>
            While being concerned About students development , Mentorify
            renders the following Service To curb Such problems
          </h4>
        </div>

        {/* <!-- grid -->
    <!-- first two col  --> */}
        <div id='first-two-col'>
          {/* <!-- first box --> */}
          <div id='box' data-aos='fade-up' data-aos-delay='0'>
            <img
              alt='img'
              src='./img/image/IMG_20211014_132715_612.jpg'
              id='img'
            />
            <div id='inner-section'>
              <ul>
                <li id='heading-text-box'>STREAM SELECTION</li>
              </ul>
              <p id='desc-para'>
                help to provide the Right Stream selection For ClassName 9th &
                10th
              </p>
              <div id='enquire'>
                <h4 id='enq-text'>ENQUIRE NOW</h4>
              </div>
            </div>
          </div>
          {/* <!-- second box --> */}
          <div id='box' data-aos='fade-up' data-aos-delay='400'>
            <img
              alt='img'
              src='./img/image/IMG_20211119_105442_007.jpg'
              id='img'
            />
            <div id='inner-section'>
              <ul>
                <li id='heading-text-box'>CAREER SELECTION</li>
              </ul>
              <p id='desc-para'>we help you to discover your ideal career.</p>
              <div id='enquire'>
                <h4 id='enq-text'>ENQUIRE NOW</h4>
              </div>
            </div>
          </div>
          {/* <!-- course section  --> */}
          <div id='box' data-aos='fade-up' data-aos-delay='200'>
            <img
              alt='img'
              src='./img/image/IMG_20220528_213805_707.jpg'
              id='img'
            />
            <div id='inner-section'>
              <ul>
                <li id='heading-text-box'>PERSONALITY FINDER</li>
              </ul>
              <p id='desc-para'>
                Our personality finder will help you understand your personality
                who you are as a person.
              </p>
              <div id='enquire'>
                <h4 id='enq-text'>ENQUIRE NOW</h4>
              </div>
            </div>
          </div>

          {/* <!-- 3rd box --> */}
        </div>

        {/* <!-- second two col  --> */}

        <div id='first-two-col'>
          {/* <!-- first box --> */}
          <div
            id='box'
            style={{ backgroundColor: "#353A46" }}
            data-aos='fade-up'
            data-aos-delay='0'>
            <img
              alt='img'
              src='./img/image/IMG_20211119_105442_023.jpg'
              id='img'
            />
            <div id='inner-section'>
              <ul>
                <li id='heading-text-box'>INTELLIGENCE FINDER</li>
              </ul>
              <p id='desc-para'>
                Our intelligence finder will help you discover your intellectual
                abilities.
              </p>
              <div id='enquire'>
                <h4 id='enq-text'>ENQUIRE NOW</h4>
              </div>
            </div>
          </div>
          {/* <!-- second box -->
      <!-- course section  --> */}
          <div
            id='box'
            style={{ backgroundColor: "#353A46" }}
            data-aos='fade-up'
            data-aos-delay='400'>
            <img
              alt='img'
              src='./img/image/IMG_20211119_105442_018.jpg'
              id='img'
            />
            <div id='inner-section'>
              <ul>
                <li id='heading-text-box'>INTEREST FINDER</li>
              </ul>
              <p id='desc-para'>
                {" "}
                Our advance interest finder will help you to discover your
                interest area.
              </p>
              <div id='enquire'>
                <h4 id='enq-text'>ENQUIRE NOW</h4>
              </div>
            </div>
          </div>

          {/* <!-- third section  --> */}
          <div
            id='box'
            style={{ backgroundColor: "#353A46" }}
            data-aos='fade-up'
            data-aos-delay='200'>
            <img
              alt='img'
              src='./img/image/IMG_20211014_132715_651.jpg'
              id='img'
            />
            <div id='inner-section'>
              <ul>
                <li id='heading-text-box'>COURSE SELECTION</li>
              </ul>
              <p id='desc-para'>
                {" "}
                we guide post graduate student and under graduate in their
                course selection
              </p>
              <div id='enquire'>
                <h4 id='enq-text'>ENQUIRE NOW</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- footer ke upper --> */}
      <div className='footer-top'>
        <div className='all-courses' data-aos='fade-up' data-aos-delay='0'>
          <div className='course'>Financial Analyst</div>
          <div className='course'>Geo-Spatial analsyst</div>
          <div className='course'>Laboratory medicals</div>
          <div className='course'>Horticulturist</div>
          <div className='course'>Animal scientist</div>
          <div className='course'>Zooligist</div>
          <div className='course'>Architecture</div>
          <div className='course'>Transportation</div>
          <div className='course'>Soil Science and land Management</div>
          <div className='course'>Animal nutritionist</div>
          <div className='course'>Animal Breeding And ~Genetics</div>
          <div className='course'>Financial Analyst</div>
          <div className='course'>Geo-Spatial analsyst</div>
          <div className='course'>Laboratory medicals</div>
          <div className='course'>Horticulturist</div>
          <div className='course'>Animal scientist</div>
          <div className='course'>Zooligist</div>
          <div className='course'>Architecture</div>
          <div className='course'>Transportation</div>
          <div className='course'>Soil Science and land Management</div>
          <div className='course'>Animal nutritionist</div>
          <div className='course'>Animal Breeding And ~Genetics</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Services;
