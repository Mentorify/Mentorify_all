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
import { Bar } from "react-chartjs-2";

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
    props.qn["Extroversion"],
    props.qn["Agreeableness"],
    props.qn["Conscientiousness"],
    props.qn["Neuroticism"],
    props.qn["OpennessToExperience"],
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
    labels: [
      "Extroversion",
      "Agreeableness",
      "Conscientiousness",
      "Neuroticism",
      "Openness to Experience",
    ],
    datasets: [
      {
        label: "Score distribution",
        data: arr,
        backgroundColor: [
          "rgba(123, 158, 186, 0.4)",
          "rgba(255, 205, 86, 0.4)",
          "rgba(25, 192, 134, 0.4)",
          "rgba(224, 62, 95, 0.4)",
          "rgba(172, 233, 23, 0.4)",
        ],
      },
    ],
  };

  return (
    <>
      <div className='m-4' ref={printRef} id='download-div-4'>
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
              }>
              Download report as PDF <i className='fa fa-download'></i>
            </button>
          )}
          content={() => document.getElementById("download-div-4")}
          documentTitle='Career Clarify Test Result'
          onBeforeGetContent={() => {
            return new Promise((resolve) => {
              setTimeout(() => resolve(), 1000);  // Increased to 1 second
            });
          }}
          print={async (printIframe) => {
            const document = printIframe.contentDocument;
            if (document) {
              await new Promise((resolve) => setTimeout(resolve, 500));  // Increased to 500ms
              printIframe.contentWindow.print();
            }
          }}
        />
      )}
    </>
  );
}
