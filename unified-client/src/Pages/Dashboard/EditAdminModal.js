import { City, State } from "country-state-city"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../Hooks/useAuth"

const EditAdminModal = ({ data, id }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const countryCode = "IN"
  const stateArr = State.getStatesOfCountry(countryCode)
  const [cityArr, setCityArr] = useState([])
  //   console.log("stu data is", data._id)
  const [editAdminDetails, seteditAdminDetails] = useState({
    _id: data._id,
    name: data.name,
    gender: data.gender,
    Class: data.Class,
    email: data.email,
    school: data.school,
    mobile: data.mobile,
    state: data.state,
    city: data.city,
    // password: "",
    // cpassword: "",
  })

  const handleInputs = (e) => {
    const name = e.target.name
    const value = e.target.value
    seteditAdminDetails({ ...editAdminDetails, [name]: value })
  }

  const editAdmin = async (e) => {
    e.preventDefault()
    try {
      const { _id, name, gender, Class, email, school, mobile, state, city } =
        editAdminDetails
      const res = await fetch("/api/superadmin/dashboard/admins/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          _id,
          name,
          gender,
          Class,
          email,
          school,
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
        window.alert("REGISTERATION SUCCESSFULL !")
        navigate("/dashboard")
      }
    } catch (error) {
      window.alert(`Error: ${error}`)
    }
  }

  useEffect(() => {
    // fetch all city and store it
    if (editAdminDetails.state !== "") {
      let stateCode = ""
      for (let i = 0; i < stateArr.length; i++) {
        if (stateArr[i].name === editAdminDetails.state) {
          stateCode = stateArr[i].isoCode
          break
        }
      }
      setCityArr(City.getCitiesOfState(countryCode, String(stateCode)))
    }
  }, [editAdminDetails.state])
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
              Edit Details
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
                    value={editAdminDetails.name}
                    onChange={handleInputs}
                  />
                </p>
                {data.role === "ADMIN" && (
                  <p>
                    Gender :
                    <br />
                    <select
                      name='gender'
                      id='gender'
                      className='input'
                      defaultChecked={editAdminDetails.gender}
                      value={editAdminDetails.gender}
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
                )}

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
                    value={editAdminDetails.mobile}
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
                    value={editAdminDetails.email}
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
                    value={editAdminDetails.state}
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
                    value={editAdminDetails.city}
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
              <button type='submit' class='btn btn-primary' onClick={editAdmin}>
                Save admin details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditAdminModal
