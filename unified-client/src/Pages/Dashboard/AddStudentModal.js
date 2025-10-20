import { City, State } from "country-state-city"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../Hooks/useAuth"
const AddStudentModal = ({ onStudentAdded }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const countryCode = "IN"
  const stateArr = State.getStatesOfCountry(countryCode)
  const [cityArr, setCityArr] = useState([])

  const [addStudentDetails, setAddStudentDetails] = useState({
    name: "",
    gender: "",
    Class: "",
    email: "",
    school: "",
    mobile: "",
    state: "",
    city: "",
    password: "",
    cpassword: "",
  })

  const handleInputs = (e) => {
    const name = e.target.name
    const value = e.target.value
    setAddStudentDetails({ ...addStudentDetails, [name]: value })
  }

  const signupUser = async (e) => {
    e.preventDefault()
    try {
      const {
        name,
        gender,
        Class,
        email,
        school,
        mobile,
        state,
        city,
        password,
        cpassword,
      } = addStudentDetails
      // Use unified student endpoint for all roles
      const res = await fetch("/api/profile/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name,
          gender,
          Class,
          email,
          school,
          mobile,
          state,
          city,
          password,
          cpassword,
        }),
        credentials: "include",
      })
      const data = await res.json()
      if (!res.ok) {
        window.alert(data.Error || "Something went wrong")
      } else {
        window.alert("REGISTERATION SUCCESSFULL !")
        // Reset form
        setAddStudentDetails({
          name: "",
          gender: "",
          Class: "",
          email: "",
          school: "",
          mobile: "",
          state: "",
          city: "",
          password: "",
          cpassword: "",
        })
        // Close modal
        const modal = document.getElementById('addStu')
        if (modal) {
          // Use jQuery or vanilla JS to close modal
          const modalElement = modal
          if (modalElement && modalElement.classList.contains('show')) {
            modalElement.classList.remove('show')
            modalElement.style.display = 'none'
            document.body.classList.remove('modal-open')
            const backdrop = document.querySelector('.modal-backdrop')
            if (backdrop) {
              backdrop.remove()
            }
          }
        }
        // Refresh parent data
        if (onStudentAdded) {
          onStudentAdded()
        }
      }
    } catch (error) {
      window.alert(`Error: ${error}`)
    }
  }

  useEffect(() => {
    // fetch all city and store it
    if (addStudentDetails.state !== "") {
      let stateCode = ""
      for (let i = 0; i < stateArr.length; i++) {
        if (stateArr[i].name === addStudentDetails.state) {
          stateCode = stateArr[i].isoCode
          break
        }
      }
      setCityArr(City.getCitiesOfState(countryCode, String(stateCode)))
    }
  }, [addStudentDetails.state])
  return (
    <div
      class='modal fade'
      id='addStu'
      tabindex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div class='modal-dialog'>
        <div class='modal-content'>
          <div class='modal-header'>
            <h5 class='modal-title' id='exampleModalLabel'>
              Add new Student
            </h5>
            <button
              type='button'
              class='btn-close'
              data-mdb-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <form action=''>
            <div class='modal-body' style={{ backgroundColor: "#907a50" }}>
              <div className='credentials' style={{ textAlign: 'left', margin: '0 auto', color: 'white' }}>
                <p>
                  Full Name :
                  <br />
                  <input
                    className='input'
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Fill in your Full name'
                    autoComplete='off'
                    value={addStudentDetails.name}
                    onChange={handleInputs}
                  />
                </p>
                <p>
                  Gender :
                  <br />
                  <select
                    name='gender'
                    id='gender'
                    className='input'
                    value={addStudentDetails.gender}
                    onChange={handleInputs}
                  >
                    <option value='null' selected hidden>
                      Select your Gender
                    </option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='others'>Others</option>
                  </select>
                </p>
                <p>
                  Class :
                  <br />
                  <select
                    name='Class'
                    id='Class'
                    className='input'
                    value={addStudentDetails.Class}
                    onChange={handleInputs}
                  >
                    <option value='null' selected hidden>
                      Select your Class
                    </option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                    <option value='UG'>UG</option>
                    <option value='PG'>PG</option>
                  </select>
                </p>
                <p>
                  Mobile No :
                  <br />
                  <input
                    className='input'
                    type='mobile'
                    name='mobile'
                    id='mobile'
                    placeholder='Fill in your mobile no'
                    autoComplete='off'
                    value={addStudentDetails.mobile}
                    onChange={handleInputs}
                  />
                </p>
                <p>
                  Email Address :
                  <br />
                  <input
                    className='input'
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Fill in your email address'
                    autoComplete='off'
                    value={addStudentDetails.email}
                    onChange={handleInputs}
                  />
                </p>
                <p>
                  Password :
                  <br />
                  <input
                    className='input'
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Create a password'
                    autoComplete='off'
                    value={addStudentDetails.password}
                    onChange={handleInputs}
                  />
                </p>
                <p>
                  Confirm Password :
                  <br />
                  <input
                    className='input'
                    type='password'
                    name='cpassword'
                    id='cpassword'
                    placeholder='Confirm password'
                    autoComplete='off'
                    value={addStudentDetails.cpassword}
                    onChange={handleInputs}
                  />
                </p>
                <p>
                  School :
                  <br />
                  <input
                    className='input'
                    type='text'
                    name='school'
                    id='school'
                    placeholder='Input your School Name'
                    autoComplete='off'
                    value={addStudentDetails.school}
                    onChange={handleInputs}
                  />
                </p>
                <p>
                  State :
                  <br />
                  <select
                    name='state'
                    id='state'
                    className='input'
                    placeholder='Input your State Name'
                    value={addStudentDetails.state}
                    onChange={handleInputs}
                  >
                    <option value='null' selected hidden>
                      Select your State
                    </option>
                    {stateArr.map((e, i) => (
                      <option value={e.name} key={i}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </p>
                <p>
                  City :
                  <br />
                  <select
                    name='city'
                    id='city'
                    className='input'
                    value={addStudentDetails.city}
                    onChange={handleInputs}
                  >
                    <option value='null' selected hidden>
                      Select your City
                    </option>
                    {cityArr.map((e, i) => (
                      <option value={e.name} key={i}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </p>
              </div>
              <button
                type='submit'
                class='btn btn-primary'
                onClick={signupUser}
              >
                Save student details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddStudentModal
