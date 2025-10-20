import React from "react"
// import AltPage from "./AltPage";
// import R1 from "./Result";
// import R2 from "./Test2/Result";
// import R3 from "./Test3/Result";
// import R4 from "./Test4/Result";

import G1 from "./Graph"
import G2 from "./Test2/Graph"
import G3 from "./Test3/Graph"
import G4 from "./Test4/Graph"
import G5 from "./Test5/Graph"
import G6 from "./Test6/Graph"
import G7 from "./Test7/Graph"
import testName from "./testName"
export default function Allanalytics({ userData }) {
  var ut = userData.tests

  return (
    <>
      <div className='card m-4'>
        <div className='card-body'>
          <ul className='nav nav-pills mb-3' id='pills-tab' role='tablist'>
            <li className='nav-item'>
              <a
                className='nav-link active'
                id='pills-home-tab'
                data-mdb-toggle='pill'
                href='#a-1'
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
                href='#a-2'
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
                href='#a-3'
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
                href='#a-4'
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
                href='#a-5'
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
                href='#a-6'
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
                href='#a-7'
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
              id='a-1'
              role='tabpanel'
              aria-labelledby='pills-home-tab'
            >
              {(() => {
                if (ut) {
                  if (ut.test1.attempt === true) {
                    return <G1 qn={ut.test1.traits} />
                  }
                }
              })()}
            </div>
            <div
              className='tab-pane fade'
              id='a-2'
              role='tabpanel'
              aria-labelledby='pills-profile-tab'
            >
              {(() => {
                if (ut) {
                  if (ut.test2.attempt === true) {
                    return <G2 qn={ut.test2.traits} />
                  }
                }
              })()}
            </div>
            <div
              className='tab-pane fade'
              id='a-3'
              role='tabpanel'
              aria-labelledby='pills-contact-tab'
            >
              {(() => {
                if (ut) {
                  if (ut.test3.attempt === true) {
                    return <G3 qn={ut.test3.traits} />
                  }
                }
              })()}
            </div>
            <div
              className='tab-pane fade'
              id='a-4'
              role='tabpanel'
              aria-labelledby='pills-contact-tab'
            >
              {(() => {
                if (ut) {
                  if (ut.test4.attempt === true) {
                    return <G4 qn={ut.test4.traits} />
                  }
                }
              })()}
            </div>
            <div
              className='tab-pane fade'
              id='a-5'
              role='tabpanel'
              aria-labelledby='pills-contact-tab'
            >
              {(() => {
                if (ut) {
                  if (ut.test5.attempt === true) {
                    return <G5 qn={ut.test5.traits} />
                  }
                }
              })()}
            </div>
            <div
              className='tab-pane fade'
              id='a-6'
              role='tabpanel'
              aria-labelledby='pills-contact-tab'
            >
              {(() => {
                if (ut) {
                  if (ut.test6.attempt === true) {
                    return <G6 qn={ut.test6.traits} />
                  }
                }
              })()}
            </div>
            <div
              className='tab-pane fade'
              id='a-7'
              role='tabpanel'
              aria-labelledby='pills-contact-tab'
            >
              {(() => {
                if (ut) {
                  if (ut.test7.attempt === true) {
                    return <G7 qn={ut.test7.traits} />
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
