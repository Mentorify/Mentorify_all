import React from 'react'
import { useState } from 'react';

export default function Linguistic(props) {
  const arr = [
    "I enjoy reading books.",
    "I like English, social studies and history better than math and science.",
    "I am good at using words to get others to change their mind.",
    "I’m good at Scrabble and other word games.",
    "I like to learn new words and know their meanings.",
    "It’s easy for me to memorize things at school.",
    "I like to look things up in the dictionary or any encyclopedia.",
    "I like to talk to friends and family better than watching TV.",
    "I like to write things like stories, poems and reports.",
    "I’m really good at describing things in words."
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
              <h3 className="text-info">Move to section 2!</h3>
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
