import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./School.css";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";

const School = () => {
  useEffect(() => {
    AOS.init();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Header />
      <section className='section-body  container-fluid'>
        <h1 id='head' data-aos='fade-up'>
          Package for School
        </h1>
        {/* <div id='heading-text-box-top'>
          <div id='heading-container'>
            <div id='rect' data-aos='fade-up'></div>
            
            <h3 id='para' data-aos='fade-up'>
              Realizing Many students Just Pick Their Course of study Because
              they are not well enlightened on different courses available and
              different courses they can grow passsion or talented in ,Career
              Clarify Is here to provide the solution to millions of students
              who finds themselves in such situation
            </h3>
          </div>
        </div> */}
        {/* <div id='frame2'>
          <h4 id='para2' data-aos='fade-up' data-aos-delay='400'>
            While being concerned About students development , career Clarify
            renders the following Service To curb Such problems
          </h4>
        </div> */}

        {/* <!-- grid -->
    <!-- first two col  --> */}
        <div id='first-col'>
          {/* Rs.1499 */}
          <div id='boxs' data-aos='fade-up' data-aos-delay='0'>
            {/* <img
              alt='img'
              src='./img/image/IMG_20211014_132715_612.jpg'
              id='img'
            /> */}
            <div id='inner-section'>
              <ul>
                <li id='heading-text-box'>Rs.1000 + GST </li>
              </ul>
              <p id='desc-para' style={{lineHeight:"55px"}}>
                
                
                1. Career Guidance Seminar for class IX to XII <br></br>
                2. Complete Career Roadmap Report<br></br>
                3. Career Awareness Workshop<br></br>
                4. 1:1 Report Analysis<br></br>
                5. Entrance Examination updates through Whatsapp/SMS<br></br>
                6. 1 year support through Audio & Video call
              </p>
              <div id='enquire1'>
                <h4 id='enq-text'>Contact Us</h4>
              </div>
            </div>
          </div>
          


          {/* <!-- 3rd box --> */}
        </div>

        
        
      </section>
      
      
      <Footer />
    </>
  );
};

export default School;
