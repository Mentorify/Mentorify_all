import React from 'react'
import { useState } from 'react';

export default function Bodily(props) {
  const arr = [
    "I love being outdoors and enjoy spending my free time outside.",
    "I am an active person and if I can’t move around I get bored.",
    "I think I am well coordinated.",
    "I have good skills in one or more sports and learn new sports quickly.",
    "I like organized team sports as much as individual sports activities, such as tennis, swimming, skiing, golf or ballet.",
    "I don’t mind getting my hands dirty from activities like painting, clay, or fixing and building things.",
    "Sometimes when I talk with people, I gesture with my hands.",
    "I would rather play a sport than watch it.",
    "I like to “ham it up” in skits, plays, speeches, sports or other types of activities.",
    "I like working with my hands in activities such as sewing, carving, or model-building."
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
              <h3 className="text-info">Move to section 5!</h3>
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
