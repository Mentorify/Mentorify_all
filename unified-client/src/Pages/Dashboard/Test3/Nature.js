
import React from 'react'
import { useState } from 'react';
export default function Nature(props) {

  const arr = [
  "I love animals and I spend a lot of time with them.",
  "I enjoy watching nature shows on television like the Discovery Channel, National Geographic and Nova.",
  "It’s fun to watch birds or other animals, to watch their habits, and to learn more about them.",
  "I’m very good at telling the difference between different kinds of birds, dogs, trees and stuff like that.",
  "I enjoy visiting zoos, natural history museums or other places where the world is studied.",
  "I like being outside whenever possible; I feel confident and comfortable there.",
  "I like camping and hiking.",
  "I want to become a volunteer in an ecological organization (such as Greenpeace or Sierra Club) to help save nature from further destruction.",
  "When I was younger I used to dislodge big rocks from the ground to discover the living things underneath.",
  "I have a green thumb and I am really good at keeping plants alive and healthy."
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
        if (no > 10) {
          return (
            <>
            <div className='text-center'>
              <a className="btn btn-lg btn-info" style={{
                marginTop:'35vh'
              }}
              href="/dashboard"
              onClick={showResult}
              >Check Results</a>
            </div>
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
