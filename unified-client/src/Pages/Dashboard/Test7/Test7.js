import React from "react"
import { useState } from "react"
// import Result from "./Result";
import Linguistic from "./Linguistic"
import LogicalMath from "./LogicalMath"
import Spatial from "./Spatial"
import Bodily from "./Bodily"
import Inter from "./Inter"
import Intra from "./Intra"
import Nature from "./Nature"
import Musical from "./Musical"
import useAuth from "../../../Hooks/useAuth"

export default function Test7() {
  const { user } = useAuth()
  const [qn1, setqn1] = useState(0)
  const [qn2, setqn2] = useState(0)
  const [qn3, setqn3] = useState(0)
  const [qn4, setqn4] = useState(0)
  const [qn5, setqn5] = useState(0)
  const [qn6, setqn6] = useState(0)
  const [qn7, setqn7] = useState(0)
  const [qn8, setqn8] = useState(0)

  const [cnt, setcnt] = useState(false)

  const addScore = async () => {
    try {
      const test7Score = {
        attempt: true,
        traits: {
          Linguistics: qn1 * 10,
          LogicalMathematical: qn2 * 10,
          Spatial: qn3 * 10,
          BodilyKinesthetic: qn4 * 10,
          Musical: qn5 * 10,
          Interpersonal: qn6 * 10,
          Intrapersonal: qn7 * 10,
          Nature: qn8 * 10,
        },
      }

      const res = await fetch("/api/dashboard/test-7", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ test7Score }),
      })
      const data = await res.json()
      // Debug
      // console.log(res);
      if (!data || res.status === 500) {
        // window.alert("INVALID Test7 Score Provided!");
        console.log("INVALID Test7 Score Provided!")
      } else {
        // window.alert("Test7 score updated !");

        console.log("Test7 score updated !")
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
            <a
              className='nav-link'
              id='v-pills-messages-tab'
              data-mdb-toggle='pill'
              href='#v-8'
              role='tab'
              aria-controls='v-pills-messages'
              aria-selected='false'
            >
              Section 8 <i className='fa fa-eye'></i>
            </a>
          </div>
        </div>

        <div className='col-md-9'>
          {(() => {
            if (cnt === true) {
              addScore()
              return (
                <>
                  {/* <Result qn1={qn1} qn2={qn2} qn3={qn3} qn4={qn4} qn5={qn5} qn6={qn6} qn7={qn7} qn8={qn8}/> */}
                </>
              )
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
                        qn={qn1}
                        setqn={setqn1}
                        cnt={cnt}
                        setcnt={setcnt}
                      />
                    </div>
                    <div
                      className='tab-pane fade'
                      id='v-2'
                      role='tabpanel'
                      aria-labelledby='v-pills-profile-tab'
                    >
                      <LogicalMath
                        qn={qn2}
                        setqn={setqn2}
                        cnt={cnt}
                        setcnt={setcnt}
                      />
                    </div>
                    <div
                      className='tab-pane fade'
                      id='v-3'
                      role='tabpanel'
                      aria-labelledby='v-pills-messages-tab'
                    >
                      <Spatial
                        qn={qn3}
                        setqn={setqn3}
                        cnt={cnt}
                        setcnt={setcnt}
                      />
                    </div>
                    <div
                      className='tab-pane fade'
                      id='v-4'
                      role='tabpanel'
                      aria-labelledby='v-pills-messages-tab'
                    >
                      <Bodily
                        qn={qn4}
                        setqn={setqn4}
                        cnt={cnt}
                        setcnt={setcnt}
                      />
                    </div>
                    <div
                      className='tab-pane fade'
                      id='v-5'
                      role='tabpanel'
                      aria-labelledby='v-pills-messages-tab'
                    >
                      <Musical
                        qn={qn5}
                        setqn={setqn5}
                        cnt={cnt}
                        setcnt={setcnt}
                      />
                    </div>
                    <div
                      className='tab-pane fade'
                      id='v-6'
                      role='tabpanel'
                      aria-labelledby='v-pills-messages-tab'
                    >
                      <Inter
                        qn={qn6}
                        setqn={setqn6}
                        cnt={cnt}
                        setcnt={setcnt}
                      />
                    </div>
                    <div
                      className='tab-pane fade'
                      id='v-7'
                      role='tabpanel'
                      aria-labelledby='v-pills-messages-tab'
                    >
                      <Intra
                        qn={qn7}
                        setqn={setqn7}
                        cnt={cnt}
                        setcnt={setcnt}
                      />
                    </div>
                    <div
                      className='tab-pane fade'
                      id='v-8'
                      role='tabpanel'
                      aria-labelledby='v-pills-messages-tab'
                    >
                      <Nature
                        qn={qn8}
                        setqn={setqn8}
                        cnt={cnt}
                        setcnt={setcnt}
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
