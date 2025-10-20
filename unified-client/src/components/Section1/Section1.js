import React from "react";
import { Sec } from "./sections";
import "./Section1.css";

export const Section1 = () => {
  return (
    <>
      {/* <!-- section 1 --> */}
      <section id='section'>
        <h2 class='section-heading'>
          <span>Top Picks</span>
        </h2>
        <div class='services'>
          <Sec
            image='../img/image/IMG_20220528_213805_707.jpg'
            sectionHeader='Stream Selection'
            sectionDescription='Help To Provide The Right Stream Selection For Class 9th & 10th'
          />
          <Sec
            image='../img/image/IMG_20211014_132715_651.jpg'
            sectionHeader='Course Selection'
            sectionDescription='We guide post Graduate student and under graduate in their
            course selection'
          />
          <Sec
            image='../img/image/IMG_20211119_105442_007.jpg'
            sectionHeader='Career Selection'
            sectionDescription='We help you discover your ideal career in 11th & 12th class'
          />
          <Sec
            image='../img/image/IMG_20211014_132715_612.jpg'
            sectionHeader='Interest finder'
            sectionDescription='Our interest finder proffesional are always ready to discover
            your interest area'
          />
        </div>
      </section>
    </>
  );
};
