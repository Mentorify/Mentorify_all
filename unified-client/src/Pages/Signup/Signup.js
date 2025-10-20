import React, { useEffect, useState } from 'react'
import './Signup.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
const Signup = () => {
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({
    name: '',
    gender: '',
    Class: '',
    mobile: '',
    email: '',
    password: '',
    cpassword: '',
    school: '',
    state: '',
    city: '',
  })

  const countryCode = 'IN'
  const [stateArr, setStateArr] = useState([])

  const loadStates = async function () {
    const res = await fetch('https://state-city-india-api.onrender.com/states/')
    const data = await res.json()

    setStateArr(data)
  }

  const [cityArr, setCityArr] = useState([])

  const handleInputs = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUserDetails({ ...userDetails, [name]: value })
  }

  const signupUser = async (e) => {
    e.preventDefault()
    try {
      const {
        name,
        gender,
        Class,
        mobile,
        email,
        password,
        cpassword,
        school,
        state,
        city,
      } = userDetails

      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          gender,
          Class,
          mobile,
          email,
          password,
          cpassword,
          school,
          state,
          city,
        }),
      })
      const data = await res.json()
      // Debug
      // console.log(res);
      if (!data || res.status === 422) {
        window.alert('INVALID CREDENTIALS !')
      } else {
        window.alert('REGISTERATION SUCCESSFULL !')
        navigate('/login')
      }
    } catch (error) {
      console.error(error)
    }
  }

  // code to change cityArr
  useEffect(() => {
    if (userDetails.state !== '') {
      ;(async function () {
        let stateCode = ''
        // get state code
        for (let i = 0; i < stateArr.length; i++) {
          if (stateArr[i].name === userDetails.state) {
            stateCode = stateArr[i].isoCode
            console.log('deb', stateCode)
            break
          }
        }

        // get cities of state
        const fetchCitiesFromAPI = async () => {
          const res = await fetch(
            `https://state-city-india-api.onrender.com/cities/${stateCode}`
          )
          const data = await res.json()
          return data
        }
        const cities = await fetchCitiesFromAPI()

        setCityArr(cities)
      })()
    }
    loadStates()
    // console.log(userDetails);
  }, [userDetails.state])

  return (
    <>
      <Header />
      <section id='signup-section'>
        <h1>Create Account</h1>
        <h3>
          <span>All Fields Are Required </span>
        </h3>
        <form method='POST' className='signup-modal'>
          <div className='credentials'>
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
                value={userDetails.name}
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
                value={userDetails.gender}
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
                value={userDetails.Class}
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
                value={userDetails.mobile}
                onChange={handleInputs}
              />
            </p>
            <p>
              Fill in your Email Address :
              <br />
              <input
                className='input'
                type='email'
                name='email'
                id='email'
                placeholder='Fill in your email address'
                autoComplete='off'
                value={userDetails.email}
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
                placeholder='Input your password'
                autoComplete='off'
                value={userDetails.password}
                onChange={handleInputs}
              />
            </p>
            <p>
              Confirm Your Password :
              <br />
              <input
                className='input'
                type='password'
                name='cpassword'
                id='cpassword'
                placeholder='Input your password'
                autoComplete='off'
                value={userDetails.cpassword}
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
                value={userDetails.school}
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
                value={userDetails.state}
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
                value={userDetails.city}
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
          <input
            className='Signup'
            type='submit'
            value='Register'
            onClick={signupUser}
          />
          <div className='signup-footer'>
            <NavLink to='/login'>
              <p>Already Registered ?</p>
            </NavLink>
          </div>
        </form>
      </section>
      <Footer />
    </>
  )
}

export default Signup
