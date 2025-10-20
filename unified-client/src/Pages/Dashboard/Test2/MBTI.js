import React from "react";
import mbti from "./mbti.json";
export default function MBTI(props) {
  const data = props.data;

  const chk = mbti;
  var p1 = [];
  var p2 = [];
  var p3 = [];
  var p4 = [];
  if (data[0] > data[1]) {
    p1.push("E");
  } else if (data[0] === data[1]) {
    p1.push("E");
    p1.push("I");
  } else {
    p1.push("I");
  }

  if (data[2] > data[3]) {
    p2.push("S");
  } else if (data[2] === data[3]) {
    p2.push("S");
    p2.push("N");
  } else {
    p2.push("N");
  }

  if (data[4] > data[5]) {
    p3.push("T");
  } else if (data[4] === data[5]) {
    p3.push("T");
    p3.push("F");
  } else {
    p3.push("F");
  }

  if (data[6] > data[7]) {
    p4.push("J");
  } else if (data[6] === data[7]) {
    p4.push("J");
    p4.push("P");
  } else {
    p4.push("P");
  }

  const strings = [];

  for (let i = 0; i < p1.length; i++) {
    for (let j = 0; j < p2.length; j++) {
      for (let k = 0; k < p3.length; k++) {
        for (let l = 0; l < p4.length; l++) {
          strings.push(p1[i] + p2[j] + p3[k] + p4[l]);
        }
      }
    }
  }
  //alert(strings)
  
  return (
    <div>
      <div>
        {strings.map((el) => {
          return (
            <div className="card my-5 mx-3">
              <div className="card-body">
                <div className="card-title">
                  <h3 className="h3" style={{fontWeight:'800'}}>
                    {el}-{chk[el][0]}
            
                  </h3>
                </div>
                <div className="card-text">
                  <p>{chk[el][1]}</p>
                  <h5 className="my-3" style={{fontWeight:'700'}}>Top career suits you</h5>
                  <div className="row">
                    {chk[el][2].map((it)=>{
                      return(
                        <div className="col-sm-6 px-4 py-3">
                      <div
                        className="otherskil"
                      >
                        <svg
                          style={{height: '25', width:'25',marginRight:'5'}}
                          fill="none"
                          stroke="#4299e1"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="3"
                          class="text-blue-500 w-6 h-6 flex-shrink-0 mr-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                          <path d="M22 4L12 14.01l-3-3"></path>
                        </svg>
                        <strong>{it}</strong>
                      </div>
                    </div>
                      )
                    })}
                    
                  </div>
                  <h5 className="my-4" style={{fontWeight:'700'}}>Top Profession suits your personality</h5>
                  <div className="row">
                    {chk[el][3].map((it)=>{
                      return(
                        <div className="col-sm-6 px-4 py-3">
                      <div
                        className="otherskil"
                      >
                        <svg
                          style={{height: '25', width:'25',marginRight:'5'}}
                          fill="none"
                          stroke="#4299e1"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="3"
                          class="text-blue-500 w-6 h-6 flex-shrink-0 mr-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                          <path d="M22 4L12 14.01l-3-3"></path>
                        </svg>
                        <strong>{it}</strong>
                      </div>
                    </div>
                      )
                    })}
                    
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
