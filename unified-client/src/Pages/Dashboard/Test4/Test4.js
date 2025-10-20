import React from "react"
import { useState, useEffect } from "react"

import Nature from "./Nature"
import data from "./data.json"
import useAuth from "../../../Hooks/useAuth"
export default function Test4() {
  const { user } = useAuth()
  const [score, setscore] = useState()
  var sc = []
  for (var i = 0; i <= 50; i++) {
    sc.push(0)
  }

  useEffect(() => {
    setscore(sc)
    // eslint-disable-next-line
  }, [])

  const [cnt, setcnt] = useState(false)

  const addScore = async () => {
    try {
      const s = score
      const E =
        20 +
        s[1] -
        s[6] +
        s[11] -
        s[16] +
        s[21] -
        s[26] +
        s[31] -
        s[36] +
        s[41] -
        s[46]
      const A =
        14 -
        s[2] +
        s[7] -
        s[12] +
        s[17] -
        s[22] +
        s[27] -
        s[32] +
        s[37] +
        s[42] +
        s[47]
      const C =
        14 +
        s[3] -
        s[8] +
        s[13] -
        s[18] +
        s[23] -
        s[28] +
        s[33] -
        s[38] +
        s[43] +
        s[48]
      const N =
        38 -
        s[4] +
        s[9] -
        s[14] +
        s[19] -
        s[24] -
        s[29] -
        s[34] -
        s[39] -
        s[44] -
        s[49]
      const O =
        8 +
        s[5] -
        s[10] +
        s[15] -
        s[20] +
        s[25] -
        s[30] +
        s[35] +
        s[40] +
        s[45] +
        s[50]

      const test4Score = {
        attempt: true,
        traits: {
          Extroversion: E * 2.5,
          Agreeableness: A * 2.5,
          Conscientiousness: C * 2.5,
          Neuroticism: N * 2.5,
          OpennessToExperience: O * 2.5,
        },
      }

      const res = await fetch("/api/dashboard/test-4", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ test4Score }),
      })
      const data = await res.json()
      // Debug
      // console.log(res);
      if (!data || res.status === 500) {
        // window.alert("INVALID Test4 Score Provided!");
        console.log("INVALID Test4 Score Provided!")
      } else {
        // window.alert("Test4 score updated !");

        console.log("Test4 score updated !")
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
              href='#v-6'
              role='tab'
              aria-controls='v-pills-home'
              aria-selected='true'
            >
              Section 1 <i className='fa fa-eye'></i>
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
                      id='v-6'
                      role='tabpanel'
                      aria-labelledby='v-pills-home-tab'
                    >
                      <Nature
                        qn={score}
                        setqn={setscore}
                        cnt={cnt}
                        setcnt={setcnt}
                        data={data.data}
                        nextsec={7}
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
