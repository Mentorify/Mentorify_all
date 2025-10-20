import React from "react"
import { useRef } from "react"
import ReactToPrint from "react-to-print"
import Info from "./Info"
import "../print-styles.css"

// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';
// import html2pdf from 'html-to-pdf-js';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
)

export default function Result(props) {
  const printRef = useRef()

  const arr = [
    props.qn["Linguistics"],
    props.qn["LogicalMathematical"],
    props.qn["Spatial"],
    props.qn["BodilyKinesthetic"],
    props.qn["Musical"],
    props.qn["Interpersonal"],
    props.qn["Intrapersonal"],
    props.qn["Nature"],
  ]

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Score",
      },
    },
  }

  const data = {
    labels: [
      "Linguistics",
      "Logical Mathematical",
      "Spatial",
      "Bodily-Kinesthetic",
      "Musical",
      "Interpersonal",
      "Intrapersonal",
      "Nature",
    ],
    datasets: [
      {
        label: "Score distribution",
        data: arr,
        backgroundColor: [
          "rgba(255, 99, 132, 0.4)",
          "rgba(123, 158, 186, 0.4)",
          "rgba(255, 205, 86, 0.4)",
          "rgba(75, 197, 92, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(153, 102, 255, 0.4)",
          "rgba(172, 233, 23, 0.4)",
          "rgba(93, 297, 78, 0.4)",
        ],
      },
    ],
  }
  return (
    <>
      <div className='m-4' ref={printRef} id='download-div-3'>
        <h3 className='text-info'>Student Details</h3>
        <hr />
        <h5>
          <span className='text-info'>Name: </span>
          {props.userData.name}
        </h5>
        <h5>
          <span className='text-info'>Class: </span>
          {props.userData.Class}
        </h5>
        <h5>
          <span className='text-info'>School:</span>
          {props.userData.school}
        </h5>
        <br />
        <h3 className='text-info'>Test Results</h3>
        <hr />
        <h5 className='mb-3'>
          Congratulations <strong>{props.userData.name}</strong>! You are a
          unique and special individual with many wonderful abilities, gifts and
          talents!
        </h5>

        <div className="chart-container" style={{ position: 'relative', height: '400px', width: '100%' }}>
          <Bar
            data={data}
            options={{
              ...options,
              responsive: true,
              maintainAspectRatio: false,
              animation: false
            }}
          />
        </div>
        <h3 className='text-info mt-5'>Section-wise Analysis</h3>
        <hr />
        <div className='row'>
          <div className='col-md-4'>
            <div class='card my-2'>
              {/* <img
              src="https://images.unsplash.com/photo-1563509769909-174be967b5df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=877&q=80"
              class="card-img-top"
              alt="Fissure in Sandstone"
            /> */}
              <div
                class='card-body'
                style={{
                  backgroundColor: "rgba(255, 99, 132,0.4)",
                }}
              >
                <h4 class='card-title'>Section 1: Linguistics</h4>
                <p className='card-text'>
                  It is the ability to use words and language. These learners
                  have highly developed hearing skills and are generally very
                  good speakers. They think in “words” rather than “pictures”.
                  Their skills include listening, speaking, writing,
                  storytelling, teaching, using humour, understanding the
                  meaning of words, remembering information and convincing
                  someone of their point of view.
                </p>
                <p
                  class='card-text'
                  style={{
                    fontSize: "30px",
                    fontWeight: "700",
                  }}
                >
                  {arr[0]}%
                </p>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div class='card my-2'>
              {/* <img
              src="https://images.unsplash.com/photo-1580541832626-2a7131ee809f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=877&q=80"
              class="card-img-top"
              alt="Fissure in Sandstone"
            /> */}
              <div
                class='card-body'
                style={{
                  backgroundColor: "rgba(123, 158, 186, 0.4)",
                }}
              >
                <h4 class='card-title'>Section 2: Logical Mathematical</h4>
                <p className='card-text'>
                  It is the ability to use reason, logic and numbers. These
                  learners think in patterns making connections between pieces
                  of information. These learners ask lots of questions and like
                  to do experiments.
                </p>
                <p
                  class='card-text'
                  style={{
                    fontSize: "30px",
                    fontWeight: "700",
                  }}
                >
                  {arr[1]}%
                </p>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div class='card my-2'>
              {/* <img
              src="https://images.unsplash.com/photo-1636955735635-b4c0fd54f360?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              class="card-img-top"
              alt="Fissure in Sandstone"
            /> */}
              <div
                class='card-body'
                style={{
                  backgroundColor: "rgba(255, 205, 86, 0.4)",
                }}
              >
                <h4 class='card-title'>Section 3: Spatial</h4>
                <p className='card-text'>
                  It is the ability to perceive things. These learners tend to
                  think in “pictures” and need to create vivid mental images in
                  order to retain information. They enjoy looking at maps,
                  charts, pictures, videos and movies. Their skills include:
                  puzzle building, reading, writing, understanding charts and
                  graphs, a good sense of direction, sketching, painting,
                  creating visual metaphors and analogies, manipulating images,
                  constructing, fixing, designing practical objects,
                  interpreting visual images.
                </p>
                <p
                  class='card-text'
                  style={{
                    fontSize: "30px",
                    fontWeight: "700",
                  }}
                >
                  {arr[2]}%
                </p>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div class='card my-2'>
              {/* <img
              src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1007&q=80"
              class="card-img-top"
              alt="Fissure in Sandstone"
            /> */}
              <div
                class='card-body'
                style={{
                  backgroundColor: "rgba(75, 197, 92, 0.4)",
                }}
              >
                <h4 class='card-title'>Section 4: Bodily-Kinesthetic</h4>
                <p className='card-text'>
                  It is the ability to control body movements and handle objects
                  skill fully. These learners express themselves through
                  movement. By interacting with the space around them, they are
                  able to remember and process information. Their skills
                  include: physical coordination, crafts, acting, and using
                  their hands to create or build.
                </p>
                <p
                  class='card-text'
                  style={{
                    fontSize: "30px",
                    fontWeight: "700",
                  }}
                >
                  {arr[3]}%
                </p>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div class='card my-2'>
              {/* <img
              src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              class="card-img-top"
              alt="Fissure in Sandstone"
            /> */}
              <div
                class='card-body'
                style={{
                  backgroundColor: "rgba(54, 162, 235, 0.4)",
                }}
              >
                <h4 class='card-title'>Section 5: Musical</h4>
                <p className='card-text'>
                  It is the ability to produce and appreciate music. These
                  musical learners “think” in sounds, rhythms and patterns.
                  Their skills include: singing, whistling, playing musical
                  instruments, recognizing patterns, composing music, and
                  remembering melodies.
                </p>
                <p
                  class='card-text'
                  style={{
                    fontSize: "30px",
                    fontWeight: "700",
                  }}
                >
                  {arr[4]}%
                </p>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div class='card my-2'>
              {/* <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
              class="card-img-top"
              alt="Fissure in Sandstone"
            /> */}
              <div
                class='card-body'
                style={{
                  backgroundColor: "rgba(153, 102, 255, 0.4)",
                }}
              >
                <h4 class='card-title'>Section 6: Interpersonal</h4>
                <p className='card-text'>
                  These learners try to see things from other people’s points of
                  view in order to understand. They often have the ability to
                  sense feelings, intentions and motivations. They use both
                  verbal (speaking) and non-verbal language (eye contact, body
                  language) to communicate. Their skills include: listening,
                  empathy, working with groups, building trust, and peaceful
                  conflict resolution.
                </p>
                <p
                  class='card-text'
                  style={{
                    fontSize: "30px",
                    fontWeight: "700",
                  }}
                >
                  {arr[5]}%
                </p>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div class='card my-2'>
              {/* <img
              src="https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
              class="card-img-top"
              alt="Fissure in Sandstone"
            /> */}
              <div
                class='card-body'
                style={{
                  backgroundColor: "rgba(172, 233, 23, 0.4)",
                }}
              >
                <h4 class='card-title'>Section 7: Intrapersonal</h4>
                <p className='card-text'>
                  It is the ability to self-reflect and be aware of one’s “inner
                  state of being”. There learners try to understand their inner
                  feelings, dreams, and relationships with others. Their skills
                  include: recognizing their own strengths and weaknesses,
                  reflecting and analyzing themselves, awareness of their
                  desires and dreams, evaluating their thinking patterns,
                  reasoning with themselves, and understanding their role in
                  relationship to others.
                </p>
                <p
                  class='card-text'
                  style={{
                    fontSize: "30px",
                    fontWeight: "700",
                  }}
                >
                  {arr[6]}%
                </p>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div class='card my-2'>
              {/* <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              class="card-img-top"
              alt="Fissure in Sandstone"
            /> */}
              <div
                class='card-body'
                style={{
                  backgroundColor: "rgba(93, 297, 78, 0.4)",
                }}
              >
                <h4 class='card-title'>Section 8: Nature</h4>
                <p className='card-text'>
                  It is the ability to appreciate nature and feel a strong
                  interest in preserving our environment. These learners enjoy:
                  hiking and camping, helping care for animals and plants, love
                  being outdoors and believe that recycling is an important
                  method of preserving life on our planet.
                </p>
                <p
                  class='card-text'
                  style={{
                    fontSize: "30px",
                    fontWeight: "700",
                  }}
                >
                  {arr[7]}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <Info hidePrintButton={props.hidePrintButton} />
      </div>

      {!props.hidePrintButton && (
        <ReactToPrint
          trigger={() => (
            <button
              type='button'
              className='btn btn-info btn-block mb-3'
              style={
                {
                  // width:'85%'
                }
              }
            >
              Download report as PDF <i className='fa fa-download'></i>
            </button>
          )}
          content={() => document.getElementById("download-div-3")}
          documentTitle='Career Clarify Test Result'
          onBeforeGetContent={() => {
            return new Promise((resolve) => {
              setTimeout(() => resolve(), 1000);
            });
          }}
          print={async (printIframe) => {
            const document = printIframe.contentDocument;
            if (document) {
              await new Promise((resolve) => setTimeout(resolve, 500));
              printIframe.contentWindow.print();
            }
          }}
        />
      )}
    </>
  )
}
