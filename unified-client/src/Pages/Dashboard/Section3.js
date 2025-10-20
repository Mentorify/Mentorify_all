import React from 'react'
import { useState } from 'react';
export default function Section3(props) {
  const arr = [
    "I keep my things neat and orderly most of the times",
    "Step by step directions are great help to me",
    "I am easily frustrated with disorganized people",
    "I can complete math calculations easily in my head",
    "I find working on computers is fun",
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

  const showResult=()=>{
    props.setcnt(true)
  }
  return (
    <div className="m-4">
      {(() => {
        if (no > 5) {
          return (
            <>
            <div className='text-center'>
              <button className="btn btn-lg btn-info" style={{
                marginTop:'35vh'
              }}
              onClick={showResult}
              >Check Results</button>
            </div>
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
