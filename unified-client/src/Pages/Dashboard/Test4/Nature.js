import React from "react";
import { useState } from "react";
export default function Nature(props) {
  const arr = props.data;
  const curr = props.qn;
  // const sec=props.nextsec-1;

  const [no, setno] = useState(1);
  const next = () => {
    props.setcnt(props.cnt + 1);
    setno(no + 1);
    //alert(JSON.stringify(props.qn))
  };

  const opt1 = () => {
    curr[no] = curr[no] + 1;
    props.setqn(curr);
    next();
  };

  const opt2 = () => {
    curr[no] = curr[no] + 2;
    props.setqn(curr);
    next();
  };

  const opt3 = () => {
    curr[no] = curr[no] + 3;
    props.setqn(curr);
    next();
  };

  const opt4 = () => {
    curr[no] = curr[no] + 4;
    props.setqn(curr);
    next();
  };

  const opt5 = () => {
    curr[no] = curr[no] + 5;
    props.setqn(curr);
    next();
  };

  const showResult = () => {
    props.setcnt(true);
  };

  return (
    <div className='m-4'>
      {(() => {
        if (no > 50) {
          return (
            <>
              <div className='text-center'>
                <a
                  className='btn btn-lg btn-info'
                  style={{
                    marginTop: "35vh",
                  }}
                  href='/dashboard'
                  onClick={showResult}>
                  Check Results
                </a>
              </div>
            </>
          );
        } else {
          return (
            <>
              <h4 className='text-info'>Question {no} of 50</h4>
              <hr />
              <h3
                className='h3 my-4'
                style={{
                  fontFamily: "Roboto",
                }}>
                {arr[no - 1]}
              </h3>
              <div className='mt-5'>
                <button className='btn btn-block btn-info' onClick={opt1}>
                  Disagree
                </button>
                <button className='btn btn-block btn-info' onClick={opt2}>
                  Slightly disagree
                </button>
                <button className='btn btn-block btn-info' onClick={opt3}>
                  Neutral
                </button>
                <button className='btn btn-block btn-info' onClick={opt4}>
                  Slightly agree
                </button>
                <button className='btn btn-block btn-info' onClick={opt5}>
                  Agree
                </button>
              </div>
            </>
          );
        }
      })()}
    </div>
  );
}
