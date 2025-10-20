import React from "react"
import { useState } from "react"
// import Result from "./Result";
import Linguistic from "./Linguistic"
import Nature from "./Nature"
import data from "./data.json"
import useAuth from "../../../Hooks/useAuth"

export default function Test2() {
  const { user } = useAuth()
  const [score, setscore] = useState({
    I: 0,
    E: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  })
  const [cnt, setcnt] = useState(false)

  const addScore = async () => {
    try {
      const test2Score = {
        attempt: true,
        traits: {
          I: score["I"] * 10,
          E: score["E"] * 10,
          S: score["S"] * 5,
          N: score["N"] * 5,
          T: score["T"] * 5,
          F: score["F"] * 5,
          J: score["J"] * 5,
          P: score["P"] * 5,
        },
      }

      const res = await fetch("/api/dashboard/test-2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ test2Score }),
      })
      const data = await res.json()
      // Debug
      // console.log(res);
      if (!data || res.status === 500) {
        // window.alert("INVALID Test2 Score Provided!");
        console.log("INVALID Test2 Score Provided!")
      } else {
        // window.alert("Test2 score updated !");

        console.log("Test2 score updated !")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <nav className='navbar navbar-light bg-dark'>
        <div className='container-fluid'>
          <span className='navbar-brand mb-0 h1 text-white'>
            Career Clarify Test
          </span>
        </div>
      </nav>

      <div className='row'>
        <div
          className='col-md-2'
          style={{
            background: "#4f4f4f",
            height: "100vh",
          }}
        >
          <div
            className='nav flex-column nav-pills text-center mx-1'
            id='v-pills-tab'
            role='tablist'
            aria-orientation='vertical'
          >
            <a
              className='nav-link active'
              id='v-pills-home-tab'
              data-mdb-toggle='pill'
              href='#v-1'
              role='tab'
              aria-controls='v-pills-home'
              aria-selected='true'
            >
              Section 1 <i className='fa fa-eye'></i>
            </a>
            <a
              className='nav-link'
              id='v-pills-profile-tab'
              data-mdb-toggle='pill'
              href='#v-2'
              role='tab'
              aria-controls='v-pills-profile'
              aria-selected='false'
            >
              Section 2 <i className='fa fa-eye'></i>
            </a>
            <a
              className='nav-link'
              id='v-pills-messages-tab'
              data-mdb-toggle='pill'
              href='#v-3'
              role='tab'
              aria-controls='v-pills-messages'
              aria-selected='false'
            >
              Section 3 <i className='fa fa-eye'></i>
            </a>
            <a
              className='nav-link'
              id='v-pills-messages-tab'
              data-mdb-toggle='pill'
              href='#v-4'
              role='tab'
              aria-controls='v-pills-messages'
              aria-selected='false'
            >
              Section 4 <i className='fa fa-eye'></i>
            </a>
            <a
              className='nav-link'
              id='v-pills-messages-tab'
              data-mdb-toggle='pill'
              href='#v-5'
              role='tab'
              aria-controls='v-pills-messages'
              aria-selected='false'
            >
              Section 5 <i className='fa fa-eye'></i>
            </a>
            <a
              className='nav-link'
              id='v-pills-messages-tab'
              data-mdb-toggle='pill'
              href='#v-6'
              role='tab'
              aria-controls='v-pills-messages'
              aria-selected='false'
            >
              Section 6 <i className='fa fa-eye'></i>
            </a>
            <a
              className='nav-link'
              id='v-pills-messages-tab'
              data-mdb-toggle='pill'
              href='#v-7'
              role='tab'
              aria-controls='v-pills-messages'
              aria-selected='false'
            >
              Section 7 <i className='fa fa-eye'></i>
            </a>
          </div>
        </div>

        <div className='col-md-9'>
          {(() => {
            if (cnt === true) {
              addScore()
              return <>{/* <Result qn={score}/> */}</>
            } else {
              return (
                <>
                  <div className='tab-content' id='v-pills-tabContent'>
                    <div
                      className='tab-pane fade show active'
                      id='v-1'
                      role='tabpanel'
                      aria-labelledby='v-pills-home-tab'
                    >
                      <Linguistic
                        qn={score}
                        setqn={setscore}
                        cnt={cnt}
                        setcnt={setcnt}
                        data={data.sec1}
                        nextsec={2}
                      />
                    </div>
                    <div
                      className='tab-pane fade'
                      id='v-2'
                      role='tabpanel'
                      aria-labelledby='v-pills-profile-tab'
                    >
                      <Linguistic
                        qn={score}
                        setqn={setscore}
                        cnt={cnt}
                        setcnt={setcnt}
                        data={data.sec2}
                        nextsec={3}
                      />
                    </div>
                    <div
                      className='tab-pane fade'
                      id='v-3'
                      role='tabpanel'
                      aria-labelledby='v-pills-messages-tab'
                    >
                      <Linguistic
                        qn={score}
                        setqn={setscore}
                        cnt={cnt}
                        setcnt={setcnt}
                        data={data.sec3}
                        nextsec={4}
                      />
                    </div>
                    <div
                      className='tab-pane fade'
                      id='v-4'
                      role='tabpanel'
                      aria-labelledby='v-pills-messages-tab'
                    >
                      <Linguistic
                        qn={score}
                        setqn={setscore}
                        cnt={cnt}
                        setcnt={setcnt}
                        data={data.sec4}
                        nextsec={5}
                      />
                    </div>
                    <div
                      className='tab-pane fade'
                      id='v-5'
                      role='tabpanel'
                      aria-labelledby='v-pills-messages-tab'
                    >
                      <Linguistic
                        qn={score}
                        setqn={setscore}
                        cnt={cnt}
                        setcnt={setcnt}
                        data={data.sec5}
                        nextsec={6}
                      />
                    </div>
                    <div
                      className='tab-pane fade'
                      id='v-6'
                      role='tabpanel'
                      aria-labelledby='v-pills-messages-tab'
                    >
                      <Linguistic
                        qn={score}
                        setqn={setscore}
                        cnt={cnt}
                        setcnt={setcnt}
                        data={data.sec6}
                        nextsec={7}
                      />
                    </div>
                    <div
                      className='tab-pane fade'
                      id='v-7'
                      role='tabpanel'
                      aria-labelledby='v-pills-messages-tab'
                    >
                      <Nature
                        qn={score}
                        setqn={setscore}
                        cnt={cnt}
                        setcnt={setcnt}
                        data={data.sec7}
                        nextsec={8}
                      />
                    </div>
                  </div>
                </>
              )
            }
          })()}
        </div>
      </div>
    </div>
  )
}
