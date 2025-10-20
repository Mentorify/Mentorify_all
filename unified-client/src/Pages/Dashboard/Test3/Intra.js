import React from 'react'
import { useState } from 'react';

export default function Intra(props) {
  const arr = [
    "I have some important goals for my life that I think about often.",
    "I think I am a very independent person.",
    "Sometimes I talk to myself.",
    "I like to spend time alone thinking about things that are important to me.",
    "I would rather spend a vacation in a cabin in the woods than at a fancy resort.",
    "I think I know what I am good at and what I’m not so good at doing.",
    "I have hobbies and interests that I prefer to do on my own.",
    "I want to be self-employed or maybe start my own business.",
    "I like to spend time by myself thinking about thing that I value.",
    "I like to think about things before I take any action."
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
        if (no > 10) {
          return (
            <>
              <h3 className="text-info">Move to section 8!</h3>
            </>
          )
        } else {
          return (
            <>
              <h4 className="text-info">Question {no} of 10</h4>
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
