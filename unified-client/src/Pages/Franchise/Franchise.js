import React, { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
// import "./Individual.css";
import { Footer } from "../../components/Footer/Footer"
import { Header } from "../../components/Header/Header"
import "./Franchise.css"

const Franchise = () => {
  useEffect(() => {
    AOS.init()
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <Header />
      <section className='section-body  container-fluid'>
        <h1 id='heading' data-aos='fade-up'>
          Package for Franchise
        </h1>

        {/* <!-- first two col  -->  */}
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
                <li id='heading-text-box'>ICC ( RS.25000+GST)</li>
                <li style={{ color: "white", listStyle: "none" }}>
                  <h3>(Independent Career Coach)</h3>
                </li>
              </ul>
              <p id='desc-para-ind'>
                1. Access of Tech Platform<br></br>
                2. Training & Certification<br></br>
                3. Office Space - Not Mandotary
              </p>
              <div id='enquire'>
                <h4 id='enq-text'>Contact Us</h4>
              </div>
            </div>
          </div>
          {/* Rs.1999 (Best Choice) */}
          <div id='boxi' data-aos='fade-up' data-aos-delay='400'>
            <div id='inner-section-ind'>
              <ul>
                <li id='heading-text-box'>Micro (Rs. 49000+GST)</li>
              </ul>
              <p id='desc-para-ind'>
                1. Access of tech Platform<br></br>
                2. Training & Certification<br></br>
                3. Office Space - Min 100 sq.ft.<br></br>
                4. Available for Tier-3 city<br></br>
              </p>
              <div id='enquire'>
                <h4 id='enq-text'>Contact Us</h4>
              </div>
            </div>
          </div>
          {/* RS.3500 (Premimum) */}
          <div id='boxi' data-aos='fade-up' data-aos-delay='200'>
            <div id='inner-section-ind'>
              <ul>
                <li id='heading-text-box'>Franchise (Rs. 99000+GST )</li>
              </ul>
              <p id='desc-para-ind'>
                1. Access of tech Platform<br></br>
                2. Training & Certification<br></br>
                3. Office Space - Min 200 sq.ft.<br></br>
                4. Available for Tier-2 city<br></br>
                5. Office setup support<br></br>
              </p>
              <div id='enquire' style={{ marginTop: "10px" }}>
                <h4 id='enq-text'>Contact Us</h4>
              </div>
            </div>
          </div>
          {/* Rs.4500 (Premium) */}
          <div id='boxi' data-aos='fade-up' data-aos-delay='200'>
            <div id='inner-section-ind'>
              <ul>
                <li id='heading-text-box'>
                  Master Franchise (Rs. 1,49,000+GST )
                </li>
              </ul>
              <p id='desc-para-ind'>
                1. Access of tech Platform<br></br>
                2. Training & Certification<br></br>
                3. Office Space - Min 400 sq.ft.<br></br>
                4. Available for Tier-1&2 city<br></br>
                5. Office setup support<br></br>
                6. Training to whole team members <br></br>
                7. Student Support <br></br>
                8. Sales & Marketing Support <br></br>
              </p>
              <div id='enquire'>
                <h4 id='enq-text'>Contact Us</h4>
              </div>
            </div>
          </div>

          {/* <!-- 3rd box --> */}
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Franchise
