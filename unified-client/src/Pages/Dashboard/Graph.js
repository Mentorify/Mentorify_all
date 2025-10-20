import React from "react"
import { useRef } from "react"
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
  const printRef = useRef()

  const arr = [
    props.qn["Realistic"],
    props.qn["Investigative"],
    props.qn["Artistic"],
    props.qn["Social"],
    props.qn["Enterprising"],
    props.qn["Conventional"],
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
      <div className='m-4' ref={printRef}>
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
