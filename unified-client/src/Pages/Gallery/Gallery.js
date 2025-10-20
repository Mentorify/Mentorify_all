import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Header } from "../../components/Header/Header";
import { Link } from "react-router-dom";

import "./Gallery.css";

const Gallery = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Header />
      <section id='gallery'>
        <div id='name'>
          <h1 id='heading-text' data-aos='fade-up' data-aos-delay='0'>
            Gallery
          </h1>
          <div id='rect' data-aos='fade-up' data-aos-delay='0'></div>
        </div>
        <h3 id='desc-text' data-aos='fade-up' data-aos-delay='300'>
          Have a look At some of our pictures and videos from seminars
        </h3>

        <div id='rect1' data-aos='fade-up' data-aos-delay='500'>
          <h3 id='desc2'>
            These Are Pictures On students we have helped with their career
            Decision Process
          </h3>
        </div>

        <div id='gallery-section-1' data-aos='fade-up' data-aos-delay='600'>
          <div id='img-style'>
            <img alt='img' src='./img/gimages/IMG_20220528_213805_846.jpg' />
          </div>
          <div id='img-style'>
            <img alt='img' src='./img/gimages/IMG_20211014_132715_612.jpg' />
          </div>
          <div id='img-style'>
            <img alt='img' src='./img/gimages/IMG_20211014_132715_651.jpg' />
          </div>
          <div id='img-style'>
            <img alt='img' src='./img/gimages/IMG_20220528_223623_382.jpg' />
          </div>
          <div id='img-style'>
            <img alt='img' src='./img/gimages/IMG_20211119_105442_007.jpg' />
          </div>
          <div id='img-style'>
            <img alt='img' src='./img/gimages/IMG_20211119_105442_023.jpg' />
          </div>
        </div>
        <div className='btn-container' data-aos='fade-up' data-aos-delay='0'>
          <div className='button'>View More From Gallery</div>
        </div>
        {/* <!-- text  --> */}

        <div id='rect2' data-aos='fade-up' data-aos-delay='0'>
          <h3 id='text-2'>
            These Are Videos From Seminars we have impacted on
          </h3>
        </div>

        {/* <!-- video-section  --> */}
        <div id='video-frame' data-aos='fade-up' data-aos-delay='300'>
          <div id='video'>
            <img alt='img' src='./img/gvideo/IMG_20220823_222606_152.jpg' />
          </div>
          <div id='video'>
            <img alt='img' src='./img/gvideo/IMG_20220823_222606_992.jpg' />
          </div>
          <div id='video'>
            <img alt='img' src='./img/gvideo/IMG_20220916_101346_893.jpg' />
          </div>
          <div id='video'>
            <img alt='img' src='./img/gvideo/IMG_20220916_101346_911.jpg' />
          </div>
          <div id='video'>
            <img alt='img' src='./img/gvideo/IMG_20221001_174013_901.jpg' />
          </div>
          <div id='video'>
            <img alt='img' src='./img/gvideo/IMG_20221001_174013_954.jpg' />
          </div>
        </div>

        {/* <!-- go-to-home  --> */}
        <div className='go-to'>
          <h4 id='gth'>
            <Link to='/'>Go To Homepage</Link>
          </h4>
        </div>
      </section>
    </>
  );
};

export default Gallery;
