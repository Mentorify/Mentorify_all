
import React from 'react'
import { useState } from 'react';
export default function Nature(props) {

  const arr = props.data;
  const curr=props.qn;
  const sec=props.nextsec-1;

  const [no, setno] = useState(1)
  const next=()=>{
    props.setcnt(props.cnt+1)
    setno(no+1)
    //alert(JSON.stringify(props.qn))  
  }

  const opt1=()=>{
    curr[sec-1]=curr[sec-1]+0;
    props.setqn(curr);
    next();
  }

  const opt2=()=>{
    curr[sec-1]=curr[sec-1]+1;
    props.setqn(curr);
    next();
  }

  const opt3=()=>{
    curr[sec-1]=curr[sec-1]+2;
    props.setqn(curr);
    next();
  }

  const opt4=()=>{
    curr[sec-1]=curr[sec-1]+3;
    props.setqn(curr);
    next();
  }

  const opt5=()=>{
    curr[sec-1]=curr[sec-1]+4;
    props.setqn(curr);
    next();
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
              <a className="btn btn-lg btn-info" style={{
                marginTop:'35vh'
              }}
              onClick={showResult}
              href='/dashboard'
              >Check Results</a>
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
                {arr[no - 1]}
              </h3>
              <div className='mt-5'>
              <button className='btn btn-block btn-info' onClick={opt1}>Dislike <i class="fa-regular fa-2xl fa-face-frown"></i></button>
                <button className='btn btn-block btn-info'onClick={opt2}>Slightly Dislike <i class="fa-regular fa-2xl fa-face-frown-open"></i></button>
                <button className='btn btn-block btn-info'onClick={opt3}>Neither like nor Dislike <i class="fa-regular fa-2xl fa-face-meh"></i></button>
                <button className='btn btn-block btn-info'onClick={opt4}>Slightly Enjoy <i class="fa-regular fa-face-smile fa-2xl"></i></button>
                <button className='btn btn-block btn-info'onClick={opt5}>Enjoy <i class="fa-regular fa-face-laugh-beam fa-2xl"></i></button>
              </div>
            </>
          )
        }
      })()}
    </div>
  );
}
