import React from "react"
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

export default function Graph(props) {
  // const printRef = useRef();

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
      <div className='m-4'>
        <Bar
          className='m-4'
          style={{
            textAlign: "center",
          }}
          data={data}
          options={options}
        />
      </div>
    </>
  )
}
