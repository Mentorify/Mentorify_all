import React, { useEffect, useState } from "react"
import "./Login.css"
import { NavLink, useNavigate } from "react-router-dom"
import { Footer } from "../../components/Footer/Footer"
import { Header } from "../../components/Header/Header"
import useAuth from "../../Hooks/useAuth"
import api from "../../api"

const Login = () => {
  // eslint-disable-next-line
  const { user, dispatch } = useAuth()

  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1) // 1: Email, 2: OTP
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const loginUser = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
      const data = await res.json()
      // Debug
      // console.log(res);
      if (!data || res.status === 400 || res.status === 422) {
        window.alert("INVALID CREDENTIALS !")
      } else {
        dispatch({ type: "LOGIN", payload: data })
        localStorage.setItem("user", JSON.stringify(data))
        // Save token separately for API calls
        if (data.token) {
          localStorage.setItem("token", data.token)
        }
        // Show role-specific success message

        const roles= {
          "ADMIN": "Admin",
          "SUPER_ADMIN": "SuperAdmin",
          "USER": "User",
          "FRANCHISE": "Franchise",
          "SCHOOL": "School"
        };
        const role = roles[data.role] || "USER"
        window.alert(`${role} LOGIN SUCCESSFULL !`)
        navigate("/dashboard")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleSendOTP = async (e) => {
    e.preventDefault()
    if (!email) {
      window.alert("Please enter your email address")
      return
    }

    setIsLoading(true)
    try {
      const response = await api.post("/forgot-password/send-otp", { email })
      window.alert(response.data.message)
      setForgotPasswordStep(2)
    } catch (error) {
      console.error(error)
      window.alert(error.response?.data?.message || "Failed to send OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    if (!email || !otp || !newPassword || !confirmNewPassword) {
      window.alert("Please fill in all fields")
      return
    }

    if (newPassword !== confirmNewPassword) {
      window.alert("Passwords do not match")
      return
    }

    if (newPassword.length < 7) {
      window.alert("Password must be at least 7 characters long")
      return
    }

    setIsLoading(true)
    try {
      const response = await api.post("/forgot-password/verify-otp", { 
        email, 
        otp, 
        newPassword 
      })
      window.alert(response.data.message)
      // Reset forgot password form
      setShowForgotPassword(false)
      setForgotPasswordStep(1)
      setOtp("")
      setNewPassword("")
      setConfirmNewPassword("")
    } catch (error) {
      console.error(error)
      window.alert(error.response?.data?.message || "Failed to reset password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelForgotPassword = () => {
    setShowForgotPassword(false)
    setForgotPasswordStep(1)
    setOtp("")
    setNewPassword("")
    setConfirmNewPassword("")
  }

  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }
  })

  return (
    <>
      <Header />
      <section className='login-section'>
        {!showForgotPassword ? (
          // Regular Login Form
          <form method='POST' className='login-modal '>
            <div className='login-header'>
              <h2>
                Login <br /> registered account
              </h2>
            </div>
            <div className='credentials'>
              <p>
                Email Address :
                <br />
                <input
                  className='input'
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Fill in your email address'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                />
              </p>
              <p>
                Password :
                <br />
                <input
                  className='input'
                  type='password'
                  name='Password'
                  id='pass'
                  placeholder='Input your password'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                />
              </p>
            </div>
            <input
              className='Login'
              type='submit'
              value='Log-In'
              onClick={loginUser}
            />
            <div className='login-footer'>
              <button
                type='button'
                onClick={() => setShowForgotPassword(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  padding: '0',
                  fontSize: 'inherit',
                }}
              >
                <p>Forgot Password?</p>
              </button>
              <NavLink to='/signup'>
                <p>Don't have an account ?</p>
              </NavLink>
            </div>
          </form>
        ) : (
          // Forgot Password Form
          <form method='POST' className='login-modal '>
            <div className='login-header'>
              <h2>
                {forgotPasswordStep === 1 ? 'Forgot Password' : 'Reset Password'}
              </h2>
            </div>
            
            {forgotPasswordStep === 1 ? (
              // Step 1: Enter Email
              <>
                <div className='credentials'>
                  <p>
                    Email Address :
                    <br />
                    <input
                      className='input'
                      type='email'
                      name='email'
                      id='forgot-email'
                      placeholder='Enter your registered email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </p>
                </div>
                <input
                  className='Login'
                  type='submit'
                  value={isLoading ? 'Sending...' : 'Send OTP'}
                  onClick={handleSendOTP}
                  disabled={isLoading}
                />
              </>
            ) : (
              // Step 2: Enter OTP and New Password
              <>
                <div className='credentials'>
                  <p>
                    Email Address :
                    <br />
                    <input
                      className='input'
                      type='email'
                      value={email}
                      disabled
                      style={{ backgroundColor: '#f0f0f0' }}
                    />
                  </p>
                  <p>
                    OTP (Check your email) :
                    <br />
                    <input
                      className='input'
                      type='text'
                      name='otp'
                      id='otp'
                      placeholder='Enter 6-digit OTP'
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength='6'
                    />
                  </p>
                  <p>
                    New Password :
                    <br />
                    <input
                      className='input'
                      type='password'
                      name='newPassword'
                      id='newPassword'
                      placeholder='Enter new password (min 7 characters)'
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </p>
                  <p>
                    Confirm New Password :
                    <br />
                    <input
                      className='input'
                      type='password'
                      name='confirmNewPassword'
                      id='confirmNewPassword'
                      placeholder='Confirm new password'
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                  </p>
                  <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
                    OTP is valid for 5 minutes only
                  </p>
                </div>
                <input
                  className='Login'
                  type='submit'
                  value={isLoading ? 'Resetting...' : 'Reset Password'}
                  onClick={handleVerifyOTP}
                  disabled={isLoading}
                />
              </>
            )}
            
            <div className='login-footer'>
              <button
                type='button'
                onClick={handleCancelForgotPassword}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#007bff',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: '10px 0',
                }}
              >
                Back to Login
              </button>
            </div>
          </form>
        )}
      </section>
      <Footer />
    </>
  )
}

export default Login
