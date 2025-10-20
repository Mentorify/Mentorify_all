import { City, State } from "country-state-city"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../Hooks/useAuth"

const EditSchoolModal = ({ data, id, onSchoolUpdated }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const countryCode = "IN"
  const allStateArr = State.getStatesOfCountry(countryCode)
  const [cityArr, setCityArr] = useState([])
  
  // Use all states for all roles - simplified approach
  const stateArr = allStateArr
  //   console.log("stu data is", data._id)
  const [editSchoolDetails, seteditSchoolDetails] = useState({
    _id: data._id,
    name: data.name,
    email: data.email,
    mobile: data.mobile,
    state: data.state,
    city: data.city,
    // password: "",
    // cpassword: "",
  })

  const handleInputs = (e) => {
    const name = e.target.name
    const value = e.target.value
    
    // If state is being changed, reset city selection
    if (name === 'state') {
      seteditSchoolDetails({ ...editSchoolDetails, [name]: value, city: "" })
    } else {
      seteditSchoolDetails({ ...editSchoolDetails, [name]: value })
    }
  }

  // No need for state initialization - using all states directly

  const editSchool = async (e) => {
    e.preventDefault()
    try {
      const { _id, name, email, mobile, state, city } =
        editSchoolDetails
      
      // Debug: Log the form data being sent
      console.log("Edit school data being sent:", {
        _id, name, email, mobile, state, city, gender: "other"
      })
      console.log("Full editSchoolDetails:", editSchoolDetails)
      const res = await fetch("/api/profile/schools/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          _id,
          name,
          gender: "other",
          email,
          mobile,
          state,
          city,
        }),
        credentials: "include",
      })
      const data = await res.json()
      console.log("eror is", data, res)
      if (!res.ok) {
        window.alert(data.Error || "Something went wrong")
      } else {
        window.alert("SCHOOL UPDATED SUCCESSFULLY!")
        
        // Call the callback to refresh school data
        if (onSchoolUpdated) {
          onSchoolUpdated()
        }
        
        // Close modal
        const modal = document.getElementById(id)
        if (modal) {
          // Use jQuery to close modal if available, otherwise use Bootstrap
          if (window.$ && window.$.fn.modal) {
            window.$(modal).modal('hide')
          } else if (window.bootstrap && window.bootstrap.Modal) {
            const modalInstance = window.bootstrap.Modal.getInstance(modal) || new window.bootstrap.Modal(modal)
            modalInstance.hide()
          }
        }
      }
    } catch (error) {
      window.alert(`Error: ${error}`)
    }
  }

  useEffect(() => {
    // fetch cities based on selected state - simplified for all roles
    if (editSchoolDetails.state !== "") {
      let stateCode = ""
      for (let i = 0; i < allStateArr.length; i++) {
        if (allStateArr[i].name === editSchoolDetails.state) {
          stateCode = allStateArr[i].isoCode
          break
        }
      }
      
      let citiesInState = City.getCitiesOfState(countryCode, String(stateCode))
      console.log("EditSchoolModal - Cities in state:", citiesInState.length, "for state:", editSchoolDetails.state)
      setCityArr(citiesInState)
    } else {
      // Clear cities when no state is selected
      setCityArr([])
    }
  }, [editSchoolDetails.state])
  return (
    <div
      class='modal fade'
      id={id}
      tabindex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div class='modal-dialog'>
        <div class='modal-content'>
          <div class='modal-header'>
            <h5 class='modal-title' id='exampleModalLabel'>
              Edit School
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
                    value={editSchoolDetails.name}
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
                    value={editSchoolDetails.mobile}
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
                    value={editSchoolDetails.email}
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
                    value={editSchoolDetails.state}
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
                    value={editSchoolDetails.city}
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
              <button type='submit' class='btn btn-primary' onClick={editSchool}>
                Save school details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditSchoolModal
