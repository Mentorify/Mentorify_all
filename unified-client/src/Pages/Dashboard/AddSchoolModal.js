import { City, State } from "country-state-city"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../Hooks/useAuth"
const AddSchoolModal = ({ onSchoolAdded }) => {
  const { user } = useAuth()
  const countryCode = "IN"
  const allStateArr = State.getStatesOfCountry(countryCode)
  const [cityArr, setCityArr] = useState([])
  
  // Use all states for all roles - simplified approach
  const stateArr = allStateArr

  const [addSchoolDetails, setAddSchoolDetails] = useState({
    name: "",
    gender: "other",
    email: "",
    mobile: "",
    state: "",
    city: "",
    password: "",
    cpassword: "",
  })

  const handleInputs = (e) => {
    const name = e.target.name
    const value = e.target.value
    
    // If state is being changed, reset city selection
    if (name === 'state') {
      setAddSchoolDetails({ ...addSchoolDetails, [name]: value, city: "" })
    } else {
      setAddSchoolDetails({ ...addSchoolDetails, [name]: value })
    }
  }

  // No need for state initialization - using all states directly

  const signupUser = async (e) => {
    e.preventDefault()
    try {
      const { name, email, mobile, state, city, password, cpassword, gender } =
        addSchoolDetails
      
      // Debug: Log the form data being sent
      console.log("Form data being sent:", {
        name, email, mobile, state, city, password, cpassword, gender
      })
      console.log("Full addSchoolDetails:", addSchoolDetails)
      const res = await fetch("/api/profile/schools", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name,
          email,
          mobile,
          state,
          city,
          password,
          cpassword,
          gender,
        }),
        credentials: "include",
      })
      const data = await res.json()
      if (!res.ok) {
        window.alert(data.Error || "Something went wrong")
      } else {
        window.alert("REGISTERATION SUCCESSFULL !")
        // Reset form
        setAddSchoolDetails({
          name: "",
          gender: "other",
          email: "",
          mobile: "",
          state: "",
          city: "",
          password: "",
          cpassword: "",
        })
        // Close modal
        const modal = document.getElementById('addSch')
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
        if (onSchoolAdded) {
          onSchoolAdded()
        }
      }
    } catch (error) {
      window.alert(`Error: ${error}`)
    }
  }

  useEffect(() => {
    // fetch cities based on selected state - simplified for all roles
    if (addSchoolDetails.state !== "") {
      let stateCode = ""
      for (let i = 0; i < allStateArr.length; i++) {
        if (allStateArr[i].name === addSchoolDetails.state) {
          stateCode = allStateArr[i].isoCode
          break
        }
      }
      
      let citiesInState = City.getCitiesOfState(countryCode, String(stateCode))
      console.log("Cities in state:", citiesInState.length, "for state:", addSchoolDetails.state)
      setCityArr(citiesInState)
    } else {
      // Clear cities when no state is selected
      setCityArr([])
    }
  }, [addSchoolDetails.state])
  return (
    <div
      class='modal fade'
      id='addSch'
      tabindex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div class='modal-dialog'>
        <div class='modal-content'>
          <div class='modal-header'>
            <h5 class='modal-title' id='exampleModalLabel'>
              Add new School
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
                    value={addSchoolDetails.name}
                    onChange={handleInputs}
                  />
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
                    value={addSchoolDetails.mobile}
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
                    value={addSchoolDetails.email}
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
                    value={addSchoolDetails.password}
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
                    value={addSchoolDetails.cpassword}
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
                    value={addSchoolDetails.state}
                    onChange={handleInputs}
                  >
                    <option value='' selected hidden>
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
                    value={addSchoolDetails.city}
                    onChange={handleInputs}
                  >
                    <option value='' selected hidden>
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
                Save School details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddSchoolModal
