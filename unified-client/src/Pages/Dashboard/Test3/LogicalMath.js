import React from 'react'
import { useState } from 'react';

export default function LogicalMath(props) {
  const arr = [
    "I have always liked math and science classes best and I do well in them.",
    "I try to look for patterns and regularities in things, such as every third stair on the staircase has a notch in it.",
    "I enjoy playing around with a chemistry set and am interested in new discoveries in science.",
    "I believe that almost everything has a logical explanation.",
    "I like to play games and solve brainteasers that require tactics and strategy.",
    "It is fun for me to work with numbers and data.",
    "I like to ask people questions about how things work or why nature is the way it is.",
    "I have an easy time understanding new math concepts in school.",
    "I like things better when they are organized, categorized or measured.",
    "I think I am good at working with numbers and data."
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
              <h3 className="text-info">Move to section 3!</h3>
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
