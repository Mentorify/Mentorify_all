import React from 'react'
import { useState } from 'react';

export default function Spatial(props) {
  const arr = [
    "I enjoy drawing, painting and doodling.",
    "I like to figure out how to take apart and put back together things like toys and puzzles.",
    "When I watch a movie or video, I am more interested in what I see than what I hear.",
    "When I close my eyes, sometimes I can see clear images in my head that seem real.",
    "I am good at reading maps and finding my way around unfamiliar places.",
    "I like some colors better than others.",
    "I sketch or draw when I think.",
    "I enjoy reading things more when they have lots of pictures and drawings.",
    "I am good at playing Pictionary, doing jigsaw puzzles, and solving mazes.",
    "I am better at remembering faces than names."
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
              <h3 className="text-info">Move to section 4!</h3>
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
