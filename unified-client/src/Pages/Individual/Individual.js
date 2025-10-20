import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
// import "./Individual.css";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import "./Individual.css";

const Individual = () => {
  useEffect(() => {
    AOS.init();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Header />
      <section className='section-body  container-fluid'>
        <h1 id='heading' data-aos='fade-up'>
          Package for Individual
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
        <div id='first-ind-col'>
          {/* Rs.1499 */}
          <div id='boxi' data-aos='fade-up' data-aos-delay='0'>
            {/* <img
              alt='img'
              src='./img/image/IMG_20211014_132715_612.jpg'
              id='img'
            /> */}
            <div id='inner-section-ind'>
              <ul>
                <li id='heading-text-box'>Rs.1499 (Basic)</li>
              </ul>
              <p id='desc-para-ind' >
                
                1. Report of your Interest Area<br></br>
                2. Report of your Intelligence Area<br></br>
                3. Personality Analysis<br></br>
                4. Three career recommendation that suits your Interest, Intelligence & Personality<br></br>
                5. 1:1 report analysis on zoom
              </p>
              <div id='enquire'>
                <h4 id='enq-text'>Pay Now</h4>
              </div>
            </div>
          </div>
          {/* Rs.1999 (Best Choice) */}
          <div id='boxi' data-aos='fade-up' data-aos-delay='400'>
            
            <div id='inner-section-ind'>
              <ul>
                <li id='heading-text-box'>Rs.1999 (Best Choice)</li>
              </ul>
              <p id='desc-para-ind' >
                1. Report of your Interest Area<br></br>
                2. Report of your Intelligence Area<br></br>
                3. Personality Analysis<br></br>
                4. Three career recommendation that suits your Interest, Intelligence & Personality<br></br>
                5. 1:1 report analysis on zoom<br></br>
                6. 1 year support anytime all career related issues x 3times
                </p>
              <div id='enquire'>
                <h4 id='enq-text'>Pay Now</h4>
              </div>
            </div>
          </div>
          {/* RS.3500 (Premimum) */}
          <div id='boxi' data-aos='fade-up' data-aos-delay='200'>

            <div id='inner-section-ind'>
              <ul>
                <li id='heading-text-box'>Rs.3500 (Premium )</li>
              </ul>
              <p id='desc-para-ind'>
                1. Report of your Interest Area<br></br>
                2. Report of your Intelligence Area<br></br>
                3. Personality Analysis<br></br>
                4. Three career recommendation that suits your Interest, Intelligence & Personality<br></br>
                5. 1:1 report analysis on zoom<br></br>
                6. 1 year support anytime all career related issues *3times <br></br>
                7. 1:1 session with 1 Industry Expert – 30min
              </p>
              <div id='enquire' style={{marginTop:"10px"}}>
                <h4 id='enq-text'>Pay Now</h4>
              </div>
            </div>
          </div>
          {/* Rs.4500 (Premium) */}
          <div id='boxi' data-aos='fade-up' data-aos-delay='200' >

            <div id='inner-section-ind'>
              <ul>
                <li id='heading-text-box'>Rs.4500 (Premium )</li>
              </ul>
              <p id='desc-para-ind'>
                1. Report of your Interest Area<br></br>
                2. Report of your Intelligence Area<br></br>
                3. Personality Analysis<br></br>
                4. Three career recommendation that suits your Interest, Intelligence & Personality<br></br>
                5. 1:1 report analysis on zoom<br></br>
                6. 1 year support anytime all career related issues *3times <br></br>
                7. 1:1 session with 1 Industry Expert – 30min <br></br>
                8. Admission support to the college & university
              </p>
              <div id='enquire'>
                <h4 id='enq-text'>Pay Now</h4>
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

export default Individual;
