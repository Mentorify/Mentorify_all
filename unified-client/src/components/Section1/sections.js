import React from "react";

export const Sec = ({ image, sectionHeader, sectionDescription }) => {
  return (
    <>
      <div class='se'>
        <div class='image'>
          <img alt='img' id='stream' src={image} />
        </div>
        <div class='info'>
          <h3>{sectionHeader}</h3>
          <p>{sectionDescription}</p>
        </div>
      </div>
    </>
  );
};
