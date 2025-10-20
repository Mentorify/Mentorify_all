import { City, State } from "country-state-city"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../Hooks/useAuth"

const EditFranchiseModal = ({ data, id, onFranchiseUpdated }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const countryCode = "IN"
  const stateArr = State.getStatesOfCountry(countryCode)
  const [cityArr, setCityArr] = useState([])
  const [selectedCity, setSelectedCity] = useState([])

  const handleCityClick = (e) => {
    if (selectedCity.includes(e.target.value)) {
      setSelectedCity(selectedCity.filter((city) => city !== e.target.value))
    } else {
      setSelectedCity([...selectedCity, e.target.value])
    }
  }

  const handleCityClick2 = (e) => {
    if (selectedCity.includes(e)) {
      setSelectedCity(selectedCity.filter((city) => city !== e))
    }
  }

  const [editFranchiseDetails, setEditFranchiseDetails] = useState({
    _id: data._id,
    name: data.name,
    gender: data.gender,
    Class: data.Class,
    email: data.email,
    school: data.school,
    mobile: data.mobile,
    state: data.state,
    city: data.city,
  })

  const handleInputs = (e) => {
    const name = e.target.name
    const value = e.target.value
    setEditFranchiseDetails({ ...editFranchiseDetails, [name]: value })
  }

  const editUser = async (e) => {
    e.preventDefault()
    try {
      const { name, email, mobile, state, city, password, cpassword, gender } =
        editFranchiseDetails
      console.log(editFranchiseDetails)
      const res = await fetch("/api/profile/franchises/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          _id: editFranchiseDetails._id,
          name,
          email,
          mobile,
          state,
          city: selectedCity.join("-"),
          gender,
        }),
        credentials: "include",
      })
      const data = await res.json()
      if (!res.ok) {
        window.alert(data.Error || "Something went wrong")
      } else {
        window.alert("FRANCHISE UPDATED SUCCESSFULLY!")
        
        // Call the callback to refresh franchise data
        if (onFranchiseUpdated) {
          onFranchiseUpdated()
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
    // fetch all city and store it
    if (editFranchiseDetails.state !== "") {
      let stateCode = ""
      for (let i = 0; i < stateArr.length; i++) {
        if (stateArr[i].name === editFranchiseDetails.state) {
          stateCode = stateArr[i].isoCode
          break
        }
      }
      setCityArr(City.getCitiesOfState(countryCode, String(stateCode)))
    }
  }, [editFranchiseDetails.state, selectedCity])
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
              Edit Franchise
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
                    value={editFranchiseDetails.name}
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
                    value={editFranchiseDetails.mobile}
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
                    value={editFranchiseDetails.email}
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
                    value={editFranchiseDetails.state}
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
                  City :{" "}
                  <mark>
                    {" "}
                    Selected City :{" "}
                    {selectedCity.length === 0
                      ? "None"
                      : selectedCity.map((ele) => (
                          <span onClick={() => handleCityClick2(ele)}>
                            {" "}
                            {ele + ", "}
                          </span>
                        ))}
                  </mark>
                  <br />
                  <select
                    name='city'
                    id='city'
                    className='input'
                    value={editFranchiseDetails.city}
                    onChange={handleCityClick}
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
              <button type='submit' class='btn btn-primary' onClick={editUser}>
                Save Franchise details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditFranchiseModal
