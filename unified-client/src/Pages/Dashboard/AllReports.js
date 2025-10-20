import React from "react"
import R1 from "./Result"
import R2 from "./Test2/Result"
import R3 from "./Test3/Result"
import R4 from "./Test4/Result"
import R5 from "./Test5/Result"
import R6 from "./Test6/Result"
import R7 from "./Test7/Result"
import testName from "./testName"
export default function AllReports({ userData }) {
  var ut = userData.tests

  return (
    <>
      <div className='card mt-4'>
        <div className='card-body'>
          <ul className='nav nav-pills mb-3' id='pills-tab' role='tablist'>
            <li className='nav-item'>
              <a
                className='nav-link active'
                id='pills-home-tab'
                data-mdb-toggle='pill'
                href='#r-1'
                role='tab'
                aria-controls='pills-home'
                aria-selected='true'
              >
                {testName[1]}
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                id='pills-profile-tab'
                data-mdb-toggle='pill'
                href='#r-2'
                role='tab'
                aria-controls='pills-profile'
                aria-selected='false'
              >
                {testName[2]}
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                id='pills-contact-tab'
                data-mdb-toggle='pill'
                href='#r-3'
                role='tab'
                aria-controls='pills-contact'
                aria-selected='false'
              >
                {testName[3]}
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                id='pills-contact-tab'
                data-mdb-toggle='pill'
                href='#r-4'
                role='tab'
                aria-controls='pills-contact'
                aria-selected='false'
              >
                {testName[4]}
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                id='pills-contact-tab'
                data-mdb-toggle='pill'
                href='#r-5'
                role='tab'
                aria-controls='pills-contact'
                aria-selected='false'
              >
                {testName[5]}
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                id='pills-contact-tab'
                data-mdb-toggle='pill'
                href='#r-6'
                role='tab'
                aria-controls='pills-contact'
                aria-selected='false'
              >
                {testName[6]}
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                id='pills-contact-tab'
                data-mdb-toggle='pill'
                href='#r-7'
                role='tab'
                aria-controls='pills-contact'
                aria-selected='false'
              >
                {testName[7]}
              </a>
            </li>
          </ul>
          <div className='tab-content pt-2 pl-1' id='pills-tabContent'>
            <div
              className='tab-pane fade show active'
              id='r-1'
              role='tabpanel'
              aria-labelledby='pills-home-tab'
            >
              {(() => {
                if (ut) {
                  if (ut.test1.attempt === true) {
                    return <R1 qn={ut.test1.traits} userData={userData} />
                  } else {
                    return <h3>Test not attempted</h3>
                  }
                }
              })()}
            </div>
            <div
              className='tab-pane fade'
              id='r-2'
              role='tabpanel'
              aria-labelledby='pills-profile-tab'
            >
              {(() => {
                if (ut) {
                  if (ut.test2.attempt === true) {
                    return <R2 qn={ut.test2.traits} userData={userData} />
                  } else {
                    return <h3>Test not attempted</h3>
                  }
                }
              })()}
            </div>
            <div
              className='tab-pane fade'
              id='r-3'
              role='tabpanel'
              aria-labelledby='pills-contact-tab'
            >
              {(() => {
                if (ut) {
                  if (ut.test3.attempt === true) {
                    return <R3 qn={ut.test3.traits} userData={userData} />
                  } else {
                    return <h3>Test not attempted</h3>
                  }
                }
              })()}
            </div>
            <div
              className='tab-pane fade'
              id='r-4'
              role='tabpanel'
              aria-labelledby='pills-contact-tab'
            >
              {(() => {
                if (ut) {
                  if (ut.test4.attempt === true) {
                    return <R4 qn={ut.test4.traits} userData={userData} />
                  } else {
                    return <h3>Test not attempted</h3>
                  }
                }
              })()}
            </div>
            <div
              className='tab-pane fade'
              id='r-5'
              role='tabpanel'
              aria-labelledby='pills-contact-tab'
            >
              {(() => {
                if (ut) {
                  if (ut.test5.attempt === true) {
                    return <R5 qn={ut.test5.traits} userData={userData} />
                  } else {
                    return <h3>Test not attempted</h3>
                  }
                }
              })()}
            </div>

            <div
              className='tab-pane fade'
              id='r-6'
              role='tabpanel'
              aria-labelledby='pills-contact-tab'
            >
              {(() => {
                if (ut) {
                  if (ut.test6.attempt === true) {
                    return <R6 qn={ut.test6.traits} userData={userData} />
                  } else {
                    return <h3>Test not attempted</h3>
                  }
                }
              })()}
            </div>
            <div
              className='tab-pane fade'
              id='r-7'
              role='tabpanel'
              aria-labelledby='pills-contact-tab'
            >
              {(() => {
                if (ut) {
                  if (ut.test7.attempt === true) {
                    return <R7 qn={ut.test7.traits} userData={userData} />
                  } else {
                    return <h3>Test not attempted</h3>
                  }
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
