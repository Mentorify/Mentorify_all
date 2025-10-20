import React from "react"
import { useRef } from "react"
import ReactToPrint from "react-to-print"
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
import Info from "../Info"
import InfoPage from "./InfoPage"

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
    props.qn["Realistic"],
    props.qn["Investigative"],
    props.qn["Artistic"],
    props.qn["Social"],
    props.qn["Enterprising"],
    props.qn["Conventional"],
  ]

  // const sc = (arr[0] + arr[1]) / 2;
  // const hu = (arr[2] + arr[3]) / 2;
  // const co = (arr[4] + arr[5]) / 2;

  // var ver;
  // if (arr[0] > arr[1]) {
  //   ver = "You have more interest Towards Mathematics";
  // } else if (arr[0] === arr[1]) {
  //   ver = "You have Equal Interest in Maths and Biology";
  // } else {
  //   ver =
  //     "You have more Interest in Biology/ You may have interest in mathematics as well";
  // }

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
      "Realistic",
      "Investigative",
      "Artistic",
      "Social",
      "Enterprising",
      "Conventional",
    ],
    datasets: [
      {
        label: "Score distribution",
        data: arr,
        backgroundColor: [
          "rgba(123, 158, 186, 0.4)",
          "rgba(255, 205, 86, 0.4)",
          "rgba(25, 192, 134, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(172, 233, 23, 0.4)",
          "rgba(93, 297, 78, 0.4)",
        ],
      },
    ],
  }

  return (
    <>
      <div className='m-4' ref={printRef} id='download-div-6'>
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

        {/* <h3 className="text-info my-2">
          Best Stream Suits You as per your interest
        </h3>
        <hr />
        <div className="row mb-5">
          <div className="col-md-4">
            <div
              className="card"
              style={{
                borderBottom: "5px red solid",
              }}
            >
              <div className="card-body">
                <h2>Science</h2>
                <p style={{ fontSize: "24px" }}>{(arr[0] + arr[1]) / 2}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card"
              style={{
                borderBottom: "5px green solid",
              }}
            >
              <div className="card-body">
                <h2>Humanities</h2>
                <p style={{ fontSize: "24px" }}>{(arr[2] + arr[3]) / 2}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card"
              style={{
                borderBottom: "5px blue solid",
              }}
            >
              <div className="card-body">
                <h2>Commerce</h2>
                <p style={{ fontSize: "24px" }}>{(arr[4] + arr[5]) / 2}</p>
              </div>
            </div>
          </div>
        </div>

        {(() => {
          if (sc > hu && sc > co) {
            return (
              <>
                <div className="card mx-3 mt-3 mb-5">
                  <div className="card-body p-3 text-center">
                    <svg
                      style={{ height: "25", width: "25", marginRight: "5" }}
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
                    <strong style={{ marginLeft: "8px" }}>{ver}</strong>
                  </div>
                </div>
              </>
            );
          }
        })()} */}
        <Info hidePrintButton={props.hidePrintButton} />
        <InfoPage data={arr} />
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
          content={() => document.getElementById("download-div-6")}
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
