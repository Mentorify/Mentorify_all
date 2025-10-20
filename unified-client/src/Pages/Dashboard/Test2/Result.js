import React from "react";
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import Info from "./Info";
import "../print-styles.css";

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
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import MBTI from "./MBTI";

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
);

export default function Result(props) {
  const printRef = useRef();

  const arr = [
    props.qn["E"],
    props.qn["I"],
    props.qn["S"],
    props.qn["N"],
    props.qn["T"],
    props.qn["F"],
    props.qn["J"],
    props.qn["P"],
  ];

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
  };

  const data = {
    labels: ["E", "I", "S", "N", "T", "F", "J", "P"],
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
  };

  const data1 = {
    labels: ["Extraversion", "Introversion"],
    datasets: [
      {
        label: "Score distribution",
        data: [arr[0],arr[1]],
        backgroundColor: [
          "#E91E63",
          "#26C6DA",
        ],
      },
    ],
  };

  const data2 = {
    labels: ["Sensing", "Intuition"],
    datasets: [
      {
        label: "Score distribution",
        data: [arr[2],arr[3]],
        backgroundColor: [
          "#FFEE58",
          "#AB47BC"
        ],
      },
    ],
  };

  const data3 = {
    labels: ["Thinking", "Feeling"],
    datasets: [
      {
        label: "Score distribution",
        data: [arr[4],arr[5]],
        backgroundColor: [
          "#F44336",
          "#CDDC39"
        ],
      },
    ],
  };

  const data4 = {
    labels: ["Judging", "Perceiving"],
    datasets: [
      {
        label: "Score distribution",
        data: [arr[6],arr[7]],
        backgroundColor: [
          "#FF9800",
          "#607D8B"
        ],
      },
    ],
  };


  return (
    <>
      <div className="m-4" ref={printRef} id="download-div-2">
      <h3 className="text-info">Student Details</h3>
        <hr />
        <h5>
          <span className="text-info">Name: </span>
          {props.userData.name}
        </h5>
        <h5>
          <span className="text-info">Class: </span>
          {props.userData.Class}
        </h5>
        <h5>
          <span className="text-info">School:</span>
          {props.userData.school}
        </h5>
        <br />
        <h3 className="text-info">Test Results</h3>
        <hr />
        <h5 className="mb-3">
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
        <h3 className="text-info mt-5">Personality And Career Analysis</h3>
        <hr />
        <MBTI data={arr}/>
        
        <h3 className="text-info mt-5">Section-wise Traits Analysis</h3>
        <hr />

        <div className="row">
          <div className="col-md-6">
            <div className="card m-5 text-center">
              <div className="card-title my-2">Where you focus your attention</div>
              <div className="card-body">
                <Pie
                  style={{
                    textAlign: "center",
                  }}
                  data={data1}
                  options={options}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card m-5 text-center">
              <div className="card-title mx-auto my-2">The way you take in information</div>
              <div className="card-body">
                <Pie
                  style={{
                    textAlign: "center",
                  }}
                  data={data2}
                  options={options}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card m-5 text-center">
              <div className="card-title mx-auto my-2">How you make decisions</div>
              <div className="card-body">
                <Pie
                  style={{
                    textAlign: "center",
                  }}
                  data={data3}
                  options={options}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card m-5 text-center">
              <div className="card-title my-2">How you deal with the world</div>
              <div className="card-body">
                <Pie
                  style={{
                    textAlign: "center",
                  }}
                  data={data4}
                  options={options}
                />
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
              type="button"
              className="btn btn-info btn-block mb-3"
              style={
                {
                  // width:'85%'
                }
              }
            >
              Download report as PDF <i className="fa fa-download"></i>
            </button>
          )}
          content={() => document.getElementById("download-div-2")}
          documentTitle="Career Clarify Test Result"
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
  );
}
