import React from 'react'
import { useState } from 'react';
export default function Section2(props) {
  const arr = [
    "I easily pick up on patterns of sound or rhythms",
    "I focus on noise and sounds",
    "Moving to beat or rhythm is easy for me",
    "I remember things by putting them into rhythms",
    "I enjoy many kinds of music",
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
              <h3 className="text-info">Move to section 3!</h3>
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
                {arr[no-1]}
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
