import React from "react"
import "./App.css"

export const Realistic = () => {
  return (
    <div
      className='card my-3'
      style={{
        background: "rgba(123, 158, 186, 0.4)",
      }}
    >
      <div className='card-body'>
        <h3
          className='h3 card-title'
          style={{
            fontWeight: "700",
          }}
        >
          1. Realistic
        </h3>
        <div className='card-text mt-3'>
          <div className='d-flex flex-wrap my-5'>
            <div className='w-50 text-start d-flex justify-content-center'>
              Aerospace Engineering [R, I]
              <br />
              Aviation [R]
              <br />
              Cardiorespiratory Therapy [R, I, S]
              <br />
              Civil Engineering [R, I]
              <br />
              Computer Engineering [R, C]
              <br />
              Computer Science [I, R, C]
              <br />
              Construction Science [R, E]
              <br />
              Dental Hygiene [R, S]
              <br />
              Electrical Engineering [R, I]
              <br />
              Engineering Physics [R, I]
              <br />
              Environmental Engineering [R, I]
              <br />
              Airplane Inspector [RES]
              <br />
              Locomotive Engineer [RES]
              <br />
              Audiovisual Technician [RCI]
              <br />
            </div>
            <div className='w-50 text-start d-flex justify-content-center'>
              Geological Engineering [R, I]
              <br />
              Geophysics [R, I]
              <br />
              Industrial Engineering [R,I]
              <br />
              Laboratory Technology [R, I]
              <br />
              Mechanical Engineering [R, I]
              <br />
              Petroleum Engineering [R, I]
              <br />
              Commercial Airplane Pilot [RIE]
              <br />
              Electrician [RIE]
              <br />
              Optical Engineer [RIC]
              <br />
              Solar-Energy Systems Designer [RIC]
              <br />
              Cook [RAS]
              <br />
              Wildlife Control Agent [RSE]
              <br />
              Ship Pilot [REI]
              <br />
            </div>
          </div>
          <table class='table table-striped table-bordered table-sm my-5 '>
            <thead>
              <tr className='bg-light'>
                <th scope='col'>Interests</th>
                <th scope='col'>Values</th>
                <th scope='col'>Abilities</th>
                <th scope='col'>Qualities</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope='row'>Outdoor Activities</th>
                <td>Few, close friends</td>
                <td>Athletic ability</td>
                <td>Stable</td>
              </tr>
              <tr>
                <th scope='row'>Sports Activities</th>
                <td>Practical Things</td>
                <td>Mechanical/Electrical skills</td>
                <td>Persistent</td>
              </tr>
              <tr>
                <th scope='row'>Hands-on tasks</th>
                <td>Clear goals</td>
                <td>Managing tasks</td>
                <td>Efficient</td>
              </tr>

              <tr>
                <th scope='row'>Tools, machines</th>
                <td>Showing vs Telling</td>
                <td>Common Sense</td>
                <td>Action oriented</td>
              </tr>

              <tr>
                <th scope='row'>Animals, plants</th>
                <td>Things vs. People</td>
                <td>Problem Solving</td>
                <td>Reliable</td>
              </tr>

              <tr>
                <th scope='row'>Building Things</th>
                <td>Tradition</td>
                <td>Working with plants/animals</td>
                <td>Logical</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export const Investigative = () => {
  return (
    <div
      className='card my-3'
      style={{
        background: "rgba(255, 205, 86, 0.4)",
      }}
    >
      <div className='card-body'>
        <h3
          className='h3 card-title'
          style={{
            fontWeight: "700",
          }}
        >
          Investigative
        </h3>
        <div className='card-text mt-3'>
          <div className='d-flex flex-wrap my-5'>
            <div className='w-50 text-start d-flex justify-content-center'>
              Anthropology [I, A, R] <br />
              Astronomy [I, A, R]
              <br />
              Astrophysics [I, R]
              <br />
              Biochemistry [I, A, R]
              <br />
              Botany [I, R, E]
              <br />
              Chemical Engineering [I, R]
              <br />
              Chemistry [I, R, C]
              <br />
              Dentistry (Pre-Dent) [I, R, S]
              <br />
              Geography [I, R, A]
              <br />
              Geosciences [I, R]
              <br />
              Mathematics [I, C, A]
              <br />
              Math - Computer Option [I, R, E]
              <br />
              Geology [I, R]
              <br />
              Environmental Science [I,R,C]
              <br />
              Anthropologist [IRE]
              <br />
              Environmental Analyst [IRE]
              <br />
              Economics [I, C, E]
              <br />
            </div>
            <div className='w-50 text-start d-flex justify-content-center'>
              Medicine (Pre-Med) [I, S, R]
              <br />
              Microbiology [I, R]
              <br />
              Paleontology [I, R]
              <br />
              Pharmacy [I, E, R]
              <br />
              Physics [I, R]
              <br />
              Psychology [I, S, A]
              <br />
              Physician's Associate [I, S, R]
              <br />
              Science Education [I, S, R]
              <br />
              Sociology [I, A, S]
              <br />
              Veterinary Med (Pre-Vet) [I, R]
              <br />
              Zoology [I, R]
              <br />
              Computer Science [I, R, C]
              <br />
              Environmental Geology [I,R]
              <br />
              Surgeon [IRA]
              <br />
              Biochemist [IRS]
              <br />
              Radiologist [IRS]
              <br />
            </div>
          </div>
          <table class='table table-striped table-bordered table-sm my-5 '>
            <thead>
              <tr className='bg-light'>
                <th scope='col'>Interests</th>
                <th scope='col'>Values</th>
                <th scope='col'>Abilities</th>
                <th scope='col'>Qualities</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope='row'>Problem Solving</th>
                <td>Science</td>
                <td>Math</td>
                <td>Intellectual</td>
              </tr>
              <tr>
                <th scope='row'>Exploring/Observing</th>
                <td>Technical expertise</td>
                <td>Science</td>
                <td>Analytical</td>
              </tr>
              <tr>
                <th scope='row'>Reading/Investigating</th>
                <td>Setting own pace</td>
                <td>Problem Solving</td>
                <td>Inquisitive</td>
              </tr>

              <tr>
                <th scope='row'>Using instruments</th>
                <td>Working alone</td>
                <td>Scientific method</td>
                <td>Introspective</td>
              </tr>

              <tr>
                <th scope='row'>Designing Things</th>
                <td>Thinking vs. Doing</td>
                <td>Research</td>
                <td>Unconcentional</td>
              </tr>

              <tr>
                <th scope='row'>Science Fiction/Mysteries</th>
                <td>Creating</td>
                <td>Analysis</td>
                <td>Insightful</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export const Artistic = () => {
  return (
    <div
      className='card my-3'
      style={{
        background: "rgba(25, 192, 134, 0.4)",
      }}
    >
      <div className='card-body'>
        <h3
          className='h3 card-title'
          style={{
            fontWeight: "700",
          }}
        >
          Artistic
        </h3>
        <div className='card-text mt-3'>
          <div className='d-flex flex-wrap my-5'>
            <div className='w-50 text-start d-flex justify-content-center'>
              African American Studies[S, IA]
              <br />
              Architectural [A, I, R]
              <br />
              Art (all programs) [A, S]
              <br />
              Art History [A,S]
              <br />
              Asian Studies [A, I, S]
              <br />
              Classics [A, I]
              <br />
              Dance [A, R]
              <br />
              Drama [A, E]
              <br />
              English [A, I, S]
              <br />
              Ethics & Religion [A, I, S]
              <br />
              European Studies [A, I, S]
              <br />
              French [A, I, S]
              <br />
              Interior Design [A, R, S]
              <br />
              Costumer [ARI]
              <br />
              Photographer [ARS]
              <br />
              Cake Decorator [ARE]
              <br />
              Writer [AIE]
              <br />
              Fashion Designer [ASR]
              <br />
              Exhibit Artist [ASI]
              <br />
              Composer [ASE]
              <br />
            </div>
            <div className='w-50 text-start d-flex justify-content-center'>
              International & Area Studies [A, I, S]
              <br />
              Journ - Prof. Writing [A, I]
              <br />
              Journalism and Mass Communication [A, I]
              <br />
              Journalism-Broadcast/ Electronic Media [A, E,I]
              <br />
              Latin American Studies [A, I, S]
              <br />
              Letters [A, I]
              <br />
              Linguistics [A, I, S]
              <br />
              Music (all programs) [A, E, S]
              <br />
              Music Education [S, A, I]
              <br />
              Native American Studies [A, I, S]
              <br />
              Philosophy [A, I, S]
              <br />
              Religious Studies [A, S, E]
              <br />
              Russian, Spanish, or German [A, I, S]
              <br />
              Graphic Designer [AER]
              <br />
              Screen Writer [AEI]
              <br />
              Audiovisual Production [AES]
              <br />
              Choreographer [AES]
              <br />
              News Editor [AES]
              <br />
              Wedding Consultant [AES]
              <br />
              Photojournalist [AEC]
              <br />
              Dancing Instructor [ASE]
              <br />
            </div>
          </div>
          <table class='table table-striped table-bordered table-sm my-5 '>
            <thead>
              <tr className='bg-light'>
                <th scope='col'>Interests</th>
                <th scope='col'>Values</th>
                <th scope='col'>Abilities</th>
                <th scope='col'>Qualities</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope='row'>Working with others</th>
                <td>Honesty</td>
                <td>Communication skills</td>
                <td>Creative</td>
              </tr>
              <tr>
                <th scope='row'>Influential role</th>
                <td>Beauty</td>
                <td>Working well under pressure</td>
                <td>Expressive</td>
              </tr>
              <tr>
                <th scope='row'>Art/Music/Drama</th>
                <td>Self-expression</td>
                <td>Artistic ability</td>
                <td>Original</td>
              </tr>

              <tr>
                <th scope='row'>Language/Literature</th>
                <td>Objectivity</td>
                <td>Good at improvising</td>
                <td>Independent</td>
              </tr>

              <tr>
                <th scope='row'>Other cultures</th>
                <td>Diversity</td>
                <td>Innovative</td>
                <td>Unsystematic</td>
              </tr>

              <tr>
                <th scope='row'>Unstructured events</th>
                <td>Public recognition</td>
                <td>Intuitive</td>
                <td>Quick wit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export const Social = () => {
  return (
    <div
      className='card my-3'
      style={{
        background: "rgba(54, 162, 235, 0.4)",
      }}
    >
      <div className='card-body'>
        <h3
          className='h3 card-title'
          style={{
            fontWeight: "700",
          }}
        >
          Social
        </h3>
        <div className='card-text mt-3'>
          <div className='d-flex flex-wrap my-5'>
            <div className='w-50 text-start d-flex justify-content-center'>
              Clinical Dietetics [S, E, I]
              <br />
              English [S, A, E]
              <br />
              Early Childhood Education [S, A]
              <br />
              Elementary Education [S, A, C]
              <br />
              Foreign Language Education [S, A, I]
              <br />
              Health & Exercise [S, R, E]
              <br />
              History [S, E, I]
              <br />
              Human Relations [E, S,C]
              <br />
              Individual & Family Dev [S, A, E]
              <br />
              Language Arts Education [S, A, I]
              <br />
              Custom Special Agent [SRI]
              <br />
              Athletic Trainer [SRE]
              <br />
              Recruiter [SRE]
              <br />
              Professional Athlete [SRC]
              <br />
              Nurse/Midwife [SIR]
              <br />
              Psychologist [SIA]
              <br />
              Dietitian [SIE]
              <br />
              Physical Therapist [SIE]
              <br />
              Dental Hygienist [SAI]
              <br />
            </div>
            <div className='w-50 text-start d-flex justify-content-center'>
              Law Enforcement Admin [R, E, C]
              <br />
              Mathematics Education [S, A, I]
              <br />
              Nursing [S, I, C]
              <br />
              Occupational Therapy [S, R, E]
              <br />
              Physical Therapy [S, R, E]
              <br />
              Science Education [S]
              <br />
              Social Studies Education [S, I, A]
              <br />
              Social Work [S, I, A]
              <br />
              Special Education [S, I, A]
              <br />
              Journalism Education [S, A, E]
              <br />
              Career Counselor [SAE]
              <br />
              Teacher [SAE]
              <br />
              Police Officer [SER]
              <br />
              Loan Officer [SER]
              <br />
              School Principal [SEI]
              <br />
              Television Director [SEA]
              <br />
              Sports Management[SEC]
              <br />
              Appraiser [SCE]
              <br />
              Politician [ESA]
              <br />
            </div>
          </div>
          <table class='table table-striped table-bordered table-sm my-5 '>
            <thead>
              <tr className='bg-light'>
                <th scope='col'>Interests</th>
                <th scope='col'>Values</th>
                <th scope='col'>Abilities</th>
                <th scope='col'>Qualities</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope='row'>Music/Reading/Drama</th>
                <td>Social Interaction</td>
                <td>Communication</td>
                <td>Cooperative</td>
              </tr>
              <tr>
                <th scope='row'>Helping others</th>
                <td>Impacting individuals</td>
                <td>Teaching</td>
                <td>Outgoing</td>
              </tr>
              <tr>
                <th scope='row'>Religion</th>
                <td>Impacting society</td>
                <td>Leading/Advising</td>
                <td>Understanding</td>
              </tr>

              <tr>
                <th scope='row'>Education</th>
                <td>Working in teams</td>
                <td>Encouraging</td>
                <td>Insighful</td>
              </tr>

              <tr>
                <th scope='row'>Community Service</th>
                <td>Expressing feelings</td>
                <td>Listening</td>
                <td>Helpful</td>
              </tr>

              <tr>
                <th scope='row'>Social activities</th>
                <td>Growth of others</td>
                <td>Faciliating</td>
                <td>Trustworthy</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export const Enterprising = () => {
  return (
    <div
      className='card my-3'
      style={{
        background: "rgba(172, 233, 23, 0.4)",
      }}
    >
      <div className='card-body'>
        <h3
          className='h3 card-title'
          style={{
            fontWeight: "700",
          }}
        >
          Enterprising
        </h3>
        <div className='card-text mt-3'>
          <div className='d-flex flex-wrap my-5'>
            <div className='w-50 text-start d-flex justify-content-center'>
              Communication [E, S, A]
              <br />
              Energy Mgmt [E, C, R]
              <br />
              Entrepreneurship [ES]
              <br />
              Human Resource Mgmt [E,S,C]
              <br />
              Industrial Engineering [E, I, R]
              <br />
              International Business [E, I, C]
              <br />
              Journ - Advertising [E, A, S]
              <br />
              Journ - PR [E, A, S]
              <br />
              Public Relations [E]
              <br />
              Law (Pre-Law) [E, A, S]
              <br />
              Marketing [E, C]
              <br />
              Political Science [E, I, A]
              <br />
              Public Affairs & Admin [E, S, C]
              <br />
              Real Estate [E, S, C]
              <br />
              Supply Chain Management [E, R]
              <br />
              Business Administration [E, S, A]
              <br />
            </div>
            <div className='w-50 text-start d-flex justify-content-center'>
              Production Manager [ERC]
              <br />
              Manager [EIS]
              <br />
              Foreign-Exchange Trader [EIC]
              <br />
              Patent Agent [EIA]
              <br />
              Fashion Coordinator [EAS]
              <br />
              Museum or Zoo Director [ESR]
              <br />
              Human Resource Advisor [ESR]
              <br />
              Media Marketing Director [ESR]
              <br />
              President (any industry) [ESR]
              <br />
              Real Estate Agent [ESR]
              <br />
              Tax Attorney [ESI]
              <br />
              Urban Planner [ESI]
              <br />
              Politician [ESA]
              <br />
              e-Commerce Manager [ESA]
              <br />
              Financial Planner [ESC]
              <br />
              Social Director [ESC]
              <br />
              Finance [E, C, I]
              <br />
            </div>
          </div>
          <table class='table table-striped table-bordered table-sm my-5 '>
            <thead>
              <tr className='bg-light'>
                <th scope='col'>Interests</th>
                <th scope='col'>Values</th>
                <th scope='col'>Abilities</th>
                <th scope='col'>Qualities</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope='row'>Politics</th>
                <td>Seeking pleasure</td>
                <td>Leadership</td>
                <td>Assertive/Dominant</td>
              </tr>
              <tr>
                <th scope='row'>Economics</th>
                <td>Power/Control</td>
                <td>Management</td>
                <td>Outgoing</td>
              </tr>
              <tr>
                <th scope='row'>Leadership</th>
                <td>Success</td>
                <td>Persuasion/Sales</td>
                <td>Self-confident</td>
              </tr>

              <tr>
                <th scope='row'>Challenges</th>
                <td>Status/Recognition</td>
                <td>Decision Making</td>
                <td>Energetic</td>
              </tr>

              <tr>
                <th scope='row'>Competition</th>
                <td>Expressing opinions</td>
                <td>Public speaking</td>
                <td>Dynamic</td>
              </tr>

              <tr>
                <th scope='row'>Negotiation</th>
                <td>Growth of Making money</td>
                <td>Planning/Organising</td>
                <td>Ambitious</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export const Conventional = () => {
  return (
    <div
      className='card my-3'
      style={{
        background: "rgba(93, 255, 78, 0.4)",
      }}
    >
      <div className='card-body'>
        <h3
          className='h3 card-title'
          style={{
            fontWeight: "700",
          }}
        >
          Conventional
        </h3>
        <div className='card-text mt-3'>
          <div className='d-flex flex-wrap my-5'>
            <div className='w-50 text-start d-flex justify-content-center'>
              Accounting [C, E]
              <br />
              Business Stat [C, E, I]
              <br />
              Information Studies [C, I]
              <br />
              Information Technology [C, I]
              <br />
              Logistics & Materials Management [C, E, R]
              <br />
              Website Editor [CIA ]<br />
              Credit Analyst [CRS]
              <br />
              Technical Management [ CIE ]<br />
              Health Service Administration [CSI ]<br />
              Business Administration [ CES ]<br />
            </div>
            <div className='w-50 text-start d-flex justify-content-center'></div>
          </div>
          <table class='table table-striped table-bordered table-sm my-5 '>
            <thead>
              <tr className='bg-light'>
                <th scope='col'>Interests</th>
                <th scope='col'>Values</th>
                <th scope='col'>Abilities</th>
                <th scope='col'>Qualities</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope='row'>Organising</th>
                <td>Bussiness success</td>
                <td>Follow orders</td>
                <td>Detail oriented</td>
              </tr>
              <tr>
                <th scope='row'>Collecting things</th>
                <td>Accuracy</td>
                <td>Cleric skills</td>
                <td>Organised</td>
              </tr>
              <tr>
                <th scope='row'>Keeping records</th>
                <td>Order</td>
                <td>Computer skills</td>
                <td>Persistant</td>
              </tr>

              <tr>
                <th scope='row'>Math/Accoutng</th>
                <td>Clear standards</td>
                <td>Oraganisiting skills</td>
                <td>Effecient</td>
              </tr>

              <tr>
                <th scope='row'>Serving as tresurer</th>
                <td>Routine</td>
                <td>Numeric ability</td>
                <td>Practical</td>
              </tr>

              <tr>
                <th scope='row'>Concrete tasks</th>
                <td>Practical things</td>
                <td>Written communication</td>
                <td>Systematic</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
