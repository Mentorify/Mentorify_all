import React from 'react'
import { useState } from 'react';

export default function Musical(props) {
  const arr = [
    "I have a pleasant singing voice and I like to sing.",
    "I frequently listen to music because I enjoy it so much.",
    "I can play a musical instrument.",
    "I can easily keep time to a piece of music.",
    "I know the tunes and titles of many songs and musical pieces.",
    "Sometimes I catch myself walking along with a television jingle or song in my mind.",
    "I like to make up my own tunes and melodies.",
    "Often I keep time to music by tapping to the beat or humming the tune when I am studying or talking on the phone.",
    "I can tell when notes are off-key.",
    "I know what I like and don’t like in music."
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
              <h3 className="text-info">Move to section 6!</h3>
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
