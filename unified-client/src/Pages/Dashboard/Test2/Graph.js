import React from "react";
// import { useRef } from "react";
// import ReactToPrint from "react-to-print";
// import Info from "./Info";

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
// import MBTI from "./MBTI";

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

export default function Graph(props) {
  // const printRef = useRef();

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
        data: [arr[0], arr[1]],
        backgroundColor: ["#E91E63", "#26C6DA"],
      },
    ],
  };

  const data2 = {
    labels: ["Sensing", "Intuition"],
    datasets: [
      {
        label: "Score distribution",
        data: [arr[2], arr[3]],
        backgroundColor: ["#FFEE58", "#AB47BC"],
      },
    ],
  };

  const data3 = {
    labels: ["Thinking", "Feeling"],
    datasets: [
      {
        label: "Score distribution",
        data: [arr[4], arr[5]],
        backgroundColor: ["#F44336", "#CDDC39"],
      },
    ],
  };

  const data4 = {
    labels: ["Judging", "Perceiving"],
    datasets: [
      {
        label: "Score distribution",
        data: [arr[6], arr[7]],
        backgroundColor: ["#FF9800", "#607D8B"],
      },
    ],
  };

  return (
    <>
      <div className='m-4'>
        <Bar
          className='m-4'
          style={{
            textAlign: "center",
          }}
          data={data}
          options={options}
        />

        <h3 className='text-info mt-5'>Section-wise Traits Analysis</h3>
        <hr />

        <div className='row'>
          <div className='col-md-6'>
            <div className='card m-5 text-center'>
              <div className='card-title my-2'>
                Where you focus your attention
              </div>
              <div className='card-body'>
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
          <div className='col-md-6'>
            <div className='card m-5 text-center'>
              <div className='card-title mx-auto my-2'>
                The way you take in information
              </div>
              <div className='card-body'>
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
          <div className='col-md-6'>
            <div className='card m-5 text-center'>
              <div className='card-title mx-auto my-2'>
                How you make decisions
              </div>
              <div className='card-body'>
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
          <div className='col-md-6'>
            <div className='card m-5 text-center'>
              <div className='card-title my-2'>How you deal with the world</div>
              <div className='card-body'>
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
      </div>
    </>
  );
}
