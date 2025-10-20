import React from 'react'
import { useState } from 'react';

export default function Inter(props) {
  const arr = [
    "I’m the kind of person others come to for advice.",
    "I like going to parties and social events.",
    "I don’t like to argue with people.",
    "I enjoy getting other people to work together.",
    "I consider myself a leader (and others call me that).",
    "When I have a problem, I’ll probably ask a friend for help.",
    "I have at least three close friends.",
    "I am easy to get to know.",
    "I feel comfortable most of the time, even in the midst of a crowd.",
    "I am good at making new friends."
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
              <h3 className="text-info">Move to section 7!</h3>
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
