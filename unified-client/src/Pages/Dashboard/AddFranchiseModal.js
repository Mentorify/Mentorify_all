import { City, State } from "country-state-city"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../Hooks/useAuth"
const AddFranchiseModal = ({ onFranchiseAdded }) => {
  const { user } = useAuth()
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

  const [addFranchiseDetails, setAddFranchiseDetails] = useState({
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
    setAddFranchiseDetails({ ...addFranchiseDetails, [name]: value })
  }

  const signupUser = async (e) => {
    e.preventDefault()
    try {
      const { name, gender, email, mobile, state, city, password, cpassword } =
        addFranchiseDetails
      
      // Debug: Log the form data being sent
      console.log("Franchise form data being sent:", {
        name, gender, email, mobile, state, city, password, cpassword
      })
      console.log("Full addFranchiseDetails:", addFranchiseDetails)
      const res = await fetch("/api/profile/franchises", {
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
          city: selectedCity.join("-"),
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
        setAddFranchiseDetails({
          name: "",
          gender: "other",
          email: "",
          mobile: "",
          state: "",
          password: "",
          cpassword: "",
        })
        setSelectedCity([])
        // Close modal
        const modal = document.getElementById('addFra')
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
        if (onFranchiseAdded) {
          onFranchiseAdded()
        }
      }
    } catch (error) {
      window.alert(`Error: ${error}`)
    }
  }

  useEffect(() => {
    // fetch all city and store it
    if (addFranchiseDetails.state !== "") {
      let stateCode = ""
      for (let i = 0; i < stateArr.length; i++) {
        if (stateArr[i].name === addFranchiseDetails.state) {
          stateCode = stateArr[i].isoCode
          break
        }
      }
      setCityArr(City.getCitiesOfState(countryCode, String(stateCode)))
    }
  }, [addFranchiseDetails.state, selectedCity])
  return (
    <div
      class='modal fade'
      id='addFra'
      tabindex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div class='modal-dialog'>
        <div class='modal-content'>
          <div class='modal-header'>
            <h5 class='modal-title' id='exampleModalLabel'>
              Add new Franchise
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
                    value={addFranchiseDetails.name}
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
                    value={addFranchiseDetails.mobile}
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
                    value={addFranchiseDetails.email}
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
                    value={addFranchiseDetails.password}
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
                    value={addFranchiseDetails.cpassword}
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
                    value={addFranchiseDetails.state}
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
                    value={addFranchiseDetails.city}
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
              <button
                type='submit'
                class='btn btn-primary'
                onClick={signupUser}
              >
                Save Franchise details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddFranchiseModal
