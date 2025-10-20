import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";

const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Header />

      {/* <!-- Banner --> */}
      <div id='first-screen'>
        <div id='banner'>
          <div className='book-session'>
            <h1 data-aos='fade-up'>
              Leading & Innovative Career Guidance Platform
            </h1>
            <button data-aos='fade-up' data-aos-delay='400'>
              <a
                href='https://calendly.com/careerclarify'
                style={{ textDecoration: "none", color: "black" }}>
                Book a Session
              </a>
            </button>
          </div>
        </div>

        {/* <!-- Banner Footer or Banner Features --> */}
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
              Post Graduate Happy With Our Help in Selecting Their Right Choice
              Of Course
            </p>
          </div>
          <div className='banner-footer-box'>
            <h2>200</h2>
            <p>Seminars Organised on Careers</p>
          </div>
        </section>
      </div>

      {/* <!-- features section  --> */}
      <section id='feature'>
        <h2 data-aos='fade-up'>Features</h2>
        <h1 data-aos='fade-up'>Discover Our Services</h1>
        <div className='services' data-aos='fade-up'>
          <div className='se' data-aos='fade-up' data-aos-delay='0'>
            <div className='image'>
              <img
                alt='img'
                id='stream'
                src='../img/images/services/stream-selection.png'
              />
            </div>
            <div className='info'>
              <h3>Stream Selection</h3>
              <p>
                Help To Provide The Right Stream Selection For Class 9th & 10th
              </p>
            </div>
            <button>ENQUIRE NOW</button>
          </div>
          <div className='se' data-aos='fade-up' data-aos-delay='200'>
            <div className='image'>
              <img
                alt='img'
                src='../img/images/services/course-selection.png'
              />
            </div>
            <div className='info'>
              <h3>Course Selection</h3>
              <p>
                We guide post Graduate student and under graduate in their
                course selection.
              </p>
            </div>
            <button>ENQUIRE NOW</button>
          </div>
          <div className='se' data-aos='fade-up' data-aos-delay='400'>
            <div className='image'>
              <img
                alt='img'
                src='../img/images/services/career-selection.png'
              />
            </div>
            <div className='info'>
              <h3>Career Selection</h3>
              <p>We help you discover your ideal career in 11th & 12th class</p>
            </div>
            <button>ENQUIRE NOW</button>
          </div>
          <div className='se' data-aos='fade-up' data-aos-delay='600'>
            <div className='image'>
              <img alt='img' src='../img/images/services/interest-finder.png' />
            </div>
            <div className='info'>
              <h3>Interest finder</h3>
              <p>
                Our interest finder proffesional are always ready to discover
                your interest area
              </p>
            </div>
            <button>ENQUIRE NOW</button>
          </div>
        </div>
        <div className='btn-container' data-aos='fade-up' data-aos-delay='400'>
          <div className='button'>View More</div>
        </div>
        <h2 data-aos='fade-up'>Testimonials</h2>
        <div className='testimonials'>
          <div className='testimonial' data-aos='fade-up' data-aos-delay='0'>
            <img alt='img' src='../img/images/testemonials/t1.png' />
            <div className='info'>
              <h3>Abhay Viraj</h3>
              <p>
                This platform Helped me make great decisions about my carerer,
                When i was confused about makimg decisions
              </p>
            </div>
          </div>
          <div className='testimonial' data-aos='fade-up' data-aos-delay='200'>
            <img alt='img' src='../img/images/testemonials/t2.png' />
            <div className='info'>
              <h3>Daiwik Advik</h3>
              <p>
                This platform Helped me make great decisions about my carerer,
                When i was confused about makimg decisions
              </p>
            </div>
          </div>
          <div className='testimonial' data-aos='fade-up' data-aos-delay='400'>
            <img alt='img' src='../img/images/testemonials/t3.png' />
            <div className='info'>
              <h3>Ganesh Aadi</h3>
              <p>
                This platform Helped me make great decisions about my carerer,
                When i was confused about makimg decisions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- about us section  --> */}
      <section id='about'>
        <div className='about-company'>
          <h2 data-aos='fade-up'>About Us</h2>
          <h1 data-aos='fade-up'>About Our Company</h1>
          <div className='parent-wrapper'>
            <div className='wrapper'>
              <div className='main-image' data-aos='fade-right'>
                <img alt='img' src='../img/images/about/main-pic.jpg' />
              </div>
              <div className='oval' data-aos='fade-left'>
                <h2>
                  Worryless About picking the right course, Finding your
                  interest area And Career Guidance.
                </h2>
                <p>
                  Mentorify Is An edtech Start up Based On psychology, AI&
                  ml technology Thats Provides Solutions to the Growing problems
                  of lack of directional in the life of todays youth like
                  choosing right career specialization and many more
                </p>
                <button>LEARN NOW</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- frame88 section --> */}
      <section id='frame'>
        <div className='meet'>
          <h1 data-aos='fade-up'>
            Meet Some Of Our Best Rated Career Guardians
          </h1>
          <div className='slider'>
            <div className='guardians' data-aos='fade-up' data-aos-delay='0'>
              <img alt='img' src='../img/images/guardians/guardian.png' />
              <div className='info'>
                <h3>Ganesh Aadi</h3>
                <p>Career Guardian On Software Engineering</p>
              </div>
              <button>Connect</button>
            </div>
            <div className='guardians' data-aos='fade-up' data-aos-delay='200'>
              <img alt='img' src='../img/images/guardians/guardian.png' />
              <div className='info'>
                <h3>Arush Moon</h3>
                <p>Career Guardian On Software Engineering</p>
              </div>
              <button>Connect</button>
            </div>
            <div className='guardians' data-aos='fade-up' data-aos-delay='400'>
              <img alt='img' src='../img/images/guardians/guardian.png' />
              <div className='info'>
                <h3>Shiva Aarav</h3>
                <p>Career Guardian On Software Engineering</p>
              </div>
              <button>Connect</button>
            </div>
            <div className='guardians' data-aos='fade-up' data-aos-delay='600'>
              <img alt='img' src='../img/images/guardians/guardian.png' />
              <div className='info'>
                <h3>Dhemmex Sayo</h3>
                <p>Career Guardian On Software Engineering</p>
              </div>
              <button>Connect</button>
            </div>
          </div>
        </div>
        {/* <div className='discount' data-aos='flip-down'>
          <p>Discount Expire</p>
          <h1>02:58:16</h1>
          <h2>50% Discount</h2>
        </div> */}
        <div className='discover'>
          <h2 data-aos='fade-up'>
            Discover The right course needed to actualize your growth
          </h2>
          <div className='courses'>
            <div className='search' data-aos='fade-up'>
              <input
                type='text'
                placeholder='What Courses Can I Help You With'
              />
              <button>
                <img alt='img' src='../img/images/search.png' />
              </button>
            </div>
            <div className='all-courses' data-aos='fade-up'>
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
              <div className='explore'>Explore More Courses</div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- 5th section --> */}
      <section className='fifth-section' id='home-gallery'>
        <h2 data-aos='fade-up'>Gallery</h2>
        <h3 data-aos='fade-up'>
          Have a look at some of our pictures and videos from seminars
        </h3>
        <div className='slider center-gallery' data-aos='fade-up'>
          {/* <Slider {...settings}> */}
          <img alt='img' src='../img/images/gallery/g1.png' />
          <img alt='img' src='../img/images/gallery/g2.png' />
          <img alt='img' src='../img/images/gallery/g3.png' />
          <img alt='img' src='../img/images/gallery/g4.png' />
          <img alt='img' src='../img/images/gallery/g5.png' />
          <img alt='img' src='../img/images/gallery/g1.png' />
          {/* </Slider> */}
        </div>
        <h3 data-aos='fade-up'>Subscribe to our news letter</h3>
        <div className='form animate__animated animate__fadeInUp'>
          <input
            type='text'
            name='email'
            id='email'
            placeholder='Enter Email Address'
          />
          <button className='subscribe'>Subscribe</button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
