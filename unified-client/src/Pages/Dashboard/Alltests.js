import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import testName from "./testName"
import classwiseTest from "./classwiseTest"
import CouponCodeModal from "../../components/CouponCodeModal"
import { useCouponAccess } from "../../Hooks/useCouponAccess"

export default function Alltests({ userData }) {
  // Handle cases where userData might not have tests property
  var ut = userData?.tests || []
  var classNum = userData?.Class || "N/A"
  console.log("user-", classNum, userData)

  // Navigation hook
  const navigate = useNavigate()

  // Coupon access state
  const { hasAccess, grantAccess } = useCouponAccess("Career Assessment Tests")
  const [showCouponModal, setShowCouponModal] = useState(false)
  const [selectedTest, setSelectedTest] = useState(null)


  // Handle test attempt with coupon validation
  const handleTestAttempt = (testNumber) => {
    // Always show coupon modal for security - user must enter coupon each time
    setSelectedTest(testNumber)
    setShowCouponModal(true)
  }

  // Handle successful coupon validation
  const handleCouponSuccess = (couponData) => {
    grantAccess(couponData)
    setShowCouponModal(false)
    // Navigate to the selected test
    if (selectedTest) {
      navigate(`/dashboard/test-${selectedTest}`)
    }
  }

  // If userData is not available or doesn't have the expected structure, show a message
  if (!userData || Object.keys(userData).length === 0) {
    return (
      <div className='m-4'>
        <div className='card'>
          <div className='card-body'>
            <h3>Loading...</h3>
            <p>Please wait while we load your data.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='m-4'>
      <div className='card'>
        <div className='card-body'>
          <h3>Student assessments</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            dignissimos, hic eius qui vel cupiditate fugiat inventore autem
            aliquid magnam! Cumque quidem repudiandae pariatur labore possimus
            nesciunt dicta dolor qui corrupti autem, hic magnam expedita soluta
            corporis veritatis cupiditate, aliquid voluptate, deleniti eum
            minima. Distinctio odit provident qui maiores exercitationem,
            ratione a impedit ea quaerat dolorem in quod excepturi doloremque
            ad? Veniam iure distinctio nemo mollitia deserunt qui quasi nobis
            excepturi assumenda impedit, minus consectetur laboriosam et culpa!
            Incidunt, doloribus!
          </p>
        </div>
      </div>
      
      <div>
        <h4 className='my-4 text-info' style={{ fontWeight: "700" }}>
          Active Tests
        </h4>
        {(() => {
          let exam = []
          let col = ["red", "green", "darkviolet", "orange"]
          let attempt = [
            ut && ut["test1"] ? ut["test1"]["attempt"] : true,
            ut && ut["test2"] ? ut["test2"]["attempt"] : true,
            ut && ut["test3"] ? ut["test3"]["attempt"] : true,
            ut && ut["test4"] ? ut["test4"]["attempt"] : true,
            ut && ut["test5"] ? ut["test5"]["attempt"] : true,
            ut && ut["test6"] ? ut["test6"]["attempt"] : true,
            ut && ut["test7"] ? ut["test7"]["attempt"] : true,
          ]
          if (classNum && classNum !== "N/A") {
            for (let i = 1; i <= 7; i++) {
              if (classNum && classwiseTest[classNum] && classwiseTest[classNum].includes(i) === false)
                continue
              if (attempt[i - 1] !== true) {
                exam.push(
                  <div
                    key={i}
                    className='card my-3'
                    style={{ borderLeft: `8px solid ${col[(i - 1) % 4]}` }}
                  >
                    <div className='row card-body'>
                      <div className='col-md-6'>
                        <span
                          className='h5 card-title'
                          style={{ color: "black" }}
                        >
                          {testName[i] ? testName[i] : `Test-${i}`}
                        </span>
                      </div>
                      <div
                        className='col-md-6'
                        style={{
                          textAlign: "right",
                        }}
                      >
                        <button
                          onClick={() => handleTestAttempt(i)}
                          className='btn btn-sm btn-info'
                          style={{ marginLeft: "auto" }}
                        >
                          Attempt Now <i class='fas fa-pencil'></i>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              }
            }
          }

          return exam
        })()}
      </div>

      <div>
        <h4 className='my-4 text-info' style={{ fontWeight: "700" }}>
          Attempted Tests
        </h4>
        {(() => {
          let exam = []
          let col = ["red", "green", "darkviolet", "orange"]
          let attempt = [
            ut && ut["test1"] ? ut["test1"]["attempt"] : true,
            ut && ut["test2"] ? ut["test2"]["attempt"] : true,
            ut && ut["test3"] ? ut["test3"]["attempt"] : true,
            ut && ut["test4"] ? ut["test4"]["attempt"] : true,
            ut && ut["test5"] ? ut["test5"]["attempt"] : true,
            ut && ut["test6"] ? ut["test6"]["attempt"] : true,
            ut && ut["test7"] ? ut["test7"]["attempt"] : true,
          ]
          if (classNum && classNum !== "N/A") {
            for (let i = 1; i <= 7; i++) {
              if (classNum && classwiseTest[classNum] && classwiseTest[classNum].includes(i) === false)
                continue
              if (attempt[i - 1] === true) {
                exam.push(
                  <div
                    key={i}
                    className='card my-3'
                    style={{ borderLeft: `8px solid ${col[(i - 1) % 4]}` }}
                  >
                    <div className='row card-body'>
                      <div className='col-md-6'>
                        <span className='h5 card-title' style={{ color: "grey" }}>
                          {testName[i] ? testName[i] : `Test-${i}`}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              }
            }
          }

          return exam
        })()}
      </div>

      {/* Coupon Code Modal */}
      <CouponCodeModal
        isOpen={showCouponModal}
        onClose={() => setShowCouponModal(false)}
        onSuccess={handleCouponSuccess}
        testName="Career Assessment Tests"
      />
    </div>
  )
}