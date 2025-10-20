import { City, State } from "country-state-city"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../Hooks/useAuth"
const AddAdminModal = ({ onAdminAdded }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const countryCode = "IN"
  const stateArr = State.getStatesOfCountry(countryCode)
  const [cityArr, setCityArr] = useState([])

  const [addAdminDetails, setaddAdminDetails] = useState({
    name: "",
    gender: "",
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
    setaddAdminDetails({ ...addAdminDetails, [name]: value })
  }

  const signupUser = async (e) => {
    e.preventDefault()
    try {
      const { name, gender, email, mobile, state, city, password, cpassword } =
        addAdminDetails
      
      // Validate required fields
      if (!name || !email || !mobile || !state || !city || !password || !cpassword || gender === "" || gender === "null") {
        window.alert("Please fill all the required fields")
        return
      }
      
      if (password !== cpassword) {
        window.alert("Passwords do not match")
        return
      }
      
      const res = await fetch("/api/superadmin/dashboard/admins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name,
          gender,
          email,
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
        setaddAdminDetails({
          name: "",
          gender: "",
          email: "",
          mobile: "",
          state: "",
          city: "",
          password: "",
          cpassword: "",
        })
        // Close modal
        const modal = document.getElementById('addAdm')
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
        if (onAdminAdded) {
          onAdminAdded()
        }
      }
    } catch (error) {
      window.alert(`Error: ${error}`)
    }
  }

  useEffect(() => {
    // fetch all city and store it
    if (addAdminDetails.state !== "") {
      let stateCode = ""
      for (let i = 0; i < stateArr.length; i++) {
        if (stateArr[i].name === addAdminDetails.state) {
          stateCode = stateArr[i].isoCode
          break
        }
      }
      setCityArr(City.getCitiesOfState(countryCode, String(stateCode)))
    }
  }, [addAdminDetails.state])
  return (
    <div
      class='modal fade'
      id='addAdm'
      tabindex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div class='modal-dialog'>
        <div class='modal-content'>
          <div class='modal-header'>
            <h5 class='modal-title' id='exampleModalLabel'>
              Add new Admin
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
                    value={addAdminDetails.name}
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
                    value={addAdminDetails.gender}
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
                  Mobile No :
                  <br />
                  <input
                    className='input'
                    type='mobile'
                    name='mobile'
                    id='mobile'
                    placeholder='Fill in your mobile no'
                    autoComplete='off'
                    value={addAdminDetails.mobile}
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
                    value={addAdminDetails.email}
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
                    value={addAdminDetails.password}
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
                    value={addAdminDetails.cpassword}
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
                    value={addAdminDetails.state}
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
                    value={addAdminDetails.city}
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
                Save Admin details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddAdminModal
