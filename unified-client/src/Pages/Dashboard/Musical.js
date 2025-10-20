import React from "react";
import { useState } from "react";
import data from "./data.json";

export default function Musical(props) {
  const arr = data.sec1;

  const [no, setno] = useState(1);
  const next = () => {
    props.setcnt(props.cnt + 1);
    setno(no + 1);
  };

  const incr = () => {
    next();
    props.setqn(props.qn + 1);
  };

  return (
    <div className="m-4">
      {(() => {
        if (no > 10) {
          return (
            <>
              <h3 className="text-info">Move to section 6!</h3>
            </>
          );
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
              <div className="mt-5">
                <button
                  className="btn btn-block btn-success btn-rounded mx-2"
                  onClick={incr}
                >
                  {arr[no - 1][1]}
                </button>

                <button
                  className="btn btn-block btn-danger btn-rounded mx-2"
                  onClick={next}
                >
                  {arr[no - 1][2]}
                </button>
              </div>
            </>
          );
        }
      })()}
    </div>
  );
}
