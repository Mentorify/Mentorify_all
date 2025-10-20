
import React from 'react'
import { useState } from 'react';
export default function Nature(props) {

  const arr = props.data;
  const curr=props.qn;

  const [no, setno] = useState(1)
  const next=()=>{
    props.setcnt(props.cnt+1)
    setno(no+1)
    //alert(JSON.stringify(props.qn))  
  }

  const incrA=()=>{
    const num=(props.nextsec-2)*10+no;
    if(num%7===1)
    {
      curr['E']=curr['E']+1;
      props.setqn(curr);
    }

    else if(num%7===2||num%7===3)
    {
      curr['S']=curr['S']+1;
      props.setqn(curr);
    }

    else if(num%7===4||num%7===5)
    {
      curr['T']=curr['T']+1;
      props.setqn(curr);
    }
    else
    {
      curr['J']=curr['J']+1;
      props.setqn(curr);
    }
    next();

  }

  const incrB=()=>{
    const num=(props.nextsec-2)*10+no;
    if(num%7===1)
    {
      curr['I']=curr['I']+1;
      props.setqn(curr);
    }

    else if(num%7===2||num%7===3)
    {
      curr['N']=curr['N']+1;
      props.setqn(curr);
    }

    else if(num%7===4||num%7===5)
    {
      curr['F']=curr['F']+1;
      props.setqn(curr);
    }
    else
    {
      curr['P']=curr['P']+1;
      props.setqn(curr);
    }
    next();
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
              onClick={showResult}
              href='/dashboard'
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
                {arr[no - 1][0]}
              </h3>
              <div className='mt-5'>
                <button className="btn btn-block btn-outline-info mx-2" onClick={incrA}>{arr[no - 1][1]}</button>

                <button className="btn btn-block btn-outline-info mx-2" onClick={incrB}>{arr[no - 1][2]}</button>
              </div>
            </>
          )
        }
      })()}
    </div>
  );
}
