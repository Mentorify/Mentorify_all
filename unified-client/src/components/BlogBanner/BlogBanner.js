import React from "react";
import "./BlogBanner.css";
export const BlogBanner = () => {
  return (
    <>
      {/* <!-- blog banner --> */}
      <section id='blog-banner'>
        <h1>Search BE/B.Tech Colleges, Courses and Exams</h1>
        {/* <!-- data-aos="fade-up" --> */}
        <div class='search'>
          <input
            type='text'
            placeholder='What Colleges,Courses and Exams Can I Help You With'
          />
          <button>
            <img alt='img' src='../img/images/search.png' />
          </button>
        </div>
        <div class='counselling'>
          <button>Need Counselling</button>
        </div>
      </section>
    </>
  );
};
