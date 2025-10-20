import React, { useState } from "react";

export default function Section1(props) {
  const arr = [
    "I enjoy putting things that have common characteristics",
    "Issues about health and ecology are important to me",
    "I enjoy working in Garden",
    "I believe preserving our national park is important to me",
    "animals are important part of my life",
  ];

  const [no, setno] = useState(1)
  const next=()=>{
    props.setcnt(props.cnt+1)
    setno(no+1)  
  }

  const incr=()=>{
    next();
    props.setqn(props.qn+1)
  }

  return (
    <div className="m-4">
      {(() => {
        if (no > 5) {
          return (
            <>
              <h3 className="text-info">Move to section 2!</h3>
            </>
          )
        } else {
          return (
            <>
              <h4 className="text-info">Question {no} of 5</h4>
              <hr />
              <h3
                className="h3 my-4"
                style={{
                  fontFamily: "Roboto",
                }}
              >
                {arr[no - 1]}
              </h3>
              <div>
                <button className="btn btn-lg btn-success btn-rounded mx-2" onClick={incr}>Yes ✔</button>

                <button className="btn btn-lg btn-danger btn-rounded mx-2" onClick={next}>No ✖</button>
              </div>
            </>
          )
        }
      })()}
    </div>
  );
}
