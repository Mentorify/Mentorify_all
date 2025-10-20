import React, { useState } from "react"
import {
  Realistic,
  Investigative,
  Artistic,
  Social,
  Enterprising,
  Conventional,
} from "./InfoData"

const InfoPage = ({ data }) => {
  let [maxVal, setMaxVal] = useState(0)
  data.forEach((e, i) => {
    if (maxVal < e) {
      maxVal = e
    }
  })

  return (
    <>
      <div className='m-3'>
        {maxVal === data[0] && <Realistic />}
        {maxVal === data[1] && <Investigative />}
        {maxVal === data[2] && <Artistic />}
        {maxVal === data[3] && <Social />}
        {maxVal === data[4] && <Enterprising />}
        {maxVal === data[5] && <Conventional />}
      </div>
      <div className='text-center'>Mentorify Technologies Private Limited</div>
    </>
  )
}

export default InfoPage
